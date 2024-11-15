import Restaurant from "../models/restaurant.js";

export const getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.findAll()

  res.status(200).send(restaurants);
}
