"use client";

import { useState } from "react";
import { RefreshCw, CheckCircle, AlertCircle, ArrowRight, Loader2, Link as LinkIcon, Unplug } from "lucide-react";
import clsx from "clsx";

export default function SyncPage() {
    const [syncing, setSyncing] = useState<string | null>(null);
    const [connecting, setConnecting] = useState<string | null>(null);

    const [platforms, setPlatforms] = useState([
        {
            id: 'luma',
            name: 'Luma',
            logo: 'L',
            status: 'CONNECTED',
            lastSync: '2 dakika önce',
            eventsSynced: 12,
            membersSynced: 340
        },
        {
            id: 'eventbrite',
            name: 'Eventbrite',
            logo: 'E',
            status: 'CONNECTED',
            lastSync: '1 saat önce',
            eventsSynced: 5,
            membersSynced: 120
        },
        {
            id: 'meetup',
            name: 'Meetup',
            logo: 'M',
            status: 'DISCONNECTED',
            lastSync: '-',
            eventsSynced: 0,
            membersSynced: 0
        }
    ]);

    const handleSync = (platformId: string) => {
        setSyncing(platformId);
        // Simulate sync
        setTimeout(() => {
            setSyncing(null);
            alert(`${platforms.find(p => p.id === platformId)?.name} senkronizasyonu tamamlandı!`);
        }, 2000);
    };

    const handleConnect = (platformId: string) => {
        setConnecting(platformId);
        // Simulate Oauth connection delay
        setTimeout(() => {
            setPlatforms(prev => prev.map(p => {
                if (p.id === platformId) {
                    return {
                        ...p,
                        status: 'CONNECTED',
                        lastSync: 'Az önce',
                        eventsSynced: 10,  // Mock data found after sync
                        membersSynced: 50
                    };
                }
                return p;
            }));
            setConnecting(null);
        }, 1500);
    };

    const handleDisconnect = (platformId: string) => {
        if (confirm(`${platforms.find(p => p.id === platformId)?.name} bağlantısını kesmek istediğinize emin misiniz?`)) {
            setPlatforms(prev => prev.map(p => {
                if (p.id === platformId) {
                    return {
                        ...p,
                        status: 'DISCONNECTED',
                        lastSync: '-',
                        eventsSynced: 0,
                        membersSynced: 0
                    };
                }
                return p;
            }));
        }
    };

    return (
        <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-8 animate-in slide-up duration-500">
            <div>
                <h1 className="text-3xl font-bold text-text-main mb-2">Platform Senkronizasyonu</h1>
                <p className="text-text-muted text-lg">Tüm etkinliklerinizi ve üyelerinizi tek bir yerden yönetin.</p>
            </div>

            <div className="grid gap-6">
                {platforms.map((platform) => (
                    <div key={platform.id} className="cominfy-card p-6 flex flex-col md:flex-row items-center gap-6">
                        {/* Status Line */}
                        <div className={clsx(
                            "w-1.5 self-stretch rounded-full hidden md:block transition-colors duration-500",
                            platform.status === 'CONNECTED' ? "bg-emerald-500" : "bg-stone-200"
                        )}></div>

                        {/* Logo */}
                        <div className="w-16 h-16 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-2xl font-bold text-stone-400">
                            {platform.logo}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                                <h3 className="text-xl font-bold text-text-main">{platform.name}</h3>
                                {platform.status === 'CONNECTED' ? (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-100 uppercase tracking-wide flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> Bağlı
                                    </span>
                                ) : (
                                    <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 text-[10px] font-bold border border-stone-200 uppercase tracking-wide">
                                        Bağlı Değil
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-text-muted">
                                {platform.status === 'CONNECTED'
                                    ? `Son senkronizasyon: ${platform.lastSync}`
                                    : 'Hesabınızı bağlayarak etkinlikleri çekin.'}
                            </p>
                        </div>

                        {/* Stats */}
                        {platform.status === 'CONNECTED' && (
                            <div className="flex gap-8 text-center px-4 border-l border-r border-border-subtle hidden md:flex animate-in fade-in duration-500">
                                <div>
                                    <div className="text-xl font-bold text-text-main">{platform.eventsSynced}</div>
                                    <div className="text-xs text-text-muted uppercase tracking-wider">Etkinlik</div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-text-main">{platform.membersSynced}</div>
                                    <div className="text-xs text-text-muted uppercase tracking-wider">Üye</div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="w-full md:w-auto flex items-center gap-2 justify-center">
                            {platform.status === 'CONNECTED' ? (
                                <>
                                    <button
                                        onClick={() => handleSync(platform.id)}
                                        disabled={syncing === platform.id}
                                        className="btn-secondary w-full md:w-auto"
                                    >
                                        {syncing === platform.id ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" /> Senkronize Ediliyor...
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="w-4 h-4" /> Şimdi Eşitle
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDisconnect(platform.id)}
                                        className="p-3 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                        title="Bağlantıyı Kes"
                                    >
                                        <Unplug className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleConnect(platform.id)}
                                    disabled={connecting === platform.id}
                                    className="btn-primary w-full md:w-auto bg-stone-900 text-white"
                                >
                                    {connecting === platform.id ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Bağlanıyor...
                                        </>
                                    ) : (
                                        <>
                                            Bağla <LinkIcon className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Auto Sync Settings */}
            <div className="cominfy-card p-8 bg-indigo-50/50 border-indigo-100">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                        <RefreshCw className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-text-main mb-2">Otomatik Senkronizasyon</h4>
                        <p className="text-text-muted text-sm leading-relaxed max-w-2xl mb-4">
                            Sistem, bağlı platformlardaki değişiklikleri her 15 dakikada bir otomatik olarak kontrol eder ve panelinize yansıtır.
                            Bu ayarı değiştirmek için <a href="/settings" className="text-indigo-600 font-bold hover:underline">Ayarlar</a> sayfasına gidin.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
