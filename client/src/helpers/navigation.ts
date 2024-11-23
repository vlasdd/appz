export const getIdForNavigation = (id: string) => {
  if(id.startsWith('#')) {
    return id.slice(1, id.length);
  }

  return id;
};
