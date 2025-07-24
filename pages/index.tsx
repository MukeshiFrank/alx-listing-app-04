import { useEffect, useState } from "react";
import axios from "axios";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
}

export default function PropertyListingPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://your-api-endpoint.com/properties");
        setProperties(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading properties...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Property Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg shadow-md overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-gray-500 text-sm mt-2">{property.description}</p>
              <p className="text-green-600 font-bold mt-2">${property.price} / night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
