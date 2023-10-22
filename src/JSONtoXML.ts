import { relevantColNames, KSReview } from "./types";

const JSONtoXML = (reviews:KSReview[]) => {  
  const XMLString = `<?xml version="1.0" encoding="UTF-8"?>
  <feed xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="http://www.google.com/shopping/reviews/schema/product/2.3/product_reviews.xsd">
  <version>2.3</version>
  <publisher>
    <name>Kolorspun</name>
    <favicon>https://kolorspun.com/cdn/shop/files/favicon_clear.png</favicon>
  </publisher>
    <reviews>
    ${reviews.map(reviewToXML).join(' ')}
    </reviews>
    </feed>
  `;
  return XMLString;
};

const reviewToXML = (review: KSReview) => {
  // Images are an empty string when not present
  const images = review.photoURLs.length < 1 ? '' : `
  <reviewer_images>
    ${review.photoURLs.map(src => `<reviewer_image><url>${src}</url></reviewer_image>`).join(' ')}
  </reviewer_images>`;

  return(`<review>
    <reviewer>
      <name is_anonymous="${review.reviewerName ? 'false' : 'true'}">${review.reviewerName || 'Anonymous'}</name>
      <review_timestamp>${review.timestamp.toISOString()}</review_timestamp>
    </reviewer>
    ${/* For whatever reason, titles are unescaped, but content is already escaped */ ''}
    <title>${escapeXML(review.title)}</title>
    <content>${escapeXML(review.content)}</content>
    <review_url type="singleton">${review.reviewURL}</review_url>
    ${images}
    <ratings>
        <overall min="1" max="5">${review.starRating}</overall>
    </ratings>
    <products>
      <product>
          <product_ids>
              <brands>
                  <brand>Kolorspun</brand>
              </brands>
          </product_ids>
          <product_name>${review.products[0].title}</product_name>
          <product_url>${review.products[0].url}</product_url>
      </product>
    </products>
    <is_spam>false</is_spam>
  </review>`);
}

const escapeXML = (unsafe:string) => {
  return unsafe.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
}


export default JSONtoXML;
