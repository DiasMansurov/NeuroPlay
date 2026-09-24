"use client";

import { CircleCheck } from "lucide-react";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

import s from "./neuroplay.module.css";

type Toast = { id: number; title: string; detail?: string };
type ToastFn = (title: string, detail?: string) => void;

const ToastContext = createContext<ToastFn>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const show = useCallback<ToastFn>((title, detail) => {
    const id = nextId.current++;
    setToasts((current) => [...current.slice(-2), { id, title, detail }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3600);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className={s.toastRegion} role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div className={s.toast} key={toast.id}>
            <CircleCheck size={20} aria-hidden="true" />
            <div>
              {toast.title}
              {toast.detail ? <small>{toast.detail}</small> : null}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
