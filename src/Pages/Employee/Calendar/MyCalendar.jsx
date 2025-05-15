import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Meeting with Team",
    start: new Date(),
    end: new Date(),
    allDay: true,
  },
];
const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);

  const currentYear = new Date().getFullYear();
  const dayPropGetter = (date) => {
    const isJune = date.getMonth() === 5;
    const isCurrentYear = date.getFullYear() === currentYear;
    const isWeekend = [0, 6].includes(date.getDay());

    if (!(isJune && isCurrentYear) || isWeekend) {
      return {
        style: {
          backgroundColor: "#eee",
          color: "#aaa",
          pointerEvents: "none",
          cursor: "not-allowed",
        },
      };
    }
    return {};
  };

  return (
    <div className="p-5 bg-gray-100 h-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        views={["month"]}
        selectable
        dayPropGetter={dayPropGetter}
        style={{ height: 600 }}
      />
    </div>
  );
};

export default MyCalendar;
