import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, CircularProgress, Box
} from '@mui/material';
import { getLogsDetails } from '../global/GlobalApi';

const PaginatedLogTable = ({ startDate, endDate, level, service }: {
    startDate: string;
    endDate: string;
    level: string[];
    service: string;
}) => {
  const [logs, setLogs] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [page, setPage] = useState(0); // 0-indexed for MUI
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const payload = {
        service,
        level,
        startDate,
        endDate,
        page: page + 1, // API is 1-indexed
        limit
      };

    const res = await getLogsDetails(payload);
      const { docs, totalDocs } = res.response;

      setLogs(docs);
      setTotalDocs(totalDocs);
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [startDate, endDate, level, service, page, limit]);

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <Paper elevation={0} sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        borderRadius: '12px',
        marginTop: '16px',
        marginBottom: '16px',
    }}>
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {['Timestamp', 'Level', 'Service', 'Message'].map((title) => (
                    <TableCell
                      key={title}
                      sx={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                        color: '#333'
                      }}
                    >
                      {title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.length === 0 ? (
                    <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 3, color: '#888' }}>
                        No data available
                    </TableCell>
                    </TableRow>
                ) : (
                    logs.map((log, index) => (
                    <TableRow
                        key={index}
                        sx={{
                        backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                        height: 36
                        }}
                    >
                        <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{log.level}</TableCell>
                        <TableCell>{log.service}</TableCell>
                        <TableCell>{log.message}</TableCell>
                    </TableRow>
                    ))
                )}
                </TableBody>

            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={totalDocs}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={limit}
            onRowsPerPageChange={handleLimitChange}
            rowsPerPageOptions={[10, 20, 50, 100]}
          />
        </>
      )}
    </Paper>
  );
};

export default PaginatedLogTable;
