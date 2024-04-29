import { PaginationProps } from "../../types";
import styles from "./pagination.module.scss"



const Pagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
} : PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span className={styles.currentPage}>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;