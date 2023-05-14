import React from 'react';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div>
      <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      <span>{currentPage}</span>
      <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
