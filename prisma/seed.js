import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const { user, brand, category, product } = prisma;

const hashPassword = async (password) => {
  const saltRounds = 8;
  const myPlaintextPassword = password;

  const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
  return hashedPassword;
};

const seedMainAdmin = async () => {
  const hashedPassword = await hashPassword("123456");
  const adminData = {
    firstName: "main",
    lastName: "admin",
    email: "admin@admin.com",
    password: hashedPassword,
    role: "MAIN_ADMIN",
  };
  await user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: adminData,
  });
};

const seedBrands = async () => {
  await brand.createMany({
    data: [
      {
        name: "Samsung",
      },
      {
        name: "Xiaomi",
      },
      {
        name: "Huawei",
      },
      {
        name: "Asus",
      },
      {
        name: "Acer",
      },
      {
        name: "Dell",
      },
      {
        name: "Toshiba",
      },
      {
        name: "HP",
      },
      {
        name: "Harman Kardon",
      },
      {
        name: "Nokia",
      },
      {
        name: "Panasonic",
      },
      {
        name: "Bang & Olufsen",
      },
      {
        name: "LG",
      },
    ],
  });
};

const seedCategories = async () => {
  await category.createMany({
    data: [
      {
        name: "Tablet",
      },
      {
        name: "Audio systems",
      },
      {
        name: "Notebook",
      },
      {
        name: "Watches",
      },
      {
        name: "TV",
      },
      {
        name: "Computer",
      },
      {
        name: "Accessories",
      },
      {
        name: "Gaming",
      },
      {
        name: "Cameras",
      },
      {
        name: "Other",
      },
    ],
  });
};

const seedProducts = async () => {
  await product.createMany({
    data: [
      {
        name: "Product 1",
        price: 150,
        discount: 1,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 1,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F4370192.jpg?alt=media&token=200d1ed8-76cb-452f-8db9-5614059365b2",
      },
      {
        name: "Product 2",
        price: 200,
        discount: 2,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 2,
        categoryId: 2,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437300.jpg?alt=media&token=ca9a0cb2-4c46-4c32-a7e6-6050d63af679",
      },
      {
        name: "Product 3",
        price: 250,
        discount: 3,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 3,
        categoryId: 3,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437360_1_1.jpg?alt=media&token=1b57d2e8-79ff-4d3d-aaac-3a3f4ca631e1",
      },
      {
        name: "Product 4",
        price: 300,
        discount: 4,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 4,
        categoryId: 4,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437370.jpg?alt=media&token=0cd131cf-def8-40af-8cf7-60947867f757",
      },
      {
        name: "Product 5",
        price: 350,
        discount: 5,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 5,
        categoryId: 5,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437520.jpg?alt=media&token=640b85cd-bd2e-4802-84ce-dabc7d259a6e",
      },
      {
        name: "Product 6",
        price: 400,
        discount: 6,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 6,
        categoryId: 7,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437520.jpg?alt=media&token=640b85cd-bd2e-4802-84ce-dabc7d259a6e",
      },
      {
        name: "Product 7",
        price: 450,
        discount: 7,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 7,
        categoryId: 7,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437520.jpg?alt=media&token=640b85cd-bd2e-4802-84ce-dabc7d259a6e",
      },
      {
        name: "Product 8",
        price: 500,
        discount: 8,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 8,
        categoryId: 8,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437520.jpg?alt=media&token=640b85cd-bd2e-4802-84ce-dabc7d259a6e",
      },
      {
        name: "Product 9",
        price: 550,
        discount: 9,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 9,
        categoryId: 9,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437300.jpg?alt=media&token=ca9a0cb2-4c46-4c32-a7e6-6050d63af679",
      },
      {
        name: "Product 10",
        price: 600,
        discount: 10,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 10,
        categoryId: 10,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437520.jpg?alt=media&token=640b85cd-bd2e-4802-84ce-dabc7d259a6e",
      },
      {
        name: "Product 11",
        price: 650,
        discount: 0,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 11,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437520.jpg?alt=media&token=640b85cd-bd2e-4802-84ce-dabc7d259a6e",
      },
      {
        name: "Item 1",
        price: 700,
        discount: 1,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 12,
        categoryId: 2,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437370.jpg?alt=media&token=0cd131cf-def8-40af-8cf7-60947867f757",
      },
      {
        name: "Item 3",
        price: 750,
        discount: 2,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 13,
        categoryId: 3,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F4370192.jpg?alt=media&token=200d1ed8-76cb-452f-8db9-5614059365b2",
      },
      {
        name: "Twix",
        price: 10,
        discount: 0,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 1,
        categoryId: 4,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437360_1_1.jpg?alt=media&token=1b57d2e8-79ff-4d3d-aaac-3a3f4ca631e1",
      },
      {
        name: "Snickers",
        price: 20,
        discount: 5,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 2,
        categoryId: 5,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437300.jpg?alt=media&token=ca9a0cb2-4c46-4c32-a7e6-6050d63af679",
      },
      {
        name: "Mars",
        price: 30,
        discount: 0,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 3,
        categoryId: 6,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F4370192.jpg?alt=media&token=200d1ed8-76cb-452f-8db9-5614059365b2",
      },
      {
        name: "KitKat",
        price: 30,
        discount: 0,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 4,
        categoryId: 7,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437520.jpg?alt=media&token=640b85cd-bd2e-4802-84ce-dabc7d259a6e",
      },
      {
        name: "Mars",
        price: 40,
        discount: 5,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 5,
        categoryId: 8,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437370.jpg?alt=media&token=0cd131cf-def8-40af-8cf7-60947867f757",
      },
      {
        name: "Bounty",
        price: 33,
        discount: 7,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 6,
        categoryId: 9,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437530.jpg?alt=media&token=a1d3cadc-1635-43c3-ac39-4e833b0bb1e6",
      },
      {
        name: "M&M's",
        price: 11,
        discount: 4,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 7,
        categoryId: 10,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437360_1_1.jpg?alt=media&token=1b57d2e8-79ff-4d3d-aaac-3a3f4ca631e1",
      },
      {
        name: "Kinder",
        price: 15,
        discount: 0,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 8,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437530.jpg?alt=media&token=a1d3cadc-1635-43c3-ac39-4e833b0bb1e6",
      },
      {
        name: "Grand Candy",
        price: 22,
        discount: 0,
        description:
          "Ornare integer commodo mauris et ligula purus, praesent cubilia laboriosam viverra. Mattis id rhoncus. Integer lacus eu volutpat fusce. Elit etiam phasellus suscipit suscipit dapibus, condimentum tempor quis, turpis luctus dolor sapien vivamus.",
        brandId: 9,
        categoryId: 2,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2F437520.jpg?alt=media&token=640b85cd-bd2e-4802-84ce-dabc7d259a6e",
      },
    ],
  });
};

seedMainAdmin()
  .then(() => seedBrands())
  .then(() => seedCategories())
  .then(() => seedProducts())
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    console.log("finally");
    prisma.$disconnect();
  });
