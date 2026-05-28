import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { useBookingViewModel } from '../viewmodels/useBookingViewModel';

export default function BookingsScreen() {
  const {
    bookings,
    loading,
    error,
    formData,
    editingId,
    validationErrors,
    updateFormField,
    handleCreateBooking,
    handleEditBooking,
    handleUpdateBooking,
    handleDeleteBooking,
    handleCancelBooking,
    handleCancelEdit,
    clearError,
  } = useBookingViewModel();

  const handleDeletePress = (bookingId) => {
    Alert.alert(
      'Delete Booking',
      'Are you sure you want to delete this booking?',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'Delete', onPress: () => handleDeleteBooking(bookingId), style: 'destructive' },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingContent}>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingTitle}>Booking #{item.id.substring(0, 5)}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.bookingStatus) },
            ]}
          >
            <Text style={styles.statusText}>
              {item.bookingStatus.charAt(0).toUpperCase() + item.bookingStatus.slice(1)}
            </Text>
          </View>
        </View>
        <Text style={styles.bookingText}>Event ID: {item.eventId}</Text>
        <Text style={styles.bookingText}>User ID: {item.userId}</Text>
        <Text style={styles.bookingText}>People: {item.numberOfPeople}</Text>
        <Text style={styles.bookingMeta}>
          📅 {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEditBooking(item.id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        {item.bookingStatus !== 'cancelled' && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => handleCancelBooking(item.id)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeletePress(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Booking Management</Text>
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={clearError}>
            <Text style={styles.dismissButton}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>
          {editingId ? 'Edit Booking' : 'Create New Booking'}
        </Text>

        {/* Event ID Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event ID</Text>
          <TextInput
            style={[styles.input, validationErrors.eventId && styles.inputError]}
            placeholder="Enter event ID"
            value={formData.eventId}
            onChangeText={(text) => updateFormField('eventId', text)}
            editable={!loading}
          />
          {validationErrors.eventId && (
            <Text style={styles.errorText}>{validationErrors.eventId}</Text>
          )}
        </View>

        {/* User ID Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>User ID</Text>
          <TextInput
            style={[styles.input, validationErrors.userId && styles.inputError]}
            placeholder="Enter user ID"
            value={formData.userId}
            onChangeText={(text) => updateFormField('userId', text)}
            editable={!loading}
          />
          {validationErrors.userId && (
            <Text style={styles.errorText}>{validationErrors.userId}</Text>
          )}
        </View>

        {/* Number of People Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of People</Text>
          <TextInput
            style={[styles.input, validationErrors.numberOfPeople && styles.inputError]}
            placeholder="1"
            value={formData.numberOfPeople}
            onChangeText={(text) => updateFormField('numberOfPeople', text)}
            keyboardType="numeric"
            editable={!loading}
          />
          {validationErrors.numberOfPeople && (
            <Text style={styles.errorText}>{validationErrors.numberOfPeople}</Text>
          )}
        </View>

        {/* Booking Status Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Booking Status</Text>
          <View style={styles.statusButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                formData.bookingStatus === 'pending' && styles.statusButtonActive,
              ]}
              onPress={() => updateFormField('bookingStatus', 'pending')}
              disabled={loading}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  formData.bookingStatus === 'pending' && styles.statusButtonTextActive,
                ]}
              >
                Pending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                formData.bookingStatus === 'confirmed' && styles.statusButtonActive,
              ]}
              onPress={() => updateFormField('bookingStatus', 'confirmed')}
              disabled={loading}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  formData.bookingStatus === 'confirmed' && styles.statusButtonTextActive,
                ]}
              >
                Confirmed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.statusButton,
                formData.bookingStatus === 'cancelled' && styles.statusButtonActive,
              ]}
              onPress={() => updateFormField('bookingStatus', 'cancelled')}
              disabled={loading}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  formData.bookingStatus === 'cancelled' && styles.statusButtonTextActive,
                ]}
              >
                Cancelled
              </Text>
            </TouchableOpacity>
          </View>
          {validationErrors.bookingStatus && (
            <Text style={styles.errorText}>{validationErrors.bookingStatus}</Text>
          )}
        </View>

        {/* Form Buttons */}
        <View style={styles.formButtons}>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={editingId ? handleUpdateBooking : handleCreateBooking}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {editingId ? 'Update Booking' : 'Create Booking'}
              </Text>
            )}
          </TouchableOpacity>

          {editingId && (
            <TouchableOpacity
              style={styles.cancelFormButton}
              onPress={handleCancelEdit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Bookings List Section */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>
          Bookings ({bookings.length})
        </Text>

        {bookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No bookings yet. Create one to get started!</Text>
          </View>
        ) : (
          <FlatList
            data={bookings}
            renderItem={renderBookingItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6B35',
    padding: 20,
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#c62828',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    marginBottom: 10,
  },
  dismissButton: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  formSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 5,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  statusButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  statusButtonTextActive: {
    color:  '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#c62828',
    backgroundColor: '#ffebee',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelFormButton: {
    flex: 1,
    backgroundColor: '#f44336',
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
    flex: 1,
  },
  cancelButton: {
    backgroundColor: '#FF9800',
    flex: 1,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  bookingCard: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  bookingContent: {
    marginBottom: 12,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  bookingText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  bookingMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  bookingActions: {
    flexDirection: 'row',
    gap: 6,
  },
  emptyState: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
  },
});
