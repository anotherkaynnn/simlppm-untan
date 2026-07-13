import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';

export function useDeadlineChecker() {
  const { user } = useAuthStore();
  const { remindersTriggered, markReminderAsTriggered, addNotification } = useNotificationStore();

  useEffect(() => {
    // Only apply for DOSEN
    if (user?.role !== 'DOSEN') return;

    // We simulate a scenario where there's an upcoming deadline for "Penerimaan Proposal 2026"
    const reminderId = 'deadline-pengajuan-2026-batch1';

    if (!remindersTriggered.includes(reminderId)) {
      // Small delay so it doesn't clash with login toasts or other instant mount effects
      const timer = setTimeout(() => {
        addNotification({
          title: "Pengingat: Tenggat Waktu Pengajuan",
          body: "Batas akhir pengajuan proposal skema Penelitian Dasar & Terapan tersisa 3 hari lagi (16 Juli 2026). Segera lengkapi draft Anda!",
          roleTarget: "DOSEN"
        });
        
        // Mark as triggered so it won't show up again
        markReminderAsTriggered(reminderId);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [user?.role, remindersTriggered, markReminderAsTriggered, addNotification]);
}
