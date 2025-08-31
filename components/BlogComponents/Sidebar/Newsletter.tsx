// components/sidebar/Newsletter.tsx
"use client";

const Newsletter = () => {
  return (
    <div className="p-6 shadow rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">
        Dapatkan artikel terbaru langsung ke email Anda.
      </p>
      <input
        type="email"
        placeholder="Email Anda"
        className="w-full border rounded-lg px-4 py-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
      />
      <button className="w-full bg-gray-900 text-white rounded-lg py-2 text-sm font-semibold hover:bg-gray-700 transition-colors">
        Berlangganan
      </button>
    </div>
  );
};

export default Newsletter;
