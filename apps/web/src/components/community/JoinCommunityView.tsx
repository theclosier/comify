"use client";

import { useState } from "react";
import { Check, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface JoinCommunityViewProps {
    community: any;
}

export default function JoinCommunityView({ community }: JoinCommunityViewProps) {
    const [formStatus, setFormStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

    const handleJoinSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('SUBMITTING');

        // MVP: Just simulate success for now, as we haven't implemented form handling backend fully yet
        // In the future this should POST to /api/join or use Supabase directly
        setTimeout(() => setFormStatus('SUCCESS'), 1500);
    };

    // MVP: Questions are not yet in DB schema fully dynamic, using defaults if not present
    // Or we could have added them to 'settings' jsonb, but for now let's assume standard set or empty
    const customQuestions = [
        { id: 'q1', question: 'Yazılım deneyiminiz ne kadar?', type: 'select', options: ['0-1 Yıl', '1-3 Yıl', '3-5 Yıl', '5+ Yıl'] },
        { id: 'q2', question: 'Şu an çalışıyor musunuz?', type: 'boolean' }
    ];

    return (
        <div className="min-h-screen bg-stone-50/50 font-sans flex flex-col pb-24">
            {/* --- HEADER MOVED TO LAYOUT --- */}
            <div className="pt-8"></div>


            <div className="flex-1 flex flex-col items-center px-6">

                <div className="w-full max-w-2xl mx-auto">

                    <Link href={`/c/${community.subdomain}`} className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm font-medium mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Topluluğa Dön
                    </Link>

                    <div className="bg-white rounded-3xl shadow-2xl shadow-stone-200/60 p-8 md:p-12 border border-stone-100 relative overflow-hidden">
                        {/* Decorative background blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div>
                                    <h1 className="text-2xl font-bold text-text-main">Aramıza Katıl</h1>
                                    <p className="text-text-muted text-sm">Aşağıdaki formu doldurarak topluluğa başvurunu ilet.</p>
                                </div>
                            </div>

                            {formStatus === 'SUCCESS' ? (
                                <div className="text-center py-12 animate-in zoom-in duration-300">
                                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                                        <Check className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-text-main mb-4">Harika! 🎉</h3>
                                    <p className="text-text-muted text-lg leading-relaxed mb-10 max-w-md mx-auto">
                                        Başvurunuz topluluk yöneticisine iletildi. Onaylandığında size e-posta ile haber vereceğiz.
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <Link
                                            href={`/c/${community.subdomain}`}
                                            className="btn-secondary">
                                            Ana Sayfaya Dön
                                        </Link>
                                        <button
                                            onClick={() => setFormStatus('IDLE')}
                                            className="text-primary font-bold text-sm hover:underline">
                                            Yeni Başvuru
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleJoinSubmit} className="space-y-8">
                                    <div>
                                        <p className="text-text-muted text-lg leading-relaxed">
                                            Bu topluluğun bir parçası olmak için lütfen aşağıdaki formu eksiksiz doldurun.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="group">
                                                <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase tracking-wide group-focus-within:text-accent transition-colors">Ad Soyad</label>
                                                <input required type="text" className="cominfy-input bg-stone-50 border-stone-200 focus:bg-white text-lg py-3.5" placeholder="Adınız Soyadınız" />
                                            </div>
                                            <div className="group">
                                                <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase tracking-wide group-focus-within:text-accent transition-colors">E-posta Adresi</label>
                                                <input required type="email" className="cominfy-input bg-stone-50 border-stone-200 focus:bg-white text-lg py-3.5" placeholder="ornek@email.com" />
                                            </div>
                                        </div>

                                        {customQuestions.map((q, i) => (
                                            <div key={q.id} className="group">
                                                <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase tracking-wide group-focus-within:text-accent transition-colors">
                                                    {i + 1}. {q.question}
                                                </label>
                                                {q.type === 'select' ? (
                                                    <div className="relative">
                                                        <select className="cominfy-input bg-stone-50 border-stone-200 focus:bg-white appearance-none cursor-pointer py-3.5 text-lg">
                                                            {q.options?.map(opt => <option key={opt}>{opt}</option>)}
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">▼</div>
                                                    </div>
                                                ) : q.type === 'boolean' ? (
                                                    <div className="relative">
                                                        <select className="cominfy-input bg-stone-50 border-stone-200 focus:bg-white appearance-none cursor-pointer py-3.5 text-lg">
                                                            <option>Evet</option>
                                                            <option>Hayır</option>
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">▼</div>
                                                    </div>
                                                ) : (
                                                    <input type="text" className="cominfy-input bg-stone-50 border-stone-200 focus:bg-white py-3.5 text-lg" />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-stone-100 mt-8">
                                        <button
                                            disabled={formStatus === 'SUBMITTING'}
                                            type="submit"
                                            className="w-full btn-primary py-5 text-lg font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 rounded-2xl relative overflow-hidden group">
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {formStatus === 'SUBMITTING' ? 'Gönderiliyor...' : (
                                                    <>BAŞVURU YAP <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                                )}
                                            </span>
                                        </button>

                                        <p className="text-xs text-center text-text-muted flex items-center justify-center gap-1.5 opacity-70 mt-4">
                                            <Shield className="w-3 h-3" />
                                            Bilgileriniz Cominfy güvencesindedir.
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
