import React from 'react';

export const Pagination = (props) => {
  const {currentPage, setPage} = props;
  const pages = (new Array(props.pages)).fill().map((el, i) => i + 1);
  const handlePageClick = (event) => {
    event.preventDefault();
    setPage(parseInt(event.currentTarget.textContent))
  }
  const handleForwardClick = (event) => {
    event.preventDefault();
    setPage(currentPage + 1);
  }
  const handleBackClick = (event) => {
    event.preventDefault();
    setPage(currentPage - 1);
  }
  
  return (
    <div className="product-catalogue__pagination">
      <div className="page-nav-wrapper">
        <div className="angle-back"><a href="/" onClick={handleBackClick}></a></div>
        <ul>
        {pages.map((el, i) => (
            <li key={i} className={el == currentPage ? "active" : ''}>
              <a to="/favorite" onClick={handlePageClick}>{el}</a>
            </li>))}
        </ul>
        <div className="angle-forward"><a href="/" onClick={handleForwardClick}></a></div>
      </div>
     </div>
  )
}