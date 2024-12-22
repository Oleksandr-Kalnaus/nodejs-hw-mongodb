const sortOrderList = ['asc', 'desc'];

export const parseSortParams = ({ sortBy, sortOrder }, sortByList) => {
  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
  const pardesSortBy = sortByList.includes(sortBy) ? sortBy : 'createdAt';
  return {
    sortBy: pardesSortBy,
    sortOrder: parsedSortOrder,
  };
};
