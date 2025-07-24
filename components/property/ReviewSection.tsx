import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: string;
  comment: string;
  user?: string;
  rating?: number;
}

interface Props {
  propertyId: string;
}

const ReviewSection = ({ propertyId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchReviews();
    }
  }, [propertyId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews yet for this property.</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Property Reviews</h3>
      {reviews.map((review) => (
        <div
          key={review.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: "10px",
            paddingBottom: "10px",
          }}
        >
          <p>
            <strong>{review.user || "Anonymous"}</strong> –{" "}
            <em>{review.rating ? `${review.rating}/5` : "No rating"}</em>
          </p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
