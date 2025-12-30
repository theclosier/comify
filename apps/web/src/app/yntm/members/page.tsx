"use client";

import { MOCK_MEMBERS } from "@/mocks/members";
import { Search, Filter, MoreHorizontal, Check, X, Shield, Mail, Calendar } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function MembersPage() {
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED'>('ALL');

    const filteredMembers = MOCK_MEMBERS.filter(m =>
        filter === 'ALL' ? true : m.status === filter
    );

    const tabs = [
        { id: 'ALL', label: 'Tümü' },
        { id: 'PENDING', label: 'Bekleyenler' },
        { id: 'APPROVED', label: 'Onaylananlar' }
    ];

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-text-main mb-2">Üye Dizini</h1>
                <p className="text-text-muted text-lg">Topluluk erişiminizi yönetin ve üyelerinizi listeleyin.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-6 border-b border-border-subtle pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id as any)}
                        className={clsx(
                            "pb-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2",
                            filter === tab.id
                                ? "text-primary border-primary"
                                : "text-text-muted border-transparent hover:text-text-main hover:border-border"
                        )}
                    >
                        {tab.label}
                        {tab.id === 'PENDING' && (
                            <span className="ml-2 bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full text-[10px]">
                                {MOCK_MEMBERS.filter(m => m.status === 'PENDING').length}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="space-y-4 animate-in slide-up duration-500 delay-100">
                {filteredMembers.map((member) => (
                    <div key={member.id} className="cominfy-card p-6 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/30 transition-colors">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-stone-100 p-1 flex-shrink-0">
                            <img
                                src={`https://ui-avatars.com/api/?name=${member.name}`}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 text-center md:text-left space-y-1">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <h3 className="text-lg font-bold text-text-main">{member.name}</h3>
                                {member.role === 'ADMIN' && <Shield className="w-4 h-4 text-primary" />}
                            </div>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-text-muted">
                                <div className="flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    <span>{member.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Katılım: {new Date(member.joinedAt).toLocaleDateString("tr-TR")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status/Actions */}
                        <div className="flex items-center gap-4">
                            {member.status === 'PENDING' ? (
                                <div className="flex items-center gap-2">
                                    <button className="p-2 rounded-full bg-stone-100 text-text-muted hover:bg-rose-50 hover:text-rose-600 transition-colors" title="Reddet">
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 rounded-full bg-stone-100 text-text-muted hover:bg-emerald-50 hover:text-emerald-600 transition-colors" title="Onayla">
                                        <Check className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <span className={clsx(
                                    "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                    member.status === 'APPROVED' ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"
                                )}>
                                    {member.status === 'APPROVED' ? 'ONAYLI' : member.status}
                                </span>
                            )}
                            <button className="p-2 text-text-muted hover:text-text-main opacity-0 group-hover:opacity-100 transition-all">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
