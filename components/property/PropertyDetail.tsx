interface PropertyDetailProps {
  property: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    location: string;
  };
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>{property.title}</h1>
      <img
        src={property.image}
        alt={property.title}
        style={{ width: "100%", maxWidth: "500px", borderRadius: "8px" }}
      />
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Price:</strong> ${property.price}</p>
      <p>{property.description}</p>
    </div>
  );
}
