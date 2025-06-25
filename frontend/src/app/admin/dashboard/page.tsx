"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/jwt";
import { apiFetch } from "@/utils/api";
import { useAuth } from "@/utils/authContext";
import { FaHome, FaEdit, FaCogs, FaEnvelope, FaUser, FaPlus, FaTrash, FaSave } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://craft-server-opal.vercel.app/api/hero';

const sections = [
  { key: "dashboard", label: "Dashboard" },
  { key: "hero", label: "Edit Hero" },
  { key: "services", label: "Edit Services" },
  { key: "contacts", label: "View Contacts" },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hero, setHero] = useState<{ _id?: string; title: string; subtitle: string; imageUrl: string }>({ title: '', subtitle: '', imageUrl: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [services, setServices] = useState<{ _id?: string; title: string; description: string }[]>([]);
  const [contacts, setContacts] = useState<{ _id: string; name: string; email: string; message: string; createdAt: string }[]>([]);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  // Auth check
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/auth/login');
    }
  }, [router]);

  // Fetch hero data
  useEffect(() => {
    if (activeSection === "hero") {
      setLoading(true);
      apiFetch(API_URL, 'GET')
        .then((value: unknown) => {
          const data = value as { _id?: string; title: string; subtitle: string; imageUrl: string };
          if (data && data._id) {
            setHero(data); // Hero exists
          } else {
            setHero({ title: '', subtitle: '', imageUrl: '' }); // No hero yet
          }
        })
        .catch((e: unknown) => {
          const err = e as Error;
          setError(err.message || 'Failed to fetch hero');
        })
        .finally(() => setLoading(false));
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "services") {
      setLoading(true);
      apiFetch("https://craft-server-opal.vercel.app/api/hero/services", "GET")
        .then((value: unknown) => {
          const data = value as { _id?: string; title: string; description: string }[];
          if (data && data.length > 0) {
            setServices(data); // Services exist
          } else {
            setServices([{ title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" }]); // Empty initial services
          }
        })
        .catch((e: unknown) => {
          const err = e as Error;
          setError(err.message || "Failed to fetch services");
        })
        .finally(() => setLoading(false));
    }
  }, [activeSection]);

  // Fetch contacts data
  useEffect(() => {
    if (activeSection === "contacts") {
      setLoading(true);
      const token = getToken();
      if (!token) {
        router.replace('/admin/login');
        return;
      }
      
      apiFetch("https://craft-server-opal.vercel.app/api/hero/contacts", "GET", undefined, token)
        .then((value: unknown) => {
          const data = value as { _id: string; name: string; email: string; message: string; createdAt: string }[];
          setContacts(data || []);
        })
        .catch((e: unknown) => {
          const err = e as Error;
          setError(err.message || "Failed to fetch contacts");
        })
        .finally(() => setLoading(false));
    }
  }, [activeSection, router]);

  // Hero input change
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  // Hero submit (Create or Update)
  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = getToken();
      if (!token) throw new Error('Not authenticated');

      let updatedHero;

      if (hero?._id) {
        // Update existing hero
        updatedHero = await apiFetch(`${API_URL}/${hero._id}`, 'PUT', hero, token) as { _id?: string; title: string; subtitle: string; imageUrl: string };
        setSuccess('Hero updated!');
      } else {
        // Create new hero
        updatedHero = await apiFetch(`${API_URL}`, 'POST', hero, token) as { _id?: string; title: string; subtitle: string; imageUrl: string };
        console.log(updatedHero)
        setSuccess('Hero created!');

      }

      setHero(updatedHero);
    } catch (e) {
      const err = e as Error;
      setError(err.message || 'Failed to submit hero');
    }
  };

  // Services management
  const handleServiceChange = (idx: number, field: "title" | "description", value: string) => {
    setServices((prev) =>
      prev.map((service, index) => index === idx ? { ...service, [field]: value } : service)
    );
  };

  const handleAddService = () => {
    if (services.length < 3) {
      setServices([...services, { title: "", description: "" }]);
    }
  };

  const handleRemoveService = (idx: number) => {
    setServices((prev) => prev.filter((_, index) => index !== idx));
  };

  const handleServicesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const token = getToken();
      if (!token) throw new Error("Not authenticated");
  
      if (services.length !== 3) throw new Error("You must have exactly 3 services.");
  
      let updatedServices = [];
  
      if (services[0]?._id) {
        // Services exist → Update all one by one
        for (const service of services) {
          const updatedService = await apiFetch(`${API_URL}/services/${service._id}`, "PUT", {
            title: service.title,
            description: service.description
          }, token);
  
          updatedServices.push(updatedService);
        }
        setSuccess("Services updated successfully!");
      } else {
        // Services do not exist → Create new
        updatedServices = await apiFetch(`${API_URL}/services`, "POST", { services }, token) as { _id?: string; title: string; description: string }[];
        setSuccess("Services created successfully!");
      }
  
      setServices(updatedServices as { _id?: string; title: string; description: string }[]);
    } catch (e) {
      const err = e as Error;
      setError(err.message || "Failed to submit services.");
    }
  };
  



  // Logout handler
  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white flex flex-col py-8 px-4 shadow-xl transition-transform duration-300 ease-in-out`}>
        <div className="text-2xl font-extrabold mb-10 tracking-tight text-center">Admin Panel</div>
        <nav className="flex-1 space-y-2">
          {sections.map((section) => (
            <button
              key={section.key}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeSection === section.key ? 'bg-white/20' : 'hover:bg-white/10'}`}
              onClick={() => {
                setActiveSection(section.key);
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Logout
        </button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10">
        {activeSection === "hero" && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaEdit className="text-xl lg:text-2xl text-blue-600" />
              <h1 className="text-xl lg:text-2xl font-bold text-blue-800">Edit Hero Section</h1>
            </div>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">{success}</div>}
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <form onSubmit={handleHeroSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    name="title"
                    value={hero.title}
                    onChange={handleHeroChange}
                    placeholder="Enter hero title"
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm lg:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    name="subtitle"
                    value={hero.subtitle}
                    onChange={handleHeroChange}
                    placeholder="Enter hero subtitle"
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm lg:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
                  <input
                    name="imageUrl"
                    value={hero.imageUrl}
                    onChange={handleHeroChange}
                    placeholder="Enter image URL"
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm lg:text-base"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm lg:text-base">
                  <FaSave />
                  {hero?._id ? 'Update Hero' : 'Create Hero'}
                </button>
              </form>
            )}
          </div>
        )}

        {activeSection === "dashboard" && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FaHome className="text-2xl lg:text-3xl text-blue-600" />
              <h1 className="text-xl lg:text-2xl font-bold text-blue-800">Welcome to the Admin Dashboard</h1>
            </div>
            <p className="text-gray-600 mb-6 text-sm lg:text-base">Use the sidebar to manage your site content.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <FaEdit className="text-xl lg:text-2xl text-blue-600 mx-auto mb-2" />
                <p className="text-xs lg:text-sm text-gray-600">Edit Hero</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <FaCogs className="text-xl lg:text-2xl text-purple-600 mx-auto mb-2" />
                <p className="text-xs lg:text-sm text-gray-600">Manage Services</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === "services" && (
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaCogs className="text-xl lg:text-2xl text-purple-600" />
              <h1 className="text-xl lg:text-2xl font-bold text-blue-800">Edit Services</h1>
            </div>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">{success}</div>}
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            ) : (
              <form onSubmit={handleServicesSubmit} className="space-y-6">
                {services.map((service, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100 relative">
                    <div className="flex items-center gap-2 mb-3">
                      <FaCogs className="text-purple-600" />
                      <span className="text-xs lg:text-sm font-medium text-gray-700">Service {idx + 1}</span>
                    </div>
                    <input
                      type="text"
                      value={service.title}
                      onChange={e => handleServiceChange(idx, "title", e.target.value)}
                      placeholder="Service Title"
                      className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2 text-sm lg:text-base"
                      maxLength={40}
                      required
                    />
                    <textarea
                      value={service.description}
                      onChange={e => handleServiceChange(idx, "description", e.target.value)}
                      placeholder="Short Description"
                      className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-sm lg:text-base"
                      maxLength={120}
                      required
                    />
                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveService(idx)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                        title="Remove service"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    )}
                  </div>
                ))}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
                    disabled={services.length >= 3}
                  >
                    <FaPlus />
                    Add Service
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm lg:text-base"
                  >
                    <FaSave />
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {activeSection === "contacts" && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaEnvelope className="text-xl lg:text-2xl text-green-600" />
              <h1 className="text-xl lg:text-2xl font-bold text-blue-800">View Contact Submissions</h1>
            </div>
            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-12">
                <FaEnvelope className="text-3xl lg:text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-base lg:text-lg">No contact submissions yet.</p>
                <p className="text-gray-400 text-sm">Contact form submissions will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                {/* Mobile Cards View */}
                <div className="lg:hidden space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact._id} className="bg-gray-50 rounded-lg p-4 border">
                      <div className="flex items-center gap-2 mb-2">
                        <FaUser className="text-gray-400" />
                        <span className="font-medium text-sm">{contact.name}</span>
                      </div>
                      <div className="text-blue-600 text-sm mb-2">{contact.email}</div>
                      <div className="text-gray-700 text-sm mb-2 line-clamp-3">{contact.message}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <table className="hidden lg:table w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-50 to-blue-50">
                      <th className="text-left p-4 border-b font-semibold text-gray-700">Name</th>
                      <th className="text-left p-4 border-b font-semibold text-gray-700">Email</th>
                      <th className="text-left p-4 border-b font-semibold text-gray-700">Message</th>
                      <th className="text-left p-4 border-b font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          {contact.name}
                        </td>
                        <td className="p-4 text-blue-600">{contact.email}</td>
                        <td className="p-4 max-w-xs">
                          <div className="truncate" title={contact.message}>
                            {contact.message}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
