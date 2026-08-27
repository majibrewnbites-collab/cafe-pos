export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }: any) {
  return (
    <div className="bg-white border-b border-cafe-200 px-6 py-3">
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-5 py-2.5 rounded-lg font-semibold whitespace-nowrap text-sm ${
              selectedCategory === cat.id
                ? 'bg-cafe-700 text-white shadow-md shadow-cafe-200'
                : 'bg-cafe-50 text-cafe-600 hover:bg-cafe-100 border border-cafe-200'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
