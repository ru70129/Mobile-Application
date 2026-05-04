import { Event } from '../../models/Event';

// Event Service - Mock data operations
// In a real app, this would call an API

export const eventService = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // Get all events
  getEvents: async () => {
    await eventService.delay(500);
    return {
      success: true,
      data: [],
    };
  },

  // Get single event
  getEventById: async (id) => {
    await eventService.delay(300);
    return {
      success: true,
      data: null,
    };
  },

  // Create new event
  createEvent: async (eventData) => {
    await eventService.delay(500);

    // Validate event
    const validation = Event.validate(eventData);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors,
      };
    }

    // Create new event with auto-generated ID
    const newEvent = new Event(
      Date.now().toString(),
      eventData.title,
      eventData.description,
      eventData.date,
      eventData.time,
      eventData.location
    );

    return {
      success: true,
      data: newEvent,
    };
  },

  // Update event
  updateEvent: async (id, eventData) => {
    await eventService.delay(500);

    // Validate event
    const validation = Event.validate(eventData);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors,
      };
    }

    const updatedEvent = new Event(
      id,
      eventData.title,
      eventData.description,
      eventData.date,
      eventData.time,
      eventData.location
    );

    return {
      success: true,
      data: updatedEvent,
    };
  },

  // Delete event
  deleteEvent: async (id) => {
    await eventService.delay(300);
    return {
      success: true,
      message: 'Event deleted successfully',
    };
  },
};
