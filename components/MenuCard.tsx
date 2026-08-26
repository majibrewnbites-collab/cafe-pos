export default function MenuCard({ product, onSelect }: any) {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md hover:border-green-300 transition-all"
    >
      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-2">{product.nameTh}</p>
      <div className="text-green-600 font-bold text-xl">
        {product.basePrice}฿
      </div>
    </div>
  )
}