import { ContactsCollections } from '../db/models/Contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getAllContacts = async ({ page = 1, perPage = 10 }) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contacts = await ContactsCollections.find().skip(skip).limit(limit);
  const total = await ContactsCollections.countDocuments();
  const paginationData = calcPaginationData({ total, page, perPage });
  return {
    contacts,
    total,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollections.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollections.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollections.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollections.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
