import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';


type Props = {
  data: any[];
  onToggleLevel: (level: string) => void;
  selectedLevels: string[];
};

const LogLegendBoard: React.FC<Props> = ({ data, onToggleLevel, selectedLevels }) => {
  const totalCounts = {
    info: 0,
    warn: 0,
    error: 0,
    debug: 0,
  };

  data?.forEach(item => {
    totalCounts.info += item.info ?? 0;
    totalCounts.warn += item.warn ?? 0;
    totalCounts.error += item.error ?? 0;
    totalCounts.debug += item.debug ?? 0;
  });

  const levels = [
    { key: 'info', label: 'Info', color: '#01a5df' },
    { key: 'warn', label: 'Warn', color: '#feb968' },
    { key: 'error', label: 'Error', color: '#9d5cbb' },
    { key: 'debug', label: 'Debug', color: '#219654' },
  ];

  return (
    <Grid container spacing={2} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginLeft: '10vh', marginTop: '16px' }}>
      {levels.map(level => (
        <Grid container item xs={6} sm={6} md={3} lg={3} xl={3} key={level.key}
        onClick={() => onToggleLevel(level.key)}
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            // borderLeft: `6px solid ${level.color}`,
            // backgroundColor: selectedLevels.includes(level.key) ? '#f0f0f0' : '#fff',
            cursor: 'pointer',
        }}>
          <Paper
            elevation={selectedLevels.includes(level.key) ? 5 : 0}
            sx={{
              width: '100%',
              padding: '16px',
              textAlign: 'center',
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderLeft: `6px solid ${level.color}`,
              height: '100%',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#000', fontWeight: 600 }}>
              {level.label}
            </Typography>
            <Typography variant="h6" sx={{ color: '#000', fontSize: '20px', fontWeight: 700 }}>
              {`${new Intl.NumberFormat('en-IN').format(totalCounts[level.key as keyof typeof totalCounts])}`}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default LogLegendBoard;

