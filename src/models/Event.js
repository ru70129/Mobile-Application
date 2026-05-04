// Event Model
export class Event {
  constructor(id, title, description, date, time, location) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.time = time;
    this.location = location;
    this.createdAt = new Date();
  }

  static validate(event) {
    const errors = {};
    
    if (!event.title || event.title.trim() === '') {
      errors.title = 'Event title is required';
    }
    
    if (!event.description || event.description.trim() === '') {
      errors.description = 'Event description is required';
    }
    
    if (!event.date || event.date.trim() === '') {
      errors.date = 'Event date is required';
    }
    
    if (!event.time || event.time.trim() === '') {
      errors.time = 'Event time is required';
    }
    
    if (!event.location || event.location.trim() === '') {
      errors.location = 'Event location is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
