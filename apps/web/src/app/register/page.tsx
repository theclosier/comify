"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate registration
        setTimeout(() => {
            setLoading(false);
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-bl from-indigo-50 to-stone-100 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-lg space-y-8 animate-in slide-up duration-700">
                <div className="text-center">
                    <div className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">COMINFY</div>
                    <h1 className="text-3xl font-bold text-text-main tracking-tight">Hesabınızı oluşturun</h1>
                    <p className="text-text-muted mt-2">Topluluğunuzu yönetmeye hemen başlayın.</p>
                </div>

                <div className="cominfy-card p-8 md:p-10 shadow-xl bg-white/80 backdrop-blur-sm">
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Ad</label>
                                <input required type="text" className="cominfy-input" placeholder="Ahmet" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Soyad</label>
                                <input required type="text" className="cominfy-input" placeholder="Yılmaz" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">İş E-postası</label>
                            <input required type="email" className="cominfy-input" placeholder="ahmet@sirket.com" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Şifre</label>
                            <input required type="password" className="cominfy-input" placeholder="••••••••" />
                            <p className="text-[10px] text-text-muted mt-1">En az 8 karakter olmalı.</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    required
                                />
                            </div>
                            <label htmlFor="terms" className="text-xs text-text-muted">
                                <a href="#" className="underline">Kullanım Şartları</a>'nı ve <a href="#" className="underline">Gizlilik Politikası</a>'nı kabul ediyorum.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3.5 text-base justify-center shadow-lg shadow-indigo-100"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Başlayın <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-text-muted">
                    Zaten hesabınız var mı? <Link href="/login" className="font-bold text-text-main hover:text-accent transition-colors">Giriş Yapın</Link>
                </p>
            </div>
        </div>
    );
}
