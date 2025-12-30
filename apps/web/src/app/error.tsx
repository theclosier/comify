'use client'

import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
            <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-text-main mb-3">Bir Hata Oluştu</h2>
            <p className="text-text-muted mb-8 text-center max-w-md">
                Beklenmedik bir sorunla karşılaştık. Lütfen tekrar deneyin.
            </p>
            <button
                onClick={reset}
                className="btn-primary py-3 px-8 shadow-lg shadow-indigo-200"
            >
                Tekrar Dene
            </button>
        </div>
    )
}
