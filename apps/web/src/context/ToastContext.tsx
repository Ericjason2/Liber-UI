"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { Check } from "lucide-react";

interface ToastContextType {
  toast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const toast = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage((prev) => (prev === msg ? null : prev));
    }, 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-[10px] border border-border bg-card px-4 py-2.5 text-xs font-medium text-foreground transition-all animate-in fade-in slide-in-from-bottom-2"
        >
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span>{message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
