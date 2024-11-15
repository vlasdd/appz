import Address from "../models/address.js";
import CustomerOrder from "../models/customer_order.js"
import Restaurant from "../models/restaurant.js";
import RestaurantAddress from "../models/restaurant_address.js";
import RestaurantOrder from '../models/restaurant_order.js';

export const getCustomerOrderInfo = async (req, res) => {
  const customerOrderInfo = await CustomerOrder.findAll({
    include: [
      'Person',
      {
        model: Restaurant,
        required: false,
        include: [
          {
            model: RestaurantAddress,
            required: false,
            include: {
              model: Address,
              required: false,
              include: ['City']
            }
          }
        ]
      }
    ],
    order: [['customer_order_id', 'ASC']] 
  })

  res.status(200).send(customerOrderInfo);
}

export const getCustomerOrderInfoById = async (req, res) => {
  const { id } = req.params;

  const customerOrderInfo = await CustomerOrder.findAll({
    where: {
      customer_order_id: id
    },
    include: [
      'Person',
      {
        model: Restaurant,
        required: false,
        include: [
          {
            model: RestaurantAddress,
            required: false,
            include: {
              model: Address,
              required: false,
              include: ['City']
            }
          }
        ]
      }
    ]
  })

  res.status(200).send(customerOrderInfo);
}

export const getCustomers = async (req, res) => {
  const customerOrderInfo = await CustomerOrder.findAll({
    include: ['Person']
  });

  const uniqueCustomersMap = new Map();
  customerOrderInfo.forEach(order => {
    uniqueCustomersMap.set(order.Person.person_id, order.Person);
  });

  const uniqueCustomers = Array.from(uniqueCustomersMap.values());

  res.status(200).send(uniqueCustomers);
}

export const getTypeOfOrder = async (req, res) => {
  const customerOrderInfo = await CustomerOrder.findAll({
    attributes: ['type_of_order']
  })

  const typeOfOrderInfo = customerOrderInfo.map((order) => order.type_of_order)

  res.status(200).send([...new Set(typeOfOrderInfo)]);
}

export const getStatus = async (req, res) => {
  const customerOrderInfo = await CustomerOrder.findAll({
    attributes: ['status']
  })

  const statusInfo = customerOrderInfo.map((order) => order.status)

  res.status(200).send([...new Set(statusInfo)]);
}

export const createCustomerOrder = async (req, res) => {
  const customerOrder = req.body;

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const response = await CustomerOrder.create({
    ...customerOrder,
    status: 'Pending',
    creation_date: formattedDate,
    update_date: formattedDate,
  });

  res.status(200).send(response);
}

export const updateCustomerOrder = async (req, res) => {
  const { id } = req.params;
  const customerOrder = req.body;

  if(!id) {
    res.status(400).send('Missing id');
    return;
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const response = await CustomerOrder.update(
    {
      ...customerOrder,
      update_date: formattedDate,
    },
    {
      where: {
        customer_order_id: id
      }
    }
  );

  res.status(200).send(response);
}

export const deleteCustomerOrder = async (req, res) => {
  const { id } = req.params;

  if(!id) {
    res.status(400).send('Missing id');
    return;
  }

  await RestaurantOrder.destroy({
    where: {
      customer_order_id: id,
    }
  })

  await CustomerOrder.destroy({
    where: {
      customer_order_id: id,
    }
  })

  res.status(200).send('Success');
}
