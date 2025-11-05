import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*Contact Request*\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;

    const whatsappLink = `https://wa.me/917292871937?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <main className="w-full bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
          Have questions or need help? Reach out to us anytime. We’d love to
          hear from you!
        </p>
      </section>

      {/* Contact Info + Map + Form */}
      <section className="container mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side: Map & Info */}
        <div className="space-y-8">
          <div className="w-full h-80 lg:h-[400px] rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.7550891695128!2d81.66390698602879!3d21.241558230072336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dde565ef3687%3A0x9611a91d3075dfff!2sShree%20Wraps!5e0!3m2!1sen!2sin!4v1759320750961!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground">
              We’re here to answer your questions, help with orders, or just
              have a friendly chat.
            </p>

            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-primary" />
              <span>+91 93401 91499</span> <span>+91 93125 15855</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <span>Shree.Wraps@gmail.com</span>
            </div>
            <div className="flex gap-8">
              {/* Address 1 */}
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <p>Sector 4, Avanti Vihar</p>
                  <p>Raipur</p>
                  <p>India</p>
                  <p>pincode: 492001</p>
                </div>
              </div>
              {/* Address 2 */}
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <p>Amarpali Leisure Park</p>
                  <p>Techzone- 4</p>
                  <p>Greater Noida, India</p>
                  <p>Pin Code- 201308</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows={5}
                className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-2 rounded-md transition ${isValid ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
