"use client";

import { ChevronLeft, Save, Calendar, MapPin, Users, Ticket, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function EditEventForm({ event }: { event: any }) {
    const router = useRouter();
    // Form State
    const [formData, setFormData] = useState({
        title: event?.title || '',
        description: event?.description || '',
        startDate: event?.start_date ? new Date(event.start_date).toISOString().slice(0, 16) : '',
        location: event?.location || '',
        capacity: event?.capacity || '',
        price: event?.price || '0'
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const supabase = createClient();

        try {
            const { error } = await supabase.from('events').update({
                title: formData.title,
                description: formData.description,
                start_date: new Date(formData.startDate).toISOString(),
                location: formData.location,
                capacity: formData.capacity ? parseInt(formData.capacity) : null,
                price: formData.price ? parseFloat(formData.price) : null
            }).eq('id', event.id);

            if (error) throw error;

            alert("Etkinlik başarıyla güncellendi! ✅");
            router.refresh();

        } catch (error: any) {
            console.error(error);
            alert("Hata: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-stone-200 py-4 mb-8">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/yntm/events" className="p-2 -ml-2 hover:bg-stone-100 rounded-lg text-stone-500 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-bold text-2xl text-stone-900">Etkinliği Düzenle</h1>
                            <p className="text-stone-500 text-sm">{event.title}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {/* Note: This logic assumes user is viewing community data. For MVP link is hardcoded to subdomain if available or generic */}
                        <Link href={`/c/yazilimcilar/events/${event.id}`} target="_blank" className="btn-secondary py-2 px-4 shadow-sm text-sm no-underline flex items-center">
                            <Share2 className="w-4 h-4 mr-2" /> Önizle
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-6 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <form onSubmit={handleSave} className="space-y-8">

                    {/* Basic Info */}
                    <div className="glass-card p-6 md:p-8 space-y-6">
                        <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-4 mb-4">Temel Bilgiler</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Etkinlik Başlığı</label>
                                <input name="title" value={formData.title} onChange={handleChange} required type="text" className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3.5 text-stone-900 outline-none transition-all font-bold text-lg" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Tarih</label>
                                    <div className="relative">
                                        <input name="startDate" value={formData.startDate} onChange={handleChange} required type="datetime-local" className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl px-4 py-3 text-stone-900 outline-none font-medium" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Konum</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                        <input name="location" value={formData.location} onChange={handleChange} type="text" className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl pl-12 pr-4 py-3 text-stone-900 outline-none font-medium" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Açıklama</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={6} className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-stone-900 outline-none resize-none font-medium text-sm leading-relaxed"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Ticketing */}
                    <div className="glass-card p-6 md:p-8 space-y-6">
                        <h2 className="text-xl font-bold text-stone-900 border-b border-stone-100 pb-4 mb-4">Biletleme</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Kontenjan</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                    <input name="capacity" value={formData.capacity} onChange={handleChange} type="number" className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl pl-12 pr-4 py-3.5 text-stone-900 outline-none font-medium" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Bilet Ücreti</label>
                                <div className="relative">
                                    <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                    <input name="price" value={formData.price} onChange={handleChange} type="number" className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl pl-12 pr-4 py-3.5 text-stone-900 outline-none font-medium" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4 sticky bottom-6 z-20">
                        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl flex gap-4 border border-stone-200">
                            <Link href="/yntm/events" className="px-6 py-3.5 text-stone-600 font-bold hover:bg-stone-50 rounded-xl transition-colors text-sm">İptal</Link>
                            <button
                                disabled={isSaving}
                                type="submit"
                                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2">
                                {isSaving ? <Clock className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Değişiklikleri Kaydet
                            </button>
                        </div>
                    </div>

                </form>
            </main>
        </div>
    );
}
