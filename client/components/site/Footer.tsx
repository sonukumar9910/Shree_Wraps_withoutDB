import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail,MapPin  } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white">
      <div className="container mx-auto grid md:grid-cols-4 gap-10 py-12">
        <div>
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link to="/">
              <img
                src="https://i.ibb.co/fVzdj7F3/logo.png"
                alt="Shree Wraps"
                className="h-[4.40rem] w-auto select-none"
                loading="eager"
              />
            </Link>

            {/* Text + tagline */}
            <div className="flex flex-col gap-1 leading-tight">
              <Link to="/" className="font-serif text-4xl tracking-tight">
                <span className="text-primary">Shree</span>{" "}
                <span className="text-primary">Wraps</span>
              </Link>

              <p className="text-sm text-foreground">
                Wrap Every Moment With Love
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <a href="https://www.instagram.com/p/DOgpAN5AFcH/?img_index=1&igsh=MW0wa2MxeTN3MnJjOA==" aria-label="Instagram" className="p-2 rounded-full bg-accent hover:bg-accent/70">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://share.google/eRGPcMhtc6EOatWYy" aria-label="Facebook" className="p-2 rounded-full bg-accent hover:bg-accent/70">
              <MapPin  className="h-4 w-4" />
            </a>
            <a href="https://wa.me/9340191499" aria-label="whatsapp" className="p-2 rounded-full bg-accent hover:bg-accent/70">
              <FaWhatsapp className="h-4 w-4" />
            </a>
            <a href="mailto:shree.wraps@gmail.com" aria-label="Email" className="p-2 rounded-full bg-accent hover:bg-accent/70">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-medium">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/bulk-order" className="hover:underline">Bulk & Custom Orders</Link></li>
            <li><Link to="/blog" className="hover:underline">Journal</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Policies</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Shipping</a></li>
            <li><a href="#" className="hover:underline">Refund</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy</a></li>
            <li><a href="/terms" className="hover:underline">Terms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium">Newsletter</h4>
          <p className="mt-3 text-sm text-muted-foreground">Get packaging tips and seasonal launches.</p>
          <form className="mt-4 flex gap-2">
            <input type="email" placeholder="Email address" className="flex-1 h-10 rounded-md border border-input px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shree Wraps. All rights reserved.
      </div>
    </footer>
  );
}
