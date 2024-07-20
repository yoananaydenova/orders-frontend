export const deleteObjectFromArray = (array, obj) => {
  const index = array.indexOf(obj);
  if (index !== -1) {
    array.splice(index, 1);
  }
};

export const sortOptionsByName = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};
