
export default function TermsPage() {
  return (
    <main className="w-full bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Terms & Conditions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
          Please read our terms and conditions carefully before using our services.
        </p>
      </section>

      {/* Content Section */}
      <section className="container mx-auto py-16 px-6 space-y-10">
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to <strong>Shree Wraps</strong>. By accessing our website and using our services, 
            you agree to be bound by these Terms and Conditions. If you do not agree, 
            please do not use our website or services.
          </p>

          <h2 className="text-2xl font-semibold">2. Use of Services</h2>
          <p>
            Our services are intended for personal and business use related to gift 
            wrapping and luxury packaging. You agree not to misuse our services, 
            attempt unauthorized access, or engage in fraudulent activities.
          </p>

          <h2 className="text-2xl font-semibold">3. Orders & Payments</h2>
          <p>
            All orders are subject to acceptance and availability. Prices are subject 
            to change without notice. Payments must be made in full at the time of purchase.
          </p>

          <h2 className="text-2xl font-semibold">4. Returns & Refunds</h2>
          <p>
            Returns are only accepted for damaged or defective products within 7 days 
            of delivery. Refunds will be processed according to our refund policy.
          </p>

          <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
          <p>
            Shree Wraps is not liable for indirect, incidental, or consequential damages 
            arising from the use of our services or products.
          </p>

          <h2 className="text-2xl font-semibold">6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. 
            Continued use of our services constitutes acceptance of updated terms.
          </p>

          <h2 className="text-2xl font-semibold">7. Contact Information</h2>
          <p>
            For questions about these Terms, you can contact us at:  
            <br />
            📧 <a href="mailto:Shree.Wraps@gmail.com" className="text-primary underline">
              Shree.Wraps@gmail.com
            </a>  
            <br />
            📞 +91 93401 91499 | +91 93125 15855
          </p>
        </div>
      </section>
    </main>
  );
}
