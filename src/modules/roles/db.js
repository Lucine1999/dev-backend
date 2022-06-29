import { prisma } from "../../services/Prisma.js";

const { role } = prisma;
export const getAllRolesDB = async () => {
  try {
    const allRoles = await role.findMany();
    return {
      data: allRoles,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

export const getRoleById = async (id) => {
  try {
    const rolesbyId = await role.findUnique({
      where: {
        id,
      },
    });
    return {
      data: rolesbyId,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
    };
  }
};

// export const createUser() {

// }
