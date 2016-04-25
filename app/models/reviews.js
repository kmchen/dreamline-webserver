var mongoose  = require('mongoose');

var Schema    = mongoose.Schema;

var ReviewSchema = new Schema({
  airport_name: String,
  link: String,
  title: String,
  author: String,
  author_country: String,
  date: String,
  content: String,
  experience_airport: String,
  date_visit: String,
  type_traveller: String,
  overall_rating: Number,
  queuing_rating:Number,
  terminal_cleanliness_rating: Number,
  terminal_seating_rating: Number,
  terminal_signs_rating: Number,
  food_beverages_rating: Number,
  airport_shopping_rating: Number,
  wifi_connectivity_rating: Number,
  airport_staff_ratingL: Number,
  recommended: Number,
}, { collection: 'review' })

module.exports = mongoose.model('Review', ReviewSchema);
