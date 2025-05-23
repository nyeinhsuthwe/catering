import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { useSelectedDatesStore } from "../../../store/dateStore";
import History from "../History";
import { useApiQuery } from "../../../hooks/useQuery";
import { foodStore } from "../../../store/foodStore";

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

  // API
  const { data: Foods } = useApiQuery(
    {
      endpoint: "foodmonth/list",
      queryKey: ["food"],
    },
    {
      onSuccess: (data) => {
        setFoodList(data);
      },
    }
  );

  useEffect(() => {
    if (Foods) {
      setFoodList(Foods);
    }
  }, [Foods, setFoodList]);

  console.log(foodList);

  const events = (foodList || []).map((item) => ({
    id: item.id,
    title: `${item.food_name}`,
    start: new Date(item.date),
    end: new Date(item.date),
    price: item.price,
  }));

  const today = new Date();
  const nextMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const isDateSelected = (date) =>
    selectedEvents.some(
      (e) => new Date(e.start).toDateString() === date.toDateString()
    );

  const dayPropGetter = (date) => {
    const currentMonth = date.getMonth();
    const isCloseMonth = currentMonth === nextMonth;
    const isCurrentYear = date.getFullYear() === currentYear;
    const isWeekend = [0, 6].includes(date.getDay());

    if (!(isCloseMonth && isCurrentYear) || isWeekend) {
      return {
        style: {
          backgroundColor: "#eee",
          color: "#aaa",
          pointerEvents: "none",
          cursor: "not-allowed",
        },
      };
    }

    if (isDateSelected(date)) {
      return {
        style: {
          backgroundColor: "#c6f6d5",
          cursor: "pointer",
        },
      };
    }

    return {
      style: {
        cursor: "pointer",
      },
    };
  };

  const eventStyleGetter = (event) => {
    const isSelected = selectedEvents.some((e) => e.id === event.id);

    let backgroundColor = "#d3d3d3";
    if (event.title === "Food") backgroundColor = "#f0cd00";
    else if (event.title === "Beverages") backgroundColor = "#add8e6";

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        border: isSelected ? "2px solid green" : "none",
        color: "black",
        padding: "2px 5px",
      },
    };
  };

  const handleSelectSlot = (slotInfo) => {
    const clickedDate = slotInfo.start;
    const foundEvent = events.find(
      (e) => new Date(e.start).toDateString() === clickedDate.toDateString()
    );

    if (foundEvent) {
      toggleEvent(foundEvent);
    } else {
      return
    }
  };

  const handleSelectEvent = (event) => {
    toggleEvent(event);
  };

  console.log(selectedEvents);

  return (
    <div className="flex  dark:bg-black">
      <div className="w-2/3 p-5 bg-gray-100 h-full ">
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
          style={{ height: 600 }}
        />
      </div>
      <div className="w-1/3">
        <History />
      </div>
    </div>
  );
};

export default MyCalendar;
