export const calcPaginationData = ({ total, page, perPage }) => {
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page < totalPages;
  const hasPrevPages = page > 1;

  return {
    totalPages,
    hasNextPage,
    hasPrevPages,
  };
};
