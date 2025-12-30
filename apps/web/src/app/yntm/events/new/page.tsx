"use client";

import { ChevronLeft, Upload, Calendar, MapPin, Ticket, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target as HTMLFormElement;
        const title = (form.elements.namedItem('title') as HTMLInputElement).value;
        const startDate = (form.elements.namedItem('start_date') as HTMLInputElement).value;
        const endDate = (form.elements.namedItem('end_date') as HTMLInputElement).value;
        const location = (form.elements.namedItem('location') as HTMLInputElement).value;
        const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
        const capacity = (form.elements.namedItem('capacity') as HTMLInputElement).value;
        const price = (form.elements.namedItem('price') as HTMLInputElement).value;

        // Mock default values for MVP
        // In a real scenario, we'd fetch the community ID associated with the admin
        // For now, we'll query for 'yazilimcilar' or pick the first one.
        const supabase = createClient();

        try {
            // Get default community
            let { data: community } = await supabase.from('communities').select('id').eq('subdomain', 'yazilimcilar').single();
            if (!community) {
                const { data: firstCommunity } = await supabase.from('communities').select('id').limit(1).single();
                community = firstCommunity;
            }

            if (!community) throw new Error("Topluluk bulunamadı.");

            const { error } = await supabase.from('events').insert({
                community_id: community.id,
                title,
                description,
                start_date: new Date(startDate).toISOString(),
                // Note: end_date is not in our schema yet, but good to have in form. 
                // We will just skip saving it to DB for now or assume schema update later.
                // Schema has: title, description, start_date, location, capacity, price, status
                location,
                capacity: capacity ? parseInt(capacity) : null,
                price: price ? parseFloat(price) : null,
                status: 'PUBLISHED', // Direct publish for MVP
                platform: 'Cominfy'
            });

            if (error) throw error;

            alert("Etkinlik başarıyla oluşturuldu! 🎉");
            router.push('/yntm/events');
            router.refresh();

        } catch (error: any) {
            console.error(error);
            alert("Hata: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            {/* Nav Mock */}
            {/* Page Header */}
            <div className="bg-white border-b border-stone-200 py-4 mb-8">
                <div className="max-w-3xl mx-auto px-6 flex items-center gap-4">
                    <Link href="/yntm/events" className="p-2 -ml-2 hover:bg-stone-100 rounded-lg text-stone-500 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="font-bold text-2xl text-stone-900">Yeni Etkinlik Oluştur</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Section 1: Basic Info */}
                    <div className="glass-card p-6 md:p-8 space-y-6">
                        <div className="border-b border-stone-100 pb-4 mb-4">
                            <h2 className="text-xl font-bold text-stone-900 mb-1 tracking-tight">Temel Bilgiler</h2>
                            <p className="text-sm text-stone-500 font-medium">Etkinliğinizin ana hatlarını belirleyin.</p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Etkinlik Başlığı</label>
                                <input name="title" required type="text" className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl px-4 py-3.5 text-stone-900 outline-none transition-all font-medium text-lg placeholder:text-stone-300" placeholder="Örn: React Native Buluşması" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Başlangıç Tarihi</label>
                                    <div className="relative">
                                        <input name="start_date" required type="datetime-local" className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 rounded-xl px-4 py-3 text-stone-900 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Bitiş Tarihi</label>
                                    <input name="end_date" required type="datetime-local" className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 rounded-xl px-4 py-3 text-stone-900 outline-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Konum</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input name="location" type="text" className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 rounded-xl pl-12 pr-4 py-3.5 text-stone-900 outline-none font-medium" placeholder="Adres veya Online Link" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Media */}
                    <div className="glass-card p-6 md:p-8 space-y-6">
                        <div className="border-b border-stone-100 pb-4 mb-4">
                            <h2 className="text-xl font-bold text-stone-900 mb-1 tracking-tight">Medya</h2>
                            <p className="text-sm text-stone-500 font-medium">Etkinlik görseli katılımcıların ilgisini çeker.</p>
                        </div>

                        <div className="border-2 border-dashed border-stone-200 rounded-xl p-12 text-center hover:bg-stone-50 transition-colors cursor-pointer group hover:border-teal-200 bg-stone-50/30">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white border border-stone-200 shadow-sm group-hover:scale-110 transition-all">
                                <Upload className="w-7 h-7 text-stone-400 group-hover:text-teal-600 transition-colors" />
                            </div>
                            <p className="text-stone-900 font-bold group-hover:text-teal-700 transition-colors">Görsel Yükle</p>
                            <p className="text-xs text-stone-400 mt-1 font-medium">PNG, JPG (Max 5MB)</p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Açıklama</label>
                            <textarea name="description" rows={5} className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 rounded-xl px-4 py-3 text-stone-900 outline-none resize-none font-medium text-sm leading-relaxed" placeholder="Etkinlik detaylarından, konuşmacılardan ve programdan bahsedin..."></textarea>
                        </div>
                    </div>

                    {/* Section 3: Ticketing */}
                    <div className="glass-card p-6 md:p-8 space-y-6">
                        <div className="border-b border-stone-100 pb-4 mb-4">
                            <h2 className="text-xl font-bold text-stone-900 mb-1 tracking-tight">Biletleme</h2>
                            <p className="text-sm text-stone-500 font-medium">Kapasite ve ücretlendirme.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Kontenjan</label>
                                <div className="relative group">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-teal-500 transition-colors" />
                                    <input name="capacity" type="number" className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 rounded-xl pl-12 pr-4 py-3.5 text-stone-900 outline-none font-medium" placeholder="Limitsiz için boş bırakın" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Bilet Ücreti</label>
                                <div className="relative group">
                                    <p className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-stone-400 group-focus-within:text-teal-500 transition-colors">₺</p>
                                    <input name="price" type="number" className="w-full bg-stone-50 border border-stone-200 focus:border-teal-500 rounded-xl pl-10 pr-4 py-3.5 text-stone-900 outline-none font-medium" placeholder="0.00" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4 pb-8">
                        <button type="button" onClick={() => router.back()} className="px-6 py-3.5 text-stone-600 font-bold hover:bg-stone-100 rounded-xl transition-colors text-sm">Vazgeç</button>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl shadow-xl shadow-stone-900/10 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2 hover:translate-y-[-1px]">
                            {isSubmitting ? 'Oluşturuluyor...' : 'Etkinliği Yayınla'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
