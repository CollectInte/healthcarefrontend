import { useEffect } from "react";
import { useSocket } from "./context/SocketContext";
import { toast } from "react-toastify";

const NotificationListener = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Ask permission once
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // 🔔 COMMON HANDLER (reuse everywhere)
    const showNotification = (title, message) => {
      // 1️⃣ In-app toast
      toast.info(
        <>
          <strong>{title}</strong>
          <div>{message}</div>
        </>,
        {
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          pauseOnHover: true,
        }
      );

      // 2️⃣ System notification ONLY if tab hidden
      if (
        "Notification" in window &&
        Notification.permission === "granted" &&
        document.visibilityState === "hidden"
      ) {
        new Notification(title, { body: message });
      }
    };

    // ✅ NORMAL DB NOTIFICATION
    const handleNewNotification = (msg) => {
      showNotification(msg.title || "Notification", msg.message);
    };

    // ✅ APPOINTMENT CREATED
    const handleAppointmentCreated = (data) => {
      showNotification(
        "📅 Appointment Scheduled",
        `${data.message}\n${data.date} | ${data.from_time} - ${data.to_time}`
      );
    };

    socket.on("new-notification", handleNewNotification);
    socket.on("appointment_created", handleAppointmentCreated);

    return () => {
      socket.off("new-notification", handleNewNotification);
      socket.off("appointment_created", handleAppointmentCreated);
    };
  }, [socket]);

  return null;
};

export default NotificationListener;
