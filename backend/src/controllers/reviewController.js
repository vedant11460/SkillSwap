import Review from "../models/Review.js";
import User from "../models/User.js";

export const createReview = async (req, res) => {
  const { session, reviewee, rating, comment } = req.body;

  const alreadyReviewed = await Review.findOne({
    session,
    reviewer: req.user._id,
  });

  if (alreadyReviewed) {
    return res.status(400).json({
      message: "You have already reviewed this session",
    });
  }

  const review = await Review.create({
    session,
    reviewer: req.user._id,
    reviewee,
    rating,
    comment,
  });

  const reviews = await Review.find({ reviewee });
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await User.findByIdAndUpdate(reviewee, {
    averageRating: Number(avg.toFixed(1)),
    ratingCount: reviews.length,
  });

  res.status(201).json(review);
};

export const userReviews = async (req, res) => {
  const reviews = await Review.find({ reviewee: req.params.userId })
    .populate("reviewer", "name profilePhoto")
    .sort({ createdAt: -1 });

  res.json(reviews);
};

export const mySessionReview = async (req, res) => {
  const review = await Review.findOne({
    session: req.params.sessionId,
    reviewer: req.user._id,
  });

  res.json(review);
};