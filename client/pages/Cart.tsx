import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/cart";

function currency(n: number) {
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export default function Cart() {
  const { state, setQty, remove, subtotal, total } = useCart();
  const navigate = useNavigate();

  const items = state.items;

  return (
    <div className="container mx-auto py-12">
      <h1 className="font-serif text-3xl text-center">Cart</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          Your cart is empty. <Link to="/products" className="underline">Browse products</Link>.
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="sr-only">Remove</th>
                  <th className="sr-only">Image</th>
                  <th className="py-3 text-xs uppercase tracking-wide">Product</th>
                  <th className="py-3 text-xs uppercase tracking-wide">Price</th>
                  <th className="py-3 text-xs uppercase tracking-wide">Quantity</th>
                  <th className="py-3 text-xs uppercase tracking-wide">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-b">
                    <td className="py-4 pr-3 align-middle">
                      <button onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`} className="text-muted-foreground hover:text-foreground">×</button>
                    </td>
                    <td className="py-4 pr-3 align-middle">
                      <img src={i.image} alt={i.name} className="w-16 h-16 rounded object-cover" />
                    </td>
                    <td className="py-4 pr-3 align-middle">
                      <Link to={`/product/${i.id}`} className="hover:underline">{i.name}</Link>
                    </td>
                    <td className="py-4 pr-3 align-middle">{currency(i.price)}</td>
                    <td className="py-4 pr-3 align-middle">
                      <input
                        type="number"
                        min={0}
                        value={i.qty}
                        onChange={(e) => setQty(i.id, Math.max(0, Number(e.target.value)))}
                        className="h-10 w-16 text-center border rounded"
                      />
                    </td>
                    <td className="py-4 pr-3 align-middle">{currency(i.price * i.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="h-fit rounded-xl border p-6">
            <h2 className="font-medium text-lg">Cart totals</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{currency(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Shipping</dt><dd>Calculated at checkout</dd></div>
              <div className="flex justify-between text-base font-semibold"><dt>Total</dt><dd>{currency(total)}</dd></div>
            </dl>

            {/* Order options: WhatsApp or Email */}
            <div className="mt-4 space-y-3">
              <a
                onClick={() => {
                  const orderText = items.map((i) => `${i.name} (Qty: ${i.qty})`).join("\n");
                  const msg = `Hi! I'd like to place an order:\n\n${orderText}\n\nTotal: ${currency(total)}`;
                  const whatsapp = `https://wa.me/917292871937?text=${encodeURIComponent(msg)}`;
                  window.open(whatsapp, "_blank");
                }}
                className="w-full block h-11 rounded-md bg-green-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.56.934-2.846 2.359-3.652 4.425-.806 2.067-.629 4.487.39 6.721 1.02 2.234 2.944 3.888 5.235 4.391.92.173 1.862.27 2.8.27a9.947 9.947 0 008.916-5.031c2.33-3.519 2.756-8.736.074-12.414-1.19-1.917-3.596-3.222-5.73-3.635-.556-.1-1.116-.15-1.674-.15z" />
                </svg>
                Order via WhatsApp
              </a>

              {/* New: Place order via Email (user requested exact subject/body/email) */}
              <a
                href={(() => {
                  // Build a readable body containing each item, quantity and per-item amount
                  const lines = items.map((i) => `${i.name} - Qty: ${i.qty} - Amount: ₹${(i.price * i.qty).toLocaleString("en-IN")}`);
                  const bodyText = `Hey i just wanted to order something:\n\n${lines.join("\n")}\n\nTotal: ₹${total.toLocaleString("en-IN")}`;
                  const subject = "Hey i just wanted to order something";
                  return `mailto:Shree.wraps@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
                })()}
                className="w-full block h-11 rounded-md bg-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                Place order via Email
              </a>

              {/* legacy/supplementary email button kept for backward compatibility (optional) */}
              <a
                href={(() => {
                  const orderText = items.map((i) => `${i.name} (Qty: ${i.qty}) - ₹${(i.price * i.qty).toLocaleString("en-IN")}`).join("%0A");
                  const body = `I would like to order the following items:%0A%0A${orderText}%0A%0ATotal: ${encodeURIComponent(currency(total))}`;
                  return `mailto:shree.Wraps@gmail.com?subject=${encodeURIComponent("I want to Order Something")}&body=${body}`;
                })()}
                className="w-full block h-11 rounded-md border border-blue-600 text-blue-600 text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition"
              >
                Email order (alternate)
              </a>
            </div>

            <p className="mt-4 text-xs md:text-sm text-muted-foreground text-center">
              Choose WhatsApp to place the order instantly, or Email us and we'll follow up.
            </p>

            <Link 
              to="/products" 
              className="mt-4 w-full h-11 rounded-md border border-border text-sm font-medium flex items-center justify-center hover:bg-accent transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
