// Booking Model
export class Booking {
  constructor(id, eventId, userId, numberOfPeople, bookingStatus = 'pending') {
    this.id = id;
    this.eventId = eventId;
    this.userId = userId;
    this.numberOfPeople = numberOfPeople;
    this.bookingStatus = bookingStatus; // pending, confirmed, cancelled
    this.createdAt = new Date();
  }

  static validate(booking) {
    const errors = {};
    
    if (!booking.eventId) {
      errors.eventId = 'Event ID is required';
    }
    
    if (!booking.userId) {
      errors.userId = 'User ID is required';
    }
    
    if (!booking.numberOfPeople || booking.numberOfPeople < 1) {
      errors.numberOfPeople = 'Number of people must be at least 1';
    }
    
    if (!booking.bookingStatus) {
      errors.bookingStatus = 'Booking status is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
