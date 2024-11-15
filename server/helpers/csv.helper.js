import { createObjectCsvStringifier } from 'csv-writer';

export const generateCsvData = (header, data) => {
  const csvStringifier = createObjectCsvStringifier({
    header
  });
  return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);
}
