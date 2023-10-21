export const relevantColNames = [
"id",
"created_at",
"review_URL",
"title",
"body",
"rating",
"reviewer_image",
"productTitle",
"productUrl",
"author",
] as const;

export type KSRelevantCols = typeof relevantColNames[number];

// A subset of google's <review> type, with only
// the params relevant to Kolorspun
export type KSReview = {
  id: string
  timestamp: Date
  reviewURL: string
  title: string
  content: string // not a lot of info on what they allow here. md? html? breaks?
  starRating: number // of 5
  photoURLs: string[]
  products: KSProduct[]
  reviewerName: string | null
}

export type KSProduct = {
  title: string
  url: string
}