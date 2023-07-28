import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AssetHistoryStamp, Interval } from './CoinCap';

const Chart = ({ data, interval } : { data: AssetHistoryStamp[], interval: Interval  }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [cursor, setCursor] = useState<[number, number] | null>(null);

  const paddingPercent = 0.025;
  const min = useMemo(() => Math.min(...data.map((d) => parseFloat(d.priceUsd))) || 0, [data]);
  const max = useMemo(() => Math.max(...data.map((d) => parseFloat(d.priceUsd))) || 0, [data]);
  const DateFormater = useMemo(() => {
    switch (interval) {
      case 'm1':
      case 'm5':
      case 'm15':
      case 'm30':
        return Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' });
      case 'h1':
      case 'h2':
      case 'h6':
      case 'h12':
        return Intl.DateTimeFormat('en-US', { hour: 'numeric', day: 'numeric' });
      case 'd1':
      default:
        return Intl.DateTimeFormat('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
    }
  }, [interval]);
  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
    }
  }, [ref, data]);

  const xAxisTexts = useMemo(() => {
    if (data.length === 0) {
      return null;
    }
    // we always want 10 labels
    const labels = [];
    const intervalLength = Math.floor(data.length / 10);
    for (let i = 0; i < data.length; i += intervalLength) {
      const label = data[i];
      labels.push(
        <text
          key={label.time}
          x={width * paddingPercent + (width * (1 - paddingPercent * 2)) * (i / data.length)}
          y={height * (1 - paddingPercent) + 5}
          fill="white"
          fontSize={12}
          textAnchor="middle"
          dominantBaseline="hanging"
        >
          {DateFormater.format(new Date(label.date))}
        </text>
      );
    }
    return labels;
  }, [data, interval, DateFormater]);
  
  const yAxisTexts = useMemo(() => {
    if (data.length === 0) {
      return null;
    }
    const labels = [];
    const range = max - min;
    const intervalLength = range / 10;
    for (let i = 0; i < 10; i++) {
      const label = min + intervalLength * i;
      labels.push(
        <>
          <text
            key={label}
            x={width * paddingPercent - 5}
            y={height * (1 - paddingPercent) - (height * (1 - paddingPercent * 2)) * (i / 10) - 5}
            fill="white"
            fontSize={12}
            textAnchor="end"
            dominantBaseline="middle"
          >
            {label.toFixed(2)}
          </text>
          <line
            x1={width * paddingPercent}
            y1={height * (1 - paddingPercent) - (height * (1 - paddingPercent * 2)) * (i / 10)}
            x2={width * (1 - paddingPercent)}
            y2={height * (1 - paddingPercent) - (height * (1 - paddingPercent * 2)) * (i / 10)}
            stroke="#ffffff33"
            strokeWidth={1}
          />
        </>
      );
    }
    return labels;
  }, [data, interval, min, max]);

  const line = useMemo(() => {
    if (data.length === 0) {
      return null;
    }
    const range = max - min;
    const xIntervalLength = (width * (1 - paddingPercent * 2)) / data.length;
    const yIntervalLength = (height * (1 - paddingPercent * 2)) / range;
    const points = data.map((d, i) => {
      const x = width * paddingPercent + xIntervalLength * i;
      const y = height * (1 - paddingPercent) - yIntervalLength * (parseFloat(d.priceUsd) - min);
      return `${x},${y}`;
    });
    return (
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={cursor ? '#ffffff33' : 'white'}
        strokeWidth={1}
      />
    );
  }, [data, interval, min, max, cursor]);

  // show value and line on hover at cursor position
  useEffect(() => {
    if (data.length === 0 || !ref.current) {
      return;
    }
    const mouseMove = (e: MouseEvent) => {
      const { left, top } = ref.current.getBoundingClientRect();
      setCursor([e.clientX - left, e.clientY - top]);
    };
    const mouseLeave = () => {
      setCursor(null);
    };
    ref.current.addEventListener('mouseleave', mouseLeave);
    ref.current.addEventListener('mousemove', mouseMove);
    return () => {
      ref.current?.removeEventListener('mousemove', mouseMove);
      ref.current?.removeEventListener('mouseleave', mouseLeave);
    };
  }, [data, interval, min, max]);

  const cursorSvg = useMemo(() => {
    if (!cursor) {
      return null;
    }
    const [x, y] = cursor;
    const range = max - min;
    const xIntervalLength = (width * (1 - paddingPercent * 2)) / data.length;
    const yIntervalLength = (height * (1 - paddingPercent * 2)) / range;
    const index = Math.floor((x - width * paddingPercent) / xIntervalLength);
    if (index < 0 || index >= data.length) {
      return null;
    }
    const d = data[index];
    const cx = width * paddingPercent + xIntervalLength * index;
    const cy = height * (1 - paddingPercent) - yIntervalLength * (parseFloat(d.priceUsd) - min);
    return (
      <>
        <line
          x1={cx}
          y1={height * (1 - paddingPercent)}
          x2={cx}
          y2={height * paddingPercent}
          stroke="white"
          strokeWidth={1}
        />
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="white"
        />
        <text
          x={cx}
          y={cy - 10}
          fill="white"
          fontSize={14}
          textAnchor="middle"
          dominantBaseline="baseline"
        >
          {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(d.priceUsd))}
        </text>
      </>
    );

  }, [cursor, data, interval, min, max]);

  return (
    <div className="w-full h-full" ref={ref}>
      <svg width={width} height={height} className="select-none">
        {/* x axis line with text and padding */}
        <line
          x1={width * paddingPercent}
          y1={height * (1 - paddingPercent)}
          x2={width * (1 - paddingPercent)}
          y2={height * (1 - paddingPercent)}
          stroke="white"
          strokeWidth={1}
        />
        {xAxisTexts}
        {/* y axis line with text and padding */}
        <line
          x1={width * paddingPercent}
          y1={height * (1 - paddingPercent)}
          x2={width * paddingPercent}
          y2={height * paddingPercent}
          stroke="white"
          strokeWidth={1}
        />
        {yAxisTexts}
        {/* line */}
        {line}
        {/* cursor */}
        {cursorSvg}
      </svg>
    </div>
  )
};

export default Chart;