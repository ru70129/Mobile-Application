// Simple notification service - mock implementation
import NotificationModel from '../models/Notification';

let enabled = false;

export const notificationService = {
  isEnabled: () => enabled,
  setEnabled: (value) => {
    enabled = !!value;
    console.log('Notifications enabled:', enabled);
    return enabled;
  },

  scheduleEventReminder: (event) => {
    try {
      if (!enabled) {
        return { success: false, error: 'Notifications are disabled' };
      }

      const note = new NotificationModel({
        title: `Reminder: ${event.title}`,
        message: `Upcoming event on ${event.date} at ${event.time}`,
        timestamp: new Date().toISOString(),
      });

      // Simulate delivering notification (could be alert or console)
      console.log('Simulated notification:', note);

      return { success: true, data: note };
    } catch (err) {
      return { success: false, error: 'Failed to schedule reminder' };
    }
  },
};

export default notificationService;

