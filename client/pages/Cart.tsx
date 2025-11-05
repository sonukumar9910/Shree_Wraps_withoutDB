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
            <button onClick={() => navigate("/checkout")}
              className="mt-6 w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium">
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
