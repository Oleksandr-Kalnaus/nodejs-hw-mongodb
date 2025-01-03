import { ContactsCollections } from '../db/models/Contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = 'createdAt',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const query = { ...filter, userId };

  const data = await ContactsCollections.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const totalItems = await ContactsCollections.countDocuments(query);

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollections.findById({
    _id: contactId,
    userId,
  });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollections.create(payload);
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollections.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};

export const updateContact = async (filter, payload, options = {}) => {
  const rawResult = await ContactsCollections.findOneAndUpdate(
    filter,
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
