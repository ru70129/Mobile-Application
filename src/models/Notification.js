// Notification model
export class Notification {
  constructor(id, title, message, scheduledFor = new Date(), type = 'event-reminder') {
    this.id = id;
    this.title = title;
    this.message = message;
    this.scheduledFor = scheduledFor;
    this.type = type;
    this.createdAt = new Date();
  }
}
