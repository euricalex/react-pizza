import React from "react";
import ReactPaginate from "react-paginate";
import styles from '../scss/components/Pagination.module.scss';
type PaginationProps = {
  onChangePage: (page: number) => void;
  value: number;
}
const Pagination: React.FC<PaginationProps> = ({onChangePage, value}) => {
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
