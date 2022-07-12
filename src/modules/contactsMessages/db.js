import { prisma } from "../../services/Prisma.js";

const { contact } = prisma;

export const getContactMessagesDB = async () => {
  try {
    const contactMessages = await contact.findMany();
    return {
      data: contactMessages,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const createContactMessagesDB = async (contactData) => {
  try {
    const createdContactMessage = await contact.create({
      data: contactData,
    });
    return {
      data: createdContactMessage,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error,
    };
  }
};
export const deleteContactMessageDB = async (id) => {
  try {
    const deletedContactMessage = await contact.delete({
      where: {
        id: Number(id),
      },
    });

    return {
      data: deletedContactMessage,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};
