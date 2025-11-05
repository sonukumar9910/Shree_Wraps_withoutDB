export default function Privacy() {
  return (
    <main className="w-full bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-90">
          Your privacy is very important to us. Here’s how we handle your data.
        </p>
      </section>

      <section className="container mx-auto py-16 px-6 space-y-8">
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <h2 className="text-2xl font-semibold">1. Information Collection</h2>
          <p>We collect your name, contact details, and order information.</p>

          <h2 className="text-2xl font-semibold">2. Use of Information</h2>
          <p>
            Data is used for processing orders, communication, and customer support only.
          </p>

          <h2 className="text-2xl font-semibold">3. Data Protection</h2>
          <p>
            We use secure servers and never share your personal data with third parties
            without consent.
          </p>

          <h2 className="text-2xl font-semibold">4. Cookies</h2>
          <p>
            Our website may use cookies to improve browsing experience. You may disable
            cookies in your browser.
          </p>
        </div>
      </section>
    </main>
  );
}
