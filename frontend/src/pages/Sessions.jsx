import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Sessions() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);

  const [reviewForm, setReviewForm] = useState({
    sessionId: "",
    revieweeId: "",
    rating: 5,
    comment: "",
  });

  const load = async () => {
    const { data } = await api.get("/api/sessions/mine");
    setSessions(data);
  };

  useEffect(() => {
    load();
  }, []);

  const markCompleted = async (id) => {
    await api.put(`/api/sessions/${id}/status`, { status: "Completed" });
    toast.success("Session marked as completed");
    load();
  };

  const openReviewForm = (session) => {
    const reviewee =
      session.learner?._id === user?._id ? session.teacher : session.learner;

    setReviewForm({
      sessionId: session._id,
      revieweeId: reviewee?._id,
      rating: 5,
      comment: "",
    });
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/reviews", {
        session: reviewForm.sessionId,
        reviewee: reviewForm.revieweeId,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      });

      toast.success("Review submitted successfully");

      setReviewForm({
        sessionId: "",
        revieweeId: "",
        rating: 5,
        comment: "",
      });

      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">My Sessions</h1>

      <div className="grid gap-4 mt-8">
        {sessions.length === 0 && (
          <p className="text-slate-500">No sessions booked yet.</p>
        )}

        {sessions.map((s) => {
          const otherUser =
            s.learner?._id === user?._id ? s.teacher : s.learner;

          const myReview = s.myReview;

          return (
            <div
              key={s._id}
              className="bg-white p-6 rounded-2xl shadow-sm border"
            >
              <h2 className="text-xl font-bold">{s.skill}</h2>

              <p className="mt-2">
                <b>With:</b> {otherUser?.name}
              </p>

              <p>
                <b>Date:</b> {s.date} | <b>Time:</b> {s.time}
              </p>

              <p>
                <b>Mode:</b> {s.mode}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span
                  className={`font-semibold ${
                    s.status === "Completed"
                      ? "text-green-600"
                      : s.status === "Cancelled"
                      ? "text-red-600"
                      : "text-indigo-600"
                  }`}
                >
                  {s.status}
                </span>
              </p>

              <div className="mt-4 flex gap-3 items-center">
                {s.meetingLink && (
                  <a
                    href={s.meetingLink}
                    target="_blank"
                    className="text-indigo-600"
                  >
                    Meeting Link
                  </a>
                )}

                {s.status === "Upcoming" && (
                  <button
                    onClick={() => markCompleted(s._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl"
                  >
                    Mark Completed
                  </button>
                )}

                {s.status === "Completed" && !myReview && (
                  <button
                    onClick={() => openReviewForm(s)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
                  >
                    Give Review
                  </button>
                )}
              </div>

              {myReview && (
                <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-xl">
                  <h3 className="font-bold text-lg text-green-700">
                    Your Review
                  </h3>

                  <p className="mt-2">
                    <b>Rating:</b> {myReview.rating}/5
                  </p>

                  <p className="mt-1">
                    <b>Review:</b> {myReview.comment}
                  </p>
                </div>
              )}

              {reviewForm.sessionId === s._id && !myReview && (
                <form
                  onSubmit={submitReview}
                  className="mt-6 bg-slate-50 p-4 rounded-xl border grid gap-4"
                >
                  <h3 className="font-bold text-lg">
                    Give Review to {otherUser?.name}
                  </h3>

                  <select
                    className="border p-3 rounded-xl"
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        rating: e.target.value,
                      })
                    }
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Average</option>
                    <option value="1">1 - Poor</option>
                  </select>

                  <textarea
                    className="border p-3 rounded-xl"
                    placeholder="Write your review..."
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        comment: e.target.value,
                      })
                    }
                    required
                  />

                  <button className="bg-slate-900 text-white p-3 rounded-xl">
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}