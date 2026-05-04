import { create } from 'zustand';
import { Event } from '../models/Event';

// Mock data for initial state
const mockEvents = [
  new Event('1', 'React Native Workshop', 'Learn advanced React Native concepts', '2026-05-15', '10:00 AM', 'Tech Hub Downtown'),
  new Event('2', 'Mobile Development Summit', 'Discuss latest trends in mobile development', '2026-05-20', '2:00 PM', 'Convention Center'),
];

// Event Store using Zustand
export const useEventStore = create((set, get) => ({
  events: mockEvents,
  loading: false,
  error: null,

  // Get all events
  getEvents: () => get().events,

  // Get single event by ID
  getEventById: (id) => {
    return get().events.find(event => event.id === id);
  },

  // Add new event
  addEvent: (event) => {
    set((state) => ({
      events: [...state.events, event],
    }));
  },

  // Update event
  updateEvent: (id, updatedEvent) => {
    set((state) => ({
      events: state.events.map(event =>
        event.id === id ? { ...event, ...updatedEvent } : event
      ),
    }));
  },

  // Delete event
  deleteEvent: (id) => {
    set((state) => ({
      events: state.events.filter(event => event.id !== id),
    }));
  },

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error state
  setError: (error) => set({ error }),

  // Clear error
  clearError: () => set({ error: null }),
}));
