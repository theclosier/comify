"use client";

import { use, useState } from "react";
import { MOCK_COMMUNITIES } from "@/mocks/communities";
import { Check, Shield, ArrowLeft, ArrowRight, Globe, Twitter, Instagram, Linkedin, Star } from "lucide-react";
import Link from "next/link";

export default function JoinCommunityPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = use(params);
    const community = MOCK_COMMUNITIES.find(c => c.subdomain === subdomain) || MOCK_COMMUNITIES[0];
    const [formStatus, setFormStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

    const handleJoinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('SUBMITTING');
        setTimeout(() => setFormStatus('SUCCESS'), 1500);
    };

    return (
        <div className="min-h-screen bg-stone-50/50 font-sans flex flex-col pb-24">
            {/* --- COMPACT HEADER --- */}
            <div className="bg-white border-b border-border-subtle sticky top-0 z-40 shadow-sm/50 mb-8">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Left: Logo & Name */}
                        <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
                            <Link href={`/c/${subdomain}`}>
                                <img
                                    src={community.logo}
                                    alt={community.name}
                                    className="w-16 h-16 rounded-xl border border-stone-100 shadow-sm hover:opacity-90 transition-opacity"
                                />
                            </Link>
                            <div>
                                <Link href={`/c/${subdomain}`} className="text-2xl font-bold text-text-main leading-tight hover:text-primary transition-colors">
                                    {community.name}
                                </Link>
                                <div className="flex gap-2 mt-1">
                                    {community.socials.website && <a href={community.socials.website} className="text-text-muted hover:text-primary"><Globe className="w-4 h-4" /></a>}
                                    {community.socials.twitter && <a href={community.socials.twitter} className="text-text-muted hover:text-[#1DA1F2]"><Twitter className="w-4 h-4" /></a>}
                                    {community.socials.instagram && <a href={community.socials.instagram} className="text-text-muted hover:text-[#E1306C]"><Instagram className="w-4 h-4" /></a>}
                                    {community.socials.linkedin && <a href={community.socials.linkedin} className="text-text-muted hover:text-[#0077b5]"><Linkedin className="w-4 h-4" /></a>}
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats & Action */}
                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                            <div className="flex gap-8 text-sm">
                                <div className="text-right">
                                    <div className="font-bold text-text-main text-lg">{community.stats.members}</div>
                                    <div className="text-text-muted text-xs uppercase tracking-wide">Üye</div>
                                </div>
                                <div className="text-right border-l border-border-subtle pl-8">
                                    <div className="font-bold text-text-main text-lg">{community.stats.city}</div>
                                    <div className="text-text-muted text-xs uppercase tracking-wide">Konum</div>
                                </div>
                                <div className="text-right border-l border-border-subtle pl-8">
                                    <div className="font-bold text-text-main text-lg flex items-center gap-1 justify-end">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {community.stats.score}
                                    </div>
                                    <div className="text-text-muted text-xs uppercase tracking-wide">Puan</div>
                                </div>
                            </div>

                            {/* Hidden on Join Page or maybe keep it but disabled? Let's hide it to avoid recursion/confusion, or keep it as a static element. 
                                Actually, since we are ON the join page, the button is redundant or should be disabled. 
                                Providing a consistent header usually implies keeping elements but maybe changing state. 
                                For simplicity and clean look, let's keep it but make it transparent or just text? 
                                User asked for "same style", let's keep the button but maybe active state?
                                Let's keep the standard header exactly as is for consistency.
                            */}
                            <div className="btn-primary py-3 px-8 shadow-lg shadow-indigo-500/20 opacity-50 cursor-default whitespace-nowrap">
                                Aramıza Katıl
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center px-6">

                <div className="w-full max-w-2xl mx-auto">


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
                                            href={`/c/${subdomain}`}
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

                                        {community.customQuestions.map((q, i) => (
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
