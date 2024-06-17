import React, { useEffect, useState } from 'react'
import { Box, Pagination } from "@mui/material"
import Service from '../Service/service';

const pageSize = 6;
function PaginationWorkflow({ setWorkflow}) {

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize
  });
  

  useEffect(() => {
    Service.getData({ from: pagination.from, to: pagination.to }).then(response => {
      setPagination({
        ...pagination,
        count: response.count
      })

      setWorkflow(response.data);
    });
  }, [pagination.from, pagination.to]);
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    // setPage(page);
    setPagination({ ...pagination, from: from, to: to });
  }
  return (
    <Box  sx={{display: 'flex', justifyContent: 'center', margin: "20px 0px" }}>
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        
        onChange={handlePageChange}
      />
    </Box>
  )
}

export default PaginationWorkflow;
