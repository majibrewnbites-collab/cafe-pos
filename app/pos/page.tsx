'use client'
import { useEffect, useState } from 'react'
import {
  categories,
  products,
  toppings,
  waffleFlavors,
  waffleFillings,
  waffleToppings,
  waffleSauces,
} from '@/data/menu'
import CategoryTabs from '@/components/CategoryTabs'
import MenuCard from '@/components/MenuCard'
import Cart from '@/components/Cart'
import OrderHistory from '@/components/OrderHistory'
import DailySummary from '@/components/DailySummary'
import { createOrder, formatOrderNo, type Order, type PayMethod } from '@/lib/orders'

type View = 'menu' | 'history' | 'summary'

export default function POS() {
  const [selectedCategory, setSelectedCategory] = useState('coffee')
  const [cart, setCart] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [productOptions, setProductOptions] = useState<any>({})
  const [showCheckout, setShowCheckout] = useState(false)
  const [view, setView] = useState<View>('menu')
  const [orders, setOrders] = useState<Order[]>([])
  const [checkoutStep, setCheckoutStep] = useState<'method' | 'cash' | 'done'>('method')
  const [payMethod, setPayMethod] = useState<PayMethod>('cash')
  const [received, setReceived] = useState('')
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem('maji-cafe-orders') || '[]'))
  }, [])

  const filteredProducts = products.filter((p) => p.category === selectedCategory)

  const calculatePrice = (product: any, options: any) => {
    let price = product.basePrice

    // ราคาสIZE
    if (options.size && product.sizes) {
      price = product.sizes[options.size] || price
    }

    // วาฟเฟิลกลิ่น
    if (options.waffleFlavor) {
      const flavor = waffleFlavors.find((f) => f.id === options.waffleFlavor)
      if (flavor) price = flavor.price
    }

    // วาฟเฟิลไส้ (เลือกได้ 1-3 อย่าง)
    if (options.fillings) {
      options.fillings.forEach((fid: string) => {
        const filling = waffleFillings.find((f) => f.id === fid)
        if (filling) price += filling.price
      })
    }

    // วาฟเฟิลท็อปปิ้ง
    if (options.waffleTopping) {
      const topping = waffleToppings.find((t) => t.id === options.waffleTopping)
      if (topping) price += topping.price
    }

    // วาฟเฟิลซอส
    if (options.sauces) {
      options.sauces.forEach((sid: string) => {
        const sauce = waffleSauces.find((s) => s.id === sid)
        if (sauce) price += sauce.price
      })
    }

    // ท็อปปิ้งเครื่องดื่ม
    if (options.toppings) {
      options.toppings.forEach((tid: string) => {
        const topping = toppings.find((t) => t.id === tid)
        if (topping) price += topping.price
      })
    }

    // เลือกถ้วย +5
    if (options.addCup) price += 5

    // เลือกรสผลไม้
    // ราคาคงเดิม

    return price
  }

  const addToCart = (product: any, options: any) => {
    const cartItem = {
      ...product,
      cartId: Date.now(),
      quantity: 1,
      options,
      finalPrice: calculatePrice(product, options),
    }
    setCart([...cart, cartItem])
    setSelectedProduct(null)
    setProductOptions({})
  }

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter((item) => item.cartId !== cartId))
  }

  const updateQuantity = (cartId: number, delta: number) => {
    setCart(
      cart.map((item) => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta
          if (newQty <= 0) return item
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const receivedNum = Number(received) || 0
  const changeAmount = receivedNum - totalAmount

  const openCheckout = () => {
    setCheckoutStep('method')
    setReceived('')
    setLastOrder(null)
    setShowCheckout(true)
  }

  const completePayment = (method: PayMethod, recv: number | null, change: number | null) => {
    const order = createOrder({
      items: cart.map((item) => ({
        name: item.name,
        optionsText: getOptionsText(item),
        price: item.finalPrice,
        quantity: item.quantity,
      })),
      total: totalAmount,
      method,
      received: recv,
      change,
    })
    setLastOrder(order)
    setOrders((prev) => [order, ...prev])
    setCheckoutStep('done')
    setTimeout(() => {
      setCart([])
      setShowCheckout(false)
    }, 2500)
  }

  const pickMethod = (m: PayMethod) => {
    setPayMethod(m)
    if (m === 'cash') {
      setReceived('')
      setCheckoutStep('cash')
    } else {
      completePayment(m, null, null)
    }
  }

  const confirmCash = () => {
    if (receivedNum >= totalAmount && totalAmount > 0) {
      completePayment('cash', receivedNum, changeAmount)
    }
  }

  const getOptionsText = (item: any) => {
    const parts: string[] = []
    if (item.options?.size) {
      const sizeMap: any = { hot: 'ร้อน', cold: 'เย็น', smoothie: 'ปั่น' }
      parts.push(sizeMap[item.options.size] || item.options.size)
    }
    if (item.options?.roast) {
      parts.push(item.options.roast === 'dark' ? 'Dark' : 'Medium')
    }
    if (item.options?.fruitFlavor) {
      parts.push(item.options.fruitFlavor)
    }
    if (item.options?.waffleFlavor) {
      const f = waffleFlavors.find((x) => x.id === item.options.waffleFlavor)
      if (f) parts.push(`กลิ่น${f.nameTh}`)
    }
    if (item.options?.fillings?.length > 0) {
      const names = item.options.fillings.map((fid: string) => {
        const f = waffleFillings.find((x) => x.id === fid)
        return f?.nameTh || fid
      })
      parts.push(`ไส้: ${names.join(', ')}`)
    }
    if (item.options?.waffleTopping) {
      const t = waffleToppings.find((x) => x.id === item.options.waffleTopping)
      if (t) parts.push(`ท็อปปิ้ง: ${t.nameTh}`)
    }
    if (item.options?.sauces?.length > 0) {
      const names = item.options.sauces.map((sid: string) => {
        const s = waffleSauces.find((x) => x.id === sid)
        return s?.nameTh || sid
      })
      parts.push(`ซอส: ${names.join(', ')}`)
    }
    if (item.options?.toppings?.length > 0) {
      const names = item.options.toppings.map((tid: string) => {
        const t = toppings.find((x) => x.id === tid)
        return t?.nameTh || tid
      })
      parts.push(`ท็อปปิ้ง: ${names.join(', ')}`)
    }
    if (item.options?.addCup) parts.push('+ ถ้วย')
    return parts.join(' | ')
  }

  return (
    <div className="flex h-screen bg-cafe-50 font-sans">
      {/* ส่วนซ้าย - เมนู */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="bg-white shadow-sm p-4 border-b border-cafe-200 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cafe-700 rounded-xl flex items-center justify-center">
              <span className="text-xl">☕</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-cafe-900 whitespace-nowrap">MAJI CAFE &</h1>
              <h1 className="text-xl font-bold text-cafe-900 whitespace-nowrap">MARU WAFFLE AT HAYDAY</h1>
            </div>
          </div>
          <div className="flex gap-2">
            {([
              ['menu', '🧾 หน้าขาย'],
              ['history', '📋 ประวัติ'],
              ['summary', '📊 สรุปรายวัน'],
            ] as [View, string][]).map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  view === v
                    ? 'bg-cafe-700 text-white shadow-md shadow-cafe-200'
                    : 'bg-cafe-50 text-cafe-600 hover:bg-cafe-100 border border-cafe-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {view === 'menu' && (
          <>
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <MenuCard
                    key={product.id}
                    product={product}
                    onSelect={() => {
                      setSelectedProduct(product)
                      setProductOptions({})
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {view === 'history' && (
          <div className="flex-1 overflow-y-auto p-4">
            <OrderHistory orders={orders} onChange={setOrders} />
          </div>
        )}

        {view === 'summary' && (
          <div className="flex-1 overflow-y-auto p-4">
            <DailySummary orders={orders} onChange={setOrders} />
          </div>
        )}
      </div>

      {/* ส่วนขวา - ตะกร้า */}
      {view === 'menu' && (
        <Cart
          cart={cart}
          totalAmount={totalAmount}
          totalItems={totalItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={openCheckout}
          getOptionsText={getOptionsText}
        />
      )}

      {/* Modal เลือกตัวเลือก */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-cafe-200">
            <h2 className="text-2xl font-bold mb-1 text-cafe-900">
              {selectedProduct.name}
            </h2>
            <p className="text-cafe-500 mb-5">{selectedProduct.nameTh}</p>

            {/* เลือกขนาด (เครื่องดื่ม) */}
            {selectedProduct.sizes && !selectedProduct.isCustomizable && (
              <div className="mb-5">
                <h3 className="font-semibold mb-2 text-cafe-700">🌡️ เลือกอุณหภูมิ:</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.sizes.hot && (
                    <button
                      onClick={() => setProductOptions({ ...productOptions, size: 'hot' })}
                      className={`px-4 py-2 rounded-lg border font-medium ${
                        productOptions.size === 'hot'
                          ? 'bg-red-500 text-white border-red-500'
                          : 'bg-white text-cafe-700 border-cafe-200 hover:border-cafe-400'
                      }`}
                    >
                      🔥 ร้อน ({selectedProduct.sizes.hot}฿)
                    </button>
                  )}
                  {selectedProduct.sizes.cold && (
                    <button
                      onClick={() => setProductOptions({ ...productOptions, size: 'cold' })}
                      className={`px-4 py-2 rounded-lg border font-medium ${
                        productOptions.size === 'cold'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-cafe-700 border-cafe-200 hover:border-cafe-400'
                      }`}
                    >
                      🧊 เย็น ({selectedProduct.sizes.cold}฿)
                    </button>
                  )}
                  {selectedProduct.sizes.smoothie && (
                    <button
                      onClick={() => setProductOptions({ ...productOptions, size: 'smoothie' })}
                      className={`px-4 py-2 rounded-lg border font-medium ${
                        productOptions.size === 'smoothie'
                          ? 'bg-purple-500 text-white border-purple-500'
                          : 'bg-white text-cafe-700 border-cafe-200 hover:border-cafe-400'
                      }`}
                    >
                       ปั่น ({selectedProduct.sizes.smoothie}฿)
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Dark/Med สำหรับกาแฟ */}
            {selectedProduct.hasDarkMed && (
              <div className="mb-5">
                <h3 className="font-semibold mb-2 text-cafe-700">☕ ระดับความเข้ม:</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setProductOptions({ ...productOptions, roast: 'dark' })}
                    className={`px-4 py-2 rounded-lg border font-medium ${
                      productOptions.roast === 'dark'
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-white text-cafe-700 border-cafe-200 hover:border-cafe-400'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setProductOptions({ ...productOptions, roast: 'medium' })}
                    className={`px-4 py-2 rounded-lg border font-medium ${
                      productOptions.roast === 'medium'
                        ? 'bg-amber-700 text-white border-amber-700'
                        : 'bg-white text-cafe-700 border-cafe-200 hover:border-cafe-400'
                    }`}
                  >
                    Medium
                  </button>
                </div>
              </div>
            )}

            {/* เลือกรสผลไม้ */}
            {selectedProduct.hasFruitFlavors && (
              <div className="mb-5">
                <h3 className="font-semibold mb-2 text-cafe-700"> เลือกรสผลไม้:</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.fruitFlavors?.map((flavor: string) => (
                    <button
                      key={flavor}
                      onClick={() => setProductOptions({ ...productOptions, fruitFlavor: flavor })}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                        productOptions.fruitFlavor === flavor
                          ? 'bg-pink-500 text-white border-pink-500'
                          : 'bg-white text-cafe-700 border-cafe-200 hover:border-cafe-400'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ========== วาฟเฟิล ========== */}
            {selectedProduct.isCustomizable && (
              <>
                {/* Step 1: เลือกกลิ่น */}
                <div className="mb-5">
                  <h3 className="font-semibold mb-2 text-cafe-700">
                     Step 1: เลือกกลิ่นวาฟเฟิล
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {waffleFlavors.map((flavor) => (
                      <button
                        key={flavor.id}
                        onClick={() =>
                          setProductOptions({ ...productOptions, waffleFlavor: flavor.id })
                        }
                        className={`p-3 rounded-lg border text-sm ${
                          productOptions.waffleFlavor === flavor.id
                            ? 'border-cafe-600 bg-cafe-100 text-cafe-800 ring-2 ring-cafe-300'
                            : 'border-cafe-200 hover:border-cafe-400 text-cafe-700'
                        }`}
                      >
                        <div className="font-semibold">{flavor.nameTh}</div>
                        <div className="text-xs text-cafe-500">{flavor.price}฿</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: เลือกไส้ */}
                <div className="mb-5">
                  <h3 className="font-semibold mb-2 text-cafe-700">
                    🥜 Step 2: เลือกไส้ (1-3 อย่าง)
                    <span className="text-sm font-normal text-cafe-500 ml-2">
                      เลือกแล้ว: {(productOptions.fillings || []).length}/3
                    </span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {waffleFillings.map((filling) => {
                      const isSelected = (productOptions.fillings || []).includes(filling.id)
                      return (
                        <button
                          key={filling.id}
                          onClick={() => {
                            const current = productOptions.fillings || []
                            if (isSelected) {
                              setProductOptions({
                                ...productOptions,
                                fillings: current.filter((f: string) => f !== filling.id),
                              })
                            } else if (current.length < 3) {
                              setProductOptions({
                                ...productOptions,
                                fillings: [...current, filling.id],
                              })
                            } else {
                              alert('เลือกได้สูงสุด 3 อย่างเท่านั้น')
                            }
                          }}
                          className={`p-2 rounded-lg border text-xs ${
                            isSelected
                              ? 'border-cafe-600 bg-cafe-100 text-cafe-800 ring-2 ring-cafe-300'
                              : 'border-cafe-200 hover:border-cafe-400 text-cafe-700'
                          }`}
                        >
                          <div className="font-semibold">{filling.nameTh}</div>
                          <div className="text-cafe-500">+{filling.price}฿</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Step 3: เลือกท็อปปิ้ง */}
                <div className="mb-5">
                  <h3 className="font-semibold mb-2 text-cafe-700">
                    🍨 Step 3: เพิ่มท็อปปิ้ง
                  </h3>
                  <label className="flex items-center gap-2 mb-3 p-3 bg-cafe-50 rounded-lg border border-cafe-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productOptions.addCup || false}
                      onChange={(e) =>
                        setProductOptions({ ...productOptions, addCup: e.target.checked })
                      }
                      className="w-4 h-4 accent-cafe-600"
                    />
                    <span className="text-sm font-medium text-cafe-700">🥤 ยกใส่ถ้วย + Cup (+5฿)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {waffleToppings.map((topping) => (
                      <button
                        key={topping.id}
                        onClick={() =>
                          setProductOptions({
                            ...productOptions,
                            waffleTopping:
                              productOptions.waffleTopping === topping.id ? null : topping.id,
                          })
                        }
                        className={`p-2 rounded-lg border text-xs ${
                          productOptions.waffleTopping === topping.id
                            ? 'border-cafe-600 bg-cafe-100 text-cafe-800 ring-2 ring-cafe-300'
                            : 'border-cafe-200 hover:border-cafe-400 text-cafe-700'
                        }`}
                      >
                        <div className="font-semibold">{topping.nameTh}</div>
                        <div className="text-cafe-500">+{topping.price}฿</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: เลือกซอส */}
                <div className="mb-5">
                  <h3 className="font-semibold mb-2 text-cafe-700">🍫 Step 4: เพิ่มซอส</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {waffleSauces.map((sauce) => {
                      const isSelected = (productOptions.sauces || []).includes(sauce.id)
                      return (
                        <button
                          key={sauce.id}
                          onClick={() => {
                            const current = productOptions.sauces || []
                            if (isSelected) {
                              setProductOptions({
                                ...productOptions,
                                sauces: current.filter((s: string) => s !== sauce.id),
                              })
                            } else {
                              setProductOptions({
                                ...productOptions,
                                sauces: [...current, sauce.id],
                              })
                            }
                          }}
                          className={`p-2 rounded-lg border text-xs ${
                            isSelected
                              ? 'border-cafe-600 bg-cafe-100 text-cafe-800 ring-2 ring-cafe-300'
                              : 'border-cafe-200 hover:border-cafe-400 text-cafe-700'
                          }`}
                        >
                          <div className="font-semibold">{sauce.nameTh}</div>
                          <div className="text-cafe-500">+{sauce.price}฿</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Toppings สำหรับเครื่องดื่ม */}
            {!selectedProduct.isCustomizable && (
              <div className="mb-5">
                <h3 className="font-semibold mb-2 text-cafe-700">🍮 เพิ่มท็อปปิ้ง:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {toppings.map((topping) => {
                    const isSelected = (productOptions.toppings || []).includes(topping.id)
                    return (
                      <label
                        key={topping.id}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                          isSelected
                            ? 'border-cafe-600 bg-cafe-50'
                            : 'border-cafe-200 hover:bg-cafe-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            const current = productOptions.toppings || []
                            if (isSelected) {
                              setProductOptions({
                                ...productOptions,
                                toppings: current.filter((t: string) => t !== topping.id),
                              })
                            } else {
                              setProductOptions({
                                ...productOptions,
                                toppings: [...current, topping.id],
                              })
                            }
                          }}
                          className="w-4 h-4 accent-cafe-600"
                        />
                        <span className="flex-1 text-sm font-medium text-cafe-700">{topping.nameTh}</span>
                        <span className="text-cafe-500 text-sm">+{topping.price}฿</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ปุ่มและราคา */}
            <div className="border-t border-cafe-200 pt-4 mt-4 flex justify-between items-center sticky bottom-0 bg-white">
              <div>
                <span className="text-sm text-cafe-500">รวม:</span>
                <div className="text-3xl font-bold text-cafe-700">
                  {calculatePrice(selectedProduct, productOptions)}฿
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(null)
                    setProductOptions({})
                  }}
                  className="px-6 py-3 bg-cafe-100 text-cafe-600 rounded-xl font-semibold hover:bg-cafe-200 border border-cafe-200"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={() => addToCart(selectedProduct, productOptions)}
                  className="px-6 py-3 bg-cafe-700 text-white rounded-xl font-semibold hover:bg-cafe-800 shadow-lg shadow-cafe-200"
                >
                  ➕ เพิ่มในตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal ชำระเงิน */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-cafe-200">
            {checkoutStep === 'done' && lastOrder ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <p className="text-cafe-500 mb-1">ชำระเงินสำเร็จ — ออเดอร์</p>
                <p className="text-4xl font-bold text-cafe-800 mb-4">
                  {formatOrderNo(lastOrder.orderNo)}
                </p>
                <div className="bg-cafe-50 rounded-xl p-4 text-sm space-y-2 border border-cafe-100">
                  <div className="flex justify-between">
                    <span className="text-cafe-500">ยอดรวม</span>
                    <span className="font-bold text-cafe-800">{lastOrder.total}฿</span>
                  </div>
                  {lastOrder.method === 'cash' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-cafe-500">💵 ลูกค้าจ่ายมา</span>
                        <span className="font-bold text-cafe-800">{lastOrder.received}฿</span>
                      </div>
                      <div className="flex justify-between border-t border-cafe-200 pt-2">
                        <span className="text-cafe-500">💰 ต้องทอน</span>
                        <span className="font-bold text-green-600 text-lg">{lastOrder.change}฿</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : checkoutStep === 'cash' ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-cafe-900">💵 เงินสด</h2>
                <div className="bg-cafe-50 rounded-xl p-4 mb-4 flex justify-between items-center border border-cafe-100">
                  <span className="text-cafe-600">ยอดที่ต้องชำระ:</span>
                  <span className="font-bold text-cafe-700 text-2xl">{totalAmount}฿</span>
                </div>
                <label className="block text-sm font-semibold text-cafe-700 mb-1">
                  ลูกค้าจ่ายมา (บาท)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={received}
                  onChange={(e) => setReceived(e.target.value)}
                  placeholder="0"
                  autoFocus
                  className="w-full text-3xl font-bold text-right border border-cafe-200 rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-cafe-500 focus:border-cafe-500"
                />
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[totalAmount, 50, 100, 200, 500, 1000].map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setReceived(String(v))}
                      className="py-2.5 rounded-lg bg-cafe-50 text-cafe-700 font-semibold hover:bg-cafe-100 border border-cafe-200 transition-colors"
                    >
                      {i === 0 ? 'พอดี' : `${v}฿`}
                    </button>
                  ))}
                </div>
                {receivedNum > 0 && (
                  <div className={`rounded-xl p-4 mb-4 border ${
                    changeAmount >= 0 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-cafe-700">
                        {changeAmount >= 0 ? '💰 ต้องทอน' : 'ยังขาดอีก'}
                      </span>
                      <span className={`text-3xl font-bold ${changeAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(changeAmount)}฿
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setCheckoutStep('method')}
                    className="px-4 py-3 bg-cafe-100 text-cafe-600 rounded-xl font-semibold hover:bg-cafe-200 border border-cafe-200"
                  >
                    ย้อนกลับ
                  </button>
                  <button
                    onClick={confirmCash}
                    disabled={receivedNum < totalAmount}
                    className="flex-1 py-3 bg-cafe-700 text-white rounded-xl font-bold hover:bg-cafe-800 disabled:bg-cafe-200 disabled:text-cafe-400 disabled:cursor-not-allowed transition-all"
                  >
                    ✓ ยืนยันรับเงิน
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 text-cafe-900">💳 ชำระเงิน</h2>
                <div className="bg-cafe-50 rounded-xl p-4 mb-4 border border-cafe-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-cafe-600">จำนวนรายการ:</span>
                    <span className="font-bold text-cafe-800">{totalItems} รายการ</span>
                  </div>
                  <div className="flex justify-between text-xl">
                    <span className="font-semibold text-cafe-600">ยอดรวม:</span>
                    <span className="font-bold text-cafe-700 text-2xl">{totalAmount}฿</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => pickMethod('cash')}
                    className="w-full py-3.5 bg-cafe-700 text-white rounded-xl font-bold hover:bg-cafe-800 transition-colors"
                  >
                    💵 เงินสด
                  </button>
                  <button
                    onClick={() => pickMethod('qr')}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  >
                    📱 QR PromptPay
                  </button>
                  <button
                    onClick={() => pickMethod('credit')}
                    className="w-full py-3.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
                  >
                    💳 บัตรเครดิต
                  </button>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="w-full py-3 bg-cafe-100 text-cafe-600 rounded-xl font-semibold hover:bg-cafe-200 border border-cafe-200 transition-colors"
                  >
                    ยกเลิก
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}