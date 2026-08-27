export default function Cart({
  cart,
  totalAmount,
  totalItems,
  onRemove,
  onUpdateQuantity,
  onCheckout,
  getOptionsText,
}: any) {
  return (
    <div className="w-96 bg-white border-l border-cafe-200 flex flex-col h-screen shadow-xl">
      <div className="p-5 bg-cafe-700 text-white">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛒</span>
          <h2 className="text-lg font-bold">ตะกร้าสินค้า</h2>
        </div>
        <p className="text-cafe-200 text-sm mt-1">{totalItems} รายการ</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <div className="text-center text-cafe-400 mt-16">
            <p className="text-5xl mb-3 opacity-50">🛒</p>
            <p className="font-medium">ยังไม่มีสินค้าในตะกร้า</p>
            <p className="text-xs mt-2 text-cafe-300">เลือกเมนูเพื่อเริ่มสั่ง</p>
          </div>
        ) : (
          cart.map((item: any) => (
            <div
              key={item.cartId}
              className="bg-cafe-50 rounded-xl p-3.5 border border-cafe-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-cafe-900">{item.name}</h4>
                  <p className="text-xs text-cafe-500">{item.nameTh}</p>
                  {getOptionsText(item) && (
                    <p className="text-xs text-cafe-600 mt-1 bg-cafe-100 px-2 py-0.5 rounded inline-block">
                      {getOptionsText(item)}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onRemove(item.cartId)}
                  className="text-cafe-400 hover:text-red-500 text-sm ml-2 w-6 h-6 rounded-full hover:bg-red-50 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.cartId, -1)}
                    className="w-8 h-8 rounded-lg bg-white border border-cafe-200 hover:bg-cafe-100 flex items-center justify-center font-bold text-cafe-600"
                  >
                    -
                  </button>
                  <span className="font-bold w-6 text-center text-cafe-900">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartId, 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-cafe-200 hover:bg-cafe-100 flex items-center justify-center font-bold text-cafe-600"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-cafe-700 text-lg">
                  {item.finalPrice * item.quantity}฿
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-cafe-200 p-5 bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="text-cafe-600 font-medium">รวมทั้งหมด</span>
          <span className="text-3xl font-bold text-cafe-800">{totalAmount}฿</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="w-full bg-cafe-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-cafe-800 disabled:bg-cafe-200 disabled:text-cafe-400 disabled:cursor-not-allowed shadow-lg shadow-cafe-200 transition-all"
        >
          ชำระเงิน ({totalItems} รายการ)
        </button>
      </div>
    </div>
  )
}
