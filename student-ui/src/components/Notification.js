import React, { useEffect } from "react";
import "../styles/Notification.css";

function Notification({ message, type, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className={`notification notification-${type}`}>
            <div className="notification-content">
                <span className="notification-icon">
                    {type === "success" && "✓"}
                    {type === "error" && "✕"}
                    {type === "info" && "ℹ"}
                </span>
                <span className="notification-message">{message}</span>
            </div>
            <button className="notification-close" onClick={onClose}>×</button>
        </div>
    );
}

export default Notification;
