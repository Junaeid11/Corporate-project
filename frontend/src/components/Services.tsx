"use client";
import { useEffect, useState } from "react";
import { FaLightbulb, FaCode, FaHeadset } from "react-icons/fa";

const icons = [
  <FaLightbulb className="text-4xl text-blue-500 mb-4" key="lightbulb" />,
  <FaCode className="text-4xl text-purple-500 mb-4" key="code" />,
  <FaHeadset className="text-4xl text-green-500 mb-4" key="headset" />,
];

export default function Services() {
  const [services, setServices] = useState<{ title: string; description: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://craft-server-opal.vercel.app/api/hero/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => setError("Failed to load services."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform border-t-4 border-blue-400/30"
            >
              {icons[idx] || icons[0]}
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{service.title}</h3>
              <p className="text-gray-500 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
