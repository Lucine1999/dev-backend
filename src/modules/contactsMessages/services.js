import {
  createContactMessagesDB,
  getContactMessagesDB,
  deleteContactMessageDB,
} from "./db.js";

export const getContactMessages = async (req, res, next) => {
  try {
    const contactMessages = await getContactMessagesDB();
    res.json({
      data: contactMessages.data,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactMessages = async (req, res, next) => {
  try {
    const brand = req.body;

    if (res.locals.userId) {
      brand.userId = res.locals.userId;
    }

    const createdContactMessage = await createContactMessagesDB(brand);

    res.json({
      data: createdContactMessage.data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContactMessage = await deleteContactMessageDB(contactId);

    res.json({
      data: deletedContactMessage.data,
    });
  } catch (error) {
    next(error);
  }
};
