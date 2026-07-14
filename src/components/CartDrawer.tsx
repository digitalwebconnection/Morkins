export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQty, onRemove }: CartDrawerProps) {
  if (!isOpen) return null;

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark glass backdrop */}
        <div
          className="absolute inset-0 bg-brand-dark/40 backdrop-blur-xs transition-opacity animate-fade-in"
          onClick={onClose}
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 animate-slide-in-right">
            <div className="flex h-full flex-col bg-brand-cream shadow-2xl border-l border-brand-dark/10 text-brand-dark">
              <div className="flex-1 overflow-y-auto py-6 px-6">
                <div className="flex items-start justify-between border-b border-brand-dark/10 pb-5">
                  <h2 className="text-lg font-bold font-sans tracking-wide uppercase text-brand-dark" id="slide-over-title">
                    Shopping Bag ({cartCount})
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-brand-dark/60 hover:text-brand-dark outline-none cursor-pointer"
                      onClick={onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  {cartItems.length > 0 ? (
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-brand-dark/10">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-brand-dark/5 bg-brand-cream-dark">
                              <img
                                src={item.img}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-sm font-bold text-brand-dark">
                                  <h3>
                                    <a href={`#prod-${item.id}`}>{item.name}</a>
                                  </h3>
                                  <p className="ml-4">${(item.price * item.qty).toFixed(2)}</p>
                                </div>
                                <p className="mt-1 text-xs text-brand-dark/60 font-light">Individual Item</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-xs">
                                {/* Qty Selector */}
                                <div className="flex items-center border border-brand-dark/20 rounded-full bg-brand-cream-dark">
                                  <button
                                    onClick={() => onUpdateQty(item.id, -1)}
                                    className="px-2.5 py-1 text-brand-dark/70 hover:text-brand-dark font-bold cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="px-2 text-brand-dark font-bold font-sans">{item.qty}</span>
                                  <button
                                    onClick={() => onUpdateQty(item.id, 1)}
                                    className="px-2.5 py-1 text-brand-dark/70 hover:text-brand-dark font-bold cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => onRemove(item.id)}
                                    className="font-bold text-brand-dark/60 hover:text-brand-dark underline cursor-pointer"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <svg className="w-12 h-12 mx-auto text-brand-dark/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <p className="text-sm font-medium text-brand-dark/60">Your shopping bag is empty.</p>
                      <button
                        onClick={onClose}
                        className="mt-4 bg-brand-dark text-brand-cream px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-brand-dark/10 py-6 px-6 bg-brand-cream-dark">
                  <div className="flex justify-between text-base font-bold text-brand-dark">
                    <p>Subtotal</p>
                    <p>${cartSubtotal.toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-xs text-brand-dark/60 font-light">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <a
                      href="#checkout"
                      onClick={() => alert("Proceeding to checkout simulation!")}
                      className="flex items-center justify-center rounded-full border border-transparent bg-brand-dark px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-brand-cream shadow-md hover:bg-brand-light transition-all duration-300"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-4 flex justify-center text-center text-xs font-medium">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="font-bold underline   cursor-pointer"
                        onClick={onClose}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
