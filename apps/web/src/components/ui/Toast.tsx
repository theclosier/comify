"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import clsx from "clsx";

/**
 * Toast Types & Interface
 */
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    description?: string;
}

interface ToastContextType {
    addToast: (type: ToastType, message: string, description?: string) => void;
    removeToast: (id: string) => void;
}

/**
 * Context Creation
 */
const ToastContext = createContext<ToastContextType | undefined>(undefined);

/**
 * Custom Hook to use Toast
 */
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

/**
 * Toast Provider Component
 */
export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((type: ToastType, message: string, description?: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, message, description }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={clsx(
                            "pointer-events-auto w-80 p-4 rounded-xl shadow-lg border backdrop-blur-md flex items-start gap-3 transition-all animate-in slide-in-from-right duration-300",
                            {
                                'bg-white/90 border-emerald-100 shadow-emerald-500/10': toast.type === 'success',
                                'bg-white/90 border-rose-100 shadow-rose-500/10': toast.type === 'error',
                                'bg-white/90 border-blue-100 shadow-blue-500/10': toast.type === 'info',
                                'bg-white/90 border-amber-100 shadow-amber-500/10': toast.type === 'warning',
                            }
                        )}
                    >
                        {/* Icon */}
                        <div className={clsx("mt-0.5", {
                            'text-emerald-500': toast.type === 'success',
                            'text-rose-500': toast.type === 'error',
                            'text-blue-500': toast.type === 'info',
                            'text-amber-500': toast.type === 'warning',
                        })}>
                            {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                            {toast.type === 'info' && <Info className="w-5 h-5" />}
                            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <h4 className={clsx("text-sm font-bold", {
                                'text-emerald-900': toast.type === 'success',
                                'text-rose-900': toast.type === 'error',
                                'text-blue-900': toast.type === 'info',
                                'text-amber-900': toast.type === 'warning',
                            })}>
                                {toast.message}
                            </h4>
                            {toast.description && (
                                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                                    {toast.description}
                                </p>
                            )}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-stone-400 hover:text-stone-600 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
