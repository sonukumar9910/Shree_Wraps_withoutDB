import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, ShoppingCart, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { products as catalogProducts } from "@/data/catalog";

const categories = [
  { name: "Promotional Gifts", path: "/promotional-gifts" },
  { name: "Corporate Gifts", path: "/corporate-gifts" },
  { name: "Festival Gifts", path: "/products?category=gift-packs" },
  { name: "Occasional Gifts", path: "/occasional-gifts" },
  { name: "Charity Gifts", path: "/charity-gifts" },
];

function CartBadge() {
  const { state } = useCart();
  const count = state.items.reduce((s: number, i: any) => s + i.qty, 0);
  if (count === 0) return null;
  return (
    <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
      {count}
    </span>
  );
}

export default function NavBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [shopPinned, setShopPinned] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query) navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  // Close shop dropdown when the route changes (user navigates)
  useEffect(() => {
    setShopOpen(false);
    setShopPinned(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </button>


          <div className="flex items-center gap-1">
            <Link to="/">
              <img
                src="https://i.ibb.co/fVzdj7F3/logo.png"
                alt="Shree Wraps"
                className="h-[4.40rem] w-auto select-none"
                loading="eager"
              />
            </Link>

            <Link to="/" className="font-serif text-4xl tracking-tight">
              <span className="text-primary">Shree</span>{" "}
              <span className="text-primary">Wraps</span>
            </Link>
          </div>
          </div>


          <form onSubmit={onSearch} className="hidden md:flex items-center gap-2 max-w-lg flex-1 mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search premium packaging..."
                className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button type="submit" className="h-10 px-4">Search</Button>
          </form>

          <nav className="flex items-center gap-2 md:gap-3">
            <Button asChild variant="outline" className="hidden md:inline-flex h-9 text-sm">
              <Link to="/bulk-order">Bulk Order</Link>
            </Button>
            <Link to="/checkout" className="relative p-2" aria-label="Cart">
              <ShoppingCart className="h-6 w-6" />
              <CartBadge />
            </Link>
          </nav>
        </div>

        <div className="container mx-auto md:hidden px-4 pb-3">
          <form onSubmit={onSearch} className="flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search premium packaging..."
                className="w-full h-10 pl-9 pr-3 rounded-md border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button type="submit" className="h-10 px-4">Go</Button>
          </form>
        </div>

        {/* desktop category strip */}
        <div className="hidden md:block border-t border-border bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-12 py-3">
              <Link to="/" className="text-base font-medium px-4 py-2 hover:text-primary">HOME</Link>

              <div className="relative">
                <button
                  onMouseEnter={() => { if (!shopPinned) setShopOpen(true); }}
                  onMouseLeave={() => { if (!shopPinned) setShopOpen(false); }}
                  onClick={() => {
                    // Toggle open and pinned state on click so users can click to open and click again to close
                    const next = !shopOpen;
                    setShopOpen(next);
                    setShopPinned(next);
                  }}
                  className="flex items-center gap-3 text-base font-semibold px-4 py-2"
                  aria-expanded={shopOpen}
                >
                  SHOP
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${shopOpen ? 'rotate-180 text-primary' : 'rotate-0 text-muted-foreground'}`} />
                </button>

                <div
                  onMouseEnter={() => { if (!shopPinned) setShopOpen(true); }}
                  onMouseLeave={() => { if (!shopPinned) setShopOpen(false); }}
                  className={`${shopOpen ? "block" : "hidden"} absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[900px] bg-white border border-border rounded-md shadow-lg p-6`}
                >
                  {/* Multi-column shop dropdown: show up to 3 subcategories per column and a View all button */}
                  <div className="grid grid-cols-5 gap-6">
                    {categories.map((c) => {
                      // determine the product.category key to use for this menu column
                      const path = c.path || '';
                      let catKey = path.replace(/\//g, '');
                      if (path.includes('promotional')) catKey = 'promotional-gifts';
                      else if (path.includes('corporate')) catKey = 'corporates';
                      else if (path.includes('occasional')) catKey = 'occasional-gifts';

                      // compute subcategories for this main category from catalogProducts
                      const subcats = Array.from(new Set(catalogProducts.filter(p => p.category === catKey).map(p => p.subCategory).filter(Boolean))).slice(0,3);
                      const showSubcats = subcats;
                      // prettify subcategory label
                      const labelize = (s?: string) => s ? s.replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase()) : '';
                      // determine view all path
                      const viewAll = c.path;

                      return (
                        <div key={c.name} className="flex flex-col">
                          <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">
                            <Link to={viewAll} className="hover:underline">{c.name}</Link>
                          </h4>
                          <div className="flex-1 space-y-2">
                            {showSubcats.map((sc) => (
                              <Link key={String(sc)} to={`${viewAll}?sub=${encodeURIComponent(String(sc) || '')}`} className="text-sm text-muted-foreground hover:text-foreground">
                                {labelize(String(sc))}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    {/* final column: single View all button for the entire Shop dropdown */}
                    <div className="flex items-center justify-center">
                      <Link to="/products" className="inline-block px-4 py-3 rounded bg-primary text-primary-foreground font-medium">View all</Link>
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/bulk-order" className="text-base font-medium px-4 py-2 hover:text-primary">CUSTOM ORDER</Link>
              <Link to="/about" className="text-base font-medium px-4 py-2 hover:text-primary">ABOUT</Link>
              <Link to="/reviews" className="text-base font-medium px-4 py-2 hover:text-primary">REVIEWS</Link>
            </div>
          </div>
        </div>

        {/* mobile menu content (when menu toggle is open) */}
        {open && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col py-3 gap-2">
                <Link to="/" className="py-2 px-2 rounded">Home</Link>
                <details>
                  <summary className="py-2 cursor-pointer">Shop</summary>
                  <div className="mt-2 flex flex-col gap-1">
                    {categories.map((c) => (
                      <Link key={c.name} to={c.path} className="pl-4 py-1">{c.name}</Link>
                    ))}
                  </div>
                </details>
                <Link to="/bulk-order" className="py-2 px-2 font-medium">Custom Order</Link>
                <Link to="/about" className="py-2 px-2">About</Link>
                <Link to="/reviews" className="py-2 px-2">Reviews</Link>
              </div>
            </div>
          </div>
        )}
    
      
    </header>
  );
}
