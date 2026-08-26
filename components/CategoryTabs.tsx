export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }: any) {
  return (
    <div className="bg-white border-b px-4 py-2">
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap ${
              selectedCategory === cat.id
                ? `${cat.color} text-green-800 ring-2 ring-green-600`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}