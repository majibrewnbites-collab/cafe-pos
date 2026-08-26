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
    <div className="w-96 bg-white border-l flex flex-col h-screen">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">🛒 ตะกร้าสินค้า</h2>
        <p className="text-sm text-gray-500">{totalItems} รายการ</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p className="text-5xl mb-2">🛒</p>
            <p>ยังไม่มีสินค้าในตะกร้า</p>
            <p className="text-xs mt-1">เลือกเมนูเพื่อเริ่มสั่ง</p>
          </div>
        ) : (
          cart.map((item: any) => (
            <div
              key={item.cartId}
              className="bg-gray-50 rounded-lg p-3 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.nameTh}</p>
                  {getOptionsText(item) && (
                    <p className="text-xs text-blue-600 mt-1">{getOptionsText(item)}</p>
                  )}
                </div>
                <button
                  onClick={() => onRemove(item.cartId)}
                  className="text-red-500 text-xs hover:underline ml-2"
                >
                  ✕
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item.cartId, -1)}
                    className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartId, 1)}
                    className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold text-green-600">
                  {item.finalPrice * item.quantity}฿
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t p-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">รวมทั้งหมด:</span>
          <span className="text-3xl font-bold text-green-600">{totalAmount}฿</span>
        </div>
        <button
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-green-200"
        >
          💳 ชำระเงิน ({totalItems} รายการ)
        </button>
      </div>
    </div>
  )
}