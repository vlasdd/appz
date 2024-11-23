import { useTaskStatistics } from './useTaskStatistics';

describe('useTaskStatistics', () => {
  it('should throw an error if id is not provided', () => {
    expect(() => useTaskStatistics()).toThrowError('Id is required');
  });

  it('should return the correct taskStatistics object with all fields as numbers', () => {
    const { taskStatistics } = useTaskStatistics('123');

    expect(taskStatistics).toHaveProperty('oneToThreeRating');
    expect(taskStatistics).toHaveProperty('fourToSixRating');
    expect(taskStatistics).toHaveProperty('SevenToNineRating');
    expect(taskStatistics).toHaveProperty('TenToElevenRating');
    expect(taskStatistics).toHaveProperty('TwelweRating');

    expect(typeof taskStatistics.oneToThreeRating).toBe('number');
    expect(typeof taskStatistics.fourToSixRating).toBe('number');
    expect(typeof taskStatistics.SevenToNineRating).toBe('number');
    expect(typeof taskStatistics.TenToElevenRating).toBe('number');
    expect(typeof taskStatistics.TwelweRating).toBe('number');
  });
});
