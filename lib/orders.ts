export type OrderItem = {
  name: string
  optionsText?: string
  price: number
  quantity: number
}

export type PayMethod = 'cash' | 'qr' | 'credit'

export type Order = {
  id: string
  orderNo: number
  createdAt: string
  items: OrderItem[]
  total: number
  method: PayMethod
  received: number | null
  change: number | null
}

const ORDERS_KEY = 'maji-cafe-orders'

export function formatDateKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatOrderNo(no: number): string {
  return `#${String(no).padStart(3, '0')}`
}

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

export function saveOrder(order: Order) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...getOrders()]))
}

function nextOrderNo(now: Date): number {
  const key = `maji-order-counter-${formatDateKey(now)}`
  const current = Number(localStorage.getItem(key)) || 0
  const next = current + 1
  localStorage.setItem(key, String(next))
  return next
}

export function createOrder(data: Omit<Order, 'id' | 'orderNo' | 'createdAt'>): Order {
  const now = new Date()
  const orderNo = nextOrderNo(now)
  const order: Order = {
    ...data,
    id: `${formatDateKey(now)}-${String(orderNo).padStart(3, '0')}`,
    orderNo,
    createdAt: now.toISOString(),
  }
  saveOrder(order)
  return order
}

export function removeOrder(id: string): Order[] {
  const next = getOrders().filter((o) => o.id !== id)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
  return next
}

export function removeOrdersByDay(dateKey: string): Order[] {
  const next = getOrders().filter((o) => !o.id.startsWith(dateKey))
  localStorage.setItem(ORDERS_KEY, JSON.stringify(next))
  localStorage.removeItem(`maji-order-counter-${dateKey}`)
  return next
}

export function clearAllOrders(): Order[] {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k?.startsWith('maji-order-counter-')) keys.push(k)
  }
  keys.forEach((k) => localStorage.removeItem(k))
  localStorage.removeItem(ORDERS_KEY)
  return []
}
