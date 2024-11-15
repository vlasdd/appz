import olapSequelize from "../config/olapDb.js";

export const generateOlapCubeOrderCreationQuery = async ({
  selectedFirstDimension,
  selectedSecondDimension,
  selectedMetric,
}) => {
  const [secondDimensionFirstPart, secondDimensionSecondPart] = selectedSecondDimension.split('.');

  const subqueryResult = await olapSequelize.query(`
    SELECT DISTINCT ${secondDimensionSecondPart} FROM ${secondDimensionFirstPart};
  `)

  let selectSubquery = subqueryResult[0].reduce((result, elem) => {
    result += `COALESCE("${Object.values(elem)[0]}", 0) AS "${Object.values(elem)[0]}",\n`
    return result;
  }, 'SELECT " ",\n')

  subqueryResult[0].forEach((elem, idx) => {
    selectSubquery += `COALESCE("${Object.values(elem)[0]}", 0)`
    selectSubquery += idx !== subqueryResult[0].length - 1 ? ' + ' : ' AS total'
  })

  let secondSelectSubquery = ') AS ct (" " TEXT, ';

  subqueryResult[0].forEach((elem, idx) => {
    secondSelectSubquery += `"${Object.values(elem)[0]}" INTEGER`;
    secondSelectSubquery += idx !== subqueryResult[0].length - 1 ? ', ' : ');'
  })

  // INDEX
  return `
    ${selectSubquery}
    FROM crosstab(
     'SELECT 
      ${selectedFirstDimension} AS category,
      ${selectedSecondDimension} AS year,
      SUM(CAST(${selectedMetric} AS INTEGER)) AS total
      FROM fact_order_creation
      JOIN order_type ON order_type.order_type_id = fact_order_creation.order_type
      JOIN date_time ON fact_order_creation.date_time = date_time.date_time_id
      GROUP BY ${selectedFirstDimension}, ${selectedSecondDimension}
      ORDER BY ${selectedFirstDimension}, ${selectedSecondDimension}',
      'SELECT DISTINCT ${secondDimensionSecondPart} FROM ${secondDimensionFirstPart} ORDER BY ${secondDimensionSecondPart}'
    ${secondSelectSubquery}
  `;
}

export const generateOlapCubeOrderDeliveryQuery = async ({
  selectedFirstDimension,
  selectedSecondDimension,
  selectedMetric,
}) => {
  const [secondDimensionFirstPart, secondDimensionSecondPart] = selectedSecondDimension.split('.');

  const subqueryResult = await olapSequelize.query(`
    SELECT DISTINCT ${secondDimensionSecondPart} FROM ${secondDimensionFirstPart};
  `)

  let selectSubquery = subqueryResult[0].reduce((result, elem) => {
    result += `ROUND("${Object.values(elem)[0]}") AS "${Object.values(elem)[0]}",\n`
    return result;
  }, 'SELECT category AS " ",\n')

  selectSubquery += 'ROUND(('
  subqueryResult[0].forEach((elem, idx) => {
    selectSubquery += `"${Object.values(elem)[0]}"`
    selectSubquery += idx !== subqueryResult[0].length - 1 ? ' + ' : ')'
  })
  selectSubquery += ` / ${subqueryResult[0].length}) AS "Average"`

  let secondSelectSubquery = '\'VALUES';

  subqueryResult[0].forEach((elem, idx) => {
    secondSelectSubquery += `(\'\'${Object.values(elem)[0]}\'\')`;
    secondSelectSubquery += idx !== subqueryResult[0].length - 1 ? ', ' : '\'\n'
  })

  secondSelectSubquery += ') AS ct ( category TEXT, '
  subqueryResult[0].forEach((elem, idx) => {
    secondSelectSubquery += `"${Object.values(elem)[0]}" FLOAT`;
    secondSelectSubquery += idx !== subqueryResult[0].length - 1 ? ', ' : ');'
  })

  // INDEX
  return `
    ${selectSubquery}
    FROM crosstab(
   'SELECT 
     ${selectedFirstDimension} AS category,
     ${selectedSecondDimension} AS density,
     AVG(${selectedMetric}) AS avg_duration
     FROM fact_order_delivery
     JOIN delivery_person ON delivery_person.delivery_person_id = fact_order_delivery.delivery_person
     JOIN vehicle_type ON vehicle_type.vehicle_type_id = delivery_person.vehicle_type
     JOIN traffic_density ON traffic_density.traffic_density_id = fact_order_delivery.traffic_density
     JOIN address ON fact_order_delivery.from_address = address.address_id
     JOIN city ON address.city = city.city_id
     JOIN area_type ON fact_order_delivery.area_type = area_type.area_type_id
     GROUP BY ${selectedFirstDimension}, ${selectedSecondDimension}
     ORDER BY ${selectedFirstDimension}, ${selectedSecondDimension}',
     ${secondSelectSubquery}
  `;
}
