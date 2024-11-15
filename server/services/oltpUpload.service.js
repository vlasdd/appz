import fs from 'fs'
import pkg from 'pg';
const { Pool } = pkg;

// Create a pool
export const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'sd',
  password: 'password',
  port: 5432, // default PostgreSQL port
});

export const clearOltp = async (client) => {
  try {
    const tables = [
      'delivery_address',
      'restaurant_address',
      'address',
      'city',
      'person_email',
      'person_phone_number',
      'restaurant_phone_number',
      'phone_number',
      'email',
      'delivery_report',
      'restaurant_order',
      'delivery_order',
      'customer_order',
      'restaurant',
      'person'
    ];

    for (const table of tables) {
      await client.query(`TRUNCATE TABLE ${table} CASCADE`);
      console.log(table + ' table truncated');
    }
  } catch (error) {
    console.error('Error clearing oltp:', error);
  }
}

const loadCSVData = (path = '../../сд/lab03/головний/train.csv', maxNumOfLines = 9999) => {
  return new Promise((resolve, reject) => {
    let data = '';
    
    const stream = fs.createReadStream(path, { encoding: 'utf8' });

    stream.on('data', chunk => {
      data += chunk;
      const lines = data.split('\n');
      if (lines.length > maxNumOfLines) {
        stream.destroy();
        resolve(lines.slice(0, maxNumOfLines + 1).join('\n'));
      }
    });

    stream.on('error', err => {
      reject(err);
    });

    stream.on('end', () => {
      resolve(data);
    });
  });
};

const insertDataIntoCityTable = async (client) => {
  try {
    const data = await loadCSVData('../../сд/lab03/cities/cities.csv');
    const rows = data.trim().split('\n');

    const header = rows.shift();

    let id = 1;

    for (const row of rows) {
      const city = row.trim().split(',')[1];
      const date = new Date().toISOString()

      const insertQuery = `INSERT INTO city (city_id, city, creation_date, update_date) VALUES (${id}, '${city}', '${date}', '${date}')`;
      console.log('insertQuery: ', insertQuery)

      client.query(insertQuery);
      
      id++;
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const insertDataIntoPersonAndEmailTables = async (client) => {
  try {
    const data = await loadCSVData('../../сд/lab03/users.csv', 20000);
    const rows = data.trim().split('\n');

    const header = rows.shift();

    let id = 1;

    for (const row of rows) {
      const name = row.trim().split(',')[1];
      const surname = row.trim().split(',')[2];
      const email = row.trim().split(',')[3];
      const date = new Date().toISOString()

      const personInsertQuery = `INSERT INTO person (person_id, name, surname, creation_date, update_date) VALUES (${id}, '${name}', '${surname}', '${date}', '${date}')`;
      const emailInsertQuery = `INSERT INTO email (email_id, email, creation_date, update_date) VALUES (${id}, '${email}', '${date}', '${date}')`;
      const personEmailInsertQuery = `INSERT INTO person_email (person_id, email_id, creation_date, update_date) VALUES (${id}, ${id}, '${date}', '${date}')`;
      
      console.log('insertQuery: ', id, personInsertQuery, emailInsertQuery, personEmailInsertQuery)

      await client.query(personInsertQuery);
      await client.query(emailInsertQuery);
      await client.query(personEmailInsertQuery);
      
      id++;
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const insertDataIntoRestaurantsTable = async (client) => {
  try {
    const data = await loadCSVData('../../сд/lab03/restaurants.csv');
    const rows = data.trim().split('\n');

    const header = rows.shift();

    let id = 1;

    for (const row of rows) {
      const name = row.trim().split(',')[1].replaceAll('\'', '');
      const date = new Date().toISOString()

      const insertQuery = `INSERT INTO restaurant (restaurant_id, name, creation_date, update_date) VALUES (${id}, '${name}', '${date}', '${date}')`;
      console.log('insertQuery: ', insertQuery)

      client.query(insertQuery);
      
      id++;
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const insertDataIntoPhoneNumberTable = async (client) => {
  try {
    for(let i = 1; i < 29552; i++) {
      const areaCode = Math.floor(Math.random() * 900) + 100;
      const prefix = Math.floor(Math.random() * 900) + 100;
      const lineNumber = Math.floor(Math.random() * 9000) + 1000;
    
      const phoneNumber = `${areaCode}-${prefix}-${lineNumber}`;

      const date = new Date().toISOString()

      const insertPhoneNumberQuery = `INSERT INTO phone_number (phone_number_id, phone_number, creation_date, update_date) VALUES (${i}, '${phoneNumber}', '${date}', '${date}')`;

      console.log('insertQuery: ', insertPhoneNumberQuery)

      await client.query(insertPhoneNumberQuery);

      if(i <= 20000) {
        const insertPersonPhoneNumberQuery = `INSERT INTO person_phone_number (person_id, phone_number_id, creation_date, update_date) VALUES (${i}, '${i}', '${date}', '${date}')`;
        await client.query(insertPersonPhoneNumberQuery);
      } else {
        const restaurantId = i - 20000;
        const insertRestaurantPhoneNumberQuery = `INSERT INTO restaurant_phone_number (restaurant_id, phone_number_id, creation_date, update_date) VALUES (${restaurantId}, '${i}', '${date}', '${date}')`;
        await client.query(insertRestaurantPhoneNumberQuery);
      }
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const insertDataIntoCustomerOrderTable = async (client) => {
  try {
    const data = await loadCSVData('../../сд/lab03/головний/train.csv', 17000);
    const rows = data.trim().split('\n');

    const header = rows.shift();

    let id = 1;

    for (const row of rows) {
      const typeOfOrder = row.trim().split(',')[14];
      const restaurantId = Math.floor(Math.random() * 9551) + 1;
      const customerId = Math.floor(Math.random() * 17000) + 1;
      const status = id < 16980 ? 'Completed' : Math.random() < 0.5 ? 'Pending' : 'On the way';
      const price = typeOfOrder === 'Meal' ? Math.floor(Math.random() * 350) + 1 : typeOfOrder === 'Buffet' ? Math.floor(Math.random() * 250) + 1 : Math.floor(Math.random() * 100) + 1;

      const startDate = new Date('2021-01-01');
      const currentDate = new Date();
      const differenceInMilliseconds = currentDate.getTime() - startDate.getTime();
      const randomMilliseconds = Math.floor(Math.random() * differenceInMilliseconds);
      const randomDate = new Date(startDate.getTime() + randomMilliseconds).toISOString();

      const insertQuery = `INSERT INTO customer_order (customer_order_id, restaurant_id, customer_id, type_of_order, status, price, creation_date, update_date) VALUES (${id}, ${restaurantId}, ${customerId}, '${typeOfOrder}', '${status}', ${price}, '${randomDate}', '${randomDate}')`;
      console.log('insertQuery: ', insertQuery)

      client.query(insertQuery);

      id++;
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const insertDataIntoDeliveryOrderAndReportTables = async (client) => {
  try {
    const data = await loadCSVData('../../сд/lab03/головний/train.csv', 17000);
    const rows = data.trim().split('\n');

    const header = rows.shift();

    let id = 1;

    for (const row of rows) {
      const deliveryPersonId = 20000 - (Math.floor(Math.random() * 3000) + 1);
      const vehicleType = row.trim().split(',')[15];
      const deliveryPrice = Math.floor(Math.random() * 100) + 1
      const timeTaken = row.trim().split(',')[19].split(' ')[1];
      const trafficDensity = row.trim().split(',')[12] === 'NaN ' ? 'Low ' : row.trim().split(',')[12];
      const areaType = row.trim().split(',')[18] === 'NaN ' ? 'Urban ' : row.trim().split(',')[18];

      const selectQuery = `SELECT * FROM customer_order WHERE customer_order_id = ${id}`;
      const customerOrder = await client.query(selectQuery);

      const status = customerOrder.rows[0].status;
      const restaurantId = customerOrder.rows[0].restaurant_id;

      const initialDate = new Date(customerOrder.rows[0].creation_date);
      const randomMinutes = Math.floor(Math.random() * (60 - 10 + 1)) + 10;
      const randomMillisecondsToAdd = randomMinutes * 60 * 1000;
      const timeOrderPicked = new Date(initialDate.getTime() + randomMillisecondsToAdd);
      
      const initialISOString = initialDate.toISOString();
      const orderPickedISOString = timeOrderPicked.toISOString();

      const insertDeliveryOrderQuery = `INSERT INTO delivery_order (delivery_order_id, delivery_person_id, price, vehicle_type, creation_date, update_date) VALUES (${id}, ${deliveryPersonId}, ${deliveryPrice}, '${vehicleType}', '${initialISOString}', '${initialISOString}')`;
      const insertRestaurantOrderQuery = `INSERT INTO restaurant_order (restaurant_order_id, restaurant_id, delivery_order_id, customer_order_id, status, creation_date, update_date) VALUES (${id}, ${restaurantId}, ${id}, ${id}, '${status}', '${initialISOString}', '${initialISOString}')`;
      const insertDeliveryReportQuery = `INSERT INTO delivery_report (delivery_report_id, delivery_order_id, time_order_picked, time_taken, traffic_density, area_type, creation_date, update_date) VALUES (${id}, ${id}, '${orderPickedISOString}', ${timeTaken}, '${trafficDensity}', '${areaType}', '${initialISOString}', '${initialISOString}')`;

      console.log('id: ', id, insertDeliveryOrderQuery, insertRestaurantOrderQuery, insertDeliveryReportQuery)

      await client.query(insertDeliveryOrderQuery);
      await client.query(insertRestaurantOrderQuery);
      await client.query(insertDeliveryReportQuery);

      id++;
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const insertDataIntoRestaurantAddressTable = async (client) => {
  try {
    const coordsData = await loadCSVData('../../сд/lab03/головний/train.csv', 9551);
    const coordsRows = coordsData.trim().split('\n');

    const streetData = await loadCSVData('../../сд/lab03/users.csv', 17000);
    const streetRows = streetData.trim().split('\n');

    coordsRows.shift();
    streetRows.shift();

    let id = 1;

    for (const row of coordsRows) {
      const city = Math.floor(Math.random() * 50) + 1;

      const restaurantLatitude = row.trim().split(',')[4];
      const restaurantLongtitude = row.trim().split(',')[5];
      const restaurantStreetName = streetRows[id].trim().split(',')[7].replaceAll('\'', '');

      const date = new Date().toISOString()

      const firstInsertQuery = `INSERT INTO address (address_id, city, street_name, latitude, longtitude, creation_date, update_date) VALUES (${id}, ${city}, '${restaurantStreetName}', '${restaurantLatitude}', '${restaurantLongtitude}', '${date}', '${date}')`;
      const secondInsertQuery = `INSERT INTO restaurant_address (address_id, restaurant_id, creation_date, update_date) VALUES (${id}, ${id}, '${date}', '${date}')`;

      console.log('insertQuery: ', id, firstInsertQuery, secondInsertQuery)

      await client.query(firstInsertQuery);
      await client.query(secondInsertQuery);

      id ++;
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const insertDataIntoDeliveryAddressTable = async (client) => {
  try {
    const coordsData = await loadCSVData('../../сд/lab03/головний/train.csv', 17000);
    const coordsRows = coordsData.trim().split('\n');

    const streetData = await loadCSVData('../../сд/lab03/users.csv', 34000);
    const streetRows = streetData.trim().split('\n');

    coordsRows.shift();
    streetRows.shift();

    let id = 9552;

    for (const row of coordsRows) {
      const city = Math.floor(Math.random() * 50) + 1;

      const deliveryLatitude = row.trim().split(',')[6];
      const deliveryLongtitude = row.trim().split(',')[7];
      const deliveryStreetName = streetRows[id].trim().split(',')[7].replaceAll('\'', '');

      const date = new Date().toISOString()

      const firstInsertQuery = `INSERT INTO address (address_id, city, street_name, latitude, longtitude, creation_date, update_date) VALUES (${id}, ${city}, '${deliveryStreetName}', '${deliveryLatitude}', '${deliveryLongtitude}', '${date}', '${date}')`;
      const secondInsertQuery = `INSERT INTO delivery_address (address_id, delivery_order_id, creation_date, update_date) VALUES (${id}, ${id - 9551}, '${date}', '${date}')`;

      console.log('insertQuery: ', id, firstInsertQuery, secondInsertQuery)

      await client.query(firstInsertQuery);
      await client.query(secondInsertQuery);

      id ++;
    }

    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

export const uploadOltp = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await clearOltp(client);

    await insertDataIntoCityTable(client);
    await insertDataIntoPersonAndEmailTables(client);
    await insertDataIntoRestaurantsTable(client);
    await insertDataIntoPhoneNumberTable(client);
    await insertDataIntoCustomerOrderTable(client);
    await insertDataIntoDeliveryOrderAndReportTables(client);
    await insertDataIntoRestaurantAddressTable(client);
    await insertDataIntoDeliveryAddressTable(client);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error uploading OLTP:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// uploadOltp();