import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

const SLIDES = [
  "https://i.ibb.co/wh1KY8DS/decorative-diwali-gift-boxes-adorned-with-golden-ribbons-1.jpg",
  "https://i.ibb.co/rR202pFS/futuristic-macro-shot-bhai-dooj-gifts-zooming-wrappings-glowing-ribbons-blend-tra.jpg",
  "https://i.ibb.co/0Rw6yjK5/wicker-basket-overflowing-with-carefully-wrapped-presents-set-against-vibrant-turquoise-backdrop-pro.jpg"
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((src, i) => (
            <div key={i} className="relative h-full flex-[0_0_100%]">
              <img
                src={src}
                alt="Hero slide"
                className="h-full w-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-4 flex items-center justify-center text-center">
        <div className="text-white max-w-3xl">
          <h1 className="font-serif text-7xl text-center">
            Wrap Every Moment
            <br />
            With Love 
          </h1>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              className="px-6 h-11 bg-yellow-400 text-black font-bold hover:bg-yellow-800"
            >
              <Link to="/products">Shop Now</Link>
            </Button>

            <Button
              asChild
              className="px-6 h-11 bg-yellow-400 text-black font-bold hover:bg-yellow-800 border-none"
            >
              <Link to="/bulk-order">Bulk & Custom Orders</Link>
            </Button>
          </div>

        </div>
      </div>

      {/* Controls */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white hover:bg-black/60"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  );
}
