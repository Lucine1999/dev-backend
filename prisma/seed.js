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
        name: "Lenovo",
      },
      {
        name: "Dell",
      },
      {
        name: "MSI",
      },
      {
        name: "Samsung",
      },
      {
        name: "ASUS",
      },
      {
        name: "Acer",
      },
      {
        name: "HP",
      },
      {
        name: "Roku",
      },
      {
        name: "Sony",
      },
      {
        name: "Sewell",
      },
      {
        name: "Bowers & Wilkins",
      },
      {
        name: "Skullcandy",
      },
      {
        name: "Navor",
      },
      {
        name: "JBL",
      },
      {
        name: "Amazon Basics",
      },
    ],
  });
};

const seedCategories = async () => {
  await category.createMany({
    data: [
      {
        name: "Notebook",
      },
      {
        name: "Television & Video",
      },
      {
        name: "Headphones & Earbuds",
      },
      {
        name: "Home Audio",
      },
      {
        name: "Computers and Accessories",
      },
    ],
  });
};

const seedProducts = async () => {
  await product.createMany({
    data: [
      {
        name: `Lenovo IdeaPad 3 15ITL6 82H800KAUS 15.6" Touchscreen Notebook`,
        price: 591,
        discount: 5,
        description: `Intel Core i5 2.40 GHz processor provides great performance, immersive multimedia and rapid loading of programs
          With 12 GB DDR4 SDRAM memory, you can multitask seamlessly between various applications without issue
          15.6" display with 1920 x 1080 resolution showcases movies, games and photos with impressive clarity
          Windows 10 Home can be the best fit for both home and office and it features an improved 2 x 2 snapping, helps you make more productive on desktops
          12 Hour battery run time helps you stay unwired and work longer non-stop`,
        brandId: 1,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct1.jpg?alt=media&token=79ee6146-e7e2-41f4-b5cf-2a730b964fbe",
      },
      {
        name: `Dell Latitude 7000 7320 13.3" Notebook`,
        price: 1323,
        discount: 0,
        description: `Processor Manufacturer: Intel
        Processor Type: Core i5
        Processor Generation: 11th Gen
        Processor Model: i5-1145G7
        Processor Core: Quad-core (4 Core)`,
        brandId: 2,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct2.jpg?alt=media&token=2282cca4-5a63-41b4-a52f-21006f9a8088",
      },
      {
        name: `Lenovo IdeaPad Flex 5 14ALC05 82HU002YUS 14" Touchscreen Convertible 2 in 1 Notebook`,
        price: 740,
        discount: 0,
        description: `With 16 GB of memory, runs as many programs as you want without losing the execution
        The 14" 1920 x 1080 screen provides a great movie watching experience
        Windows 10 Home comes with improved 2 x 2 snapping, helps you make more productive at work`,
        brandId: 1,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct3.jpg?alt=media&token=495105de-5947-4e6d-aee4-ba72832ff389",
      },
      {
        name: `MSI Crosshair 17 Crosshair 17 A11UDK-645 17.3" Gaming Notebook`,
        price: 1379,
        discount: 10,
        description: `Intel Core i7 2.40 GHz processor provides lightning fast speed and peak performance for the toughest of tasks and games
        With 16 GB of memory, users can run many programs without losing execution
        Exceptionally large 17.3" diagonal display provides 1920 x 1080 resolution
        NVIDIA GeForce RTX 3050 Ti Up to 4 GB discrete graphic card provides excellent ability in a variety of multimedia applications and user experiences`,
        brandId: 3,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct4.jpg?alt=media&token=592cb5fd-eed3-4f3c-b762-4287962e6b59",
      },
      {
        name: `Dell Latitude 3000 3320 13.3" Notebook`,
        price: 999,
        discount: 0,
        description: `Intel Core i7 2.80 GHz processor provides lightning fast speed and peak performance for the toughest of tasks and games
        With 8 GB memory, you can multitask between various applications without issue
        The 13.3" 1920 x 1080 screen provides a great movie watching experience
        Windows 10 Pro can be best fit for both home and office and it features an improved 2 x 2 snapping, helps you make more productive on desktops`,
        brandId: 2,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct5.jpg?alt=media&token=c40a0914-d561-4b66-b265-8d0be424ce59",
      },
      {
        name: `SAMSUNG 13.3" Galaxy Chromebook Laptop Computer`,
        price: 579,
        discount: 0,
        description: `Crystal clarity. Vivid color: Experience superior picture quality and fully expansive color, contrast and depth with the 4K AMOLED touchscreen display to take your work and play to the next level.
        Split-second productivity: Boot up in as fast as 6 seconds and hit the ground running. Get ample storage with 256GB SSD and work, play and multitask seamlessly.
        Stroke of genius: Take notes, sketch ideas and edit documents easily and accurately with the built-in pen that fits seamlessly into Galaxy Chromebook’s ultra-slim design.`,
        brandId: 4,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct6.jpg?alt=media&token=08b16d3c-090c-49ea-9438-ed42159fbcbe",
      },
      {
        name: `ASUS Laptop L210 11.6” ultra thin, Intel Celeron N4020 Processor`,
        price: 239,
        discount: 0,
        description: `Efficient Intel Celeron N4020 Processor (4M Cache, up to 2.8 GHz)
        11.6” HD (1366 x 768) Slim Display
        64GB eMMC Flash Storage and 4GB DDR4 RAM
        Windows 10 in S Mode with One Year of Microsoft 365 Personal
        Slim and Portable: 0.7” thin and weighs only 2.2 lbs (battery included)`,
        brandId: 5,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct7.jpg?alt=media&token=be5b469f-27a8-4b4e-98f1-acc23106d615",
      },
      {
        name: `Acer Aspire 5 Slim Laptop`,
        price: 367,
        discount: 0,
        description: `AMD Ryzen 3 3200U Dual Core Processor (Up to 3.5GHz); 4GB DDR4 Memory; 128GB PCIe NVMe SSD
        15.6 inches full HD (1920 x 1080) widescreen LED backlit IPS display; AMD Radeon Vega 3 Mobile Graphics
        1 USB 3.1 Gen 1 port, 2 USB 2.0 ports & 1 HDMI port with HDCP support
        802.11ac Wi-Fi; Backlit Keyboard; Up to 7.5 hours battery life
        Windows 10 in S mode. Maximum power supply wattage: 65 Watts`,
        brandId: 6,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct8.jpg?alt=media&token=ffc67f7a-70d4-4f08-ac12-a19eea424ea2",
      },
      {
        name: `HP Stream 11" Laptop, Intel Celeron N4020, Intel UHD Graphics 600`,
        price: 249,
        discount: 0,
        description: `PORTABLE AND EXPRESSIVE DESIGN – Stay productive and connected all day with an HP laptop that is affordable, portable, and incredibly stylish.
        HD DISPLAY FOR ANYWHERE – Enjoy every bit of detail thanks to your laptop’s brilliant high-definition (1366 x 768) display (1); easily take this laptop from room to room or outside due to its lightweight design and its anti-glare panel.
        DUAL-CORE PROCESSOR – Power through your workday with the great performance and instant responsiveness of the dual-core Intel Celeron N4020 processor (2).
        STUNNING GRAPHICS – Smoothly stream your favorite content and easily run next-gen games with Intel UHD Graphics 600 (3).`,
        brandId: 7,
        categoryId: 1,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct9.jpg?alt=media&token=d77f9525-827d-4993-9bb0-3c53d00efedc",
      },
      {
        name: `SAMSUNG 32-inch Class LED Smart FHD TV 1080P`,
        price: 227,
        discount: 20,
        description: `Full HD 1080p Resolution - Enjoy a viewing experience that is 2x the clarity of standard HD TVs.
        Smart TV - Get to your entertainment the faster, easier, and more intelligent way. Easily access your streaming services all in one place using the Samsung Remote Control.
        Micro Dimming Pro - Reveal a more true-to-life picture with enhanced contrast.
        Quad Core Processor: enjoy a Fluid browsing experience and faster control switching between apps, streaming content and other media effortlessly.`,
        brandId: 4,
        categoryId: 2,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct10.jpg?alt=media&token=ea30ec6d-fcf3-4838-ae84-7fd8e353b2df",
      },
      {
        name: `Roku Express | HD Streaming Media Player`,
        price: 17,
        discount: 0,
        description: `Watch what you love: Start streaming with a massive selection of free, live, and premium TV, including Roku Originals and 275 plus live TV channels for free on The Roku Channel
        Quick and easy setup: It’s easy to get started with everything you need included in the box, including a High Speed HDMI Cable—just plug it into your TV and connect to the internet
        Tons of power, tons of fun: Compact and power-packed, you'll stream your favorites with ease, including movies and series on HBO Max, Netflix, Disney plus, and Prime Video
        Simple remote: Incredibly easy to use, this remote features shortcut buttons to popular streaming channels`,
        brandId: 8,
        categoryId: 2,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct11.jpg?alt=media&token=6b8ab5dc-2cb5-40a5-bd77-28dc82fd7aae",
      },
      {
        name: `Sony BDP-BX370 Blu-ray Disc Player`,
        price: 78,
        discount: 0,
        description: `Enjoy Blu-ray Disc movies in Full HD
        Upscale your DVDs to near HD quality
        Stream wirelessly from a host of online entertainment providers
        Enjoy fast, stable Wi-Fi even when streaming in HD
        View smartphone content with screen mirroring`,
        brandId: 9,
        categoryId: 2,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct12.jpg?alt=media&token=b5be35a1-4408-49d0-b171-3fcddfe4be6a",
      },
      {
        name: `Splitdeck 4K 8-port HDMI 2.0 Splitter by Sewell`,
        price: 141,
        discount: 0,
        description: `IMPORTANT: Your source device will only output the highest resolution that ALL connected displays will support when using this splitter.
        Supports up to 4K2K at60Hz and HDCP 2.2
        Supports HDMI 2.2 including 3D and Deep Color 24bit, 30bit, 36bit
        Digital Audio format, as DTS-HD/Dolby-trued/LPCM7.1/dtx/Dolby-AC3/ DSD
        Splits a single HDMI source to up to Eight HDMI HD displays`,
        brandId: 10,
        categoryId: 2,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct13.jpg?alt=media&token=f24f8fab-69e5-4a83-ac2b-72fb116482d2",
      },
      {
        name: `Roku Voice Remote Pro | Rechargeable voice remote`,
        price: 29,
        discount: 0,
        description: `Rechargeable battery: Keep your remote powered with any standard USB charger, so you don’t have to worry about batteries
        Control your TV: No need to juggle multiple remotes—turn your TV on and off, adjust the volume, mute, and control your streaming all with this Roku replacement remote
        Lost remote finder: Simply say “Hey Roku, where’s my remote?” or find it with the free Roku mobile app, so you don’t have to tear the room apart
        category - Television & Video`,
        brandId: 8,
        categoryId: 2,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct14.jpg?alt=media&token=3e44d364-4b4e-49c9-a676-2c7953d8681a",
      },
      {
        name: `Bowers & Wilkins PX7 Over Ear Wireless Bluetooth Headphone`,
        price: 279,
        discount: 0,
        description: `Built from Legend drivers that push the sound forward The 43mm drivers in the Px7 are the largest in our headphone collection built and tuned by the same engineers behind the Bowers & Wilkins 800 Series diamond speakers used in Abbey road studios
        Cancels noise clean out adaptive noise cancelling that automatically Responds to your environment to keep the outside world out of the music`,
        brandId: 11,
        categoryId: 3,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct15.jpg?alt=media&token=4117de1c-9c61-41e3-b4ef-58d4c337ed70",
      },
      {
        name: `Skullcandy Crusher Evo Wireless Over-Ear Headphone - True Black`,
        price: 139,
        discount: 15,
        description: `Crusher Adjustable Sensory Bass
        Personal Sound customization via Skullcandy App
        Up to 40 hours of battery life
        Built-in Tile finding technology
        Call, track and volume controls.Connectivity technology: Wired.Included components: User Guide`,
        brandId: 12,
        categoryId: 3,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct16.jpg?alt=media&token=0b29a15d-f571-4b3c-ac18-334bd1fcc06f",
      },
      {
        name: `navor Transmitter & Receiver, Audio Adapter`,
        price: 24,
        discount: 0,
        description: `[2-in-1 Bluetooth 5.0 Transmitter & Receiver] Makes every device Bluetooth Enabled. Bluetooth transmitter for TV, PC, Bluetooth receiver for home audio speaker. Simply flip the switch.
        [Compatibility] This device is for phones and, compatible with Android and IOS system pads, headphones, and all Bluetooth audio devices.
        [Premium Audio Quality] With advanced CSR chip, Bluetooth transmitter receiver supports aptX to catch audio details, providing near-lossless music. aptX audio codec for best sound experience. Listen to CD-like audio quality at no compromise. Note: aptX technology is available when the paired device also supports aptX.`,
        brandId: 13,
        categoryId: 4,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct17.jpg?alt=media&token=8d739e94-1dd8-45e8-b9f9-832293eeecde",
      },
      {
        name: `JBL Clip 4: Portable Speaker with Bluetooth`,
        price: 49,
        discount: 0,
        description: `JBL Pro Sound delivers surprisingly rich audio and punchy bass from Clip 4’s compact size.
        JBL Clip 4’s ultra-portable design goes great with the latest styles, and its colorful fabrics and expressive details make it look as great as it sounds.
        With the JBL Clip 4's redesigned carabiner that’s integrated into the speaker itself for extra protection, you can clip it on and go explore the world.`,
        brandId: 14,
        categoryId: 4,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct18.jpg?alt=media&token=120f64a0-459d-403e-9329-e587a3e1779a",
      },
      {
        name: `Amazon Basics In-Ear Wired Headphones, Earbuds with Microphone, Black`,
        price: 9,
        discount: 0,
        description: `Black headphones with comfortable in-ear design and 3.5mm gold-plated plug
        Built-in microphone with controller (answer or hang up calls; pause or skip tracks)
        Compatible with any device with a 3.5mm jack, including Android and IOS smartphones; devices without a 3.5mm jack, like the iPhone 7, 8, 10, and Pixel 2, require an adapter
        3.9-foot cable can be threaded through clothing or bag; 20-20KHz frequency range; 94±3dB; 10mW max input`,
        brandId: 15,
        categoryId: 4,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct19.jpg?alt=media&token=ca400552-6b7c-49e7-baac-f3243108eec4",
      },
      {
        name: `SAMSUNG 870 EVO SATA III SSD 1TB 2.5” Internal Solid State Hard Drive`,
        price: 99,
        discount: 0,
        description: `THE SDD ALL-STAR: The latest 870 EVO has indisputable performance, reliability and compatibility built upon Samsung's pioneering technology
        EXCELLENCE IN PERFORMANCE: Enjoy professional level SSD performance which maximizes the SATA interface limit to 560/530 MB/s sequential speeds, accelerates write speeds and maintains long term high performance with a larger variable buffer
        INDUSTRY-DEFINING RELIABILITY: From everyday computing to 8K video processing, you can multi-task efficiently with up to 600 TBW, low lag with the 6th generation VNAND, and powerful MKX controller
        category - Computers & Accessories`,
        brandId: 4,
        categoryId: 5,
        productImg:
          "https://firebasestorage.googleapis.com/v0/b/online-shop-543a4.appspot.com/o/images%2Fproduct20.jpg?alt=media&token=a12447f7-c07d-4d73-bb7d-ff3be267e87d",
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
