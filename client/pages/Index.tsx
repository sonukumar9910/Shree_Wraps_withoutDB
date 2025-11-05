import Hero from "@/components/site/Hero";
import ProductCard from "@/components/site/ProductCard";
import Testimonials from "@/components/site/Testimonials";
import { topPicks } from "@/data/catalog";
import { Link } from "react-router-dom";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";

function AddRandom() {
  const { add } = useCart();
  return (
    <Button
      variant="outline"
      onClick={() => {
        const p = topPicks[Math.floor(Math.random() * topPicks.length)];
        add(p);
      }}
      className="h-9"
    >
      Add Random Product
    </Button>
  );
}

export default function Index() {
  return (
    <div>
      <Hero />

      <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl md:text-3xl">Featured Collections</h2>
          <Link to="/products" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {topPicks.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl md:text-3xl">Top Picks</h2>
          <AddRandom />
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {topPicks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="container mx-auto py-12">
        <div className="rounded-2xl border border-border bg-accent p-8 md:p-12 text-center">
          <h3 className="font-serif text-2xl">Bulk & Custom Orders</h3>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Planning corporate gifting or wedding hampers? We create bespoke packaging at scale.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}
