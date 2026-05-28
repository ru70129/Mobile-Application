import { Booking } from '../models/Booking';

// Booking Service - Mock data operations
// In a real app, this would call an API

export const bookingService = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all bookings
  getBookings: async () => {
    await bookingService.delay(500);
    return {
      success: true,
      data: [],
    };
  },

  // Get booking by ID
  getBookingById: async (id) => {
    await bookingService.delay(300);
    return {
      success: true,
      data: null,
    };
  },

  // Create new booking
  createBooking: async (bookingData) => {
    await bookingService.delay(500);

    // Validate booking
    const validation = Booking.validate(bookingData);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors,
      };
    }

    // Create new booking with auto-generated ID
    const newBooking = new Booking(
      Date.now().toString(),
      bookingData.eventId,
      bookingData.userId,
      bookingData.numberOfPeople,
      bookingData.bookingStatus || 'pending'
    );

    return {
      success: true,
      data: newBooking,
    };
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    await bookingService.delay(500);

    // Validate booking
    const validation = Booking.validate(bookingData);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors,
      };
    }

    const updatedBooking = new Booking(
      id,
      bookingData.eventId,
      bookingData.userId,
      bookingData.numberOfPeople,
      bookingData.bookingStatus
    );

    return {
      success: true,
      data: updatedBooking,
    };
  },

  // Delete booking
  deleteBooking: async (id) => {
    await bookingService.delay(300);
    return {
      success: true,
      message: 'Booking deleted successfully',
    };
  },

  // Cancel booking
  cancelBooking: async (id) => {
    await bookingService.delay(300);
    return {
      success: true,
      message: 'Booking cancelled successfully',
    };
  },
};
