import { create } from 'zustand';
import { Booking } from '../../modules/bookings/models/Booking';

// Mock data for initial state
const mockBookings = [
  new Booking('1', '1', 'user1', 2, 'confirmed'),
  new Booking('2', '2', 'user1', 1, 'pending'),
];

// Booking Store using Zustand
export const useBookingStore = create((set, get) => ({
  bookings: mockBookings,
  loading: false,
  error: null,

  // Get all bookings
  getBookings: () => get().bookings,

  // Get bookings for specific user
  getBookingsByUserId: (userId) => {
    return get().bookings.filter(booking => booking.userId === userId);
  },

  // Get single booking by ID
  getBookingById: (id) => {
    return get().bookings.find(booking => booking.id === id);
  },

  // Get bookings for specific event
  getBookingsByEventId: (eventId) => {
    return get().bookings.filter(booking => booking.eventId === eventId);
  },

  // Add new booking
  addBooking: (booking) => {
    set((state) => ({
      bookings: [...state.bookings, booking],
    }));
  },

  // Update booking
  updateBooking: (id, updatedBooking) => {
    set((state) => ({
      bookings: state.bookings.map(booking =>
        booking.id === id ? { ...booking, ...updatedBooking } : booking
      ),
    }));
  },

  // Delete booking
  deleteBooking: (id) => {
    set((state) => ({
      bookings: state.bookings.filter(booking => booking.id !== id),
    }));
  },

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error state
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),
}));
