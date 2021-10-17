import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


const CATEGORY = gql`
  query getCategory($id: ID!){
    category(id: $id){
      id
      name
      reviews{
        title
        body
        rating
        id
        categories{
          name
          id
        }
      }
    }
  }
`;

export default function Category() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(CATEGORY, {
    variables: { id: id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :/</p>;

  return (
    <div>
      <h2>{data.category.name}</h2>
      {data.category.reviews.map(review => (
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
  )
}
