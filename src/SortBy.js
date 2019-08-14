import React from 'react';

export const SortBy = ({onChange, count}) => {
  return count === 0 ? null : (
    <div className="product-catalogue__sort-by">
      <p className="sort-by">Сортировать</p>
      <select id="sorting" name="" onChange={(event) => onChange(event.currentTarget.value)}>
        <option value="popularity">по популярности</option>
        <option value="price">по цене</option>
      </select>
    </div>
  )
}