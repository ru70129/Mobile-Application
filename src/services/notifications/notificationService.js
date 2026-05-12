import { Notification } from '../../models/Notification';

let notificationsEnabled = true;

export const notificationService = {
  isEnabled() {
    return notificationsEnabled;
  },

  setEnabled(enabled) {
    notificationsEnabled = enabled;
    return notificationsEnabled;
  },

  scheduleEventReminder(event) {
    if (!notificationsEnabled) {
      return {
        success: false,
        error: 'Notifications are disabled.',
      };
    }

    const notification = new Notification(
      `${Date.now()}`,
      'Event reminder',
      `Reminder set for ${event.title}`,
      new Date(),
      'event-reminder'
    );

    return {
      success: true,
      data: notification,
    };
  },
};
