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
import { useEventViewModel } from '../viewmodels/useEventViewModel';

export default function EventsScreen() {
  const {
    events,
    loading,
    error,
    formData,
    editingId,
    validationErrors,
    updateFormField,
    handleCreateEvent,
    handleEditEvent,
    handleUpdateEvent,
    handleDeleteEvent,
    handleCancelEdit,
    clearError,
  } = useEventViewModel();

  const handleDeletePress = (eventId) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: 'Delete', onPress: () => handleDeleteEvent(eventId), style: 'destructive' },
      ]
    );
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventText}>{item.description}</Text>
        <Text style={styles.eventMeta}>📅 {item.date}</Text>
        <Text style={styles.eventMeta}>🕐 {item.time}</Text>
        <Text style={styles.eventMeta}>📍 {item.location}</Text>
      </View>
      <View style={styles.eventActions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => handleEditEvent(item.id)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Event Management</Text>
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
          {editingId ? 'Edit Event' : 'Create New Event'}
        </Text>

        {/* Event Title Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={[styles.input, validationErrors.title && styles.inputError]}
            placeholder="Enter event title"
            value={formData.title}
            onChangeText={(text) => updateFormField('title', text)}
            editable={!loading}
          />
          {validationErrors.title && (
            <Text style={styles.errorText}>{validationErrors.title}</Text>
          )}
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput, validationErrors.description && styles.inputError]}
            placeholder="Enter event description"
            value={formData.description}
            onChangeText={(text) => updateFormField('description', text)}
            multiline
            numberOfLines={3}
            editable={!loading}
          />
          {validationErrors.description && (
            <Text style={styles.errorText}>{validationErrors.description}</Text>
          )}
        </View>

        {/* Date Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
          <TextInput
            style={[styles.input, validationErrors.date && styles.inputError]}
            placeholder="2026-05-15"
            value={formData.date}
            onChangeText={(text) => updateFormField('date', text)}
            editable={!loading}
          />
          {validationErrors.date && (
            <Text style={styles.errorText}>{validationErrors.date}</Text>
          )}
        </View>

        {/* Time Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time (HH:MM AM/PM)</Text>
          <TextInput
            style={[styles.input, validationErrors.time && styles.inputError]}
            placeholder="10:00 AM"
            value={formData.time}
            onChangeText={(text) => updateFormField('time', text)}
            editable={!loading}
          />
          {validationErrors.time && (
            <Text style={styles.errorText}>{validationErrors.time}</Text>
          )}
        </View>

        {/* Location Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={[styles.input, validationErrors.location && styles.inputError]}
            placeholder="Enter event location"
            value={formData.location}
            onChangeText={(text) => updateFormField('location', text)}
            editable={!loading}
          />
          {validationErrors.location && (
            <Text style={styles.errorText}>{validationErrors.location}</Text>
          )}
        </View>

        {/* Form Buttons */}
        <View style={styles.formButtons}>
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={editingId ? handleUpdateEvent : handleCreateEvent}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {editingId ? 'Update Event' : 'Create Event'}
              </Text>
            )}
          </TouchableOpacity>

          {editingId && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelEdit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Events List Section */}
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>
          Events ({events.length})
        </Text>

        {events.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No events yet. Create one to get started!</Text>
          </View>
        ) : (
          <FlatList
            data={events}
            renderItem={renderEventItem}
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
    backgroundColor: '#2196F3',
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
    elevation: 3,
  },
  listSection: {
    backgroundColor: '#fff',
    margin: 10,
    marginBottom: 30,
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
  multilineInput: {
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#c62828',
    backgroundColor: '#ffebee',
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
  cancelButton: {
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  eventCard: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  eventContent: {
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  eventMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  eventActions: {
    flexDirection: 'row',
    gap: 8,
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
