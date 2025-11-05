import { useLocation, Link } from "react-router-dom";
import ProductCard from "@/components/site/ProductCard";
import { CATEGORIES, listByCategory, searchProducts } from "@/data/catalog";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Products() {
  const q = useQuery();
  const category = q.get("category") || undefined;
  const term = q.get("search") || "";

  const list = term
    ? searchProducts(term)
    : listByCategory(category);

  const title = term
    ? `Search: ${term}`
    : category
      ? CATEGORIES.find((c) => c.key === category)?.label || "Products"
      : "All Products";

  return (
    <div className="container mx-auto py-8 md:py-12 px-4">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <h1 className="font-serif text-2xl md:text-3xl">{title}</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        {CATEGORIES.map((c) => (
          <Link
            key={c.key}
            to={`/products?category=${c.key}`}
            className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition ${
              category === c.key
                ? "bg-primary text-primary-foreground"
                : "bg-accent hover:bg-accent/70"
            }`}
          >
            {c.label}
          </Link>
        ))}
        <Link
          to="/products"
          className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition ${
            !category && !term
              ? "bg-primary text-primary-foreground"
              : "bg-accent hover:bg-accent/70"
          }`}
        >
          All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="mt-10 text-center text-muted-foreground text-sm md:text-base">
          No products found.
        </p>
      )}
    </div>
  );
}
