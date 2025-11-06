import type { Product } from "@shared/api";

export const CATEGORIES = [
  { key: "gift-packs", label: "Gift Packs" },
  { key: "chocolate-boxes", label: "Chocolate Boxes" },
  { key: "Snacks", label: "Snacks" },
  { key: "Cookies", label: "Cookies" },
  { key: "festive", label: "Festive Collection" },
  { key: "corporates", label: "Corporates Collection" },
] as const;

export const products: Product[] = [
  
  // === PROMOTIONAL ITEMS (used by PromotionalGifts page) START ===
  // These product objects were added specifically for the Promotional Gifts page
  // and are grouped here so you can find them easily.
  // Each object below includes `subCategory` which the strip filters on.

  // PROMO - subCategory: everyday
  {
    id: "promo-everyday-1",
    name: "Everyday Utility Set - A",
    image: "https://picsum.photos/seed/promo-everyday-1/600/400",
    price: 549,
    originalPrice: 699,
  category: "promotional-gifts",
    subCategory: "everyday",
    description: "A compact everyday utility promotional set — bottle, snack, and greeting card.",
  },
  // PROMO - subCategory: everyday
  {
    id: "promo-everyday-2",
    name: "Everyday Utility Set - B",
    image: "https://picsum.photos/seed/promo-everyday-2/600/400",
    price: 699,
  category: "promotional-gifts",
    subCategory: "everyday",
    description: "Value everyday gift with custom branding options.",
  },

  // PROMO - subCategory: travel
  {
    id: "promo-travel-1",
    name: "Travel Essentials Kit - A",
    image: "https://picsum.photos/seed/promo-travel-1/600/400",
    price: 899,
    category: "corporates",
    subCategory: "travel",
    description: "Portable travel & outdoor kit — bottle, pouch and snack pack.",
  },
  // PROMO - subCategory: travel
  {
    id: "promo-travel-2",
    name: "Travel Essentials Kit - B",
    image: "https://picsum.photos/seed/promo-travel-2/600/400",
    price: 1199,
    originalPrice: 1399,
  category: "promotional-gifts",
    subCategory: "travel",
    description: "Premium travel kit for corporate gifting.",
  },

  // PROMO - subCategory: lifestyle
  {
    id: "promo-lifestyle-1",
    name: "Lifestyle & Personal Care Pack - A",
    image: "https://picsum.photos/seed/promo-lifestyle-1/600/400",
    price: 749,
  category: "promotional-gifts",
    subCategory: "lifestyle",
    description: "Personal care & lifestyle gifts suitable for events.",
  },
  // PROMO - subCategory: lifestyle
  {
    id: "promo-lifestyle-2",
    name: "Lifestyle & Personal Care Pack - B",
    image: "https://picsum.photos/seed/promo-lifestyle-2/600/400",
    price: 999,
    category: "gift-packs",
    subCategory: "lifestyle",
    description: "Curated lifestyle hamper with candles and snacks.",
  },

  // PROMO - subCategory: eco
  {
    id: "promo-eco-1",
    name: "Eco-friendly Gift Set - A",
    image: "https://picsum.photos/seed/promo-eco-1/600/400",
    price: 499,
    category: "gift-packs",
    subCategory: "eco",
    description: "Jute and terracotta based eco-friendly promotional gifts.",
  },
  // PROMO - subCategory: eco
  {
    id: "promo-eco-2",
    name: "Eco-friendly Gift Set - B",
    image: "https://picsum.photos/seed/promo-eco-2/600/400",
    price: 799,
  category: "promotional-gifts",
    subCategory: "eco",
    description: "Sustainable corporate gift options with branding.",
  },

  // PROMO - subCategory: premium
  {
    id: "promo-premium-1",
    name: "Premium Luxury Hamper - A",
    image: "https://picsum.photos/seed/promo-premium-1/600/400",
    price: 2999,
    originalPrice: 3499,
    category: "corporates",
    subCategory: "premium",
    description: "High-end premium hamper for executive gifting.",
  },
  // PROMO - subCategory: premium
  {
    id: "promo-premium-2",
    name: "Premium Luxury Hamper - B",
    image: "https://picsum.photos/seed/promo-premium-2/600/400",
    price: 3999,
  category: "promotional-gifts",
    subCategory: "premium",
    description: "Deluxe premium collection with assorted dryfruits and chocolates.",
  },

  // PROMO - subCategory: apparel
  {
    id: "promo-apparel-1",
    name: "Apparel & Wearable Pack - A",
    image: "https://picsum.photos/seed/promo-apparel-1/600/400",
    price: 899,
  category: "promotional-gifts",
    subCategory: "apparel",
    description: "Branded t-shirt/scarf promotional wearable.",
  },
  // PROMO - subCategory: apparel
  {
    id: "promo-apparel-2",
    name: "Apparel & Wearable Pack - B",
    image: "https://picsum.photos/seed/promo-apparel-2/600/400",
    price: 1299,
  category: "promotional-gifts",
    subCategory: "apparel",
    description: "Premium wearable set for corporate gifting.",
  },

  // === PROMOTIONAL ITEMS END ===

// === CORPORATE ITEMS (used by CorporateGifts page) START ===
// These product objects were added for the Corporate Gifts page and are grouped
// here so you can find and edit them easily. Each has `category: 'corporates'`
// and a `subCategory` value used by the corporate page strip.

// CORPORATE - subCategory: onboarding
{
  id: "corp-onboarding-1",
  name: "Employee Onboarding Kit - Starter",
  image: "https://picsum.photos/seed/corp-onboarding-1/600/400",
  price: 849,
  category: "corporates",
  subCategory: "onboarding",
  description: "Welcome kit for new employees: notebook, pen, and mug.",
},
{
  id: "corp-onboarding-2",
  name: "Employee Onboarding Kit - Pro",
  image: "https://picsum.photos/seed/corp-onboarding-2/600/400",
  price: 1299,
  category: "corporates",
  subCategory: "onboarding",
  description: "Premium onboarding kit with branded apparel and stationery.",
},

// CORPORATE - subCategory: anniversary
{
  id: "corp-anniversary-1",
  name: "Work Anniversary Gift - Classic",
  image: "https://picsum.photos/seed/corp-anniversary-1/600/400",
  price: 999,
  category: "corporates",
  subCategory: "anniversary",
  description: "Elegant anniversary hamper with sweets and a greeting card.",
},
{
  id: "corp-anniversary-2",
  name: "Work Anniversary Gift - Premium",
  image: "https://picsum.photos/seed/corp-anniversary-2/600/400",
  price: 1799,
  category: "corporates",
  subCategory: "anniversary",
  description: "Premium dry-fruit and chocolate hamper for milestone anniversaries.",
},

// CORPORATE - subCategory: festival
{
  id: "corp-festival-1",
  name: "Festival Hamper - A",
  image: "https://picsum.photos/seed/corp-festival-1/600/400",
  price: 1499,
  category: "corporates",
  subCategory: "festival",
  description: "Festive hamper suitable for corporate gifting during festivals.",
},
{
  id: "corp-festival-2",
  name: "Festival Hamper - B",
  image: "https://picsum.photos/seed/corp-festival-2/600/400",
  price: 2199,
  category: "corporates",
  subCategory: "festival",
  description: "Deluxe festival hamper with assorted sweets and decor.",
},

// CORPORATE - subCategory: funfriday
{
  id: "corp-funfriday-1",
  name: "Fun-Friday Hamper - Snacks",
  image: "https://picsum.photos/seed/corp-funfriday-1/600/400",
  price: 599,
  category: "corporates",
  subCategory: "funfriday",
  description: "Lightweight snack pack for office Fun-Friday activities.",
},
{
  id: "corp-funfriday-2",
  name: "Fun-Friday Hamper - Games",
  image: "https://picsum.photos/seed/corp-funfriday-2/600/400",
  price: 899,
  category: "corporates",
  subCategory: "funfriday",
  description: "Small games & treats bundle to boost team morale.",
},

// CORPORATE - subCategory: premium
{
  id: "corp-premium-1",
  name: "Premium Thank-you Hamper - A",
  image: "https://picsum.photos/seed/corp-premium-1/600/400",
  price: 2999,
  category: "corporates",
  subCategory: "premium",
  description: "Luxury thank-you hamper for VIP clients and executives.",
},
{
  id: "corp-premium-2",
  name: "Premium Thank-you Hamper - B",
  image: "https://picsum.photos/seed/corp-premium-2/600/400",
  price: 3999,
  category: "corporates",
  subCategory: "premium",
  description: "Executive hamper with dry fruits, chocolates and premium packaging.",
},

// CORPORATE - subCategory: partnership
{
  id: "corp-partnership-1",
  name: "Partnership Welcome Box - A",
  image: "https://picsum.photos/seed/corp-partnership-1/600/400",
  price: 1899,
  category: "corporates",
  subCategory: "partnership",
  description: "Welcome box for new partners with branded items.",
},
{
  id: "corp-partnership-2",
  name: "Partnership Welcome Box - B",
  image: "https://picsum.photos/seed/corp-partnership-2/600/400",
  price: 2499,
  category: "corporates",
  subCategory: "partnership",
  description: "Deluxe partner welcome kit with premium samples.",
},

// CORPORATE - subCategory: eco
{
  id: "corp-eco-1",
  name: "Eco Promotional Gift - A",
  image: "https://picsum.photos/seed/corp-eco-1/600/400",
  price: 699,
  category: "corporates",
  subCategory: "eco",
  description: "Eco-friendly corporate gifts with jute and sustainable items.",
},
{
  id: "corp-eco-2",
  name: "Eco Promotional Gift - B",
  image: "https://picsum.photos/seed/corp-eco-2/600/400",
  price: 999,
  category: "corporates",
  subCategory: "eco",
  description: "Sustainable gift set for corporate branding.",
},

// CORPORATE - subCategory: samples
{
  id: "corp-samples-1",
  name: "Product Samples / Launch Kit - A",
  image: "https://picsum.photos/seed/corp-samples-1/600/400",
  price: 1199,
  category: "corporates",
  subCategory: "samples",
  description: "Sample kit for product launches and demos.",
},
{
  id: "corp-samples-2",
  name: "Product Samples / Launch Kit - B",
  image: "https://picsum.photos/seed/corp-samples-2/600/400",
  price: 1599,
  category: "corporates",
  subCategory: "samples",
  description: "Extended launch kit with multiple product samples.",
},

// === CORPORATE ITEMS END ===

// === OCCASIONAL ITEMS (used by OccasionalGifts page) START ===
// These product objects were added for the Occasional Gifts page and are grouped
// here so you can find and edit them easily. Each has `category: 'occasional-gifts'`
// and a `subCategory` value used by the occasional page strip.

// OCCASIONAL - subCategory: wedding
{
  id: "occ-wedding-1",
  name: "Wedding Gourmet Hamper",
  image: "https://picsum.photos/seed/occ-wedding-1/600/400",
  price: 2499,
  category: "occasional-gifts",
  subCategory: "wedding",
  description: "A curated wedding hamper with sweets, dry fruits and a congratulatory card.",
},
{
  id: "occ-wedding-2",
  name: "Wedding Celebration Box",
  image: "https://picsum.photos/seed/occ-wedding-2/600/400",
  price: 2999,
  category: "occasional-gifts",
  subCategory: "wedding",
  description: "Premium wedding hamper with gourmet treats and keepsakes.",
},

// OCCASIONAL - subCategory: engagement
{
  id: "occ-engagement-1",
  name: "Engagement Celebration Box",
  image: "https://picsum.photos/seed/occ-engagement-1/600/400",
  price: 1799,
  category: "occasional-gifts",
  subCategory: "engagement",
  description: "Elegant snacks & keepsakes box for engagement parties.",
},
{
  id: "occ-engagement-2",
  name: "Engagement Keepsake Hamper",
  image: "https://picsum.photos/seed/occ-engagement-2/600/400",
  price: 2199,
  category: "occasional-gifts",
  subCategory: "engagement",
  description: "Keepsake hamper with personalized greeting and treats.",
},

// OCCASIONAL - subCategory: anniversary
{
  id: "occ-anniversary-1",
  name: "Anniversary Delight Hamper",
  image: "https://picsum.photos/seed/occ-anniversary-1/600/400",
  price: 1999,
  category: "occasional-gifts",
  subCategory: "anniversary",
  description: "Classic anniversary hamper with chocolates and dry fruits.",
},
{
  id: "occ-anniversary-2",
  name: "Anniversary Premium Hamper",
  image: "https://picsum.photos/seed/occ-anniversary-2/600/400",
  price: 2599,
  category: "occasional-gifts",
  subCategory: "anniversary",
  description: "Deluxe anniversary hamper with fine chocolates and wine.",
},

// OCCASIONAL - subCategory: baby-shower
{
  id: "occ-babyshower-1",
  name: "Baby Shower Gift Set",
  image: "https://picsum.photos/seed/occ-babyshower-1/600/400",
  price: 1299,
  category: "occasional-gifts",
  subCategory: "baby-shower",
  description: "Soft toys and pamper items curated for baby shower celebrations.",
},
{
  id: "occ-babyshower-2",
  name: "Baby Welcome Hamper",
  image: "https://picsum.photos/seed/occ-babyshower-2/600/400",
  price: 1599,
  category: "occasional-gifts",
  subCategory: "baby-shower",
  description: "Welcome hamper with baby essentials and a keepsake card.",
},

// OCCASIONAL - subCategory: mothers-day
{
  id: "occ-mothersday-1",
  name: "Mother's Day Pamper Box",
  image: "https://picsum.photos/seed/occ-mothersday-1/600/400",
  price: 999,
  category: "occasional-gifts",
  subCategory: "mothers-day",
  description: "A thoughtful pamper box to celebrate Mother's Day.",
},
{
  id: "occ-mothersday-2",
  name: "Mother's Day Deluxe Set",
  image: "https://picsum.photos/seed/occ-mothersday-2/600/400",
  price: 1499,
  category: "occasional-gifts",
  subCategory: "mothers-day",
  description: "Deluxe pamper set with beauty treats and a floral card.",
},

// OCCASIONAL - subCategory: fathers-day
{
  id: "occ-fathersday-1",
  name: "Father's Day Classic Kit",
  image: "https://picsum.photos/seed/occ-fathersday-1/600/400",
  price: 899,
  category: "occasional-gifts",
  subCategory: "fathers-day",
  description: "Grooming and snack set to appreciate dads on Father's Day.",
},
{
  id: "occ-fathersday-2",
  name: "Father's Day Premium Hamper",
  image: "https://picsum.photos/seed/occ-fathersday-2/600/400",
  price: 1299,
  category: "occasional-gifts",
  subCategory: "fathers-day",
  description: "Premium grooming hamper with artisanal snacks.",
},

// OCCASIONAL - subCategory: childrens-day
{
  id: "occ-childrensday-1",
  name: "Children's Day Fun Hamper",
  image: "https://picsum.photos/seed/occ-childrensday-1/600/400",
  price: 699,
  category: "occasional-gifts",
  subCategory: "childrens-day",
  description: "Playful treats and small toys for Children's Day.",
},
{
  id: "occ-childrensday-2",
  name: "Children's Party Pack",
  image: "https://picsum.photos/seed/occ-childrensday-2/600/400",
  price: 899,
  category: "occasional-gifts",
  subCategory: "childrens-day",
  description: "Party-friendly snacks and activity kits for kids.",
},

// OCCASIONAL - subCategory: friendship-day
{
  id: "occ-friendship-1",
  name: "Friendship Day Delight",
  image: "https://picsum.photos/seed/occ-friendship-1/600/400",
  price: 549,
  category: "occasional-gifts",
  subCategory: "friendship-day",
  description: "Small token gifts perfect for Friendship Day exchanges.",
},
{
  id: "occ-friendship-2",
  name: "Friendship Goodie Box",
  image: "https://picsum.photos/seed/occ-friendship-2/600/400",
  price: 799,
  category: "occasional-gifts",
  subCategory: "friendship-day",
  description: "Goodie box with treats and a message card for friends.",
},

// OCCASIONAL - subCategory: achievement
{
  id: "occ-achievement-1",
  name: "Achievement Celebration Pack",
  image: "https://picsum.photos/seed/occ-achievement-1/600/400",
  price: 1199,
  category: "occasional-gifts",
  subCategory: "achievement",
  description: "Congratulatory hamper for milestone achievements and wins.",
},
{
  id: "occ-achievement-2",
  name: "Achievement Premium Set",
  image: "https://picsum.photos/seed/occ-achievement-2/600/400",
  price: 1599,
  category: "occasional-gifts",
  subCategory: "achievement",
  description: "Premium congratulatory set with keepsakes and treats.",
},

// OCCASIONAL - subCategory: retirement
{
  id: "occ-retirement-1",
  name: "Retirement Farewell Hamper",
  image: "https://picsum.photos/seed/occ-retirement-1/600/400",
  price: 1899,
  category: "occasional-gifts",
  subCategory: "retirement",
  description: "Tasteful hamper to send off colleagues into retirement.",
},
{
  id: "occ-retirement-2",
  name: "Retirement Keepsake Box",
  image: "https://picsum.photos/seed/occ-retirement-2/600/400",
  price: 2299,
  category: "occasional-gifts",
  subCategory: "retirement",
  description: "A keepsake hamper with personalized items for retirees.",
},

// OCCASIONAL - subCategory: farewell
{
  id: "occ-farewell-1",
  name: "Farewell Keepsake Box",
  image: "https://picsum.photos/seed/occ-farewell-1/600/400",
  price: 799,
  category: "occasional-gifts",
  subCategory: "farewell",
  description: "A small keepsake and treats box to say goodbye warmly.",
},
{
  id: "occ-farewell-2",
  name: "Farewell Memories Hamper",
  image: "https://picsum.photos/seed/occ-farewell-2/600/400",
  price: 1199,
  category: "occasional-gifts",
  subCategory: "farewell",
  description: "Memory-filled hamper to send off teams and colleagues.",
},

// OCCASIONAL - subCategory: picnic-hampers
{
  id: "occ-picnic-1",
  name: "Picnic Hamper Essentials",
  image: "https://picsum.photos/seed/occ-picnic-1/600/400",
  price: 1499,
  category: "occasional-gifts",
  subCategory: "picnic-hampers",
  description: "A compact picnic hamper with snacks and a picnic blanket.",
},
{
  id: "occ-picnic-2",
  name: "Deluxe Picnic Hamper",
  image: "https://picsum.photos/seed/occ-picnic-2/600/400",
  price: 2199,
  category: "occasional-gifts",
  subCategory: "picnic-hampers",
  description: "Large picnic hamper with gourmet snacks and utensils.",
},

// === OCCASIONAL ITEMS END ===
];

export const topPicks: Product[] = products.slice(0, 8);

export function getById(id: string) {
  return products.find((p) => p.id === id);
}

export function listByCategory(cat?: string) {
  if (!cat) return products;
  return products.filter((p) => p.category === cat);
}

export function searchProducts(q: string) {
  const s = q.toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(s));
}
