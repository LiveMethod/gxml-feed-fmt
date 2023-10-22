import React from 'react';
import { KSReview } from './types';

function Preview(review:KSReview) {
  return (
    <div className="card" key={review.id}>
      <h3>{review.title}</h3>
      <span className='meta'>
        <a href={review.reviewURL}>{review.reviewerName}</a> | {review.timestamp.toString()}
      </span>
      <p>{review.content}</p>
      {new Array(5).map((_,i)=> <div className={`star ${review.starRating >= i && 'filled'}`}>&nbsp;</div>)}

      {review.products.length > 0 && (
        <div className='products meta'>
          {review.products.map(p => <a className='product' href={p.url}>{p.title}</a> )}
        </div>
      )}
      
      
      {review.photoURLs.length > 0 && (
        <div className='photos'>
          {review.photoURLs.map(url => <img src={url}/>)}
        </div>
      )}

      {/* Raw output invisible by default but present in markup */}
      <pre className='raw'>{JSON.stringify(review, null, 2)}</pre>
    </div>
  );
}

export default Preview;