export default class NotificationModel {
  constructor({ title = '', message = '', timestamp = null } = {}) {
    this.title = title;
    this.message = message;
    this.timestamp = timestamp || new Date().toISOString();
  }
}
