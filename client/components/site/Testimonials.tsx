import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Hrasheekesh kumar singh",
    text: "Excellent Service and the Packaging of Gifts boxes are looking Very nice",
    rating: 4.5,
  },
  {
    name: "Ayush Jha",
    text: "Absolutely delicious chocolate! Rich, smooth, and flavorful—melts in your mouth. Highly recommend..",
    rating: 5,
  },
  {
    name: "Aman Sharma",
    text: "Really love the product and service, especially their homemade sweets and chocolates—they truly add a star to the galaxy.",
    rating: 4,
  },
 
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-2 mt-4 text-yellow-400">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current text-yellow-400 drop-shadow-md" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  // we'll use the first three testimonials and lay them out to match the design
  const [top, left, right] = testimonials;

  return (
    <section className="container mx-auto py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: big heading */}
        <div className="lg:col-span-1">
          <span className="text-sm text-pink-600 uppercase tracking-widest">Testimonials</span>
          <h2 className="font-great text-[5.5rem] leading-[0.9] mt-3">Happy<br/>Customers!</h2>
        </div>

        {/* Right: testimonials area */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            {/* Top wide card */}
            <div className="rounded-lg border border-dashed border-pink-300 p-6 bg-white">
              <h3 className="text-pink-600 font-bold">{top.name}</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">“{top.text}”</p>
              <Stars n={top.rating} />
            </div>

            {/* Bottom two */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-dashed border-pink-300 p-6 bg-white">
                <h4 className="text-pink-600 font-bold">{left.name}</h4>
                <p className="mt-3 text-gray-700 leading-relaxed">“{left.text}”</p>
                <Stars n={left.rating} />
              </div>

              <div className="rounded-lg border border-dashed border-pink-300 p-6 bg-white">
                <h4 className="text-pink-600 font-bold">{right.name}</h4>
                <p className="mt-3 text-gray-700 leading-relaxed">“{right.text}”</p>
                <Stars n={right.rating} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
