import { useMemo, useState, useEffect, useRef } from "react";
import ProductCard from "@/components/site/ProductCard";
import type { Product } from "@shared/api";
import { products as catalogProducts } from "@/data/catalog";
import { Link } from "react-router-dom";

const SUBCATS = [
  { key: "all", label: "All Occasional Gifts" },
  { key: "wedding", label: "Wedding Gifts" },
  { key: "engagement", label: "Engagement Gift" },
  { key: "anniversary", label: "Anniversary Gifts" },
  { key: "baby-shower", label: "Baby Shower Gifts" },
  { key: "mothers-day", label: "Mother’s Day Gift" },
  { key: "fathers-day", label: "Father’s Day Gift" },
  { key: "childrens-day", label: "Children’s Day Hampers" },
  { key: "friendship-day", label: "Friendship Day Gifts" },
  { key: "achievement", label: "Achievement Gifts" },
  { key: "retirement", label: "Retirement Gifts" },
  { key: "farewell", label: "Farewell Gifts" },
  { key: "picnic-hampers", label: "Picnic Hampers" },
];

export default function OccasionalGifts() {
  const [active, setActive] = useState("all");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  function scrollByOffset(offset: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  }

  const filtered = useMemo(() => {
    if (active === "all") return catalogProducts.filter((p) => p.category === "occasional-gifts");
    return catalogProducts.filter((p) => p.category === "occasional-gifts" && p.subCategory === active);
  }, [active]);

  // pagination
  const [page, setPage] = useState(1);
  const perPage = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => setPage(1), [active]);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl">Occasional Gifts</h1>
        <Link to="/contact" className="text-sm text-primary underline">Request a quote</Link>
      </div>

      {/* single-line horizontal slider for subcategory strip with nav buttons */}
      <div className="mb-6 relative">
        <div className="overflow-x-auto no-scrollbar pl-10 pr-10" ref={(el) => (scrollRef.current = el)}>
          <div className="inline-flex gap-3 py-2 px-1">
            {SUBCATS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium ${
                  active === s.key ? 'bg-primary text-primary-foreground' : 'bg-accent hover:bg-accent/80'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* left / right controls */}
        <button
          aria-label="Scroll left"
          onClick={() => scrollByOffset(-300)}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white border shadow flex items-center justify-center z-10"
        >
          ‹
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scrollByOffset(300)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white border shadow flex items-center justify-center z-10"
        >
          ›
        </button>
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
