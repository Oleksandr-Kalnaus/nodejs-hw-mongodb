import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortByList } from './../db/models/Contacts.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import { saveFile } from '../utils/saveFile.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  filter.userId = req.user._id;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContactById(contactId, userId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;

  let photoUrl;
  if (req.file) {
    photoUrl = await saveFile(req.file);
  }

  const contactData = { ...req.body, userId, ...(photoUrl && { photoUrl }) };

  const contact = await createContact(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await deleteContact(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  let photoUrl;
  if (req.file) {
    photoUrl = await saveFile(req.file);
  }

  const updateData = { ...req.body, userId, ...(photoUrl && { photoUrl }) };

  const result = await updateContact({ _id: contactId, userId }, updateData, {
    upsert: true,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully upserted a contact!',
    data: result.contact.value,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  let photoUrl;
  if (req.file) {
    photoUrl = await saveFile(req.file);
  }

  const updateData = { ...req.body, ...(photoUrl && { photoUrl }) };

  const result = await updateContact({ _id: contactId, userId }, updateData);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact.value,
  });
};
