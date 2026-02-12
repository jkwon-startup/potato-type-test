import { useEffect } from 'react';
import { useStore } from '../../store/useStore';

export default function Toast() {
  const { toastMessage, hideToast } = useStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(hideToast, 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  if (!toastMessage) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-text-primary text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg z-50 max-w-[90vw] text-center"
      style={{ animation: 'fade-in 0.3s ease-out' }}
    >
      {toastMessage}
    </div>
  );
}
