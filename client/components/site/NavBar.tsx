import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";

const categories = [
  { name: "Gift Packs", path: "/products?category=gift-packs" },
  { name: "Chocolate Boxes", path: "/products?category=chocolate-boxes" },
  { name: "Corporates Collection", path: "/products?category=corporates" },
  { name: "Snacks", path: "/products?category=Snacks" },
  { name: "Festive Collection", path: "/products?category=festive" },
  { name: "Cookies", path: "/products?category=Cookies" },
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
  const navigate = useNavigate();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query) navigate(`/products?search=${encodeURIComponent(query)}`);
  };

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

        <div className={`border-t border-border ${open ? "block" : "hidden"} md:block`}>
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar flex-wrap">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  to={c.path}
                  className="shrink-0 px-3 py-1.5 rounded-full bg-accent hover:bg-accent/70 text-sm"
                >
                  {c.name}
                </Link>
              ))}
              <Link
                to="/bulk-order"
                className="md:hidden shrink-0 px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
              >
                Bulk Order
              </Link>
            </div>
          </div>
        </div>
    </header>
  );
}
