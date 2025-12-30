import { createClient } from "@/utils/supabase/server";
import { Search, Filter, Calendar, MapPin, Plus, ArrowRight, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
    const supabase = await createClient();
    const { data: events, error } = await supabase.from('events').select('*').order('start_date', { ascending: true });

    if (error) {
        return <div className="p-12 text-center text-red-500">Etkinlikler yüklenirken hata oluştu: {error.message}</div>;
    }

    // Default View Mode (Server Component can't hold state, so we default to grid or use URL search params later)
    // For now we render a standard Grid view. If client-side toggling is needed, we should extract the list into a Client Component.
    // However, to keep it simple and performant, we'll stick to a Grid layout for now.

    const viewMode = 'grid'; // Default static for server component

    return (
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-10 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in slide-up duration-500">
                <div>
                    <h1 className="text-3xl font-bold text-text-main mb-2">Etkinlik Yönetimi</h1>
                    <p className="text-text-muted text-lg">Yaklaşan ve geçmiş etkinliklerinizi yönetin.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/yntm/events/new" className="btn-primary">
                        <Plus className="w-5 h-5" />
                        <span className="hidden md:inline">Yeni Etkinlik</span>
                    </Link>
                </div>
            </div>

            {/* Events Grid - Magazine Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-up duration-500 delay-200">
                {events?.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-stone-100 rounded-3xl border border-dashed border-stone-300">
                        <Calendar className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-stone-700">Henüz etkinlik yok</h3>
                        <p className="text-stone-500 mb-6">İlk etkinliğinizi oluşturarak başlayın.</p>
                        <Link href="/yntm/events/new" className="btn-secondary">Etkinlik Oluştur</Link>
                    </div>
                ) : (
                    events?.map((event: any) => (
                        <Link href={`/yntm/events/${event.id}`} key={event.id} className="group cursor-pointer cominfy-card p-0 overflow-hidden hover:shadow-lg transition-all duration-300">
                            {/* Image */}
                            <div className="relative overflow-hidden bg-stone-200 aspect-[4/3] w-full">
                                {event.image ? (
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-300 font-bold text-4xl">
                                        {event.title.charAt(0)}
                                    </div>
                                )}

                                <div className="absolute top-4 right-4">
                                    <span className={clsx(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md border border-white/20",
                                        event.status === 'PUBLISHED' ? "bg-emerald-100/90 text-emerald-700" : "bg-amber-100/90 text-amber-700"
                                    )}>
                                        {event.status === 'PUBLISHED' ? 'YAYINDA' : 'TASLAK'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{event.platform || 'Cominfy'}</span>
                                        <span className="text-text-muted text-[10px]">•</span>
                                        <span className="text-xs font-medium text-text-muted flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(event.start_date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-2 leading-tight group-hover:text-primary transition-colors">{event.title}</h3>
                                    <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">{event.description}</p>
                                </div>

                                <div className="mt-6 pt-6 border-t border-border-subtle flex items-center justify-between">
                                    <div className="flex items-center text-xs font-bold text-text-muted uppercase tracking-wide">
                                        <MapPin className="w-3.5 h-3.5 mr-1.5" />
                                        {event.location}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:text-white transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
