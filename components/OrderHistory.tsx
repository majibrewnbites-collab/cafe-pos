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
      <div className="text-center text-cafe-400 mt-20">
        <p className="text-6xl mb-3 opacity-50">📋</p>
        <p className="font-medium">ยังไม่มีออเดอร์</p>
        <p className="text-sm mt-2 text-cafe-300">เริ่มขายเพื่อดูประวัติที่นี่</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-cafe-900">ประวัติออเดอร์</h2>
          <p className="text-sm text-cafe-500 mt-1">{orders.length} ออเดอร์ทั้งหมด</p>
        </div>
        <button
          onClick={handleClearAll}
          className="text-sm px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 border border-red-200"
        >
          🗑️ ล้างทั้งหมด
        </button>
      </div>
      <div className="space-y-3">
        {orders.map((order) => {
          const expanded = expandedId === order.id
          return (
            <div key={order.id} className="bg-white rounded-xl border border-cafe-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setExpandedId(expanded ? null : order.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-cafe-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-cafe-800">{formatOrderNo(order.orderNo)}</span>
                  <span className="text-sm text-cafe-500">
                    {new Date(order.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    order.method === 'cash' ? 'bg-green-100 text-green-700' : order.method === 'qr' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {methodLabel[order.method]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-cafe-700 text-lg">{order.total}฿</span>
                  <svg className={`w-5 h-5 text-cafe-400 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expanded && (
                <div className="border-t border-cafe-100 bg-cafe-50 p-4 space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start text-sm">
                      <div>
                        <span className="font-semibold text-cafe-800">{item.name}</span>
                        <span className="text-cafe-500 ml-2">x{item.quantity}</span>
                        {item.optionsText && (
                          <p className="text-xs text-cafe-500 mt-0.5">{item.optionsText}</p>
                        )}
                      </div>
                      <span className="font-medium text-cafe-700">{item.price * item.quantity}฿</span>
                    </div>
                  ))}
                  <div className="border-t border-cafe-200 pt-2 flex justify-between text-sm">
                    <span className="text-cafe-500">ยอดรวม</span>
                    <span className="font-bold text-cafe-800">{order.total}฿</span>
                  </div>
                  {order.method === 'cash' && order.received !== null && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-cafe-500">รับเงินมา</span>
                        <span className="text-cafe-700">{order.received}฿</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-cafe-500">เงินทอน</span>
                        <span className="font-bold text-green-600">{order.change}฿</span>
                      </div>
                    </>
                  )}
                  <div className="border-t border-cafe-200 pt-2 flex justify-end">
                    <button
                      onClick={() => handleDeleteOne(order.id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 border border-red-200"
                    >
                      🗑️ ลบ
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
