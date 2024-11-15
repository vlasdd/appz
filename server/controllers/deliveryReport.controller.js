import DeliveryReport from "../models/delivery_report.js";

export const getTrafficDensity = async (req, res) => {
  const deliveryReportInfo = await DeliveryReport.findAll({
   attributes: ['traffic_density']
  });

  const uniqueTrafficDensity = [...new Set(
    deliveryReportInfo.map((report) => report.traffic_density)
  )]

  res.status(200).send(uniqueTrafficDensity);
}

export const getAreaType = async (req, res) => {
  const deliveryReportInfo = await DeliveryReport.findAll({
   attributes: ['area_type']
  });

  const uniqueAreaType = [...new Set(
    deliveryReportInfo.map((report) => report.area_type)
  )]

  res.status(200).send(uniqueAreaType);
}
