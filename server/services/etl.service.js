import pkg from 'pg';
const { Pool } = pkg;

// Create a pool
const oltpPool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'sd',
  password: 'password',
  port: 5432, // default PostgreSQL port
});

export const olapPool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'sd lab02',
  password: 'password',
  port: 5432, // default PostgreSQL port
});

export const clearOlap = async (client) => {
  try {
    const tables = [
      'address',
      'area_type',
      'customer',
      'city',
      'date_time',
      'delivery_person',
      'fact_order_creation',
      'fact_order_delivery',
      'order_type',
      'restaurant',
      'traffic_density',
      'vehicle_type',
    ];

    for (const table of tables) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE`);
      console.log(table + ' table truncated');
    }
  } catch (error) {
    console.error('Error clearing olap:', error);
  }
}

const loadCity = async (oltpClient, olapClient) => {
  const oltpCities = await oltpClient.query(`SELECT * FROM city`);
  
  oltpCities.rows.forEach((city, idx) => {
    olapClient.query(`INSERT INTO city (city_id, city) VALUES (${idx + 1}, '${city.city}')`)
  })
}

const loadAddress = async (oltpClient, olapClient) => {
  const oltpAddresses = await oltpClient.query(`SELECT * FROM address`);
  
  oltpAddresses.rows.forEach((address) => {
    olapClient.query(`INSERT INTO address (address_id, latitude, longtitude, street_name, city) VALUES (${address.address_id}, '${address.latitude}', '${address.longtitude}', '${address.street_name}', ${address.city})`)
  })
}

const loadAreaTypes = async (oltpClient, olapClient) => {
  const oltpAreaTypes = await oltpClient.query(`SELECT DISTINCT area_type FROM delivery_report`);

  console.log('oltpAreaTypes: ', oltpAreaTypes)
  
  oltpAreaTypes.rows.forEach((areaType, idx) => {
    olapClient.query(`INSERT INTO area_type (area_type_id, area_type) VALUES (${idx + 1}, '${areaType.area_type}')`)
  })
}

const loadCustomers = async (oltpClient, olapClient) => {
  const oltpCustomers = await oltpClient.query(`
    SELECT *
    FROM person
    WHERE NOT EXISTS (
      SELECT 1
      FROM delivery_order
      WHERE delivery_order.delivery_person_id = person.person_id
    );
  `);
  
  oltpCustomers.rows.forEach((customer, idx) => {
    olapClient.query(`INSERT INTO customer (customer_id, name, surname) VALUES (${customer.person_id}, '${customer.name}', '${customer.surname}')`)
  })
}

const loadVehicleTypes = async (oltpClient, olapClient) => {
  const oltpVehicleTypes = await oltpClient.query(`SELECT DISTINCT vehicle_type FROM delivery_order`);
  
  oltpVehicleTypes.rows.forEach((vehicleType, idx) => {
    olapClient.query(`INSERT INTO vehicle_type (vehicle_type_id, vehicle_type) VALUES (${idx + 1}, '${vehicleType.vehicle_type}')`)
  })
}

const loadDeliveryPersons = async (oltpClient, olapClient) => {
  const oltpDeliveryPersons = await oltpClient.query(`
    SELECT DISTINCT *
    FROM person
    JOIN delivery_order
    ON delivery_order.delivery_person_id = person.person_id
  `);

  oltpDeliveryPersons.rows.forEach((deliveryPerson) => {
    olapClient.query(`
      INSERT INTO delivery_person (delivery_person_id, name, surname, vehicle_type) 
      SELECT ${deliveryPerson.person_id}, '${deliveryPerson.name}', '${deliveryPerson.surname}', 
      (SELECT vehicle_type_id FROM vehicle_type WHERE vehicle_type = '${deliveryPerson.vehicle_type}')
      WHERE NOT EXISTS (
        SELECT 1
        FROM delivery_person
        WHERE delivery_person_id = ${deliveryPerson.person_id}
      )
    `);
  })
}

const loadOrderTypes = async (oltpClient, olapClient) => {
  const oltpOrderTypes = await oltpClient.query(`SELECT DISTINCT type_of_order FROM customer_order`);
  
  oltpOrderTypes.rows.forEach((orderType, idx) => {
    olapClient.query(`INSERT INTO order_type (order_type_id, order_type) VALUES (${idx + 1}, '${orderType.type_of_order}')`)
  })
}

const loadRestaurants = async (oltpClient, olapClient) => {
  const oltpRestaurants = await oltpClient.query(`SELECT * FROM restaurant`);
  
  oltpRestaurants.rows.forEach((restaurant) => {
    olapClient.query(`INSERT INTO restaurant (restaurant_id, name) VALUES (${restaurant.restaurant_id}, '${restaurant.name}')`)
  })
}

const loadTrafficDensity = async (oltpClient, olapClient) => {
  const oltpTrafficDensity = await oltpClient.query(`SELECT DISTINCT traffic_density FROM delivery_report`);
  
  oltpTrafficDensity.rows.forEach((trafficDensity, idx) => {
    olapClient.query(`INSERT INTO traffic_density (traffic_density_id, traffic_density) VALUES (${idx + 1}, '${trafficDensity.traffic_density}')`)
  })
}

const loadDateTime = async (oltpClient, olapClient) => {
  const oltpCustomerDateTime = await oltpClient.query(`SELECT creation_date FROM customer_order`);
  const oltpDeliveryDateTime = await oltpClient.query(`SELECT creation_date, update_date FROM delivery_order`);
  const oltpOrderPickedDateTime = await oltpClient.query(`SELECT time_order_picked FROM delivery_report`);
  const resultDateTime = oltpCustomerDateTime.rows.map((dateTime) => dateTime.creation_date)
  resultDateTime.push(...oltpDeliveryDateTime.rows.map((dateTime) => dateTime.creation_date))
  resultDateTime.push(...oltpDeliveryDateTime.rows.map((dateTime) => dateTime.update_date))
  resultDateTime.push(...oltpOrderPickedDateTime.rows.map((dateTime) => dateTime.time_order_picked))

  const transformedResultDateTime = resultDateTime.map((dateTime) => {
    const hour = dateTime.toISOString().split(':')[0].split('T')[1]
    const day = dateTime.toISOString().split('-')[2].split('T')[0]
    const month = dateTime.toISOString().split('-')[1]
    let year_quarter;
    const year = dateTime.toISOString().split('-')[0]

    if(+month < 4) {
      year_quarter = '1'
    } else if (+month < 7) {
      year_quarter = '2'
    } else if (+month < 10) {
      year_quarter = '3'
    } else {
      year_quarter = '4'
    }

    return {
      full_date: dateTime,
      hour,
      day,
      month,
      year_quarter,
      year,
    }
  })
  
  transformedResultDateTime.forEach((dateTime, idx) => {
    olapClient.query(`INSERT INTO date_time (date_time_id, full_date, hour, day, month, year_quarter, year) VALUES (${idx + 1}, '${dateTime.full_date.toISOString()}', '${dateTime.hour}', '${dateTime.day}', '${dateTime.month}', '${dateTime.year_quarter}', '${dateTime.year}')`)
  })
}

const loadOrderCreation = async (oltpClient, olapClient) => {
  const oltpOrderCreation = await oltpClient.query(`
    SELECT customer_order.creation_date AS order_creation_date, customer_order.*, restaurant.*, restaurant_address.*, address.*
    FROM customer_order
    JOIN restaurant ON restaurant.restaurant_id = customer_order.restaurant_id
    JOIN restaurant_address ON restaurant_address.restaurant_id = restaurant.restaurant_id
    JOIN address ON address.address_id = restaurant_address.address_id;
  `);
  
  oltpOrderCreation.rows.forEach(async (customerOrder) => {
    console.log('customerOrder: ', customerOrder)
    await olapClient.query(`
      INSERT INTO fact_order_creation (price, order_type, customer, city, date_time, restaurant_id) 
      SELECT 
        ${customerOrder.price}, 
        (SELECT order_type_id FROM order_type WHERE order_type = '${customerOrder.type_of_order}'),
        ${customerOrder.customer_id},
        ${customerOrder.city},
        (SELECT date_time_id FROM date_time WHERE full_date = '${customerOrder.order_creation_date.toISOString()}'),
        ${customerOrder.restaurant_id}
      WHERE EXISTS (
        SELECT 1 FROM customer WHERE customer_id = ${customerOrder.customer_id}
      );
    `)
  })
}

const loadOrderDelivery = async (oltpClient, olapClient) => {
  // INDEX
  const oltpOrderDelivery = await oltpClient.query(`
    SELECT 
      delivery_order.update_date as delivery_order_update_date, 
      customer_order.price as customer_order_price,
      customer_order.customer_id,
      customer_order.restaurant_id,
      restaurant_address.address_id as restaurant_address_id,
      delivery_address.address_id as delivery_address_id,
      delivery_order.*,
      delivery_report.*
    FROM delivery_order
    JOIN delivery_report
    ON delivery_report.delivery_report_id = delivery_order.delivery_order_id
    JOIN restaurant_order
    ON restaurant_order.delivery_order_id = delivery_order.delivery_order_id
    JOIN customer_order
    ON customer_order.customer_order_id = restaurant_order.customer_order_id
    JOIN restaurant_address
    ON restaurant_address.restaurant_id = customer_order.restaurant_id
    JOIN delivery_address
    ON delivery_address.delivery_order_id = delivery_order.delivery_order_id
  `);
  
  for (const deliveryOrder of oltpOrderDelivery.rows) {
    console.log('deliveryOrder: ', deliveryOrder.time_order_picked.toISOString());
    
    // Check if the customer exists
    const customerExistsQuery = `SELECT COUNT(*) AS count FROM customer WHERE customer_id = ${deliveryOrder.customer_id}`;
    const customerExistsResult = await olapClient.query(customerExistsQuery);
    const customerExists = customerExistsResult.rows[0].count > 0;
    
    if (customerExists) {
      await olapClient.query(`
        INSERT INTO fact_order_delivery (
          order_price, 
          delivery_price, 
          time_duration, 
          customer, 
          area_type, 
          to_address,
          from_address,
          delivery_person,
          restaurant,
          order_picked,
          order_completed,
          traffic_density
        ) VALUES (
          ${deliveryOrder.customer_order_price}, 
          ${deliveryOrder.price},
          ${deliveryOrder.time_taken},
          ${deliveryOrder.customer_id},
          (SELECT area_type_id FROM area_type WHERE area_type = '${deliveryOrder.area_type}'),
          ${deliveryOrder.delivery_address_id},
          ${deliveryOrder.restaurant_address_id},
          ${deliveryOrder.delivery_person_id},
          ${deliveryOrder.restaurant_id},
          (SELECT date_time_id FROM date_time WHERE full_date = '${deliveryOrder.time_order_picked.toISOString()}' LIMIT 1),
          (SELECT date_time_id FROM date_time WHERE full_date = '${deliveryOrder.delivery_order_update_date.toISOString()}' LIMIT 1),        
          (SELECT traffic_density_id FROM traffic_density WHERE traffic_density = '${deliveryOrder.traffic_density}')
        )
      `);
    }
  }
}

const loadOrderCreationNumberOfOrders = async (oltpClient, olapClient) => {
  console.log('here: ')
  const olapCustomers = await olapClient.query(`
    SELECT * FROM customer
  `);

  const compareDates = (a, b) => {
    const dateA = new Date(a.full_date);
    const dateB = new Date(b.full_date);
    
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  };

  for (const customer of olapCustomers.rows) {
    // INDEX
    const olapCustomerOrderCreations = await olapClient.query(`
      SELECT date_time.full_date, fact_order_creation.date_time FROM fact_order_creation
      JOIN date_time
      ON date_time.date_time_id = fact_order_creation.date_time
      WHERE fact_order_creation.customer = '${customer.customer_id}'
    `);

    const sortedOrders = olapCustomerOrderCreations.rows.sort(compareDates);

    for (const [idx, orderCreation] of sortedOrders.entries()) {
      await olapClient.query(`
        UPDATE fact_order_creation
        SET number_of_orders = ${idx}
        WHERE date_time = ${orderCreation.date_time}
      `);
    }
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

const loadOrderDeliveryDistanceKms = async (oltpClient, olapClient) => {
  const olapOrderDelivery = await olapClient.query(`
    SELECT
      from_address_info.latitude as from_address_info_latitude,
      from_address_info.longtitude as from_address_info_longtitude,
      to_address_info.latitude as to_address_info_latitude,
      to_address_info.longtitude as to_address_info_longtitude,
      fact_order_delivery.from_address,
      fact_order_delivery.to_address,
      fact_order_delivery.order_picked
    FROM
      fact_order_delivery
    JOIN
      address AS from_address_info ON fact_order_delivery.from_address = from_address_info.address_id
    JOIN
     address AS to_address_info ON fact_order_delivery.to_address = to_address_info.address_id;
  `);

  olapOrderDelivery.rows.forEach((orderDelivery) => {
    console.log('distance')
    const distanceKms = calculateDistance(
      orderDelivery.from_address_info_latitude, 
      orderDelivery.from_address_info_longtitude,
      orderDelivery.to_address_info_latitude,
      orderDelivery.to_address_info_longtitude
    ) / 1000;

    // INDEX
    olapClient.query(`
      UPDATE fact_order_delivery
      SET distance_kms = ${distanceKms}
      WHERE from_address = ${orderDelivery.from_address} 
      AND to_address = ${orderDelivery.to_address} 
      AND order_picked = ${orderDelivery.order_picked}
    `)
  })
};

export const uploadOlap = async () => {
  const oltpClient = await oltpPool.connect();
  const olapClient = await olapPool.connect();

  try {
    await olapClient.query('BEGIN');

    await clearOlap(olapClient);

    await loadCity(oltpClient, olapClient)
    console.log('1')
    await loadAddress(oltpClient, olapClient)
    console.log('2')
    await loadAreaTypes(oltpClient, olapClient)
    console.log('3')
    await loadCustomers(oltpClient, olapClient)
    console.log('4')
    await loadVehicleTypes(oltpClient, olapClient)
    console.log('5')
    await loadDeliveryPersons(oltpClient, olapClient)
    console.log('6')
    await loadOrderTypes(oltpClient, olapClient)
    console.log('7')
    await loadRestaurants(oltpClient, olapClient)
    console.log('8')
    await loadTrafficDensity(oltpClient, olapClient)
    console.log('9')
    await loadDateTime(oltpClient, olapClient)
    console.log('10')
    await loadOrderCreation(oltpClient, olapClient)
    console.log('12')
    await loadOrderDelivery(oltpClient, olapClient)
    console.log('Succesfully inserted data!')

    await olapClient.query('COMMIT');
    console.log('Comitted1!')

    /////////////////////////////

    await olapClient.query('BEGIN');

    await loadOrderCreationNumberOfOrders(oltpClient, olapClient)
    console.log('13')
    await loadOrderDeliveryDistanceKms(oltpClient, olapClient)
    console.log('14')

    await olapClient.query('COMMIT');
    console.log('Comitted2!')
  } catch (error) {
    await olapClient.query('ROLLBACK');
    console.error('Error:', error);
  } finally {
    // Release the client back to the pool
    oltpClient.release();
    olapClient.release();
    // End the pool
    await oltpPool.end();
    await olapPool.end();
  }
}

// uploadOlap();
