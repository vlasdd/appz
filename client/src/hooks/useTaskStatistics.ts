export const useTaskStatistics = (id?: string) => {
  if(!id) {
    throw new Error('Id is required');
  }

  return {
    taskStatistics: {
      oneToThreeRating: 4,
      fourToSixRating: 1,
      SevenToNineRating: 6,
      TenToElevenRating: 8,
      TwelweRating: 10,
    }
  }
}