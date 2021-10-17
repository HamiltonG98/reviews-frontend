import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const CATEGORIES = gql`
  query getCategories{
    categories{
      name
      id
    }
  }
`;

export default function SiteHeader() {
  const { data, error, loading } = useQuery(CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :/</p>;

  return (
    <div className="site-header">
      <Link to="/"><h1>Ninja Reviews</h1></Link>
      <nav className="categories">
        <span>Filter reviews by category:</span>
        {data.categories.map(category => (
          <Link key={category.id} to={`/category/${category.id}`}>{category.name}</Link>
        ))}
      </nav>
    </div>
  );
}
