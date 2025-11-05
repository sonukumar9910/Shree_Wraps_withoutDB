import { Users, Target, Heart, Star } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">

          At Shree Wraps, our vision is to bring joy
          and authenticity to every celebration by
          combining artful gifting with wholesome,
          homemade sweetness. We are committed
          to creating products that are pure,
          delightful, and memorable for every
          customer
        </p>
      </section>

      {/* Our Story + Founder Section */}
      <section className="container mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Our Story */}
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Shree Wraps, a unique blend of creativity, tradition, and
              celebration. We specialize in premium gift wrapping
              solutions and delightful sweet making, bringing an extra
              touch of joy to every occasion. At Shree Wraps, we
              believe that gifts are not just about what’s inside, but also
              about how they are presented—with love, elegance, and
              thoughtfulness.
              <br />
              <br />
              We believe in innovation, teamwork, and dedication, and our story
              continues as we move forward with the same enthusiasm and spirit.
            </p>
          </div>

          {/* Right Side - Founder Image */}
          <div className="relative rounded-xl overflow-hidden group shadow-lg max-w-md mx-auto">
            <img
              src="https://i.ibb.co/JRrJvvpZ/Whats-App-Image-2025-09-30-at-1-46-51-AM.jpg"
              alt="Founder"
              className="w-[950px] h-[710px] object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 transition duration-500 group-hover:from-black/90">
              <h3 className="text-white text-2xl font-semibold">Meenakshi Sharma</h3>
              <p className="text-gray-200 text-xl">Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold">Our Values</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl border bg-gray-50 shadow-sm hover:shadow-md transition">
              <Users className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-medium">Community First</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We believe in building strong, meaningful connections with our
                customers and partners.
              </p>
            </div>
            <div className="p-6 rounded-xl border bg-gray-50 shadow-sm hover:shadow-md transition">
              <Target className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-medium">Driven by Purpose</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every decision we make is guided by our mission to deliver
                excellence and impact lives.
              </p>
            </div>
            <div className="p-6 rounded-xl border bg-gray-50 shadow-sm hover:shadow-md transition">
              <Heart className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-medium">Passion for Quality</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our products are made with love and attention to detail for
                unforgettable experiences.
              </p>
            </div>
            <div className="p-6 rounded-xl border bg-gray-50 shadow-sm hover:shadow-md transition">
              <Star className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 font-medium">Customer Happiness</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your satisfaction is our reward — we always aim to exceed your
                expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img
              src="https://i.ibb.co/qYfTWvqd/pooja-di.jpg"
              alt="Team Member"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 transition duration-500 group-hover:bg-black/70">
              <h3 className="text-lg font-semibold">Pooja Sharma</h3>
              <p className="text-sm">CEO</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img
              src="https://i.ibb.co/dwjV6j49/Ananta-malik.jpg"
              alt="Team Member"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 transition duration-500 group-hover:bg-black/70">
              <h3 className="text-lg font-semibold">Ananta Sharma</h3>
              <p className="text-sm">CMO</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img
              src="https://i.ibb.co/VpgsPrs0/rishabh.jpg"
              alt="Team Member"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 transition duration-500 group-hover:bg-black/70">
              <h3 className="text-lg font-semibold">Rishabh Chaubey</h3>
              <p className="text-sm">CFO</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative rounded-xl overflow-hidden shadow-lg group">
            <img
              src="https://i.ibb.co/MDFvXsyx/Sonu.jpg"
              alt="Team Member"
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 transition duration-500 group-hover:bg-black/70">
              <h3 className="text-lg font-semibold">Sonu Kumar</h3>
              <p className="text-sm">COO</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
