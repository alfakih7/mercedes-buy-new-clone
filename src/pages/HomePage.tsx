import React, { useState } from "react";
import CarCard, { Car } from "../components/CarCard";

// Updated car data based on actual Mercedes-Benz listings
const CARS: Car[] = [
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzE5IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz A-Class",
    link: "#",
    variant: "A 200 Saloon",
    paint: "Solid Paint Night Black",
    pricePerMonth: "3,543.67 / month Finance",
    price: "AED 238,899",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black",
    galleryImages: [
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzE5IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV8yLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzIwIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV8zLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzIwIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV80LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzIxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV81LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzIxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV82LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzIxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV83LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzIxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV84LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzIxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
      "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCMFNKNDk3MDUxXzQ5NzA1MV85LmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MjU4NzIyIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxMjgwLCJoZWlnaHQiOjcyMCwiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19"
    ]
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCOFNKNDk4NjA5XzQ5ODYwOV8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ2MTcyMjA1IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz A-Class",
    link: "#",
    variant: "A 200 Saloon",
    paint: "Solid Paint Polar White",
    pricePerMonth: "3,558.52 / month Finance",
    price: "AED 239,900",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCN1NKNDk1NDYwXzQ5NTQ2MF8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzM5ODY3OTA1IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz A-Class",
    link: "#",
    variant: "A 200 Saloon",
    paint: "Solid Paint Night Black",
    pricePerMonth: "3,617.84 / month Finance",
    price: "AED 243,899",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxSzNHOEhCN1NKNDk1MTY2XzQ5NTE2Nl8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzM5ODY3OTAzIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz A-Class",
    link: "#",
    variant: "A 200 Saloon",
    paint: "Solid Paint Polar White",
    pricePerMonth: "3,632.68 / month Finance",
    price: "AED 244,900",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxTjROOEhCN1NKNzMxNDExXzczMTQxMV8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzM5ODY3OTQ0IiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz GLA",
    link: "#",
    variant: "GLA 200",
    paint: "Solid Paint Night Black",
    pricePerMonth: "4,003.50 / month Finance",
    price: "AED 269,899",
    availability: "Available",
    year: "2025",
    interior: "Leather, Two-Tone Red Pepper / Black"
  },
  {
    img: "https://images.netdirector.auto/eyJrZXkiOiJuZHN0b2NrL2ltYWdlcy9zdG9jay8zNjJlNzJhNTE2Y2EwYjcwMjUzMzBlNjM4OTUzNzY3ZWZlN2JjYWM3L1cxTjI0NzY4NzFXNDE3MjI4XzQxNzIyOF8xLmpwZyIsImJ1Y2tldCI6ImF1dG9mcyIsImxhc3RfbW9kaWZpZWQiOiIxNzQ1MDQ4ODgxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoxOTA5LCJoZWlnaHQiOjEwNzQsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    title: "Mercedes-Benz GLB",
    link: "#",
    variant: "GLB 200",
    paint: "Solid Paint Polar White",
    pricePerMonth: "4,003.50 / month Finance",
    price: "AED 269,899",
    availability: "Available",
    year: "2025",
    interior: "Artico Man-Made Leather / Dinamica Microfibre Black"
  },
  // START OF NEW CARS - NOW WITH CORRECTED IMAGES
  {
    img: "https://vehicle-images.dealerinspire.com/efa4-11000883/thumbnails/large/W1KLF4HB7SA135990/44409711713a305db99532ec19c37bc5.jpg",
    title: "Mercedes-Benz",
    link: "#",
    variant: "E 350 Sedan",
    paint: "Metallic Obsidian Black",
    pricePerMonth: "4,800 / month Finance",
    price: "AED 340,000",
    availability: "Available",
    year: "2025",
    interior: "Nappa Leather Macchiato Beige",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=E-Class+Sedan+Gallery+1"]
  },
  {
    img: "https://vehicle-images.dealerinspire.com/9bd1-110012062/W1K6G6DB5RA289135/55f8195dabdde2af9a3173c345bde4ea.jpg",
    title: "Mercedes-Benz",
    link: "#",
    variant: "S 500 Sedan",
    paint: "Diamond White Metallic",
    pricePerMonth: "8,500 / month Finance",
    price: "AED 650,000",
    availability: "Available",
    year: "2025",
    interior: "Exclusive Nappa Leather Carmine Red",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=S-Class+Sedan+Gallery+1"]
  },
  {
    img: "https://vehicle-images.dealerinspire.com/2136-110012062/W1K5J4HB9SN497934/3a4c332cd3ae97e966112ff01ec42de3.jpg",
    title: "Mercedes-Benz",
    link: "#",
    variant: "CLA 250 Coupe",
    paint: "Sun Yellow",
    pricePerMonth: "3,800 / month Finance",
    price: "AED 280,000",
    availability: "Available",
    year: "2025",
    interior: "Black Leather with Red Stitching",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=CLA+Gallery+1"]
  },
  {
    img: "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/glc-class/glc-suv/byo-options/2025-GLC-SUV-MP-017.jpg",
    title: "Mercedes-Benz",
    link: "#",
    variant: "GLC 300 SUV",
    paint: "Graphite Grey Metallic",
    pricePerMonth: "4,200 / month Finance",
    price: "AED 310,000",
    availability: "Available",
    year: "2025",
    interior: "Artico Black",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=GLC+SUV+Gallery+1"]
  },
  {
    img: "https://imagecdnsa.zigwheels.ae/large/gallery/exterior/26/1007/mercedes-benz-gle-class-front-angle-low-view-737253.jpg",
    title: "Mercedes-Benz",
    link: "#",
    variant: "GLE 450 SUV",
    paint: "Polar White",
    pricePerMonth: "5,500 / month Finance",
    price: "AED 420,000",
    availability: "Available",
    year: "2025",
    interior: "Leather Espresso Brown",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=GLE+SUV+Gallery+1"]
  },
  {
    img: "https://vehicle-images.dealerinspire.com/8214-11000510/thumbnails/large/4JGFF8FE1SB282341/028c5462916466e05a8a8e75c9d21c5f.jpg",
    title: "Mercedes-Benz",
    link: "#",
    variant: "GLS 580 SUV",
    paint: "Emerald Green Metallic",
    pricePerMonth: "7,900 / month Finance",
    price: "AED 680,000",
    availability: "Available",
    year: "2025",
    interior: "Nappa Leather Mahogany Brown/Black",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=GLS+SUV+Gallery+1"]
  },
   {
    img: "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/glb-class/gallery/series/gallery-class/2025-GLB-SUV-GAL-003-J-FE-DR.jpg",
    title: "Mercedes-Benz",
    link: "#",
    variant: "GLB 250 SUV",
    paint: "Digital White Metallic",
    pricePerMonth: "3,900 / month Finance",
    price: "AED 290,000",
    availability: "Coming Soon",
    year: "2025",
    interior: "Black MB-Tex with Dinamica",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=GLB+SUV+Gallery+1"]
  },
  {
    img: "https://img-ik.cars.co.za/news-site-za/images/2024/08/23C0228_002_0.jpg?tr=h-347,w-617,q-80",
    title: "Mercedes-Benz",
    link: "#",
    variant: "G 63 AMG SUV",
    paint: "Matte Black Magno",
    pricePerMonth: "12,000 / month Finance",
    price: "AED 950,000",
    availability: "Available",
    year: "2025",
    interior: "Nappa Leather Black with Diamond Stitching",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=G-Class+SUV+Gallery+1"]
  },
  {
    img: "https://www.mercedes-benz.ca/content/dam/mb-nafta/ca/myco/my25/eqe-class/eqe-suv/byo-options/MBCAN-2025-AMG-EQE-SUV-MP-018.jpg",
    title: "Mercedes-Benz", // Title kept generic, variant specifies EQE 350
    link: "#",
    variant: "EQE 350 SUV",
    paint: "Sodalite Blue Metallic",
    pricePerMonth: "5,800 / month Finance",
    price: "AED 450,000",
    availability: "Available",
    year: "2025",
    interior: "Neva Grey / Biscay Blue Leather",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=EQE+SUV+Gallery+1"]
  },
  {
    img: "https://media.ed.edmunds-media.com/mercedes-benz/eqs/2024/oem/2024_mercedes-benz_eqs_sedan_eqs-580-4matic_fq_oem_1_1280.jpg",
    title: "Mercedes-Benz", // Title kept generic, variant specifies EQS 580
    link: "#",
    variant: "EQS 580 Sedan",
    paint: "Graphite Grey Metallic",
    pricePerMonth: "9,000 / month Finance",
    price: "AED 720,000",
    availability: "Available",
    year: "2025",
    interior: "Nappa Leather Black / Space Grey",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=EQS+Sedan+Gallery+1"]
  },
   {
    img: "https://www.autocar.co.nz/wp-content/uploads/2023/09/mercedes-benz-eqs-450-4matic-suv-1.jpg",
    title: "Mercedes-Benz", // Title kept generic, variant specifies EQS 450+
    link: "#",
    variant: "EQS 450+ SUV",
    paint: "Obsidian Black Metallic",
    pricePerMonth: "9,200 / month Finance",
    price: "AED 750,000",
    availability: "Available",
    year: "2025",
    interior: "Nappa Leather Macchiato Beige / Space Grey",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=EQS+SUV+Gallery+1"]
  },
  {
    img: "https://i.ytimg.com/vi/iuRNqlRiQyI/maxresdefault.jpg",
    title: "Mercedes-Maybach",
    link: "#",
    variant: "S 680 Sedan",
    paint: "Two-Tone Obsidian Black / Rubellite Red",
    pricePerMonth: "15,000 / month Finance",
    price: "AED 1,200,000",
    availability: "Available",
    year: "2025",
    interior: "Exclusive Nappa Leather Crystal White / Silver Grey Pearl",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=Maybach+S-Class+Gallery+1"]
  },
  {
    img: "https://vehicle-images.dealerinspire.com/06d4-11000427/W1KRJ8CBXSF004806/5a449a75ebecf6ad3060b7edc6ec14f0.jpg",
    title: "Mercedes-AMG",
    link: "#",
    variant: "GT 63 S E PERFORMANCE Coupe",
    paint: "AMG Green Hell Magno",
    pricePerMonth: "11,000 / month Finance",
    price: "AED 880,000",
    availability: "Available",
    year: "2025",
    interior: "Nappa Lthr Black w/ Yellow Accents",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=AMG+GT+Coupe+Gallery+1"]
  },
  {
    img: "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my25/eqe-class/eqe-suv/class-page/amg/2025-AMG-EQE-SUV-CPH-XL.jpg",
    title: "Mercedes-AMG",
    link: "#",
    variant: "AMG EQE SUV",
    paint: "Sodalite Blue Metallic",
    pricePerMonth: "5,800 / month Finance",
    price: "AED 450,000",
    availability: "Available",
    year: "2025",
    interior: "Neva Grey / Biscay Blue Leather",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=AMG+EQE+SUV+Gallery+1"]
  },
  {
    img: "https://www.motortrend.com/uploads/2022/10/2023-Mercedes-Benz-SL63-AMG.jpg?w=768&width=768&q=75&format=webp",
    title: "Mercedes-AMG",
    link: "#",
    variant: "AMG SL 63 Roadster",
    paint: "AMG Green Hell Magno",
    pricePerMonth: "12,000 / month Finance",
    price: "AED 950,000",
    availability: "Available",
    year: "2025",
    interior: "Nappa Leather Black with Diamond Stitching",
    galleryImages: ["https://via.placeholder.com/1280x720.png?text=AMG+SL+Roadster+Gallery+1"]
  }
  // END OF NEW CARS
];

// Filter component for the sidebar
const FilterOption: React.FC<{ title: string, showIcon?: boolean }> = ({ title, showIcon = true }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "8px 0",
        borderBottom: "1px solid #eee",
        marginBottom: 10
      }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: "#333" }}>{title}</span>
        {showIcon && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9L12 16L5 9" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredCars = CARS.filter(car => {
    const searchTermLower = searchTerm.toLowerCase();
    // Combine title and variant for a more comprehensive search
    const combinedText = `${car.title.toLowerCase()} ${car.variant.toLowerCase()}`;
    return combinedText.includes(searchTermLower);
  });

  return (
    <main style={{ flex: 1, width: "100%", background: "#f8f9fa", marginTop: 0, position: "relative" }}>
      <div style={{ 
        width: "100%", 
        display: "flex", 
        margin: "0 auto", 
        padding: "0"
      }}>
        {/* Sidebar Filters */}
        <div style={{ 
          width: "250px", 
          minWidth: "250px",
          background: "#fff", 
          padding: "25px 20px", 
          borderRight: "1px solid #eee",
          minHeight: "calc(100vh - 72px)"
        }}>
          <div style={{ 
            fontSize: 22, 
            fontWeight: 500, 
            marginBottom: 20, 
            color: "#333",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center" 
          }}>
            Search
            <button 
              onClick={handleClearSearch}
              style={{ 
                border: "none", 
                background: "none", 
                color: "#0a75c9", 
                fontSize: 14, 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: 0
              }}
            >
              Clear Search
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 5 }}>
                <path d="M18 6L6 18" stroke="#0a75c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="#0a75c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <FilterOption title="Model" />
          <FilterOption title="Trim" />
          
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            border: "1px solid #ddd", 
            borderRadius: 4, 
            padding: "8px 12px", 
            marginBottom: 20 
          }}>
            <input 
              type="text" 
              placeholder="Keyword Search" 
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ 
                border: "none", 
                outline: "none", 
                width: "100%",
                fontSize: 14
              }} 
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <FilterOption title="Fuel Type" />
          <FilterOption title="Budget" />
          <FilterOption title="Colours" />
          <FilterOption title="Body Styles" />
          <FilterOption title="Features" />
          
          <button style={{ 
            width: "100%", 
            background: "#0a75c9", 
            color: "#fff", 
            border: "none", 
            padding: "12px 0", 
            borderRadius: 4, 
            fontSize: 15, 
            fontWeight: 500, 
            cursor: "pointer",
            marginTop: 20
          }}>
            More options
          </button>
        </div>
        
        {/* Main content */}
        <div style={{ flex: 1, padding: "24px 30px 24px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, color: "#333", letterSpacing: 0.3, margin: 0 }}>
              {filteredCars.length} vehicle{filteredCars.length === 1 ? "" : "s"} available
            </h1>
            <div style={{ 
              background: "#fff", 
              borderRadius: 4, 
              padding: "10px 16px", 
              fontSize: 15, 
              color: "#0a75c9", 
              display: "flex", 
              alignItems: "center", 
              border: "1px solid #e8e8e8", 
              cursor: "pointer" 
            }}>
              Lowest Price First
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 8 }}>
                <path d="M6 9L12 15L18 9" stroke="#0a75c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          {/* Cars grid with adjusted spacing and layout */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(3, 1fr)", 
            gap: "20px",
            maxWidth: "100%"
          }}>
            {filteredCars.map((car, idx) => (
              <CarCard key={idx} car={car} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage; 