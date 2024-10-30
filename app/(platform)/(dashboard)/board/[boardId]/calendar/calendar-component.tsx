'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useCardModal } from '@/hooks/use-card-modals';

interface CalendarComponentProps {
  events: {
    id: string;
    title: string;
    start: string;
    end: string;
    importance: 'UNDEFINED' | 'LOW' | 'MEDIUM' | 'HIGH';
  }[];
}

const CalendarComponent = ({ events }: CalendarComponentProps) => {
  const cardModal = useCardModal();

  const handleEventClick = (clickInfo: any) => {
    cardModal.onOpen(clickInfo.event.id);
  };

    const getEventColor = (importance: string) => {
    switch (importance) {
      case 'LOW':
        return 'lightgreen';
      case 'MEDIUM':
        return 'yellow';
      case 'HIGH':
        return 'red';
      default:
        return 'lightgrey';
    }
  };

  return (
    <div className="h-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="100%"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default CalendarComponent;