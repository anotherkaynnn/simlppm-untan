import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Notification, mockNotifications } from '@/mock/data/notifications';

interface NotificationState {
  notifications: Notification[];
  addNotification: (notif: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: (role?: string) => void;
  clearAll: () => void;
  remindersTriggered: string[];
  markReminderAsTriggered: (reminderId: string) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: mockNotifications,
      addNotification: (notif) => {
        const newNotif: Notification = {
          ...notif,
          id: `n-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: 'Baru saja',
          isRead: false,
        };
        set({ notifications: [newNotif, ...get().notifications] });
      },
      markAsRead: (id) => {
        set({
          notifications: get().notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        });
      },
      markAllAsRead: (role) => {
        set({
          notifications: get().notifications.map((n) => {
            // If role is provided, only mark those targeting this role or targeting everyone (no role)
            if (!role || !n.roleTarget || n.roleTarget === role) {
              return { ...n, isRead: true };
            }
            return n;
          }),
        });
      },
      clearAll: () => {
        set({ notifications: [] });
      },
      remindersTriggered: [],
      markReminderAsTriggered: (reminderId) => {
        set({
          remindersTriggered: [...get().remindersTriggered, reminderId]
        });
      },
    }),
    {
      name: 'notification-storage-v2',
    }
  )
);
