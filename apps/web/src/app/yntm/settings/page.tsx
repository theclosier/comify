"use client";

import { User, Bell, Shield, Wallet, Save, CreditCard, Check, AlertTriangle, Download } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

type Tab = 'PROFILE' | 'NOTIFICATIONS' | 'SECURITY' | 'BILLING';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<Tab>('PROFILE');

    const menuItems: { id: Tab; name: string; icon: any }[] = [
        { id: 'PROFILE', name: 'Profil', icon: User },
        { id: 'NOTIFICATIONS', name: 'Bildirimler', icon: Bell },
        { id: 'SECURITY', name: 'Güvenlik', icon: Shield },
        { id: 'BILLING', name: 'Faturalandırma', icon: Wallet },
    ];

    return (
        <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-10 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-text-main mb-2">Ayarlar</h1>
                <p className="text-text-muted text-lg">Hesap tercihlerinizi ve aboneliğinizi yönetin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                                activeTab === item.id
                                    ? "bg-white text-primary shadow-sm ring-1 ring-border-subtle"
                                    : "text-text-muted hover:text-text-main hover:bg-white/50"
                            )}>
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-3 space-y-8 animate-in slide-up duration-500">

                    {/* PROFILE TAB */}
                    {activeTab === 'PROFILE' && (
                        <div className="cominfy-card p-8 space-y-8 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold text-text-main mb-6">Profil Bilgileri</h2>
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-24 h-24 rounded-full bg-stone-200 border-4 border-white shadow-sm overflow-hidden">
                                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <button className="btn-secondary text-xs py-2 px-4 h-9">
                                        Fotoğrafı Değiştir
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Ad Soyad</label>
                                        <input type="text" className="cominfy-input" defaultValue="Jane Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">E-posta Adresi</label>
                                        <input type="email" className="cominfy-input" defaultValue="jane@cominfy.com" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Biyografi</label>
                                        <textarea className="cominfy-input min-h-[100px]" defaultValue="Topluluk Lideri @ Tech Istanbul." />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-border-subtle flex justify-end">
                                <button className="btn-primary">
                                    <Save className="w-4 h-4" />
                                    Değişiklikleri Kaydet
                                </button>
                            </div>
                        </div>
                    )}

                    {/* NOTIFICATIONS TAB */}
                    {activeTab === 'NOTIFICATIONS' && (
                        <div className="cominfy-card p-8 space-y-8 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold text-text-main mb-6">Bildirim Tercihleri</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                                        <div>
                                            <h4 className="font-bold text-text-main text-sm">Yeni Üyelik Başvurusu</h4>
                                            <p className="text-xs text-text-muted">Topluluğunuza yeni biri katılmak istediğinde bildirim al.</p>
                                        </div>
                                        <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out">
                                            <input type="checkbox" defaultChecked className="peer absolute w-0 h-0 opacity-0" id="notify-1" />
                                            <label htmlFor="notify-1" className="block overflow-hidden h-6 rounded-full bg-stone-300 cursor-pointer peer-checked:bg-primary transition-colors after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 after:rounded-full after:shadow-sm after:transition-all peer-checked:after:translate-x-5"></label>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                                        <div>
                                            <h4 className="font-bold text-text-main text-sm">Etkinlik Kayıtları</h4>
                                            <p className="text-xs text-text-muted">Etkinliğinize yeni biri bilet aldığında anında haber ver.</p>
                                        </div>
                                        <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out">
                                            <input type="checkbox" defaultChecked className="peer absolute w-0 h-0 opacity-0" id="notify-2" />
                                            <label htmlFor="notify-2" className="block overflow-hidden h-6 rounded-full bg-stone-300 cursor-pointer peer-checked:bg-primary transition-colors after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 after:rounded-full after:shadow-sm after:transition-all peer-checked:after:translate-x-5"></label>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                                        <div>
                                            <h4 className="font-bold text-text-main text-sm">Haftalık Rapor</h4>
                                            <p className="text-xs text-text-muted">Her Pazartesi topluluk performans özetini e-posta ile gönder.</p>
                                        </div>
                                        <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out">
                                            <input type="checkbox" className="peer absolute w-0 h-0 opacity-0" id="notify-3" />
                                            <label htmlFor="notify-3" className="block overflow-hidden h-6 rounded-full bg-stone-300 cursor-pointer peer-checked:bg-primary transition-colors after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 after:rounded-full after:shadow-sm after:transition-all peer-checked:after:translate-x-5"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECURITY TAB */}
                    {activeTab === 'SECURITY' && (
                        <div className="cominfy-card p-8 space-y-8 animate-in fade-in duration-300">
                            <div>
                                <h2 className="text-xl font-bold text-text-main mb-6">Güvenlik</h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-border-subtle">
                                        <div className="md:col-span-2">
                                            <h3 className="text-sm font-bold text-text-main mb-4">Şifre Değiştir</h3>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Mevcut Şifre</label>
                                            <input type="password" className="cominfy-input" placeholder="••••••••" />
                                        </div>
                                        <div></div>
                                        <div>
                                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Yeni Şifre</label>
                                            <input type="password" className="cominfy-input" placeholder="••••••••" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Yeni Şifre (Tekrar)</label>
                                            <input type="password" className="cominfy-input" placeholder="••••••••" />
                                        </div>
                                        <div className="md:col-span-2 flex justify-end">
                                            <button className="btn-secondary text-xs">Şifreyi Güncelle</button>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-sm font-bold text-text-main mb-1">İki Aşamalı Doğrulama (2FA)</h3>
                                                <p className="text-xs text-text-muted max-w-md">Hesabınızı güvende tutmak için SMS veya Authenticator uygulaması ile giriş yapın.</p>
                                            </div>
                                            <button className="text-indigo-600 text-xs font-bold hover:underline">Kurulum Yap</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BILLING TAB */}
                    {activeTab === 'BILLING' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="cominfy-card p-8">
                                <h2 className="text-xl font-bold text-text-main mb-6">Mevcut Plan</h2>
                                <div className="flex flex-col md:flex-row items-center gap-8">
                                    <div className="flex-1 w-full p-6 bg-stone-900 rounded-2xl text-white relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">PRO PLAN</span>
                                                <CreditCard className="w-6 h-6 text-white/50" />
                                            </div>
                                            <h3 className="text-3xl font-bold mb-1">₺299<span className="text-lg font-normal text-white/60">/ay</span></h3>
                                            <p className="text-white/60 text-sm mb-6">Sonraki ödeme: 15 Haz 2024</p>
                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center gap-2 text-sm text-white/90">
                                                    <Check className="w-4 h-4 text-emerald-400" />
                                                    <span>Sınırsız Etkinlik</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-white/90">
                                                    <Check className="w-4 h-4 text-emerald-400" />
                                                    <span>Topluluk Analitiği</span>
                                                </div>
                                            </div>
                                            <button className="w-full py-2 bg-white text-stone-900 rounded-lg text-sm font-bold hover:bg-stone-200 transition-colors">
                                                Planı Yönet
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4 w-full">
                                        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex gap-4">
                                            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                            <div>
                                                <h4 className="text-sm font-bold text-amber-800">Ödeme Yöntemi</h4>
                                                <p className="text-xs text-amber-700 mt-1">
                                                    •••• 4242 ile biten kartınızın süresi yakında dolacak. Kesinti yaşamamak için güncelleyin.
                                                </p>
                                                <button className="text-xs font-bold text-amber-900 underline mt-2">Kartı Güncelle</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cominfy-card p-8">
                                <h2 className="text-xl font-bold text-text-main mb-6">Fatura Geçmişi</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-stone-400 text-xs uppercase tracking-wider border-b border-border-subtle">
                                                <th className="pb-3 font-bold">Tarih</th>
                                                <th className="pb-3 font-bold">Tutar</th>
                                                <th className="pb-3 font-bold">Durum</th>
                                                <th className="pb-3 font-bold text-right">İndir</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border-subtle">
                                            {[1, 2, 3].map((i) => (
                                                <tr key={i} className="text-sm">
                                                    <td className="py-4 font-medium text-text-main">15 Mayıs 2024</td>
                                                    <td className="py-4 text-text-muted">₺299.00</td>
                                                    <td className="py-4">
                                                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold border border-emerald-100">Ödendi</span>
                                                    </td>
                                                    <td className="py-4 text-right">
                                                        <button className="text-text-muted hover:text-primary transition-colors">
                                                            <Download className="w-4 h-4 ml-auto" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
