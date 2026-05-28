import { useMemo } from 'react';
import { useEventStore } from '../../../common/store/eventStore';
import { useBookingStore } from '../../../common/store/bookingStore';

export const useDashboardViewModel = () => {
  const events = useEventStore((state) => state.events);
  const bookings = useBookingStore((state) => state.bookings);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return events
      .filter((event) => new Date(event.date) >= today)
      .sort((first, second) => new Date(first.date) - new Date(second.date))
      .slice(0, 3);
  }, [events]);

  const confirmedBookings = useMemo(
    () => bookings.filter((booking) => booking.bookingStatus === 'confirmed').length,
    [bookings]
  );

  const pendingBookings = useMemo(
    () => bookings.filter((booking) => booking.bookingStatus === 'pending').length,
    [bookings]
  );

  return {
    totalEvents: events.length,
    totalBookings: bookings.length,
    upcomingEvents,
    stats: {
      confirmedBookings,
      pendingBookings,
      upcomingEventCount: upcomingEvents.length,
    },
  };
};
