// Central data + link helpers for the Kashmir Super Deluxe landing page

export const PHONE_DISPLAY = "+91 7006186445";
export const PHONE_TEL = "+917006186445";
export const WA_NUMBER = "917006186445";
export const EMAIL = "discoverdazeholidays@gmail.com";
export const ADDRESS =
  "Srinagar–Gulmarg Highway, Near Afnan Residency, Gokhama, Kunzer, Jammu & Kashmir – 193404";
export const BRAND = "Discover Daze Holidays";

export const waLink = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

export const DEFAULT_WA_MSG =
  "Hi Discover Daze Holidays! I'm interested in the 6 Days Kashmir Super Deluxe Package. Please share the best price & availability.";

export const IMAGES = {
  heroPoster:
    "https://images.pexels.com/photos/32261635/pexels-photo-32261635.jpeg",
  shikara:
    "https://images.unsplash.com/photo-1569852837227-1d0d3af93456?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHw0fHxLYXNobWlyJTIwRGFsJTIwTGFrZSUyMFNoaWthcmF8ZW58MHx8fHwxNzgzMzU3MzM4fDA&ixlib=rb-4.1.0&q=85",
  houseboat:
    "https://images.pexels.com/photos/29264394/pexels-photo-29264394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  room: "https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg",
};

export const HIGHLIGHTS = [
  { icon: "BedDouble", title: "3 Star Super Deluxe Hotels", desc: "Handpicked premium stays in prime locations." },
  { icon: "UtensilsCrossed", title: "Daily Buffet Breakfast & Dinner", desc: "Lavish veg & non-veg spreads every day." },
  { icon: "Car", title: "Private Sedan / Ertiga / Innova / Tempo", desc: "Clean, sanitised cabs with expert drivers." },
  { icon: "Sailboat", title: "Complimentary 1 Hour Shikara Ride", desc: "A serene glide across the iconic Dal Lake." },
  { icon: "Mountain", title: "Sonamarg", desc: "The Meadow of Gold, framed by glaciers." },
  { icon: "MountainSnow", title: "Gulmarg", desc: "World-famous Gondola & snow meadows." },
  { icon: "Trees", title: "Pahalgam", desc: "Lidder valley, pine forests & open skies." },
  { icon: "Home", title: "Srinagar Houseboat Stay", desc: "A one-of-a-kind luxury night on the water." },
];

export const ITINERARY = [
  { day: "01", title: "Arrival at Srinagar", detail: "Warm airport welcome, local sightseeing across the city's Mughal gardens.", stay: "Srinagar Hotel" },
  { day: "02", title: "Sonamarg Day Trip", detail: "Full-day excursion to the golden meadows & Thajiwas Glacier.", stay: "Srinagar Hotel" },
  { day: "03", title: "Srinagar → Gulmarg", detail: "Drive to the meadow of flowers, ride the famous Gulmarg Gondola.", stay: "Tangmarg / Gulmarg" },
  { day: "04", title: "Gulmarg → Pahalgam", detail: "Scenic transfer to the valley of shepherds along the Lidder river.", stay: "Pahalgam" },
  { day: "05", title: "Pahalgam Sightseeing", detail: "Betaab Valley, Aru & Chandanwari, then return for a houseboat night.", stay: "Luxury Houseboat, Srinagar" },
  { day: "06", title: "Departure", detail: "Comfortable drop to Airport / Railway Station / Volvo Bus Stand.", stay: "Sweet goodbyes" },
];

export const INCLUDED = [
  "Super Deluxe 3 Star Accommodation",
  "Buffet Breakfast",
  "Buffet Dinner",
  "Veg & Non-Veg Options",
  "Private Transportation",
  "Toll Tax Included",
  "Parking Included",
  "Driver Allowance",
  "Driver Accommodation",
  "Complimentary Shikara Ride",
  "24×7 Phone Support",
];

export const PRICING = [
  { name: "Couple Package", price: "₹32,300", unit: "total", rooms: "1 Deluxe Room", tag: null },
  { name: "Group of 5", price: "₹9,800", unit: "per person", rooms: "2 Rooms + 1 Extra Bed", tag: null },
  { name: "Group of 6", price: "₹10,700", unit: "per person", rooms: "2 Rooms + 2 Extra Beds", tag: null },
  { name: "Group of 9", price: "₹10,400", unit: "per person", rooms: "3 Rooms + 3 Extra Beds", tag: "Best Value" },
  { name: "Budget Package", price: "₹8,000", unit: "per person", rooms: "Starting from", tag: null },
];

export const WHY_US = [
  { icon: "MapPin", title: "Local Kashmir Team" },
  { icon: "Hotel", title: "Luxury Hotels" },
  { icon: "Sparkles", title: "Clean Vehicles" },
  { icon: "UserCheck", title: "Experienced Drivers" },
  { icon: "MessageCircle", title: "Instant WhatsApp Support" },
  { icon: "BadgeIndianRupee", title: "Best Price Guarantee" },
  { icon: "Eye", title: "Transparent Pricing" },
  { icon: "ShieldCheck", title: "No Hidden Charges" },
];

export const REVIEWS = [
  { name: "Aarav Mehta", text: "Our Kashmir trip was perfectly planned. Every detail was taken care of.", city: "Mumbai" },
  { name: "Sana Kapoor", text: "Best hospitality and amazing hotels. The houseboat night was magical.", city: "Delhi" },
  { name: "Rohan Verma", text: "Everything was smooth from pickup to drop. Truly stress-free.", city: "Bengaluru" },
  { name: "Priya Nair", text: "Gulmarg Gondola & Sonamarg were unforgettable. Highly recommended!", city: "Kochi" },
  { name: "Imran Sheikh", text: "Transparent pricing, no hidden charges. Exactly as promised.", city: "Hyderabad" },
  { name: "Neha Sharma", text: "The drivers were courteous and the cars spotless. 5 stars!", city: "Pune" },
];

export const FAQS = [
  { q: "What is included in the ₹9,800 per person price?", a: "Super Deluxe 3 Star stays, daily buffet breakfast & dinner, private cab with tolls, parking, driver allowance & accommodation, plus a complimentary Shikara ride and 24×7 support." },
  { q: "Is the package customisable?", a: "Absolutely. Tell us your dates, group size and preferences on WhatsApp and we'll tailor the itinerary and pricing for you." },
  { q: "Are there any hidden charges?", a: "None. Our pricing is fully transparent — what we quote is what you pay. Entry tickets, Gondola rides and pony charges are the only extras and are clearly shared upfront." },
  { q: "How do I confirm my booking?", a: "Simply message us on WhatsApp or call +91 7006186445. We confirm instantly and guide you through a small advance to lock your seats." },
  { q: "What is the best time to visit Kashmir?", a: "Kashmir is stunning year-round — tulips in spring, lush meadows in summer, and snow in winter. Share your travel month and we'll advise the best experience." },
];
