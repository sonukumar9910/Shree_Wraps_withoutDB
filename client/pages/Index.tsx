import Hero from "@/components/site/Hero";
import ProductCard from "@/components/site/ProductCard";
import Testimonials from "@/components/site/Testimonials";
import { topPicks, products } from "@/data/catalog";
import { Link } from "react-router-dom";
import React from "react";
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

      {/* Showcase section: random products collage placed before testimonials */}
      <Showcase />

      {/* <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl md:text-3xl">Featured Collections</h2>
          <Link to="/products" className="text-sm underline">View all</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {topPicks.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section> */}

      {/* <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl md:text-3xl">Top Picks</h2>
          <AddRandom />
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {topPicks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section> */}

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

function Showcase() {
  // Randomize picks on each render: shuffle and take 6
  const shuffled = React.useMemo(() => {
    return [...products].sort(() => Math.random() - 0.5);
  }, []);
  const picks = shuffled.slice(0, 6);

  // grid-template-areas layout chosen to match the collage in the provided image.
  // Tweaked row heights and gaps to better match the look.
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "240px 240px 180px",
    gap: "18px",
    gridTemplateAreas: `
      "a b c"
      "a d c"
      "e d f"
    `,
  };

  const areas = ["a", "b", "c", "d", "e", "f"];

  return (
    <section className="container mx-auto py-8 md:py-12">
      <h2 className="font-serif text-2xl md:text-3xl text-center">Elegant Gifts for Every Celebration</h2>
      <p className="text-center text-muted-foreground mt-2 max-w-3xl mx-auto">Explore premium gift hampers thoughtfully curated to suit every occasion — with gourmet delights, elegant packaging, and a personal touch that makes every gift memorable.</p>

      <div className="mt-8" style={gridStyle}>
        {picks.map((p, idx) => (
          <div
            key={p.id}
            style={{ gridArea: areas[idx] }}
            className="relative overflow-hidden rounded-lg bg-gray-100 shadow-sm"
          >
            <Link to={`/product/${p.id}`} className="block w-full h-full">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />

              {/* White overlay bar centered near the top — matches the screenshot style */}
              <div className="absolute left-1/2 -translate-x-1/2 top-4">
                <div className="bg-white/80 px-6 py-2 rounded-sm shadow-md font-serif text-sm md:text-base text-center" style={{ minWidth: 160 }}>
                  {p.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
