import React, { useState } from "react";
import { Card, Pagination } from "flowbite-react";
import { announcementStore } from "../../store/announcement";

const Announce = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (page) => setCurrentPage(page);
  const { announcements } = announcementStore();  

  const sortedAnnouncements = [...announcements].sort(
    (a, b) =>
      new Date(b.created_at || b.date) - new Date(a.created_at || a.date)
  );

  const count = 4;
  const totalPages = Math.ceil(sortedAnnouncements.length / count);
  const paginatedAnnouncements = sortedAnnouncements.slice(
    (currentPage - 1) * count,
    currentPage * count
  );

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className="h-[90vh] w-full overflow-y-scroll py-6 pr-11 flex flex-col items-center">
      {sortedAnnouncements.length > 0 ? (
        paginatedAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="max-w-lg mt-10 w-full">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {announcement.text}
            </p>
            <p className="text-xs dark:text-yellow-500 text-yellow-400 font-bold justify-items-end">
              {formatDateTime(announcement.created_at)}
            </p>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500">No announcements available</p>
        </div>
      )}

      <div className="mt-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  );
};

export default Announce;
