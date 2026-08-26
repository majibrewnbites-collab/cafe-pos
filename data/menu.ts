// ========== หมวดหมู่ ==========
export const categories = [
  { id: 'coffee', name: 'Coffee', icon: '☕', color: 'bg-amber-100' },
  { id: 'tea', name: 'Tea', icon: '🍵', color: 'bg-green-100' },
  { id: 'matcha', name: 'Matcha/Green Tea', icon: '🍃', color: 'bg-emerald-100' },
  { id: 'more', name: 'More Drinks', icon: '🥤', color: 'bg-blue-100' },
  { id: 'waffle', name: 'Waffle', icon: '🧇', color: 'bg-orange-100' },
]

// ========== Toppings สำหรับเครื่องดื่ม ==========
export const toppings = [
  { id: 'caramel', name: 'Caramel', nameTh: 'คาราเมล', price: 10 },
  { id: 'whipped_cream', name: 'Whipped Cream', nameTh: 'วิปครีม', price: 30 },
  { id: 'whipped_cheese', name: 'Whipped Cheese', nameTh: 'วิปชีส', price: 30 },
  { id: 'honey_jelly', name: 'Honey Jelly', nameTh: 'ฮันนี่เจลลี่', price: 15 },
  { id: 'brown_sugar_jelly', name: 'Brown Sugar Jelly', nameTh: 'บราวน์ชูการ์เจลลี่', price: 15 },
  { id: 'mango_jelly', name: 'Mango Jelly', nameTh: 'มะม่วงเจลลี่', price: 15 },
  { id: 'coconut_jelly', name: 'Coconut Jelly', nameTh: 'มะพร้าวเจลลี่', price: 15 },
  { id: 'caramel_jelly', name: 'Caramel Jelly', nameTh: 'คาราเมลเจลลี่', price: 15 },
]

// ========== กลิ่นวาฟเฟิล (Step 1) ==========
export const waffleFlavors = [
  { id: 'vanilla', name: 'Vanilla', nameTh: 'วานิลลา', price: 69 },
  { id: 'chocolate', name: 'Chocolate', nameTh: 'ช็อกโกแลต', price: 69 },
  { id: 'charcoal', name: 'Charcoal', nameTh: 'ชาโคล', price: 69 },
  { id: 'strawberry', name: 'Strawberry', nameTh: 'สตรอเบอร์รี่', price: 69 },
  { id: 'brown_sugar', name: 'Brown Sugar', nameTh: 'น้ำตาลทรายแดง', price: 79 },
  { id: 'two_tone', name: 'Two Tone', nameTh: 'ทูโทน', price: 79 },
]

// ========== ไส้วาฟเฟิล (Step 2) - เลือกได้ 1-3 อย่าง ==========
export const waffleFillings = [
  // ราคา 15 บาท
  { id: 'corn', name: 'Corn', nameTh: 'ข้าวโพด', price: 15 },
  { id: 'banana', name: 'Banana', nameTh: 'กล้วย', price: 15 },
  { id: 'dark_choco_chips', name: 'Dark Chocolate Chips', nameTh: 'ดาร์กช็อกโกชิป', price: 15 },
  { id: 'white_choco_chips', name: 'White Chocolate Chips', nameTh: 'ไวท์ช็อกโกชิป', price: 15 },
  { id: 'raisin', name: 'Raisin', nameTh: 'ลูกเกด', price: 15 },
  { id: 'milo', name: 'Milo', nameTh: 'ไมโล', price: 15 },
  { id: 'cornflakes', name: 'Cornflakes', nameTh: 'คอร์นเฟลค', price: 15 },
  // ราคา 20 บาท
  { id: 'oreo', name: 'Oreo', nameTh: 'โอรีโอ', price: 20 },
  { id: 'ham', name: 'Ham', nameTh: 'แฮม', price: 20 },
  { id: 'grilled_cheese', name: 'Grilled Cheese', nameTh: 'กริลชีส', price: 20 },
  { id: 'dried_pork', name: 'Dried Shredded Pork', nameTh: 'หมูหยอง', price: 20 },
  { id: 'cashew_nuts', name: 'Cashew Nuts', nameTh: 'เม็ดมะม่วง', price: 20 },
  { id: 'almond', name: 'Almond', nameTh: 'อัลมอนด์', price: 20 },
  { id: 'sweet_egg_floss', name: 'Sweet Egg Floss', nameTh: 'ฝอยทอง', price: 20 },
]

// ========== ท็อปปิ้งวาฟเฟิล (Step 3) ==========
export const waffleToppings = [
  { id: 'whipped_cream', name: 'Whipped Cream', nameTh: 'วิปครีม', price: 30 },
  { id: 'vanilla_ice', name: 'Vanilla Ice Cream', nameTh: 'วานิลลาไอศกรีม', price: 30 },
  { id: 'choco_ice', name: 'Chocolate Ice Cream', nameTh: 'ช็อกโกแลตไอศกรีม', price: 30 },
  { id: 'strawberry_ice', name: 'Strawberry Ice Cream', nameTh: 'สตรอเบอร์รี่ไอศกรีม', price: 30 },
  { id: 'rainbow_ice', name: 'Rainbow Ice Cream', nameTh: 'เรนโบว์ไอศกรีม', price: 30 },
  { id: 'choco_chips_ice', name: 'Chocolate Chips Ice Cream', nameTh: 'ช็อกโกชิปไอศกรีม', price: 30 },
  { id: 'cookie_cream_ice', name: 'Cookie & Cream Ice Cream', nameTh: 'คุกกี้&ครีมไอศกรีม', price: 30 },
  { id: 'green_tea_ice', name: 'Green Tea Ice Cream', nameTh: 'ชาเขียวไอศกรีม', price: 30 },
  { id: 'lime_ice', name: 'Lime Ice Cream', nameTh: 'มะนาวไอศกรีม', price: 30 },
]

// ========== ซอสวาฟเฟิล (Step 4) ==========
export const waffleSauces = [
  { id: 'nutella', name: 'Nutella', nameTh: 'นูเทลล่า', price: 20 },
  { id: 'peanut_butter', name: 'Peanut Butter', nameTh: 'เนยถั่ว', price: 20 },
  { id: 'cheese_sauce', name: 'Cheese Sauce', nameTh: 'ชีสซอส', price: 20 },
  { id: 'mayonnaise', name: 'Mayonnaise', nameTh: 'มายองเนส', price: 10 },
  { id: 'chili_paste', name: 'Chili Paste', nameTh: 'น้ำพริกเผา', price: 10 },
  { id: 'caramel', name: 'Caramel', nameTh: 'คาราเมล', price: 10 },
  { id: 'chocolate', name: 'Chocolate', nameTh: 'ช็อกโกแลต', price: 10 },
  { id: 'strawberry', name: 'Strawberry', nameTh: 'สตรอเบอร์รี่', price: 10 },
  { id: 'condensed_milk', name: 'Sweetened Condensed Milk', nameTh: 'นมข้นหวาน', price: 10 },
]

// ========== รสผลไม้ ==========
export const fruitFlavors = ['Orange (ส้ม)', 'Yuzu (ยูซุ)', 'Mango (มะม่วง)', 'Lychee (ลิ้นจี่)', 'Strawberry (สตรอเบอร์รี่)']

// ========== เมนูทั้งหมด ==========
export const products = [
  // ===== Coffee =====
  {
    id: 1,
    category: 'coffee',
    name: 'Americano',
    nameTh: 'อเมริกาโน่',
    basePrice: 70,
    sizes: { hot: 70, cold: 75, smoothie: 85 },
    hasDarkMed: true,
  },
  {
    id: 2,
    category: 'coffee',
    name: 'Honey Lemon Americano',
    nameTh: 'อเมริกาโน่น้ำผึ้งมะนาว',
    basePrice: 75,
    sizes: { cold: 75 },
  },
  {
    id: 3,
    category: 'coffee',
    name: 'Coconut Americano',
    nameTh: 'อเมริกาโน่น้ำมะพร้าว',
    basePrice: 90,
    sizes: { cold: 90 },
  },
  {
    id: 4,
    category: 'coffee',
    name: 'Orange/Yuzu Americano',
    nameTh: 'อเมริกาโน่ส้ม/ยูซุ',
    basePrice: 85,
    sizes: { cold: 85 },
  },
  {
    id: 5,
    category: 'coffee',
    name: 'Espresso',
    nameTh: 'เอสเปรสโซ่',
    basePrice: 55,
    sizes: { hot: 55, cold: 70, smoothie: 75 },
    hasDarkMed: true,
  },
  {
    id: 6,
    category: 'coffee',
    name: 'Latte',
    nameTh: 'ลาเต้',
    basePrice: 85,
    sizes: { hot: 85, cold: 90, smoothie: 95 },
    hasDarkMed: true,
  },
  {
    id: 7,
    category: 'coffee',
    name: 'Caramel Macchiato',
    nameTh: 'คาราเมลมัคคิอาโต้',
    basePrice: 85,
    sizes: { hot: 85, cold: 90, smoothie: 95 },
    hasDarkMed: true,
  },

  // ===== Tea =====
  {
    id: 8,
    category: 'tea',
    name: 'Thai Tea',
    nameTh: 'ชาไทย',
    basePrice: 60,
    sizes: { hot: 60, cold: 65, smoothie: 70 },
  },
  {
    id: 9,
    category: 'tea',
    name: 'Honey Lemon Tea',
    nameTh: 'ชาน้ำผึ้งมะนาว',
    basePrice: 65,
    sizes: { cold: 65, smoothie: 70 },
  },
  {
    id: 10,
    category: 'tea',
    name: 'Fruity Tea',
    nameTh: 'ชาผลไม้',
    basePrice: 75,
    sizes: { cold: 75, smoothie: 80 },
    hasFruitFlavors: true,
    fruitFlavors: fruitFlavors,
  },

  // ===== Matcha / Green Tea =====
  {
    id: 11,
    category: 'matcha',
    name: 'Matcha Latte',
    nameTh: 'มัทฉะลาเต้',
    basePrice: 80,
    sizes: { hot: 80, cold: 85, smoothie: 90 },
  },
  {
    id: 12,
    category: 'matcha',
    name: 'Pure Matcha',
    nameTh: 'เพียวมัทฉะ',
    basePrice: 70,
    sizes: { cold: 70, smoothie: 75 },
  },
  {
    id: 13,
    category: 'matcha',
    name: 'Coconut Matcha',
    nameTh: 'มัทฉะน้ำมะพร้าว',
    basePrice: 90,
    sizes: { cold: 90 },
  },
  {
    id: 14,
    category: 'matcha',
    name: 'Green Tea',
    nameTh: 'ชาเขียวนม',
    basePrice: 65,
    sizes: { hot: 65, cold: 70, smoothie: 75 },
  },

  // ===== More Drinks =====
  {
    id: 15,
    category: 'more',
    name: 'Pinky Milk',
    nameTh: 'นมชมพู',
    basePrice: 60,
    sizes: { cold: 60, smoothie: 65 },
  },
  {
    id: 16,
    category: 'more',
    name: 'Honey Lemon Soda',
    nameTh: 'น้ำผึ้งมะนาวโซดา',
    basePrice: 60,
    sizes: { cold: 60, smoothie: 65 },
  },
  {
    id: 17,
    category: 'more',
    name: 'Red Lime Soda',
    nameTh: 'แดงมะนาวโซดา',
    basePrice: 60,
    sizes: { cold: 60 },
  },
  {
    id: 18,
    category: 'more',
    name: 'Fruity Soda',
    nameTh: 'โซดาผลไม้',
    basePrice: 65,
    sizes: { cold: 65 },
    hasFruitFlavors: true,
    fruitFlavors: fruitFlavors,
  },
  {
    id: 19,
    category: 'more',
    name: 'Cocoa',
    nameTh: 'โกโก้',
    basePrice: 65,
    sizes: { hot: 65, cold: 70, smoothie: 75 },
  },

  // ===== Waffle =====
  {
    id: 20,
    category: 'waffle',
    name: 'Mini Waffle',
    nameTh: 'วาฟเฟิลธรรมดา (Mini)',
    basePrice: 39,
    isCustomizable: true,
  },
  {
    id: 21,
    category: 'waffle',
    name: 'Large Waffle',
    nameTh: 'วาฟเฟิลใหญ่ (Large)',
    basePrice: 70,
    isCustomizable: true,
  },
  {
    id: 22,
    category: 'waffle',
    name: 'Waffle Tray 6pcs',
    nameTh: 'วาฟเฟิลถาด 6 ชิ้น',
    basePrice: 250,
  },
  {
    id: 23,
    category: 'waffle',
    name: 'Waffle Tray 4pcs',
    nameTh: 'วาฟเฟิลถาด 4 ชิ้น',
    basePrice: 280,
  },
]