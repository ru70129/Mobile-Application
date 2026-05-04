import { useState, useCallback } from 'react';
import { useBookingStore } from '../store/bookingStore';
import { bookingService } from '../services/bookings/bookingService';
import { Booking } from '../models/Booking';

// Booking ViewModel - Business logic for booking management
export const useBookingViewModel = () => {
  const {
    bookings,
    loading,
    error,
    addBooking,
    updateBooking,
    deleteBooking,
    getBookingById,
    getBookingsByUserId,
    getBookingsByEventId,
    setLoading,
    setError,
    clearError,
  } = useBookingStore();

  const [formData, setFormData] = useState({
    eventId: '',
    userId: '',
    numberOfPeople: '1',
    bookingStatus: 'pending',
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

  // Handle create booking
  const handleCreateBooking = useCallback(async () => {
    setLoading(true);
    clearError();

    try {
      const bookingData = {
        eventId: formData.eventId,
        userId: formData.userId,
        numberOfPeople: parseInt(formData.numberOfPeople, 10),
        bookingStatus: formData.bookingStatus,
      };

      const result = await bookingService.createBooking(bookingData);

      if (result.success) {
        const newBooking = result.data;
        addBooking(newBooking);
        setFormData({
          eventId: '',
          userId: '',
          numberOfPeople: '1',
          bookingStatus: 'pending',
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
  }, [formData, addBooking, setLoading, setError, clearError]);

  // Handle edit booking
  const handleEditBooking = useCallback((bookingId) => {
    const booking = getBookingById(bookingId);
    if (booking) {
      setEditingId(bookingId);
      setFormData({
        eventId: booking.eventId,
        userId: booking.userId,
        numberOfPeople: booking.numberOfPeople.toString(),
        bookingStatus: booking.bookingStatus,
      });
    }
  }, [getBookingById]);

  // Handle update booking
  const handleUpdateBooking = useCallback(async () => {
    if (!editingId) return;

    setLoading(true);
    clearError();

    try {
      const bookingData = {
        eventId: formData.eventId,
        userId: formData.userId,
        numberOfPeople: parseInt(formData.numberOfPeople, 10),
        bookingStatus: formData.bookingStatus,
      };

      const result = await bookingService.updateBooking(editingId, bookingData);

      if (result.success) {
        updateBooking(editingId, result.data);
        setFormData({
          eventId: '',
          userId: '',
          numberOfPeople: '1',
          bookingStatus: 'pending',
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
  }, [editingId, formData, updateBooking, setLoading, setError, clearError]);

  // Handle delete booking
  const handleDeleteBooking = useCallback(async (bookingId) => {
    setLoading(true);
    clearError();

    try {
      const result = await bookingService.deleteBooking(bookingId);

      if (result.success) {
        deleteBooking(bookingId);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [deleteBooking, setLoading, setError, clearError]);

  // Handle cancel booking
  const handleCancelBooking = useCallback(async (bookingId) => {
    setLoading(true);
    clearError();

    try {
      const result = await bookingService.cancelBooking(bookingId);

      if (result.success) {
        updateBooking(bookingId, { bookingStatus: 'cancelled' });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [updateBooking, setLoading, setError, clearError]);

  // Cancel editing
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setFormData({
      eventId: '',
      userId: '',
      numberOfPeople: '1',
      bookingStatus: 'pending',
    });
    setValidationErrors({});
  }, []);

  return {
    // State
    bookings,
    loading,
    error,
    formData,
    editingId,
    validationErrors,

    // Actions
    updateFormField,
    handleCreateBooking,
    handleEditBooking,
    handleUpdateBooking,
    handleDeleteBooking,
    handleCancelBooking,
    handleCancelEdit,
    clearError,
    getBookingsByUserId,
    getBookingsByEventId,
  };
};
