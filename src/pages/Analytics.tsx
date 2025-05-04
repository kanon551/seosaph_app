/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { io } from 'socket.io-client'
import Grid from '@mui/material/Grid';
import "rsuite/dist/rsuite.min.css";
import { DateRangePicker } from "rsuite";
import {
  startOfToday,
  endOfToday,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import PaginatedLogTable from './PaginatedLogTable';
import LogLegendBoard from './LogLegendBoard';

const socket = io('http://localhost:2323');

const predefinedRanges = [
  {
    label: "Today",
    value: [startOfToday(), endOfToday()],
  },
  {
    label: "This Week",
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
  },
  {
    label: "This Month",
    value: [startOfMonth(new Date()), endOfMonth(new Date())],
  },
  {
    label: "This Year",
    value: [startOfYear(new Date()), endOfYear(new Date())],
  },
];


const Analytics: React.FC = () => {
  const [data, setData] = React.useState()
  const [option, setOption] = React.useState<any>({})
  const session = sessionStorage.getItem('sessionObj')
  const sess = JSON.parse(session as string)

  const [selectedLevels, setSelectedLevels] = useState(['info', 'warn', 'error', 'debug']);


  const defaultToday = [startOfToday(), endOfToday()] as [Date, Date];
  const [date, setDate] = useState<{
    start: '',
    end: ''
  }>({ start: '', end: '' });
  const [value, setValue] = useState<[Date, Date] | null>(defaultToday);

  const getShapeByIndex = (index: number) => {
    const shapes = ['triangle', 'diamond', 'rect', 'circle'];
    return shapes[index] !== undefined ? shapes[index] : 'none';
  }

  const getSymbolHtml = (symbol: string, color: string) => {
    switch(symbol){
      case 'circle':
        return `<svg width="10" height="10">
                  <circle cx="5" cy="5" r="5" fill="${color}" />
                </svg>`;
      case 'rect':
        return `<svg width="10" height="10">
                  <rect width="10" height="10" fill="${color}" />
                </svg>`;
      case 'diamond':
        return `<svg width="10" height="10">
                  <polygon points="5,0 10,5 5,10 0,5" fill="${color}" />
                </svg>`;
      case 'triangle':
        return `<svg width="10" height="10">
                  <polygon points="5,0 0,10 10,10" fill="${color}" />
                </svg>`;
      default:
        return '';
    }
  }
  const setMultiYAxisChart = () => {
    const levels = ['info', 'warn', 'error', 'debug'];
    const colors = {
      info: '#01a5df',
      warn: '#feb968',
      error: '#9d5cbb',
      debug: '#219654',
    };
    const xAxisData = data?.map(d => d.range);

    const series = levels.map((level, idx) => ({
      name: level,
      type: 'line',
      showSymbol: data?.length === 1,
      yAxisIndex: idx,
      smooth: true,
      symbol: getShapeByIndex(idx),
      symbolSize: idx === 1 ? 12 : 10,
      data: data?.map(d => d[level] ?? 0),
      lineStyle: { color: colors[level], width: 3 },
      itemStyle: { color: colors[level] },
    }));
  
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          let tooltip = `<div style= "display: flex; flex-direction: column; gap: 4px;">${params[0].axisValueLabel}</div>`;
          params.forEach((item: any) => {
            const symbolHtml = getSymbolHtml(getShapeByIndex(item.seriesIndex), item.color);
            tooltip += `<div style="display: flex; justify-content: space-between; gap: 2vh;">
                          <span style="text-transform: capitalize">${symbolHtml} ${item.seriesName}</span>
                          <span>${`${new Intl.NumberFormat('en-IN').format(Number(item.value))}`}</span>
                        </div>`;
          })
          return tooltip;
        }
      },
      // legend: {
      //   data: levels,
      // },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: xAxisData,
      },
      yAxis: levels.map((level, idx) => ({
        type: 'value',
        name: level.toUpperCase(),
        position: idx < 2 ? 'left' : 'right',
        offset: (idx === 1 || idx === 2 ) ? 0 : 60,
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[level],
          },
        },
        axisLabel: {
          formatter: '{value}',
        },
      })),
      grid: {
        left: '5%',
        right: '5%', // allow space for 2 right axes
        bottom: '3%',
        containLabel: true,
      },
      series,
    };

    setOption(option);

  }

  // Function to format with local offset
  const toLocalISOString = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const tzOffset = -date.getTimezoneOffset(); // in minutes
    const sign = tzOffset >= 0 ? '+' : '-';
    const offsetHours = pad(Math.floor(Math.abs(tzOffset) / 60));
    const offsetMinutes = pad(Math.abs(tzOffset) % 60);

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${String(date.getMilliseconds()).padStart(3, '0')}${sign}${offsetHours}:${offsetMinutes}`;
  };
  

  const handleChange = (newValue: [Date, Date] | null) => {
    if (!newValue) {
      setValue(defaultToday);
      return;
    }
  
    const [start, rawEnd] = newValue;
    const adjustedEnd = endOfDay(rawEnd);
  
    setValue([start, adjustedEnd]);
  };

  useEffect(()=> {
    const startDate = value ? toLocalISOString(value[0]) : toLocalISOString(defaultToday[0])
    const endDate = value ? toLocalISOString(value[1]) : toLocalISOString(defaultToday[1])
   
    setDate({
      start: startDate,
      end: endDate,
    })
  },[value])

  const handleToggleLevel = (levelKey: string) => {
    setSelectedLevels(prev =>
      prev.includes(levelKey)
        ? prev.filter(l => l !== levelKey)
        : [...prev, levelKey]
    );
  };

  
  useEffect(() => {
    setMultiYAxisChart();
  }, [data])


  useEffect(() => {
    const logPayload = {
      startDate: date.start,
      endDate: date.end
    };

    const interval = setInterval(() => {
      socket.emit('fetchLogData', logPayload);
    }, 1000); 

    return () => clearInterval(interval);
  }, [date]);

  useEffect(() => {
    socket.on('logUpdate', (logData) => {
      setData(logData);
      console.log(logData);
    });
    return () => {
      socket.off('logUpdate');
    };
  }, [date]);

  return (
    <div>
      <div
        style={{
          // height: '80vh',
          background: 'rgb(255, 255, 255)',
          marginBottom: '2vh',
          borderRadius: '12px',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            padding: '16px',
            justifyContent: 'space-between',
          }}
        >
          <h3
            style={{
              marginTop: '0px',
              marginBottom: '0px',
              fontSize: '16px',
              lineHeight: '32px',
            }}
          >
            Real-Time Log Analyzer &amp; Visualizer
          </h3>
          <div style={{ padding: 2 }}>
            <h3 style={{
              fontSize: '16px',
              lineHeight: '32px',
            }}>Select Date Range</h3>
            <DateRangePicker
              ranges={predefinedRanges}
              placeholder="Select date range"
              value={value}
              onChange={handleChange}
              showOneCalendar
              style={{ width: 280 }}
            />
          </div>
        </Box>
        {
            data && data.length > 0 && option ? (
              <>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1 }}>
                    <LogLegendBoard data={data} selectedLevels={selectedLevels} onToggleLevel={handleToggleLevel}/>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <ReactECharts option={option}  style={{ width: '100%'}} opts={{ renderer: 'canvas' }}/>
                    </Grid>
                  </Grid>
                  </Box>
              </>
              
            )
            :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <h3 style={{ fontSize: '16px', lineHeight: '32px' }}>No Data Available</h3>
            </div>
        }
      </div>
      <PaginatedLogTable
        startDate={date.start}
        endDate={date.end}
        level={selectedLevels.length > 0 ? selectedLevels : ['info', 'warn', 'error', 'debug']}
        service='notifications'
      />
    </div>
  )
}

export default Analytics
