import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import butter from "../assets/images/shea-butter.webp"
import rice from "../assets/images/rice.jpg"
import tractor from "../assets/images/tructor.jpeg"
import truck from "../assets/images/truckk.webp"
import sheanuts from "../assets/images/sheanuts.jpg"
import cocoapowder from "../assets/images/CocoaPowder.webp"
import cashewnut from "../assets/images/cashewnut.png"
import maize from "../assets/images/maize.jpeg"
import soyabean from "../assets/images/soyabean.jpg"
import cassava from "../assets/images/cassava.jpg"
import groundnuts from "../assets/images/groundnut.jpg"
import peanutButterMachine from "../assets/images/peanutButterMachine.avif"
import Profile1 from "../assets/images/Profile1.webp"
export const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact Us" },
    { href: "/team", label: "Our Team" },

];

export const shoes = [
    {
        thumbnail: truck,
        bigShoe: truck,
    },
    
    {
        thumbnail: sheanuts,
        bigShoe: sheanuts,
    },
    {
        thumbnail: cashewnut,
        bigShoe: cashewnut,
    },
    {
        thumbnail: maize,
        bigShoe: maize,
    },
    {
        thumbnail: cocoapowder,
        bigShoe: cocoapowder,
    },
    {
        thumbnail: tractor,
        bigShoe: tractor,
    },

];

export const statistics = [
    { value: '4', label: 'Branches' },
    { value: '4', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];


export const products = [
    {
      id: 1,
      name: "Maize",
      description: "High-quality maize sourced from Ghana's fertile farmlands, ideal for consumption and export.",
      imgURL: maize, // Replace with the actual image path
    },
    {
      id: 2,
      name: "Cocoa Powder",
      description: "Premium cocoa powder made from Ghanaian cocoa beans, renowned for their rich flavor.",
      imgURL: cocoapowder, // Replace with the actual image path
    },
    {
      id: 3,
      name: "Cashew Nuts",
      description: "Carefully harvested cashew nuts, packed with nutrients and perfect for snacking or culinary use.",
      imgURL: cashewnut, // Replace with the actual image path
    },
    {
      id: 4,
      name: "Cassava",
      description: "Freshly harvested cassava, perfect for gari, fufu, or industrial uses.",
      imgURL: cassava, // Replace with the actual image path
    },
    {
      id: 5,
      name: "Shea Butter",
      description: "Pure, organic shea butter from Northern Ghana, ideal for skincare and cosmetic use.",
      imgURL: butter, // Replace with the actual image path
    },
    {
      id: 6,
      name: "Sheanuts",
      description: "Top-quality sheanuts, sourced directly from local farmers in Ghana.",
      imgURL: sheanuts, // Replace with the actual image path
    },
    {
      id: 7,
      name: "Tipper Trucks",
      description: "Reliable tipper trucks available for hire, ideal for construction and transportation needs.",
      imgURL: truck, // Replace with the actual image path
    },
    {
      id: 8,
      name: "Tractors (for Rentals)",
      description: "Modern tractors available for rent, perfect for large-scale farming operations.",
      imgURL: tractor, // Replace with the actual image path
    },
    {
        id: 9,
        name: "Groundnuts",
        description: "High-quality groundnuts rich in nutrients, ideal for oil and food production.",
        imgURL: groundnuts, // Replace with the actual image path
      },
      {
        id: 10,
        name: "Soybean Products",
        description: "Premium soybeans for milk, flour, and animal feed production.",
        imgURL: soyabean, // Replace with the actual image path
      },
      {
        id: 11,
        name: "Rice",
        description: "Sweet aroma & Quality Rice for meals .",
        imgURL: rice, // Replace with the actual image path
      },
      {
        id: 12,
        name: "Peanut Butter Processing Machine",
        description: "Efficient machine for producing smooth and high-quality peanut butter.",
        imgURL: peanutButterMachine, // Replace with the actual image path
      },
      
  ];
  

export const services = [
    {
        imgURL: truckFast,
        label: "Nationwide Shipping",
        subtext: "Efficient delivery services across Ghana and beyond.",
    },
    {
        imgURL: shieldTick,
        label: "Guaranteed Quality",
        subtext: "Trusted by farmers and businesses worldwide.",
    },
    {
        imgURL: support,
        label: "Customer Support",
        subtext: "Dedicated team to assist with all inquiries.",
    },
];


export const reviews = [
    {
        imgURL: Profile1,
        customerName: 'Mr. Abdulai Alhassan ',
        rating: 4.5,
        feedback: "Good Customer services and quality products"
    },
    {
        imgURL: Profile1,
        customerName: 'Mr. Samson Adams',
        rating: 5.0,
        feedback: "They offer awsome! discounts to customers "
    }
];


export const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Maize", link: "/products/maize" },
        { name: "Cashew Nuts", link: "/products/cashew-nuts" },
        { name: "Cocoa Powder", link: "/products/cocoa-powder" },
        { name: "Shea Butter", link: "/products/shea-butter" },
        { name: "Soybeans", link: "/products/soybeans" },
        { name: "Groundnuts", link: "/products/groundnuts" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Tractors for Rental", link: "/services/tractors" },
        { name: "Financial Loans for Farmers", link: "/services/loans" },
        { name: "Agricultural Machinery Sales", link: "/services/machinery" },
        { name: "Export of Commodities", link: "/services/export" },
        { name: "Logistics and Transportation", link: "/services/logistics" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", link: "/about" },
        { name: "Mission & Vision", link: "/about/mission" },
        { name: "Our Projects", link: "/about/projects" },
        { name: "Careers", link: "/careers" },
        { name: "Contact Us On: (+233) 024 604 0842", link: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", link: "/faqs" },
        { name: "Customer Support", link: "/support" },
        { name: "Shipping & Delivery", link: "/shipping" },
        { name: "Returns & Refunds", link: "/returns" },
        { name: "Privacy Policy", link: "/privacy-policy" },
        { name: "Terms & Conditions", link: "/terms" },
      ],
    },
  ];
  

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];
