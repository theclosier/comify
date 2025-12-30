"use client";

import { use } from "react";
import { MOCK_COMMUNITIES } from "@/mocks/communities";
import { ArrowLeft, BookOpen, ShieldCheck, Globe, Twitter, Instagram, Linkedin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RulesPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = use(params);
    const community = MOCK_COMMUNITIES.find(c => c.subdomain === subdomain) || MOCK_COMMUNITIES[0];

    return (
        <div className="min-h-screen bg-stone-50/50 font-sans pb-24">
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

                            <Link
                                href={`/c/${subdomain}/join`}
                                className="btn-primary py-3 px-8 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 whitespace-nowrap"
                            >
                                Aramıza Katıl
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-4">


                <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
                    <div className="bg-stone-50 p-8 md:p-12 border-b border-stone-100 pb-8 text-center">
                        <div className="w-16 h-16 bg-white text-primary rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 border border-stone-100">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-text-main mb-2">Topluluk Kuralları</h1>
                        <p className="text-text-muted max-w-lg mx-auto">Sağlıklı ve keyifli bir ortam için lütfen kurallarımıza uyun.</p>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="space-y-6">
                            {community.rules.map((rule, idx) => (
                                <div key={idx} className="flex gap-4 items-start group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 text-stone-500 font-bold flex items-center justify-center text-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 pt-1">
                                        <p className="text-text-main font-medium text-lg leading-snug">{rule}</p>
                                        <p className="text-text-muted text-sm mt-1">
                                            Bu kural, topluluğumuzun huzuru ve güvenliği için önemlidir. İhlali durumunda moderatörler müdahale edebilir.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 bg-sky-50 rounded-2xl flex gap-4 items-start text-sky-800">
                            <ShieldCheck className="w-6 h-6 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-sm mb-1 uppercase tracking-wide">Yaptırımlar</h4>
                                <p className="text-sm opacity-90">
                                    Kurallara uymayan üyeler önce uyarılır, tekrarı halinde topluluktan süreli veya süresiz olarak uzaklaştırılabilirler.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
