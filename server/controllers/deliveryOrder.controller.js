import DeliveryOrder from "../models/delivery_order.js";
import DeliveryReport from "../models/delivery_report.js";
import RestaurantOrder from "../models/restaurant_order.js";
import Address from "../models/address.js";
import DeliveryAddress from "../models/delivery_address.js";;

export const getDeliveryOrderInfo = async (req, res) => {
  const deliveryReportInfo = await DeliveryOrder.findAll({
    include: [
      'DeliveryReport',
      'Person',
      {
        model: DeliveryAddress,
        required: false,
        include: [
          {
            model: Address,
            required: false,
            include: ['City']
          },
        ]
      },
      {
        model: RestaurantOrder,
        required: false,
        include: ['Restaurant']
      },
    ],
    order: [['delivery_order_id', 'ASC']] 
  });

  res.status(200).send(deliveryReportInfo);
}

export const getDeliveryOrderInfoById = async (req, res) => {
  const { id } = req.params;

  const deliveryReportInfo = await DeliveryOrder.findAll({
    where: {
      delivery_order_id: id
    },
    include: [
      'DeliveryReport',
      'Person',
      {
        model: DeliveryAddress,
        required: false,
        include: [
          {
            model: Address,
            required: false,
            include: ['City']
          },
        ]
      },
      {
        model: RestaurantOrder,
        required: false,
        include: ['Restaurant', 'CustomerOrder']
      },
    ],
  });

  res.status(200).send(deliveryReportInfo);
}

export const getVehicleType = async (req, res) => {
  const deliveryOrderInfo = await DeliveryOrder.findAll({
    attributes: ['vehicle_type']
  });

  const uniqueVehicleTypes = [...new Set(
    deliveryOrderInfo.map((order) => order.vehicle_type)
  )]

  res.status(200).send(uniqueVehicleTypes);
}

export const getDeliveryPerson = async (req, res) => {
  const deliveryOrderInfo = await DeliveryOrder.findAll({
    include: ['Person']
  });

  const uniqueDeliveryPersonMap = new Map();
  deliveryOrderInfo.forEach(order => {
    uniqueDeliveryPersonMap.set(order.Person.person_id, order.Person);
  });

  const uniqueDeliveryPerson = Array.from(uniqueDeliveryPersonMap.values());

  res.status(200).send(uniqueDeliveryPerson);
}

export const createDeliveryOrder = async (req, res) => {
  const deliveryOrder = req.body;

  const deliveryOrderResponse = await DeliveryOrder.create({
    delivery_person_id: deliveryOrder.delivery_person_id,
    price: deliveryOrder.price,
    vehicle_type: deliveryOrder.vehicle_type,
    creation_date: deliveryOrder.creation_date,
    update_date: deliveryOrder.creation_date,
  });

  const restaurantOrderResponse = await RestaurantOrder.create({
    restaurant_id: deliveryOrder.restaurant_id,
    delivery_order_id: deliveryOrderResponse.delivery_order_id,
    customer_order_id: deliveryOrder.customer_order_id,
    creation_date: deliveryOrder.creation_date,
    update_date: deliveryOrder.creation_date,
    status: deliveryOrder.status
  });

  let deliveryReportResponse;
  if (deliveryOrder.shouldReportBeCreated) {
    const orderPickedDate = new Date(deliveryOrder.time_order_picked);
    orderPickedDate.setMinutes(orderPickedDate.getMinutes() + +deliveryOrder.time_taken);
    const formattedUpdateDate = `${orderPickedDate.getFullYear()}-${String(orderPickedDate.getMonth() + 1).padStart(2, '0')}-${String(orderPickedDate.getDate()).padStart(2, '0')}T${String(orderPickedDate.getHours()).padStart(2, '0')}:${String(orderPickedDate.getMinutes()).padStart(2, '0')}`;

    deliveryReportResponse = await DeliveryReport.create({
      delivery_order_id: deliveryOrderResponse.delivery_order_id,
      time_order_picked: deliveryOrder.time_order_picked,
      time_taken: deliveryOrder.time_taken,
      traffic_density: deliveryOrder.traffic_density,
      area_type: deliveryOrder.area_type,
      creation_date: deliveryOrder.creation_date,
      update_date: formattedUpdateDate,
    });
  }

  res.status(200).send({
    deliveryOrderResponse,
    restaurantOrderResponse,
    deliveryReportResponse,
  });
}

export const updateDeliveryOrder = async (req, res) => {
  const { id } = req.params;
  const deliveryOrder = req.body;

  if(!id) {
    res.status(400).send('Missing id');
    return;
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const deliveryOrderResponse = await DeliveryOrder.update(
    {
      delivery_person_id: deliveryOrder.delivery_person_id,
      price: deliveryOrder.price,
      vehicle_type: deliveryOrder.vehicle_type,
      update_date: formattedDate,
    },
    {
      where: {
        delivery_order_id: id
      }
    }
  );

  const restaurantOrderResponse = await RestaurantOrder.update(
    {
      restaurant_id: deliveryOrder.restaurant_id,
      customer_order_id: deliveryOrder.customer_order_id,
      update_date: formattedDate,
      status: deliveryOrder.status
    },
    {
      where: {
        delivery_order_id: id
      }
    }
  );

  let deliveryReportResponse;
  if (deliveryOrder.shouldReportBeCreated) {
    const existingDeliveryReport = await DeliveryReport.findAll({
      where: {
        delivery_order_id: id,
      }
    })

    if (existingDeliveryReport.length) {
      deliveryReportResponse = await DeliveryReport.update(
        {
          time_order_picked: deliveryOrder.time_order_picked,
          time_taken: deliveryOrder.time_taken,
          traffic_density: deliveryOrder.traffic_density,
          area_type: deliveryOrder.area_type,
          update_date: formattedDate,
        },
        {
          where: {
            delivery_report_id: existingDeliveryReport[0].delivery_report_id
          }
        }
      );
    } else {
      const orderPickedDate = new Date(deliveryOrder.time_order_picked);
      orderPickedDate.setMinutes(orderPickedDate.getMinutes() + +deliveryOrder.time_taken);
      const formattedUpdateDate = `${orderPickedDate.getFullYear()}-${String(orderPickedDate.getMonth() + 1).padStart(2, '0')}-${String(orderPickedDate.getDate()).padStart(2, '0')}T${String(orderPickedDate.getHours()).padStart(2, '0')}:${String(orderPickedDate.getMinutes()).padStart(2, '0')}`;

      deliveryReportResponse = await DeliveryReport.create({
        delivery_order_id: id,
        time_order_picked: deliveryOrder.time_order_picked,
        time_taken: deliveryOrder.time_taken,
        traffic_density: deliveryOrder.traffic_density,
        area_type: deliveryOrder.area_type,
        creation_date: deliveryOrder.creation_date,
        update_date: formattedUpdateDate,
      });
    }
  } else {
    deliveryReportResponse = await DeliveryReport.destroy({
      where: {
        delivery_order_id: id
      }
    })
  }

  res.status(200).send({
    deliveryOrderResponse,
    restaurantOrderResponse,
    deliveryReportResponse,
  });
}

export const deleteDeliveryOrder = async (req, res) => {
  const { id } = req.params;

  if(!id) {
    res.status(400).send('Missing id');
    return;
  }

  await DeliveryAddress.destroy({
    where: {
      delivery_order_id: id,
    }
  })

  await DeliveryReport.destroy({
    where: {
      delivery_order_id: id,
    }
  })

  await RestaurantOrder.destroy({
    where: {
      delivery_order_id: id,
    }
  })

  await DeliveryOrder.destroy({
    where: {
      delivery_order_id: id,
    }
  })

  res.status(200).send('Success');
}

