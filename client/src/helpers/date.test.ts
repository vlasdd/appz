import { formatDate } from './date'; 

describe('formatDate', () => {
  it('should format a valid date string correctly', () => {
    const input = '2022-12-18 00:00:00+00:00';
    const expectedOutput = '2022-12-18';
    expect(formatDate(input)).toBe(expectedOutput);
  });

  it('should format a date with single-digit day and month correctly', () => {
    const input = '2022-03-09 00:00:00+00:00';
    const expectedOutput = '2022-03-09';
    expect(formatDate(input)).toBe(expectedOutput);
  });

  it('should handle invalid date strings gracefully', () => {
    const input = 'invalid-date-string';
    expect(() => formatDate(input)).toThrowError();
  });

  it('should handle the current date correctly', () => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate.toISOString());
    const expectedOutput = `${currentDate.getUTCFullYear()}-${String(currentDate.getUTCMonth() + 1).padStart(2, '0')}-${String(currentDate.getUTCDate()).padStart(2, '0')}`;
    expect(formattedDate).toBe(expectedOutput);
  });
});
