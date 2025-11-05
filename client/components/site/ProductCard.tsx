import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { useToast } from "@/hooks/use-toast";

export type Product = import("@shared/api").Product;

export default function ProductCard({ product }: { product: Product }) {
  const { add, setQty, state } = useCart();
  const { toast } = useToast();

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discount = hasDiscount
    ? Math.round(((product.originalPrice as number) - product.price) / (product.originalPrice as number) * 100)
    : 0;

  const cartItem = state.items.find(item => item.id === product.id);
  const currentQty = cartItem?.qty || 0;

  const handleAddToCart = () => {
    add(product, 1);
    const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0) + 1;
    toast({
      title: "Added to Cart! 🛒",
      description: `Total items in cart: ${totalItems}`,
    });
  };

  const handleIncrement = () => {
    setQty(product.id, currentQty + 1);
    const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0) + 1;
    toast({
      title: "Updated Cart 🛒",
      description: `Total items in cart: ${totalItems}`,
    });
  };

  const handleDecrement = () => {
    if (currentQty > 0) {
      setQty(product.id, currentQty - 1);
      const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0) - 1;
      toast({
        title: "Updated Cart 🛒",
        description: `Total items in cart: ${totalItems}`,
      });
    }
  };

  return (
    <div className="group rounded-lg md:rounded-xl border border-border bg-white p-2 md:p-3 shadow-sm transition hover:shadow-md w-full">
      <div className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-accent">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {hasDiscount && (
            <span className="absolute left-2 md:left-3 top-2 md:top-3 rounded-full bg-primary text-primary-foreground text-[10px] md:text-[11px] px-2 py-1 shadow">
              -{discount}%
            </span>
          )}
        </div>
        <div className="mt-2 md:mt-3">
          <h3 className="text-xs md:text-sm font-medium line-clamp-2">{product.name}</h3>
          <div className="mt-1 md:mt-2 flex items-center gap-1 md:gap-2">
            <span className="text-sm md:text-base font-semibold">₹{product.price.toFixed(0)}</span>
            {hasDiscount && (
              <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                ₹{(product.originalPrice as number).toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 md:mt-3">
        {currentQty === 0 ? (
          <Button
            className="w-full h-8 md:h-9 text-xs md:text-sm"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between border rounded-md p-1.5 bg-primary/5">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 hover:bg-primary/20 rounded text-sm font-semibold transition"
            >
              −
            </button>
            <span className="text-sm font-bold text-primary">{currentQty}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 hover:bg-primary/20 rounded text-sm font-semibold transition"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
