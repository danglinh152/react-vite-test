import React, { useEffect, useState } from "react";
import { StarFilled } from "@ant-design/icons"; // Import icon StarFilled
import { Pagination, Spin } from "antd";
import { useParams } from "react-router-dom";

interface Feedback {
  feedbackId: number;
  feedback: string;
  rate: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}

interface FeedbackResponse {
  statusCode: number;
  error: null | string;
  message: string;
  data: {
    meta: {
      currentPage: number;
      pageSize: number;
      totalPages: number;
      total: number;
    };
    data: Feedback[];
  };
}

interface Props {
  bookId: string | undefined;
}

const NewestFeedback: React.FC<Props> = (props) => { // Use Props here
  const { id } = useParams<{ id: string }>(); // Get the id parameter from the URL
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageSize: 3,
    totalPages: 0,
    total: 0,
  });

  const fetchFeedbacks = async (page: number) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `http://localhost:8080/api/feedbacks?sort=updatedAt,desc&filter=book:${props.bookId}&page=${page}&size=${meta.pageSize}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: FeedbackResponse = await response.json();
      if (data.statusCode === 200) {
        setFeedbacks(data.data.data);
        setMeta({
          currentPage: data.data.meta.currentPage,
          pageSize: data.data.meta.pageSize,
          totalPages: data.data.meta.totalPages,
          total: data.data.meta.total,
        });
      } else {
        setError("Failed to fetch feedbacks");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchFeedbacks(meta.currentPage); // Fetch feedbacks when currentPage changes
  }, [meta.currentPage, meta.pageSize, id]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <StarFilled key={i} style={{ color: "gold" }} />
        ) : (
          <StarFilled key={i} style={{ color: "lightgray" }} />
        )
      );
    }
    return <>{stars}</>;
  };

  const handlePageChange = (page: number) => {
    setMeta((prevMeta) => ({ ...prevMeta, currentPage: page })); // Update currentPage
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="Loading feedbacks..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div>
      <ul>
        {feedbacks.map((feedback) => (
          <li style={{ margin: "20px 0" }} key={feedback.feedbackId}>
            <p>{feedback.feedback}</p>
            <p>Rating: {renderStars(feedback.rate)}</p>
            <p>
              Created by: {feedback.createdBy} on{" "}
              {new Date(feedback.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          current={meta.currentPage}
          pageSize={meta.pageSize}
          total={meta.total}
          onChange={handlePageChange} // Handle page change
        />
      </div>
    </div>
  );
};

export default NewestFeedback;
