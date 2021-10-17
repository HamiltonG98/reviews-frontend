import React from 'react';
import { Link } from 'react-router-dom';
import {useQuery, gql} from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const REVIEWS = gql`
  query getReviews {
    reviews{
      title
      id
      rating
      body
      categories{
        id
        name
      }
    }
  }
`;

export default function Homepage() {
  const {error, loading, data} = useQuery(REVIEWS);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error :/</p>;

  return (
    <div>
      {data.reviews.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map(category => (
            <small key={category.id}>{category.name}</small>
          ))}

          <ReactMarkdown>{review.body.substring(0, 200) + '...'}</ReactMarkdown>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
