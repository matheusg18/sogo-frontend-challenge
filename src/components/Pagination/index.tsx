import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './styles.scss';

type PropTypes = {
  itemsPerPage: number;
  totalItems: number;
};

function Pagination({ itemsPerPage, totalItems }: PropTypes) {
  const [queryParams] = useSearchParams();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`pagination__item ${queryParams.get('page') === number.toString() ? 'pagination__item--active' : ''}`}
        >
          <Link to={`?page=${number}`} className="pagination__link">
            {number}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
