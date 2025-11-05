import { useParams, Link } from "react-router-dom";
import { getById, listByCategory } from "@/data/catalog";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";

function currency(n: number) {
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = useMemo(() => getById(String(id)), [id]);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="font-serif text-3xl">Product not found</h1>
        <p className="mt-2 text-muted-foreground">The product does not exist.</p>
        <Link to="/products" className="underline">Back to products</Link>
      </div>
    );
  }

  const related = listByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = () => {
    add(product, qty);
    setIsAdded(true); // disable button after adding
  };

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-accent">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <div>
          <h1 className="font-serif text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-2xl font-semibold">{currency(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">{currency(product.originalPrice!)}</span>
            )}
          </div>
          <div className="mt-4 text-bold whitespace-pre-line">
            {product.description}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border rounded-md">
              <button className="px-3 h-10" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <input
                className="w-12 h-10 text-center"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                type="number"
                min={1}
              />
              <button className="px-3 h-10" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <Button
              className="h-10 px-6"
              onClick={handleAddToCart}
              disabled={isAdded} 
            >
              {isAdded ? "Added ✅" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((r) => (
              <Link key={r.id} to={`/product/${r.id}`} className="block">
                <div className="aspect-square rounded-lg overflow-hidden bg-accent">
                  <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
                </div>
                <div className="mt-2 text-sm font-medium">{r.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
