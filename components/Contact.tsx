'use client'

import { motion } from "framer-motion";
import { staggerContainer } from "../utils/lib/animations";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";

// 1. Siapkan data negara dalam format yang lebih terstruktur
const countries = [
  { code: 'ID', name: 'Indonesia', dialCode: '+62', placeholder: '812-3456-7890' },
  { code: 'US', name: 'USA', dialCode: '+1', placeholder: '202-555-0125' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', placeholder: '8123 4567' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', placeholder: '12-345 6789' },
  { code: 'AU', name: 'Australia', dialCode: '+61', placeholder: '412 345 678' },
];

function Contact() {
  // 2. Inisialisasi state untuk negara yang dipilih, default ke Indonesia
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // 3. Buat fungsi untuk menangani perubahan pada dropdown negara
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
    }
  }
  return (
    <div className="relative isolate bg-gradient-to-br from-indigo-50 via-white to-pink-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-stretch-50% tracking-tight text-gray-900 sm:text-5xl">
          Contact Sales
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Got a project in mind? Let’s build something amazing together.
        </p>
        <a href="../">back to beranda</a>
      </div>

      <form
        action="https://formspree.io/f/xrbaqgvd"
        method="POST"
        className="mx-auto mt-16 max-w-xl rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
          {/* First name */}
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold text-gray-900"
            >
              First name
            </label>
            <input
              id="first-name"
              name="first-name" 
              type="text"
              autoComplete="given-name"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Last name */}
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold text-gray-900"
            >
              Last name
            </label>
            <input
              id="last-name"
              name="last-name" // Atribut 'name' ini penting untuk Formspree
              type="text"
              autoComplete="family-name"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          
          {/* Company */}
          <div className="sm:col-span-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold text-gray-900"
            >
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

         {/* --- BAGIAN INPUT TELEPON YANG DIPERBARUI --- */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2 flex rounded-lg border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500">
              {/* Bagian ini sekarang menampilkan kode telepon dan dropdown negara */}
              <div className="flex items-center">
                <select
                  id="country"
                  name="country"
                  value={selectedCountry.code} // Hubungkan value dengan state
                  onChange={handleCountryChange} // Hubungkan onChange dengan handler
                  className="h-full rounded-l-lg border-0 bg-transparent py-2 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
                <span className="text-gray-500 sm:text-sm mr-2">{selectedCountry.dialCode}</span>
              </div>
              
              <input
                id="phone-number"
                name="phone-number"
                type="tel" // Gunakan type="tel" untuk nomor telepon
                placeholder={selectedCountry.placeholder} // Placeholder dinamis
                className="w-full flex-1 rounded-r-lg border-0 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
              />
            </div>
          </div>
          {/* --- AKHIR BAGIAN YANG DIPERBARUI --- */}


          {/* Message */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          {/* Checkbox */}
          <div className="flex gap-x-3 sm:col-span-2">
            <input
              id="agree-to-policies"
              name="agree-to-policies"
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="agree-to-policies"
              className="text-sm text-gray-600"
            >
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold text-indigo-600 hover:underline">
                privacy policy
              </a>
              .
            </label>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-10">
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Let’s Talk
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;