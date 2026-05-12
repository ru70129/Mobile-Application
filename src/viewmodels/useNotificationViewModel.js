import { useCallback, useState } from 'react';
import { notificationService } from '../services/notifications/notificationService';

export const useNotificationViewModel = () => {
  const [enabled, setEnabled] = useState(notificationService.isEnabled());
  const [lastNotification, setLastNotification] = useState(null);
  const [error, setError] = useState(null);

  const toggleNotifications = useCallback(() => {
    const nextValue = notificationService.setEnabled(!enabled);
    setEnabled(nextValue);
    setError(null);
  }, [enabled]);

  const simulateEventReminder = useCallback((event) => {
    if (!event) {
      setError('No upcoming event available for a reminder.');
      return null;
    }

    const result = notificationService.scheduleEventReminder(event);

    if (result.success) {
      setLastNotification(result.data);
      setError(null);
      return result.data;
    }

    setError(result.error);
    return null;
  }, []);

  return {
    enabled,
    lastNotification,
    error,
    toggleNotifications,
    simulateEventReminder,
  };
};
