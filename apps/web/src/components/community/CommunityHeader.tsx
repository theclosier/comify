"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface CommunityHeaderProps {
    community: {
        name: string;
        subdomain: string;
    };
}

export default function CommunityHeader({ community }: CommunityHeaderProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const supabase = createClient();

        // Initial check
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            }
        };
        checkUser();

        // Real-time subscription to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                setIsLoggedIn(true);
                setUser(session?.user || null);
            } else if (event === 'SIGNED_OUT') {
                setIsLoggedIn(false);
                setUser(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="sticky top-0 z-50 border-b border-stone-200/50 bg-white/80 backdrop-blur-md transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="grid grid-cols-3 items-center">

                    {/* Left: Spacer */}
                    <div className="hidden md:block">
                        <Link
                            href={`/c/${community.subdomain}`}
                            className="text-xs font-bold text-text-muted hover:text-text-main transition-colors uppercase tracking-wider"
                        >
                            Ana Sayfa
                        </Link>
                    </div>

                    {/* Center: Community Name (Text Only & Centered) */}
                    <div className="text-center">
                        <Link href={`/c/${community.subdomain}`} className="text-2xl font-bold text-text-main leading-tight tracking-tight hover:opacity-80 transition-opacity">
                            {community.name}
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex justify-end gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <Link href={`/c/${community.subdomain}/profile`} className="flex items-center gap-3 bg-stone-50/80 border border-stone-200/60 rounded-xl p-1.5 pr-4 hover:border-primary/50 hover:bg-white transition-all group cursor-pointer shadow-sm">
                                    <div className="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                                        {user?.email?.[0].toUpperCase() || 'U'}
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="text-xs font-bold text-text-main group-hover:text-primary transition-colors">{user?.email?.split('@')[0]}</div>
                                        <div className="text-[10px] text-text-muted font-bold uppercase tracking-wide">Üye</div>
                                    </div>
                                </Link>
                                <button
                                    onClick={async () => {
                                        const supabase = createClient();
                                        await supabase.auth.signOut();
                                        window.location.reload();
                                    }}
                                    className="p-2.5 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Çıkış Yap"
                                >
                                    <LogIn className="w-5 h-5 rotate-180" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/c/${community.subdomain}/login`}
                                    className="hidden md:flex px-5 py-2.5 text-sm font-bold text-text-main hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-200 items-center gap-2"
                                >
                                    <LogIn className="w-4 h-4" />
                                    Giriş Yap
                                </Link>
                                <Link
                                    href={`/c/${community.subdomain}/join`}
                                    className="btn-primary py-2.5 px-6 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 whitespace-nowrap text-sm"
                                >
                                    Katıl
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
