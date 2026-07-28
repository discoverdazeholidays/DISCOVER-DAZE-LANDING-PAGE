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

export const scrollToQuote = () => {
  const el = document.getElementById("quote");
  if (!el) return;
  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -10, duration: 1.2 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

// Pre-select a package in the booking form, then reveal (scroll to) the form.
// Does NOT open WhatsApp — WhatsApp only happens after the user submits the form.
export const selectPackage = (packageValue) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("dd-select-package", { detail: packageValue }));
  }
  scrollToQuote();
};

export const DEFAULT_WA_MSG =
  "Hi Discover Daze Holidays! I'm interested in the 6 Days Kashmir Super Deluxe Package. Please share the best price & availability.";

export const IMAGES = {
  heroLocal: "/images/kashmir-hero.jpg",
  heroLocal2: "/images/kashmir-hero-2.jpg",
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
  { name: "Couple Package", price: "₹32,300", unit: "total", rooms: "1 Deluxe Room", tag: null, formValue: "Couple Package — ₹32,300" },
  { name: "Group of 5", price: "₹9,800", unit: "per person", rooms: "2 Rooms + 1 Extra Bed", tag: null, formValue: "Group of 5 — ₹9,800/person" },
  { name: "Group of 6", price: "₹10,700", unit: "per person", rooms: "2 Rooms + 2 Extra Beds", tag: null, formValue: "Group of 6 — ₹10,700/person" },
  { name: "Group of 9", price: "₹10,400", unit: "per person", rooms: "3 Rooms + 3 Extra Beds", tag: "Best Value", formValue: "Group of 9 — ₹10,400/person (Best Value)" },
  { name: "Budget Package", price: "₹8,000", unit: "per person", rooms: "Starting from", tag: null, formValue: "Budget Package — from ₹8,000/person" },
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


export const TESTIMONIALS = [
  { name: "Aarav Mehta", city: "Mumbai", photo: "https://randomuser.me/api/portraits/men/32.jpg", text: "Our Kashmir trip was perfectly planned. Every detail — hotels, cab, meals — was flawless. Worth every rupee!" },
  { name: "Sana Kapoor", city: "Delhi", photo: "https://randomuser.me/api/portraits/women/44.jpg", text: "Best hospitality and amazing hotels. The houseboat night on Dal Lake was absolutely magical." },
  { name: "Rohan Verma", city: "Bengaluru", photo: "https://randomuser.me/api/portraits/men/54.jpg", text: "Everything was smooth from pickup to drop. Truly stress-free and premium throughout." },
  { name: "Priya Nair", city: "Kochi", photo: "https://randomuser.me/api/portraits/women/68.jpg", text: "Gulmarg Gondola & Sonamarg were unforgettable. Our driver was so kind and knowledgeable." },
  { name: "Imran Sheikh", city: "Hyderabad", photo: "https://randomuser.me/api/portraits/men/76.jpg", text: "Transparent pricing, zero hidden charges. Exactly what was promised. Highly recommend Discover Daze." },
  { name: "Neha Sharma", city: "Pune", photo: "https://randomuser.me/api/portraits/women/12.jpg", text: "Booked for my family of 6 — clean cars, lovely hotels and instant WhatsApp support. 5 stars!" },
];

export const TRUST_BADGES = [
  { icon: "MapPin", title: "Local Kashmir Experts" },
  { icon: "Headphones", title: "24×7 Support" },
  { icon: "ReceiptText", title: "No Hidden Charges" },
  { icon: "ShieldCheck", title: "Secure Booking" },
  { icon: "BadgeIndianRupee", title: "Best Price Guarantee" },
];

export const PACKAGE_OPTIONS = [
  "Couple Package — ₹32,300",
  "Group of 5 — ₹9,800/person",
  "Group of 6 — ₹10,700/person",
  "Group of 9 — ₹10,400/person (Best Value)",
  "Budget Package — from ₹8,000/person",
  "Not sure — need help choosing",
];

export const GUEST_OPTIONS = ["1-2 (Couple)", "3-5", "6-9", "10+"];
