import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useSelectedDatesStore } from "../../../store/dateStore";
import History from "../History";
import { useApiQuery } from "../../../hooks/useQuery";
import { foodStore } from "../../../store/foodStore";
import dayjs from "dayjs";
import { userStore } from "../../../store/userStore";
import { toast } from "react-hot-toast";

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

const MyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState(Views.MONTH);
  const { selectedEvents, toggleEvent } = useSelectedDatesStore();
  const { setFoodList, foodList } = foodStore();
  const { user } = userStore();
  const [isBlocked, setIsBlocked] = useState(false);

  const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const { data: checkout } = useApiQuery({
    endpoint: "/attendance/list",
    queryKey: ["checkout", user.employeeId],
  });

  useEffect(() => {
    if (checkout?.attendances && Array.isArray(checkout.attendances)) {
      const now = new Date();
      const missed = checkout.attendances.filter((att) => {
        const date = new Date(att.date);
        const isCurrentMonth =
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear();
        const isPastDay = date < new Date().setHours(0, 0, 0, 0);
        return isCurrentMonth && isPastDay && att.check_out === false;
      });
      if (missed.length >= 5) {
        setIsBlocked(true);
      }
    }
  }, [checkout]);

  const { data: Foods } = useApiQuery(
    {
      endpoint: "foodmonth/list",
      queryKey: ["food"],
    },
    {
      onSuccess: (data) => setFoodList(data),
    }
  );

  useEffect(() => {
    if (Foods) {
      setFoodList(Foods);
    }
  }, [Foods, setFoodList]);

  const events = (foodList || []).map((item) => ({
    id: item.id,
    title: `${item.food_name}`,
    start: new Date(item.date),
    end: new Date(item.date),
    price: item.price,
  }));

  const isDateSelected = (date) =>
    selectedEvents.some(
      (e) => new Date(e.start).toDateString() === date.toDateString()
    );

  const eventStyleGetter = (event) => {
    const isSelected = selectedEvents.some((e) => e.id === event.id);
    const textColor = isDark ? "#d8d8d8" : "#3e3e3e"; // yellow-500 or yellow-400

    return {
      style: {
        backgroundColor: "transparent",
        color: textColor,
        fontWeight: 500,
        padding: "2px 6px",
        fontSize: "0.875rem",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    };
  };

  const dayPropGetter = (date) => {
    const today = new Date();
    const nextMonthDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const isSameMonth =
      date.getMonth() === nextMonthDate.getMonth() &&
      date.getFullYear() === nextMonthDate.getFullYear();
    const isWeekend = [0, 6].includes(date.getDay());
    const isSelected = isDateSelected(date);

    const base = {
      cursor: isSameMonth && !isWeekend ? "pointer" : "not-allowed",
      backgroundColor: "transparent",
      color: "inherit",
    };

    if (!isSameMonth || isWeekend) {
      return {
        style: {
          ...base,
          backgroundColor: isDark ? "#333b47" : "#e7e7e9",
        },
      };
    }

    if (isSelected) {
      return {
        style: {
          ...base,
          backgroundColor: "rgba(234, 179, 8, 0.2)", // yellow-500 transparent
          border: "1px solid rgba(234, 179, 8)", // yellow-500
          color: isDark ? "#f59e0b" : "#fbbf24", // yellow-500 dark / yellow-400 light
          fontWeight: "600",
        },
      };
    }

    return { style: base };
  };

  const handleSelectSlot = (slotInfo) => {
    if (isBlocked) {
      toast.error("You missed 5 checkouts. You cannot order for next month.");
      return;
    }

    const clickedDate = slotInfo.start;
    const today = new Date();
    const nextMonthDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const isSameMonth =
      clickedDate.getMonth() === nextMonthDate.getMonth() &&
      clickedDate.getFullYear() === nextMonthDate.getFullYear();
    const isWeekend = [0, 6].includes(clickedDate.getDay());

    if (!isSameMonth || isWeekend) return;

    const foundEvent = events.find(
      (e) => new Date(e.start).toDateString() === clickedDate.toDateString()
    );
    if (foundEvent) {
      toggleEvent(foundEvent);
    }
  };

  const handleSelectEvent = (event) => {
    if (isBlocked) {
      toast.error("You missed 5 checkouts. You cannot order for next month.");
      return;
    }

    const eventDate = new Date(event.start);
    const today = new Date();
    const nextMonthDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const isSameMonth =
      eventDate.getMonth() === nextMonthDate.getMonth() &&
      eventDate.getFullYear() === nextMonthDate.getFullYear();
    const isWeekend = [0, 6].includes(eventDate.getDay());

    if (!isSameMonth || isWeekend) return;

    toggleEvent(event);
  };

  return (
    <div className="mt-6 max-w-5xl mx-auto px-4">
      <div className="bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-800 p-6 rounded-lg shadow-md">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          view={currentView}
          onView={(view) => setCurrentView(view)}
          events={events}
          tooltipAccessor={(event) => `${event.title}`}
          views={["month"]}
          selectable="ignoreEvents"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          dayPropGetter={dayPropGetter}
          eventPropGetter={eventStyleGetter}
          style={{
            height: 600,
            backgroundColor: "transparent",
            color: "inherit",
          }}
        />
      </div>

      <div className="mt-8">
        <History />
      </div>
    </div>
  );
};

export default MyCalendar;
