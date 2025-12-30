"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { LayoutDashboard, Calendar, Users, Settings, RefreshCw, Hexagon, LogOut } from "lucide-react";

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Panel', href: '/yntm/dashboard', icon: LayoutDashboard },
        { name: 'Etkinlikler', href: '/yntm/events', icon: Calendar },
        { name: 'Kulüpler', href: '/yntm/clubs', icon: Hexagon },
        { name: 'Üyeler', href: '/yntm/members', icon: Users },
        { name: 'Senkronizasyon', href: '/yntm/sync', icon: RefreshCw },
        { name: 'Ayarlar', href: '/yntm/settings', icon: Settings },
    ];

    return (
        <aside className="w-64 fixed left-0 top-0 h-screen bg-background border-r border-border-subtle p-6 flex flex-col z-40 hidden md:flex">
            {/* Brand - Text Only */}
            <div className="flex items-center gap-3 px-2 mb-10">
                <span className="font-extrabold text-2xl tracking-tight text-text-main">COMINFY</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/yntm/dashboard' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "sidebar-link group",
                                isActive && "active"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5", isActive ? "text-primary" : "text-text-muted group-hover:text-text-main")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Snippet */}
            <div className="mt-auto px-2 py-4 border-t border-border-subtle flex items-center gap-2">
                <Link href="/profile" className="flex-1 flex items-center gap-3 p-2 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer group min-w-0">
                    <div className="w-10 h-10 rounded-full bg-white border border-border shadow-sm overflow-hidden group-hover:border-accent transition-colors flex-shrink-0">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Kullanıcı" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <p className="text-sm font-bold text-text-main truncate group-hover:text-accent transition-colors">Jane Doe</p>
                        <p className="text-xs text-text-muted truncate">Topluluk Lideri</p>
                    </div>
                </Link>

                <Link
                    href="/login"
                    className="p-2 text-text-muted hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
                    title="Çıkış Yap"
                >
                    <LogOut className="w-5 h-5" />
                </Link>
            </div>
        </aside>
    );
}
