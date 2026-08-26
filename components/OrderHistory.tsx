'use client'
import { useState } from 'react'
import { clearAllOrders, formatOrderNo, removeOrder, type Order, type PayMethod } from '@/lib/orders'

const methodLabel: Record<PayMethod, string> = {
  cash: '💵 เงินสด',
  qr: '📱 QR PromptPay',
  credit: '💳 บัตรเครดิต',
}

export default function OrderHistory({ orders, onChange }: { orders: Order[]; onChange: (orders: Order[]) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleDeleteOne = (id: string) => {
    if (window.confirm('ลบออเดอร์นี้?')) onChange(removeOrder(id))
  }

  const handleClearAll = () => {
    if (window.confirm('ลบออเดอร์ทั้งหมดถาวรหรือไม่?')) {
      onChange(clearAllOrders())
      setExpandedId(null)
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-20">
        <p className="text-6xl mb-3">📋</p>
        <p>ยังไม่มีออเดอร์</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">📋 ประวัติออเดอร์ ({orders.length})</h2>
        <button
          onClick={handleClearAll}
          className="text-sm px-3 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100"
        >
          🗑️ ล้างทั้งหมด
        </button>
      </div>
      {orders.map((order) => {
        const expanded = expandedId === order.id
        return (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setExpandedId(expanded ? null : order.id)}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-green-700">{formatOrderNo(order.orderNo)}</span>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.method === 'cash' ? 'bg-green-100 text-green-700' : order.method === 'qr' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {methodLabel[order.method]}
                </span>
              </div>
              <span className="font-bold text-green-600 text-lg">{order.total}฿</span>
            </button>

            {expanded && (
              <div className="border-t bg-gray-50 p-4 space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-start text-sm">
                    <div>
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-gray-500 ml-2">x{item.quantity}</span>
                      {item.optionsText && (
                        <p className="text-xs text-gray-500">{item.optionsText}</p>
                      )}
                    </div>
                    <span>{item.price * item.quantity}฿</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between text-sm">
                  <span className="text-gray-500">ยอดรวม</span>
                  <span className="font-bold">{order.total}฿</span>
                </div>
                {order.method === 'cash' && order.received !== null && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">รับเงินมา</span>
                      <span>{order.received}฿</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">เงินทอน</span>
                      <span className="font-bold text-green-600">{order.change}฿</span>
                    </div>
                  </>
                )}
                <div className="border-t pt-2 flex justify-end">
                  <button
                    onClick={() => handleDeleteOne(order.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100"
                  >
                    🗑️ ลบออเดอร์นี้
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
