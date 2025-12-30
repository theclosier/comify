"use client";

import { useState } from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { Users, Ticket, Globe, Activity, Plus, ArrowRight, CheckCircle, XCircle, Clock } from "lucide-react";
import Link from "next/link";
import { MOCK_EVENTS } from "@/mocks/events";
import { MOCK_MEMBERS, Member } from "@/mocks/members";
import clsx from "clsx";

export default function Home() {
  const [events] = useState(MOCK_EVENTS);
  const [members, setMembers] = useState<Member[]>(MOCK_MEMBERS);

  // Computed Stats
  const totalAttendees = events.reduce((acc, curr) => acc + (curr.capacity || 0), 0);
  const pendingMembers = members.filter(m => m.status === 'PENDING');
  const activeMembers = members.filter(m => m.status === 'APPROVED');

  const handleApprove = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'APPROVED' } : m));
    alert("Üye onaylandı! (Mock Action)");
  };

  const handleReject = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: 'REJECTED' } : m));
    alert("Üye reddedildi! (Mock Action)");
  };

  return (
    <div className="min-h-screen bg-stone-50/50 pb-12 animate-in fade-in zoom-in duration-500">
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end animate-in slide-in-from-bottom-2 delay-100 duration-700 fill-mode-both">
          <div>
            <h2 className="text-stone-500 font-medium mb-1">Hoş Geldin, Yönetici 👋</h2>
            <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">Genel Bakış</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/c/yazilimcilar"
              target="_blank"
              className="bg-white/50 hover:bg-white text-stone-600 border border-stone-200 px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              <Globe className="w-4 h-4" />
              Topluluk Sayfası
            </Link>
            <Link
              href="/events/new"
              className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-stone-900/10 flex items-center gap-2 hover:translate-y-[-2px] hover:shadow-stone-900/20"
            >
              <Plus className="w-5 h-5" />
              Yeni Etkinlik
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-2 delay-200 duration-700 fill-mode-both">
          <StatsCard
            title="Toplam Üye"
            value={(activeMembers.length + pendingMembers.length).toString()}
            icon={Users}
            trend={`+${pendingMembers.length} Bekleyen`}
            trendUp={true}
            color="blue"
          />
          <StatsCard
            title="Toplam Kapasite"
            value={totalAttendees.toString()}
            icon={Ticket}
            color="purple"
          />
          <StatsCard
            title="Aktif Etkinlik"
            value={events.length.toString()}
            icon={Activity}
            color="emerald"
          />
          <StatsCard
            title="Bekleyen Onay"
            value={pendingMembers.length.toString()}
            icon={Clock}
            color={pendingMembers.length > 0 ? "rose" : "emerald"}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in slide-in-from-bottom-2 delay-300 duration-700 fill-mode-both">
          {/* Recent Events */}
          <div>
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-xl font-bold text-stone-900">Son Etkinlikler</h3>
              <Link href="/events" className="text-sm text-teal-600 hover:text-teal-700 font-bold flex items-center gap-1 hover:underline">
                Tümünü Gör <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="glass-card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-stone-50/50 border-b border-stone-100">
                  <tr className="text-stone-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold pl-6">Etkinlik Adı</th>
                    <th className="p-4 font-bold">Tarih</th>
                    <th className="p-4 font-bold text-right pr-6">LCV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-stone-50/50 transition-colors group cursor-pointer">
                      <td className="p-4 pl-6 font-bold text-stone-900 group-hover:text-teal-700 transition-colors">
                        {event.title}
                      </td>
                      <td className="p-4 text-stone-500 text-sm font-medium">
                        {new Date(event.startDate).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="p-4 text-right pr-6 text-stone-900 font-medium">
                        <span className="bg-stone-100 text-stone-600 px-2 py-1 rounded-md text-xs font-bold border border-stone-200">
                          {event.registeredCount} / {event.capacity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Members Approvals */}
          <div>
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-xl font-bold text-stone-900">
                Üyelik Başvuruları
                <span className="ml-2 bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full border border-amber-200">{pendingMembers.length}</span>
              </h3>
            </div>

            <div className="glass-card p-4 space-y-3 min-h-[300px]">
              {pendingMembers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-stone-400 py-12">
                  <CheckCircle className="w-12 h-12 mb-3 opacity-20" />
                  <p>Bekleyen başvuru yok.</p>
                </div>
              ) : (
                pendingMembers.map((member) => (
                  <div key={member.id} className="bg-stone-50/50 border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all rounded-xl p-4 flex justify-between items-end group">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-stone-900">{member.name}</h4>
                        <span className="text-xs bg-white text-stone-500 px-2 py-0.5 rounded-full border border-stone-200 shadow-sm">{member.email}</span>
                      </div>
                      <p className="text-xs text-stone-400 mb-2 font-medium">Başvuru: {new Date(member.joinedAt).toLocaleDateString('tr-TR')}</p>

                      {/* Show Answers */}
                      <div className="space-y-1">
                        {Object.entries(member.answers).map(([qid, ans]) => (
                          <div key={qid} className="text-xs">
                            <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Soru: </span>
                            <span className="text-stone-600 font-medium italic">"{ans}"</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(member.id)}
                        className="p-2 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded-lg transition-colors border border-transparent hover:border-rose-100" title="Reddet">
                        <XCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleApprove(member.id)}
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-lg transition-colors border border-emerald-100 hover:bg-emerald-100 hover:shadow-sm" title="Onayla">
                        <CheckCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
