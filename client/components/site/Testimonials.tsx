import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Hrasheekesh kumar singh",
    text: "Excellent Service and the Packaging of Gifts boxes are looking Very nice",
    rating: 4.5,
  },
  {
    name: "Pooja Sharma",
    text: "Absolutely delicious chocolate! Rich, smooth, and flavorful—melts in your mouth. Highly recommend..",
    rating: 5,
  },
  {
    name: "Sonu kumar",
    text: "Really love the product and service, especially their homemade sweets and chocolates—they truly add a star to the galaxy.",
    rating: 4,
  },
  {
    name: "Rashmi",
    text: "✨ “I’ve been a continued member with Shree warps, and every time I order a hamper, it feels like a little box of happiness delivered to my door. The quality is always consistent, the packaging is beautiful, and the little thoughtful touches make it extra special. It’s one of those rare companies that never disappoints—always making me come back for more!” 💛",
    rating: 5,
  },
];

// ⭐ Animated star renderer
function AnimatedStars({ rating }: { rating: number }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // full glowing star
      stars.push(
        <span key={i} className="relative inline-block w-5 h-5">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" />
          <span className="absolute inset-0 rounded-full bg-yellow-300 opacity-40 blur-sm animate-ping"></span>
        </span>
      );
    } else if (rating >= i - 0.5) {
      // half glowing star
      stars.push(
        <span
          key={i}
          className="relative inline-block w-5 h-5 overflow-hidden"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" />
          <span className="absolute inset-0 rounded-full bg-yellow-300 opacity-40 blur-sm animate-ping"></span>
        </span>
      );
    } else {
      // empty star
      stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 3500);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="container mx-auto py-12 md:py-16">
      <div className="flex items-end justify-between">
        <h2 className="font-serif text-2xl md:text-3xl">
          What our customers say
        </h2>
      </div>
      <div className="mt-6 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="min-w-0 basis-full md:basis-[48%] lg:basis-[32%] rounded-xl border border-border bg-white p-6 shadow-sm"
            >
              <blockquote className="text-sm md:text-base text-muted-foreground">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium">
                {t.name}
              </figcaption>
              <div className="mt-2">
                <AnimatedStars rating={t.rating} />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
