"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login
        setTimeout(() => {
            setLoading(false);
            // Mock Login State
            if (typeof window !== 'undefined') {
                localStorage.setItem('currentUser', JSON.stringify({ name: 'Jane Doe', email: 'jane@cominfy.com' }));
            }
            router.push('/c/yazilimcilar');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-stone-100 to-indigo-50 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-md space-y-8 animate-in slide-up duration-700">
                {/* Brand */}
                <div className="text-center">
                    {/* Text Only Logo */}
                    <div className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">COMINFY</div>
                    <h1 className="text-3xl font-bold text-text-main tracking-tight">Tekrar Hoşgeldiniz</h1>
                    <p className="text-text-muted mt-2">Kürasyon panelinize giriş yapın.</p>
                </div>

                {/* Card */}
                <div className="cominfy-card p-8 md:p-10 shadow-xl bg-white/80 backdrop-blur-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">E-posta Adresi</label>
                            <input
                                type="email"
                                required
                                className="cominfy-input"
                                placeholder="isim@sirket.com"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">Şifre</label>
                                <Link href="#" className="text-xs font-bold text-accent hover:text-primary transition-colors">Şifremi Unuttum?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="cominfy-input pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
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
                                    Giriş Yap <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-text-muted">
                    Hesabınız yok mu? <Link href="/register" className="font-bold text-text-main hover:text-accent transition-colors">Başvuru yapın</Link>
                </p>
            </div>

            <div className="mt-12 text-center text-xs text-text-muted font-medium">
                © 2025 Cominfy Inc.
            </div>
        </div>
    );
}
