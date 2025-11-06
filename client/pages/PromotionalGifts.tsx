import { useMemo, useState, useEffect } from "react";
import ProductCard from "@/components/site/ProductCard";
import type { Product } from "@shared/api";
import { products as catalogProducts } from "@/data/catalog";
import { Link } from "react-router-dom";

const SUBCATS = [
  { key: "all", label: "All Promotional Gifts" },
  { key: "everyday", label: "Everyday Utility Gifts" },
  { key: "travel", label: "Travel & Outdoor Gifts" },
  { key: "lifestyle", label: "Lifestyle & Personal Care" },
  { key: "eco", label: "Eco-friendly Gifts" },
  { key: "premium", label: "Premium & Luxury Gifts" },
  { key: "apparel", label: "Apparel & Wearable" },
];

// We now rely on the explicit `subCategory` field on product objects.

export default function PromotionalGifts() {
  const [active, setActive] = useState("all");

  // Use real catalog products for promotional gifts
  const filtered = useMemo(() => {
    // Only show items that belong to the promotional-gifts category
    if (active === "all") {
      return catalogProducts.filter((p) => (p.category === "promotional-gifts"));
    }
    return catalogProducts.filter((p) => (p.subCategory === active) && p.category === "promotional-gifts");
  }, [active]);

  // pagination state
  const [page, setPage] = useState(1);
  const perPage = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  // reset page when active changes
  useEffect(() => {
    setPage(1);
  }, [active]);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl">Promotional Gifts</h1>
        <Link to="/contact" className="text-sm text-primary underline">Request a quote</Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {SUBCATS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${active === s.key ? 'bg-primary text-primary-foreground' : 'bg-accent hover:bg-accent/80'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          No products found for "{SUBCATS.find((s) => s.key === active)?.label}".
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* pagination controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded ${page === idx + 1 ? 'bg-primary text-primary-foreground' : 'border'}`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
