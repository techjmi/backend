const Rating = require('../models/rating');
const PostRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const postId = req.params.id;
    // Find the existing rating for the post
    let existingRating = await Rating.findOne({ postId });

    if (existingRating) {
      // Update the existing rating and increment the count
      existingRating.rating = rating;
      existingRating.count = (existingRating.count || 1) + 1;
      await existingRating.save();
    } else {
      // Create a new rating entry
      const newRating = await Rating.create({
        postId,
        rating,
        count: 1,
      });
    }

    console.log(`Received rating ${rating} for post ${postId}`);
    res.status(200).json({ message: 'Rating posted successfully' });
  } catch (error) {
    console.error('Error while posting rating:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const GetTotalRatings = async (req, res) => {
    try {
      const postId = req.params.id;
      const totalRatings = await Rating.find({ postId });
      // Calculate the total count
      const totalCount = totalRatings.length;
  
      res.status(200).json({ totalCount , totalRatings});
    } catch (error) {
      console.error('Error while getting total ratings:', error.message);
      res.status(500).json({ error: 'Internal Server Error' }); 
    }
  };
module.exports = { PostRating, GetTotalRatings };
    