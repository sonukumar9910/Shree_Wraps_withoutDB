import { useCart } from "@/context/cart";
import { Link } from "react-router-dom";

function currency(n: number) {
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export default function Checkout() {
  const { state, subtotal, total, clear } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="font-serif text-3xl text-center">Your Cart</h1>
        <div className="mt-8 rounded-xl border border-dashed p-8 text-center text-muted-foreground max-w-md mx-auto">
          <p className="mb-4">Your cart is empty.</p>
          <Link to="/products" className="inline-block rounded-md bg-primary text-primary-foreground px-6 py-2 text-sm font-medium hover:bg-primary/90">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const orderText = state.items
    .map((i) => `${i.name} (Qty: ${i.qty})`)
    .join("\n");

  const whatsappLink = `https://wa.me/917292871937?text=${encodeURIComponent(
    `Hi! I'd like to place an order:\n\n${orderText}\n\nTotal: ${currency(total)}`
  )}`;

  return (
    <div className="container mx-auto py-8 md:py-12 px-4">
      <h1 className="font-serif text-2xl md:text-3xl text-center mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 overflow-x-auto">
          <div className="min-w-full">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-semibold">Product</th>
                  <th className="py-3 text-right font-semibold">Price</th>
                  <th className="py-3 text-right font-semibold">Qty</th>
                  <th className="py-3 text-right font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {state.items.map((i) => (
                  <tr key={i.id} className="border-b hover:bg-accent/50 transition">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={i.image} 
                          alt={i.name} 
                          className="w-12 h-12 md:w-16 md:h-16 rounded object-cover" 
                        />
                        <span className="font-medium text-sm md:text-base line-clamp-2">{i.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">{currency(i.price)}</td>
                    <td className="py-4 text-right">{i.qty}</td>
                    <td className="py-4 text-right font-semibold">{currency(i.price * i.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-xl border p-4 md:p-6 bg-accent/30 sticky top-4">
          <h2 className="font-semibold text-lg md:text-xl mb-4">Order Summary</h2>
          
          <dl className="space-y-2 md:space-y-3 text-sm md:text-base border-b pb-4 mb-4">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{currency(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">TBD</dd>
            </div>
          </dl>

          <div className="mb-6 flex justify-between text-base md:text-lg font-semibold">
            <dt>Total</dt>
            <dd>{currency(total)}</dd>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-md bg-green-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-700 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.56.934-2.846 2.359-3.652 4.425-.806 2.067-.629 4.487.39 6.721 1.02 2.234 2.944 3.888 5.235 4.391.92.173 1.862.27 2.8.27a9.947 9.947 0 008.916-5.031c2.33-3.519 2.756-8.736.074-12.414-1.19-1.917-3.596-3.222-5.73-3.635-.556-.1-1.116-.15-1.674-.15z" />
            </svg>
            Order via WhatsApp
          </a>

          {/* Email order button: opens mail client with item list, qty and amounts */}
          <a
            href={(() => {
              const lines = state.items.map((i) => `${i.name} - Qty: ${i.qty} - Amount: ₹${(i.price * i.qty).toLocaleString("en-IN")}`);
              const body = `Hey i just wanted to order something:\n\n${lines.join("\n\n")}\n\nTotal: ₹${total.toLocaleString("en-IN")}`;
              const subject = "Hey i just wanted to order something";
              return `mailto:Shree.wraps@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            })()}
            className="mt-3 w-full h-11 rounded-md bg-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            Place order via Email
          </a>

          <p className="mt-4 text-xs md:text-sm text-muted-foreground text-center">
            Use WhatsApp for instant confirmation or Email us and we'll follow up.
          </p>

          <Link 
            to="/products" 
            className="mt-4 w-full h-11 rounded-md border border-border text-sm font-medium flex items-center justify-center hover:bg-accent transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
