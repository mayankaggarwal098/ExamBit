import React from 'react';
import { Pagination } from 'react-bootstrap';
import _ from 'lodash';
import './clock.css';

const Paginations = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      {/* <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul> */}
      <Pagination size="lg">
        {pages.map(page => (
          <div
            class="mypost"
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </div>
        ))}
      </Pagination>
    </nav>
  );
};

export default Paginations;