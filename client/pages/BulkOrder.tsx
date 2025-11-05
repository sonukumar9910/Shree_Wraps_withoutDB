import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/catalog";

export default function BulkOrder() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    product: "",
    quantity: "",
    address: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
*Bulk Order Request*

Company: ${formData.companyName}
Contact Person: ${formData.contactName}
Phone: ${formData.phone}
Email: ${formData.email}

Product: ${formData.product}
Quantity: ${formData.quantity} units

Delivery Address:
${formData.address}

Special Requirements:
${formData.notes || "None"}
    `.trim();

    const whatsappLink = `https://wa.me/917292871937?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const isFormValid = formData.companyName && formData.contactName && formData.phone && 
                     formData.email && formData.product && formData.quantity && formData.address;

  return (
    <div className="container mx-auto py-6 md:py-8 lg:py-12 px-3 md:px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-center mb-1 md:mb-2">Bulk & Custom Orders</h1>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-6 md:mb-8 px-2">
          Planning corporate gifting or large-scale orders? Fill in your details and we'll get back to you soon!
        </p>

        <form onSubmit={handleSubmit} className="rounded-lg md:rounded-xl border p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {/* Company Details Section */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company Details</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full h-9 sm:h-10 px-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Contact Person Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full h-9 sm:h-10 px-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full h-9 sm:h-10 px-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-9 sm:h-10 px-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Order Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Product Type *</label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  required
                  className="w-full h-9 sm:h-10 px-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a product category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.key} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                  <option value="Custom">Custom/Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Quantity Required *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full h-9 sm:h-10 px-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Number of units"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address Section */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Delivery Details</h2>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Delivery Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2.5 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary min-h-20 sm:min-h-24"
                placeholder="Complete delivery address with pincode"
              />
            </div>
          </div>

          {/* Special Requirements Section */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Special Requirements</h2>
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2.5 sm:p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary min-h-20 sm:min-h-24"
                placeholder="Any custom requirements, design preferences, or special instructions"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-3 sm:pt-4">
            <Button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 h-10 sm:h-11 text-sm sm:text-base"
            >
              Send to WhatsApp
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 h-10 sm:h-11 text-sm sm:text-base"
            >
              <Link to="/products">Cancel</Link>
            </Button>
          </div>

          <p className="text-center text-xs sm:text-sm text-muted-foreground px-2">
            We'll receive your bulk order request on WhatsApp and get back to you shortly!
          </p>
        </form>
      </div>
    </div>
  );
}
