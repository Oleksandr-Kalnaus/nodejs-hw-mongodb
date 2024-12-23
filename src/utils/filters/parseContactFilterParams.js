export const parseContactFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedIsFavourite =
    isFavourite === 'true' ? true : isFavourite === 'false' ? false : undefined;

  const allowedContactTypes = ['work', 'home', 'personal'];
  const parsedContactType = allowedContactTypes.includes(contactType)
    ? contactType
    : undefined;

  const filter = {};
  if (typeof parsedIsFavourite === 'boolean') {
    filter.isFavourite = parsedIsFavourite;
  }
  if (parsedContactType) {
    filter.contactType = parsedContactType;
  }

  return filter;
};
