export enum FactOptions {
  Creation = 'fact_order_creation',
  Delivery = 'fact_order_delivery',
}

export type FactOptionsKey = keyof typeof FactOptions;

enum CreationDimensionsOptions {
  'Order Type' = 'order_type.order_type',
  'Date Time Year' = 'date_time.year',
  'Date Time Quarter' = 'date_time.year_quarter'
}

enum DeliveryDimensionsOptions {
  'Vehicle Type' = 'vehicle_type.vehicle_type',
  'Traffic Density' = 'traffic_density.traffic_density',
  'Area Type' = 'area_type.area_type',
  'Restaurant Address City' = 'city.city'
}

export type DimensionOptionsKey = keyof typeof DeliveryDimensionsOptions & keyof typeof CreationDimensionsOptions;

export const DimensionOptions = {
  [FactOptions.Creation]: CreationDimensionsOptions,
  [FactOptions.Delivery]: DeliveryDimensionsOptions,
}

enum CreationMetricsOptions {
  'Order Price' = 'fact_order_creation.price',
  'Number of Orders' = 'fact_order_creation.number_of_orders',
}

enum DeliveryMetricsOptions {
  'Delivery Duration' = 'fact_order_delivery.time_duration',
  'Delivery Price' = 'fact_order_delivery.delivery_price',
}

export type MetricOptionsKey = keyof typeof DeliveryMetricsOptions & keyof typeof CreationMetricsOptions;

export const MetricsOptions = {
  [FactOptions.Creation]: CreationMetricsOptions,
  [FactOptions.Delivery]: DeliveryMetricsOptions,
}

