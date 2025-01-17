'use client';

import { useState } from 'react';

const Notification = ({ message, onDelete }) => {
  return (
    <div className="flex items-center justify-between   dark:bg-darkbackground bg-gray-100 border  rounded-md p-4 mb-4 shadow-md">
      <p className="dark:text-white text-black">{message}</p>
      <button
        className="ml-4 px-3 py-1 text-black bg-red-400 dark:bg-slate-500 dark:text-white text-sm rounded-md hover:bg-red-600 transition duration-300"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default function NotificationComponent() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Notification 1' },
    { id: 2, message: 'Notification 2' },
    { id: 3, message: 'Notification 3' },
  ]);

  const handleDelete = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="max-w-md mx-auto dark:bg-darkbackground dark:hover:shadow-xl border  bg-blue-100  shadow-lg p-8 rounded-lg">
      <h2 className="text-lg font-semibold dark:text-white mb-4">Notifications</h2>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          onDelete={() => handleDelete(notification.id)}
        />
      ))}
      {notifications.length === 0 && (
        <p className="text-gray-500 text-sm">No notifications available.</p>
      )}
    </div>
  );
}
