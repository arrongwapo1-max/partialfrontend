"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      
      {/* ================= NAVBAR ================= */}
      <header className="w-full bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-400">
              <Image
                src="/logo.png"
                alt="Logo"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-serif text-[#5b1e1e]">
              Jollyanne's Crispy Lechon
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-15">
  
  <a
    href="#home"
    className="text-[#5b1e1e] text-sm hover:text-red-700 transition"
  >
    HOME
  </a>

  <a
    href="#about"
    className="text-[#5b1e1e] text-sm hover:text-red-700 transition"
  >
    ABOUT
  </a>

  <a
    href="#services"
    className="text-[#5b1e1e] text-sm hover:text-red-700 transition"
  >
    SERVICES
  </a>

  <a
    href="#contact"
    className="text-[#5b1e1e] text-sm hover:text-red-700 transition"
  >
    CONTACT
  </a>

</nav>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Image */}
            <div className="w-full">
              <Image
                src="/lechon1.jpg"
                alt="Lechon"
                width={700}
                height={450}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="text-center lg:text-left">
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5b1e1e] leading-tight">
                Welcome to Jollyanne's Crispy Lechon!
              </h2>

              <p className="mt-5 text-gray-700 text-base md:text-lg leading-7">
                We are delighted to have you here! Our crispy lechon is made
                with the finest ingredients and cooked to perfection.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                
                <button className="bg-[#5b1e1e] text-white px-8 py-3 rounded-full hover:bg-[#7a2b2b] transition">
                  Reserve Now
                </button>

                <button className="bg-[#5b1e1e] text-white px-8 py-3 rounded-full hover:bg-[#7a2b2b] transition">
                  Order Now
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#5b1e1e] mb-6">
              Jollyanne's Crispy Lechon
            </h2>

            <p className="text-gray-700 leading-8 text-base md:text-lg">
              The original lechon flavor is created through a combination of
              garlic, onions, lemongrass, chili leaves and other herbs and
              spices. The stuffing not only adds a mouthwatering smell to the
              roasted pig but also puts in the delicious taste.
            </p>

            <h3 className="italic text-xl md:text-2xl text-[#5b1e1e] mt-8">
              Two main flavors: original and spicy.
            </h3>

            <div className="flex flex-wrap gap-4 mt-8">
              
              <button className="bg-[#5b1e1e] text-white px-6 py-3 rounded-full hover:bg-[#7a2b2b] transition">
                See Menu
              </button>

              <button className="bg-[#5b1e1e] text-white px-6 py-3 rounded-full hover:bg-[#7a2b2b] transition">
                Learn More
              </button>

            </div>
          </div>

          {/* Right Image */}
          <div className="w-full">
            <Image
              src="/lechon2.jpg"
              alt="Spicy Lechon"
              width={700}
              height={450}
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

          
       {/* ================= SERVICES SECTION ================= */}
<section id="services" className="max-w-7xl mx-auto px-4 md:px-8 py-14">

  <div className="text-center mb-10">
    <h2 className="text-3xl sm:text-4xl font-serif text-[#5b1e1e]">
      OUR SERVICES
    </h2>
    <p className="text-gray-600 mt-2">
      This is our available services.
    </p>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* CARD 1 */}
    <div className="bg-white rounded-2xl shadow-lg border p-4 text-center">
      <Image src="/lechon1.jpg" alt="Lechon" width={400} height={250}
        className="rounded-xl w-full h-48 object-cover" />
      <p className="mt-3 font-semibold">10 - 15 kls</p>
      <p className="mt-1 font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
        ₱8,000 - ₱10,000
      </p>
      <button className="mt-3 bg-[#5b1e1e] text-white px-6 py-2 rounded-full hover:bg-[#7a2b2b] transition">
        Order Now
      </button>
    </div>

    {/* CARD 2 */}
    <div className="bg-white rounded-2xl shadow-lg border p-4 text-center">
      <Image src="/lechon1.jpg" alt="Lechon" width={400} height={250}
        className="rounded-xl w-full h-48 object-cover" />
      <p className="mt-3 font-semibold">15 - 20 kls</p>
      <p className="mt-1 font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
        ₱10,000 - ₱12,000
      </p>
      <button className="mt-3 bg-[#5b1e1e] text-white px-6 py-2 rounded-full hover:bg-[#7a2b2b] transition">
        Order Now
      </button>
    </div>

    {/* CARD 3 */}
    <div className="bg-white rounded-2xl shadow-lg border p-4 text-center">
      <Image src="/lechon1.jpg" alt="Lechon" width={400} height={250}
        className="rounded-xl w-full h-48 object-cover" />
      <p className="mt-3 font-semibold">20 - 25 kls</p>
      <p className="mt-1 font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
        ₱12,000 - ₱15,000
      </p>
      <button className="mt-3 bg-[#5b1e1e] text-white px-6 py-2 rounded-full hover:bg-[#7a2b2b] transition">
        Order Now
      </button>
    </div>

    {/* CARD 4 */}
    <div className="bg-white rounded-2xl shadow-lg border p-4 text-center">
      <Image src="/lechon1.jpg" alt="Lechon" width={400} height={250}
        className="rounded-xl w-full h-48 object-cover" />
      <p className="mt-3 font-semibold">25 - 30 kls</p>
      <p className="mt-1 font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
        ₱15,000 - ₱18,000
      </p>
      <button className="mt-3 bg-[#5b1e1e] text-white px-6 py-2 rounded-full hover:bg-[#7a2b2b] transition">
        Order Now
      </button>
    </div>

    {/* CARD 5 */}
    <div className="bg-white rounded-2xl shadow-lg border p-4 text-center">
      <Image src="/lechon1.jpg" alt="Lechon" width={400} height={250}
        className="rounded-xl w-full h-48 object-cover" />
      <p className="mt-3 font-semibold">30 - 35 kls</p>
      <p className="mt-1 font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
        ₱18,000 - ₱20,000
      </p>
      <button className="mt-3 bg-[#5b1e1e] text-white px-6 py-2 rounded-full hover:bg-[#7a2b2b] transition">
        Order Now
      </button>
    </div>

    {/* CARD 6 */}
    <div className="bg-white rounded-2xl shadow-lg border p-4 text-center">
      <Image src="/lechon1.jpg" alt="Lechon" width={400} height={250}
        className="rounded-xl w-full h-48 object-cover" />
      <p className="mt-3 font-semibold">35 - 40 kls</p>
      <p className="mt-1 font-semibold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
        ₱20,000 - ₱22,000
      </p>
      <button className="mt-3 bg-[#5b1e1e] text-white px-6 py-2 rounded-full hover:bg-[#7a2b2b] transition">
        Order Now
      </button>
    </div>

  </div>
</section>


    {/* ================= CONTACT SECTION ================= */}
<section
  id="contact"
  className="bg-[#f5f3f1] py-16 px-4 md:px-8"
>

  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

    {/* ================= LEFT SIDE ================= */}
    <div>

      <h2 className="text-4xl font-serif text-[#5b1e1e] mb-6">
        Contact Jollyanne's Lechon
      </h2>

      <p className="text-gray-800 text-xl leading-9">
        We’re here to assist you with your orders,
        inquiries, and event bookings.
      </p>

      <p className="text-gray-800 text-xl leading-9 mt-6">
        Get in touch and we’ll respond as soon as possible.
      </p>

      {/* Contact Box */}
      <div className="mt-10 bg-[#5b1e1e] text-white rounded-xl p-6 shadow-xl max-w-md">

        <p className="mb-4 text-lg">
          📞 (+63 9555243546)
        </p>

        <p className="mb-4 text-lg">
          📧 jollyannes101@gmail.com
        </p>

        <p className="text-lg">
          📍 Poblacion-Camolinas Housing, Cordova, Cebu
        </p>

      </div>
    </div>

    {/* ================= RIGHT SIDE FORM ================= */}
    <div className="bg-[#ece7e7] rounded-2xl shadow-2xl border border-gray-300 p-8">

      <h2 className="text-3xl font-bold text-center text-[#5b1e1e] mb-8">
        Message Here
      </h2>

      <form className="space-y-6">

        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* First Name */}
          <div>
            <label className="block text-[#5b1e1e] font-medium mb-2">
              First Name
            </label>

            <input
              type="text"
              placeholder="Enter first name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-md outline-none focus:ring-2 focus:ring-[#5b1e1e]"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[#5b1e1e] font-medium mb-2">
              Last Name
            </label>

            <input
              type="text"
              placeholder="Enter last name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-md outline-none focus:ring-2 focus:ring-[#5b1e1e]"
            />
          </div>

        </div>

        {/* Email */}
        <div>
          <label className="block text-[#5b1e1e] font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-md outline-none focus:ring-2 focus:ring-[#5b1e1e]"
          />
        </div>

        {/* Number */}
        <div>
          <label className="block text-[#5b1e1e] font-medium mb-2">
            Number
          </label>

          <input
            type="text"
            placeholder="Enter number"
            className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-md outline-none focus:ring-2 focus:ring-[#5b1e1e]"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-[#5b1e1e] font-medium mb-2">
            Subject
          </label>

          <textarea
            rows={6}
            placeholder="Enter message"
            className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-md outline-none resize-none focus:ring-2 focus:ring-[#5b1e1e]"
          ></textarea>
        </div>

        {/* Button */}
        <div className="flex justify-center pt-2">

          <button
            type="submit"
            className="bg-[#5b1e1e] hover:bg-[#7a2b2b] transition text-white px-12 py-3 rounded-lg shadow-md"
          >
            Submit
          </button>

        </div>

      </form>
    </div>
  </div>
</section>

   {/* ================= FOOTER SECTION ================= */}
<footer className="bg-[#5b1e1e] text-white mt-10">

  <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

    {/* Top Footer */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-[#8b4a4a] pb-10">

      {/* Logo */}
      <div>
        <h2 className="text-2xl font-bold tracking-widest">
          JOLLYANNE'S
        </h2>

        <p className="text-sm text-gray-200 mt-2">
          Crispy Lechon
        </p>
      </div>

      {/* Column 1 */}
      <div className="space-y-2 text-sm">
        <p className="hover:text-yellow-200 cursor-pointer transition">
          WEEKLY THEMES
        </p>

        <p className="hover:text-yellow-200 cursor-pointer transition">
          PRE-SALE FAQS
        </p>

        <p className="hover:text-yellow-200 cursor-pointer transition">
          SUBMIT A TICKET
        </p>
      </div>

      {/* Column 2 */}
      <div className="space-y-2 text-sm">
        <p className="hover:text-yellow-200 cursor-pointer transition">
          SERVICES
        </p>

        <p className="hover:text-yellow-200 cursor-pointer transition">
          THEME TWEAK
        </p>
      </div>

      {/* Column 3 */}
      <div className="space-y-2 text-sm">
        <p className="hover:text-yellow-200 cursor-pointer transition">
          SHOWCASE
        </p>

        <p className="hover:text-yellow-200 cursor-pointer transition">
          WIDGETKIT
        </p>

        <p className="hover:text-yellow-200 cursor-pointer transition">
          SUPPORT
        </p>
      </div>

      {/* Column 4 */}
      <div className="space-y-2 text-sm">
        <p className="hover:text-yellow-200 cursor-pointer transition">
          ABOUT US
        </p>

        <p className="hover:text-yellow-200 cursor-pointer transition">
          CONTACT US
        </p>

        <p className="hover:text-yellow-200 cursor-pointer transition">
          AFFILIATES
        </p>

        <p className="hover:text-yellow-200 cursor-pointer transition">
          RESOURCES
        </p>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="flex flex-col items-center justify-center py-8">

      {/* Social Icons */}
      <div className="flex gap-4 mb-4">

        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#5b1e1e] transition cursor-pointer">
          f
        </div>

        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#5b1e1e] transition cursor-pointer">
          t
        </div>

        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#5b1e1e] transition cursor-pointer">
          r
        </div>

        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#5b1e1e] transition cursor-pointer">
          $
        </div>

        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-[#5b1e1e] transition cursor-pointer">
          •••
        </div>

      </div>

      {/* Copyright */}
      <p className="text-sm text-gray-200 text-center">
        © Copyright. All rights reserved.
      </p>

    </div>
  </div>
</footer>

    </main>
  );
}