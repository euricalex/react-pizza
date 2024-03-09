import React from "react";
import ReactPaginate from "react-paginate";
import styles from '../scss/components/Pagination.module.scss';
function Pagination({onChangePage, value}) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=" >"
      previousLabel="< "
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={value}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
