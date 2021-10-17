import React from 'react';
import { useParams } from 'react-router';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const REVIEW = gql`
  query getReviews($id: ID!) {
    review(id: $id){
      title
      id
      rating
      body
      categories{
        name
        id
      }
    }
  }
`;

export default function ReviewDetails() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(REVIEW, {
    variables: { id: id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="review-card">
      <div className="rating">{data.review.rating}</div>
      <h2>{data.review.title}</h2>

      {data.review.categories.map(category => (
        <small key={category.id}>{category.name}</small>
      ))}

      <ReactMarkdown>{data.review.body}</ReactMarkdown>
    </div>
  )
}
