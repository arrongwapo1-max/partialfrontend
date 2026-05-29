"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ServiceCard {
  id: string;
  range: string;
  price: string;
  description: string; 
}

export default function Home() {
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = () => {
      const savedServices = localStorage.getItem("jollyannes_services");
      if (savedServices) {
        setServices(JSON.parse(savedServices));
      } else {
        const defaultServices: ServiceCard[] = [
          { id: "1", range: "10 - 15 kls", price: "₱8,000 - ₱10,000", description: "Available" },
          { id: "2", range: "15 - 20 kls", price: "₱10,000 - ₱12,000", description: "Available" },
          { id: "3", range: "20 - 25 kls", price: "₱12,000 - ₱15,000", description: "Available" },
          { id: "4", range: "25 - 30 kls", price: "₱15,000 - ₱18,000", description: "Available" },
          { id: "5", range: "30 - 35 kls", price: "₱18,000 - ₱20,000", description: "Available" },
          { id: "6", range: "35 - 40 kls", price: "₱20,000 - ₱22,000", description: "Available" },
        ];
        setServices(defaultServices);
        localStorage.setItem("jollyannes_services", JSON.stringify(defaultServices));
      }
      setLoading(false);
    };

    loadServices();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "jollyannes_services") {
        loadServices();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      
      {/* ================= NAVBAR ================= */}
      <header className="w-full bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
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
          <nav className="hidden lg:flex items-center gap-12">
            <a href="#home" className="text-[#5b1e1e] text-sm hover:text-red-700 transition">HOME</a>
            <a href="#about" className="text-[#5b1e1e] text-sm hover:text-red-700 transition">ABOUT</a>
            <a href="#services" className="text-[#5b1e1e] text-sm hover:text-red-700 transition">SERVICES</a>
            <a href="#contact" className="text-[#5b1e1e] text-sm hover:text-red-700 transition">CONTACT</a>
          </nav>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="w-full">
              <Image
                src="/lechon1.jpg"
                alt="Lechon"
                width={700}
                height={450}
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5b1e1e] leading-tight">
                Welcome to Jollyanne's Crispy Lechon!
              </h2>
              <p className="mt-5 text-gray-700 text-base md:text-lg leading-7">
                We are delighted to have you here! Our crispy lechon is made
                with the finest ingredients and cooked to perfection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
                <button className="bg-[#5b1e1e] text-white px-8 py-3 rounded-full hover:bg-[#7a2b2b] transition">Reserve Now</button>
                <button className="bg-[#5b1e1e] text-white px-8 py-3 rounded-full hover:bg-[#7a2b2b] transition">Order Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#5b1e1e] mb-6">Jollyanne's Crispy Lechon</h2>
            <p className="text-gray-700 leading-8 text-base md:text-lg">
              The original lechon flavor is created through a combination of
              garlic, onions, lemongrass, chili leaves and other herbs and
              spices.
            </p>
            <h3 className="italic text-xl md:text-2xl text-[#5b1e1e] mt-8">Two main flavors: original and spicy.</h3>
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="#services" className="bg-[#5b1e1e] text-white px-6 py-3 rounded-full hover:bg-[#7a2b2b] transition inline-block text-center">See Menu</a>
              <button className="bg-[#5b1e1e] text-white px-6 py-3 rounded-full hover:bg-[#7a2b2b] transition">Learn More</button>
            </div>
          </div>
          <div className="w-full">
            <Image src="/lechon2.jpg" alt="Spicy Lechon" width={700} height={450} className="rounded-lg shadow-lg w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="max-w-7xl mx-auto px-4 md:px-8 py-14">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#5b1e1e]">OUR SERVICES</h2>
          <p className="text-gray-600 mt-2">This is our available services.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-4 border animate-pulse text-center">
                <div className="bg-gray-200 rounded-xl w-full h-48"></div>
                <div className="h-5 bg-gray-200 rounded w-1/3 mx-auto mt-4"></div>
                <div className="h-10 bg-gray-200 rounded-full w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg border p-4 text-center flex flex-col justify-between">
                <div>
                  <div className="relative">
                    <Image src="/lechon1.jpg" alt="Lechon" width={400} height={250} className="rounded-xl w-full h-48 object-cover" />
                  </div>
                  
                  <p className="mt-4 font-semibold text-gray-800">{item.range}</p>
                  <p className="mt-1 font-semibold text-[#5b1e1e]">{item.price}</p>
                </div>
                
                {/* ✨ UPDATED: The description text is now styled exactly like the button in your image */}
                <div className="mt-4 bg-[#5b1e1e] text-white px-6 py-2 rounded-full w-full text-center text-md font-medium tracking-wide">
                  {item.description || "Available"}
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500 font-medium">No packages available.</div>
            )}
          </div>
        )}
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="bg-[#f5f3f1] py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-serif text-[#5b1e1e] mb-6">Contact Jollyanne's Lechon</h2>
            <p className="text-gray-800 text-xl leading-9">We’re here to assist you with your orders and inquiries.</p>
            <div className="mt-10 bg-[#5b1e1e] text-white rounded-xl p-6 shadow-xl max-w-md">
              <p className="mb-4 text-lg">📞 (+63 9555243546)</p>
              <p className="mb-4 text-lg">📧 jollyannes101@gmail.com</p>
              <p className="text-lg">📍 Poblacion-Camolinas Housing, Cordova, Cebu</p>
            </div>
          </div>
          <div className="bg-[#ece7e7] rounded-2xl shadow-2xl border border-gray-300 p-8">
            <h2 className="text-3xl font-bold text-center text-[#5b1e1e] mb-8">Message Here</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-md border border-gray-300 outline-none" />
                 <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-md border border-gray-300 outline-none" />
               </div>
               <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border border-gray-300 outline-none" />
               <textarea rows={4} placeholder="Enter message" className="w-full px-4 py-2 rounded-md border border-gray-300 outline-none resize-none"></textarea>
               <div className="flex justify-center"><button type="submit" className="bg-[#5b1e1e] text-white px-12 py-3 rounded-lg">Submit</button></div>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER SECTION ================= */}
      <footer className="bg-[#5b1e1e] text-white mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-[#8b4a4a] pb-10">
            <div><h2 className="text-2xl font-bold tracking-widest">JOLLYANNE'S</h2></div>
            <div className="space-y-2 text-sm"><p>WEEKLY THEMES</p><p>PRE-SALE FAQS</p></div>
            <div className="space-y-2 text-sm"><p>SERVICES</p><p>THEME TWEAK</p></div>
            <div className="space-y-2 text-sm"><p>SHOWCASE</p><p>SUPPORT</p></div>
            <div className="space-y-2 text-sm"><p>ABOUT US</p><p>CONTACT US</p></div>
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-sm text-gray-200">© Copyright. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}