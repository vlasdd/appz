import olapSequelize from '../config/olapDb.js';
import { generateCsvData } from "../helpers/csv.helper.js";
import { uploadOlap } from "../services/etl.service.js";
import { generateOlapCubeOrderCreationQuery, generateOlapCubeOrderDeliveryQuery } from "../services/olapCube.service.js";
import { uploadOltp } from "../services/oltpUpload.service.js";

export const uploadOltpFromDatasets = async (req, res) => {
  await uploadOltp()
  res.status(200).send('Success');
}

export const runEtl = async (req, res) => {
  await uploadOlap()
  res.status(200).send('Success');
}

export const generateOlapCube = async (req, res) => {
  const { selectedFact, ...olapData } = req.body;

  let query;

  if(selectedFact === 'fact_order_creation') {
    query = await generateOlapCubeOrderCreationQuery(olapData)
  } else {
    query = await generateOlapCubeOrderDeliveryQuery(olapData)
  }

  const result = await olapSequelize.query(query);

  const header = Object.keys(result[0][0])
  .filter((headerName) => headerName !== ' ')
  .map((item) => ({ id: item, title: item }))

  header.unshift({ id: ' ', title: ' ' });

  const csvData = generateCsvData(header, result[0]);

  res.set('Content-Type', 'text/csv');
  res.attachment('data.csv');
  res.send(csvData);
}

