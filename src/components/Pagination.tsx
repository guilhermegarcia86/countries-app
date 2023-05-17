import React from 'react';
import { Box, Button, Pagination as MuiPagination } from '@mui/material';

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
    <Box display="flex" justifyContent="center" marginTop={5} marginBottom={5}>
      <Button
        variant="contained"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Box marginLeft={1} marginRight={1} alignSelf="center">
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
        />
      </Box>
      <Button
        variant="contained"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;