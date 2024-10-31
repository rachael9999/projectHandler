// app/(platform)/(dashboard)/board/[boardId]/ganttchart/gantt-chart.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

interface GanttChartProps {
  events: {
    id: string;
    title: string;
    start: string;
    end: string;
  }[];
}

const GanttChart = ({ events }: GanttChartProps) => {
  const ganttContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ganttContainer.current) {
      const gantt = require('dhtmlx-gantt').gantt;
      
      // Set the date format
      gantt.config.date_format = "%Y-%m-%d %H:%i";

      gantt.init(ganttContainer.current);

      const tasks = {
        data: events.map(event => ({
          id: event.id,
          text: event.title,
          start_date: formatDate(event.start),
          end_date: formatDate(event.end),
        })),
      };
      console.log(tasks);

      gantt.parse(tasks);

      return () => {
        gantt.clearAll();
      };
    }
  }, [events]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return <div ref={ganttContainer} style={{ width: '100%', height: '100%' }} />;
};

export default dynamic(() => Promise.resolve(GanttChart), { ssr: false });