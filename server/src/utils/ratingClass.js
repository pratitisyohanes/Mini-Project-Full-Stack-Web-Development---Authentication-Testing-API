export function ratingClass(rating) {
  if (rating >= 8.5) return 'Top Rated'
  if (rating >= 7) return 'Popular'
  return 'Regular'
}
