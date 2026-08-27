'use client'
import { clearAllOrders, formatDateKey, removeOrdersByDay, type Order } from '@/lib/orders'

type DayGroup = {
  dateKey: string
  label: string
  orders: Order[]
  total: number
  cashTotal: number
  qrTotal: number
  creditTotal: number
  cashCount: number
  qrCount: number
  creditCount: number
}

function groupByDay(orders: Order[]): DayGroup[] {
  const map = new Map<string, Order[]>()
  for (const order of orders) {
    const key = formatDateKey(new Date(order.createdAt))
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(order)
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([dateKey, dayOrders]) => {
      const sum = (m: string) =>
        dayOrders.filter((o) => o.method === m).reduce((s, o) => s + o.total, 0)
      const count = (m: string) => dayOrders.filter((o) => o.method === m).length
      return {
        dateKey,
        label: new Date(dayOrders[0].createdAt).toLocaleDateString('th-TH', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        orders: dayOrders,
        total: dayOrders.reduce((s, o) => s + o.total, 0),
        cashTotal: sum('cash'),
        qrTotal: sum('qr'),
        creditTotal: sum('credit'),
        cashCount: count('cash'),
        qrCount: count('qr'),
        creditCount: count('credit'),
      }
    })
}

export default function DailySummary({ orders, onChange }: { orders: Order[]; onChange: (orders: Order[]) => void }) {
  const groups = groupByDay(orders)

  const handleClearDay = (g: DayGroup) => {
    if (window.confirm(`ลบออเดอร์ของวันที่ ${g.dateKey} ทั้งหมด (${g.orders.length} บิล)?`)) {
      onChange(removeOrdersByDay(g.dateKey))
    }
  }

  const handleClearAll = () => {
    if (window.confirm('ลบข้อมูลการขายทั้งหมดถาวรหรือไม่?')) onChange(clearAllOrders())
  }

  if (groups.length === 0) {
    return (
      <div className="text-center text-cafe-400 mt-20">
        <p className="text-6xl mb-3 opacity-50">📊</p>
        <p className="font-medium">ยังไม่มีข้อมูลการขาย</p>
        <p className="text-sm mt-2 text-cafe-300">เริ่มขายเพื่อดูสรุปรายวันที่นี่</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-cafe-900">สรุปยอดขายรายวัน</h2>
          <p className="text-sm text-cafe-500 mt-1">{groups.length} วันที่มียอดขาย</p>
        </div>
        <button
          onClick={handleClearAll}
          className="text-sm px-4 py-2 rounded-lg bg-red-50 text-red-600 font-semibold hover:bg-red-100 border border-red-200"
        >
          🗑️ ล้างทั้งหมด
        </button>
      </div>
      {groups.map((g) => (
        <div key={g.dateKey} className="bg-white rounded-xl border border-cafe-200 overflow-hidden shadow-sm">
          <div className="bg-cafe-700 text-white p-5">
            <div className="flex justify-between items-center gap-2">
              <div>
                <h3 className="font-bold text-lg capitalize">{g.label}</h3>
                <p className="text-cafe-200 text-sm mt-1">{g.orders.length} ออเดอร์</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-cafe-200 text-xs">ยอดรวม</p>
                  <span className="text-2xl font-bold">{g.total}฿</span>
                </div>
                <button
                  onClick={() => handleClearDay(g)}
                  className="text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  title="ลบออเดอร์ของวันนี้"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-cafe-100">
            <div className="p-4 text-center">
              <p className="text-xs text-cafe-500 mb-1 font-medium">💵 เงินสด ({g.cashCount})</p>
              <p className="font-bold text-green-600 text-lg">{g.cashTotal}฿</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-cafe-500 mb-1 font-medium">📱 QR ({g.qrCount})</p>
              <p className="font-bold text-blue-600 text-lg">{g.qrTotal}฿</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-cafe-500 mb-1 font-medium">💳 บัตร ({g.creditCount})</p>
              <p className="font-bold text-purple-600 text-lg">{g.creditTotal}฿</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
