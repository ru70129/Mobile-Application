import { useState, useCallback } from 'react';
import { useEventStore } from '../store/eventStore';
import { eventService } from '../services/events/eventService';
import { Event } from '../models/Event';

// Event ViewModel - Business logic for event management
export const useEventViewModel = () => {
  const {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    setLoading,
    setError,
    clearError,
  } = useEventStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Update form field
  const updateFormField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  }, [validationErrors]);

  // Handle create event
  const handleCreateEvent = useCallback(async () => {
    setLoading(true);
    clearError();

    try {
      const result = await eventService.createEvent(formData);

      if (result.success) {
        const newEvent = result.data;
        addEvent(newEvent);
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
        });
        setValidationErrors({});
      } else {
        setValidationErrors(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [formData, addEvent, setLoading, setError, clearError]);

  // Handle edit event
  const handleEditEvent = useCallback((eventId) => {
    const event = getEventById(eventId);
    if (event) {
      setEditingId(eventId);
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
      });
    }
  }, [getEventById]);

  // Handle update event
  const handleUpdateEvent = useCallback(async () => {
    if (!editingId) return;

    setLoading(true);
    clearError();

    try {
      const result = await eventService.updateEvent(editingId, formData);

      if (result.success) {
        updateEvent(editingId, result.data);
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
        });
        setEditingId(null);
        setValidationErrors({});
      } else {
        setValidationErrors(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [editingId, formData, updateEvent, setLoading, setError, clearError]);

  // Handle delete event
  const handleDeleteEvent = useCallback(async (eventId) => {
    setLoading(true);
    clearError();

    try {
      const result = await eventService.deleteEvent(eventId);

      if (result.success) {
        deleteEvent(eventId);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [deleteEvent, setLoading, setError, clearError]);

  // Cancel editing
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
    });
    setValidationErrors({});
  }, []);

  return {
    // State
    events,
    loading,
    error,
    formData,
    editingId,
    validationErrors,

    // Actions
    updateFormField,
    handleCreateEvent,
    handleEditEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    handleCancelEdit,
    clearError,
  };
};
