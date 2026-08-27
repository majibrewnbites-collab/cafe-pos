export default function MenuCard({ product, onSelect }: any) {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl border border-cafe-200 p-4 cursor-pointer hover:shadow-lg hover:border-cafe-400 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-bold text-base text-cafe-900">{product.name}</h3>
          <p className="text-cafe-500 text-sm">{product.nameTh}</p>
        </div>
        <span className="bg-cafe-100 text-cafe-700 px-3 py-1 rounded-full text-sm font-bold">
          {product.basePrice}฿
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-cafe-100">
        <span className="text-xs text-cafe-400 uppercase tracking-wide">แตะเพื่อสั่ง</span>
      </div>
    </div>
  )
}
