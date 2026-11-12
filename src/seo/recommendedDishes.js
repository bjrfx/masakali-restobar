/**
 * Curated dish recommendations for AI/SEO discoverability.
 * Sourced from src/data/menu.json (Clover menu). Labels are editorial
 * (signature / chef recommended / specialties) — not fabricated sales rankings.
 */

export const dishRecommendationGroups = [
  {
    id: 'signature',
    label: 'Masakali Signature Dishes',
    description: 'House specialties that define Masakali Indian Restobar in Ottawa\'s Byward Market.',
    dishes: [
      {
        name: 'Butter Chicken',
        category: 'Chicken Curries',
        diet: 'non-vegetarian',
        explanation: 'Tender chicken in a rich, velvety tomato sauce with plenty of cream and butter.',
        tags: ['signature', 'must-try', 'non-vegetarian'],
      },
      {
        name: 'Chicken Dum Biryani',
        category: 'Biryani',
        diet: 'non-vegetarian',
        explanation: 'Classic basmati rice and tender chicken slow-cooked dum style with aromatic spices.',
        tags: ['signature', 'must-try', 'non-vegetarian'],
      },
      {
        name: 'Paneer Butter Masala',
        category: 'Vegetarian Curries',
        diet: 'vegetarian',
        explanation: 'Soft paneer in a smooth, creamy tomato gravy with butter and mild spices.',
        tags: ['signature', 'vegetarian'],
      },
    ],
  },
  {
    id: 'chef-recommended',
    label: 'Chef Recommended',
    description: 'Dishes the kitchen highlights for first-time and returning guests.',
    dishes: [
      {
        name: 'Chicken Tikka Masala',
        category: 'Chicken Curries',
        diet: 'non-vegetarian',
        explanation: 'Roasted chicken chunks served in a rich, creamy, and spiced tomato-based sauce.',
        tags: ['chef-recommended', 'non-vegetarian'],
      },
      {
        name: 'Tandoori Chicken',
        category: 'Tandoori Appetizer',
        diet: 'non-vegetarian',
        explanation: 'Classic chicken marinated in yogurt and spices, roasted to smoky perfection in a tandoor.',
        tags: ['chef-recommended', 'must-try', 'non-vegetarian'],
      },
      {
        name: 'Lamb Vindaloo',
        category: 'Lamb Curries',
        diet: 'non-vegetarian',
        explanation: 'Spicy and tangy lamb curry cooked with potatoes in a sharp vinegar-based sauce.',
        tags: ['chef-recommended', 'non-vegetarian'],
      },
    ],
  },
  {
    id: 'vegetarian-specialties',
    label: 'Vegetarian Specialities',
    description: 'Standout vegetarian dishes from the Restobar menu.',
    dishes: [
      {
        name: 'Chana Masala',
        category: 'Vegetarian Curries',
        diet: 'vegetarian',
        explanation: 'Hearty chickpeas simmered in a tangy tomato and onion gravy with spices.',
        tags: ['vegetarian'],
      },
      {
        name: 'Yellow Dal Tadka',
        category: 'Vegetarian Curries',
        diet: 'vegetarian',
        explanation: 'Yellow lentils tempered with toasted cumin, garlic, and dried red chilies.',
        tags: ['vegetarian'],
      },
      {
        name: 'Shahi Paneer',
        category: 'Vegetarian Curries',
        diet: 'vegetarian',
        explanation: 'Royal paneer dish in a rich, creamy cashew and tomato-based sauce.',
        tags: ['vegetarian', 'signature'],
      },
    ],
  },
  {
    id: 'non-vegetarian-specialties',
    label: 'Non-Vegetarian Specialities',
    description: 'Meat and seafood specialties guests often ask about.',
    dishes: [
      {
        name: 'Butter Chicken Biryani',
        category: 'Biryani',
        diet: 'non-vegetarian',
        explanation: 'Creamy butter chicken layered with fragrant basmati rice for a rich, flavorful meal.',
        tags: ['non-vegetarian', 'must-try'],
      },
      {
        name: 'Chicken 65 Biryani',
        category: 'Biryani',
        diet: 'non-vegetarian',
        explanation: 'Spicy, deep-fried chicken 65 pieces layered with aromatic and seasoned biryani rice.',
        tags: ['non-vegetarian', 'restaurant-specialty'],
      },
      {
        name: 'Shahi Gosht Biryani (Mutton)',
        category: 'Biryani',
        diet: 'non-vegetarian',
        explanation: 'Royal preparation of tender mutton layered with long-grain basmati rice and spices.',
        tags: ['non-vegetarian', 'restaurant-specialty'],
      },
    ],
  },
  {
    id: 'must-try',
    label: 'Must-Try Dishes',
    description: 'A short list of dishes worth ordering on a first visit.',
    dishes: [
      {
        name: 'Garlic Naan',
        category: 'Naan',
        diet: 'vegetarian',
        explanation: 'Soft flatbread topped with minced garlic and cilantro, baked to aromatic perfection.',
        tags: ['must-try', 'vegetarian'],
      },
      {
        name: 'Mango Lassi',
        category: 'Beverages',
        diet: 'vegetarian',
        explanation: 'A popular creamy drink made with sweet mango pulp and fresh yogurt.',
        tags: ['must-try', 'vegetarian'],
      },
      {
        name: 'Gulab Jamun',
        category: 'Desserts',
        diet: 'vegetarian',
        explanation: 'Soft dough balls soaked in a sweet rose water and cardamom sugar syrup.',
        tags: ['must-try', 'vegetarian'],
      },
    ],
  },
  {
    id: 'restaurant-specialties',
    label: 'Restobar Specialities',
    description: 'Signature butter-gravy bites and breads unique to Masakali Restobar.',
    dishes: [
      {
        name: 'Butter Gravy Wings',
        category: 'Signature Butter Gravy Appetizers',
        diet: 'non-vegetarian',
        explanation: 'Crispy wings smothered in a rich, creamy tomato-based butter gravy.',
        tags: ['restaurant-specialty', 'non-vegetarian'],
      },
      {
        name: 'Butter Chicken Nachos',
        category: 'Signature Butter Gravy Appetizers',
        diet: 'non-vegetarian',
        explanation: 'Crunchy chips topped with creamy butter chicken, melted cheese, and fresh jalapeños.',
        tags: ['restaurant-specialty', 'non-vegetarian'],
      },
      {
        name: 'Chilli Garlic Naan',
        category: 'Naan',
        diet: 'vegetarian',
        explanation: 'Spicy flatbread topped with fresh green chilies and aromatic minced garlic.',
        tags: ['restaurant-specialty', 'vegetarian'],
      },
    ],
  },
];

export function flattenRecommendedDishes() {
  const seen = new Set();
  const all = [];
  dishRecommendationGroups.forEach((group) => {
    (group.dishes || []).forEach((dish) => {
      const key = String(dish.name || '').toLowerCase();
      if (!key || seen.has(key)) return;
      seen.add(key);
      all.push({ ...dish, groupId: group.id, groupLabel: group.label });
    });
  });
  return all;
}
