const Review = require('./path/to/Review');

let newReview = new Review({
  product: productId, // ObjectId of the product being reviewed
  user: userId,       // ObjectId of the user writing the review
  rating: 4,          // Rating given by the user
  comment: 'Great product! Really helped me with my problem.'
});

newReview.save()
  .then(review => console.log(review))
  .catch(err => console.error('Error saving review:', err));