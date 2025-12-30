"use client";

import { use } from "react";
import { MOCK_COMMUNITIES } from "@/mocks/communities";
import { ArrowLeft, Image as ImageIcon, Globe, Twitter, Instagram, Linkedin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GalleryPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = use(params);
    const community = MOCK_COMMUNITIES.find(c => c.subdomain === subdomain) || MOCK_COMMUNITIES[0];

    const extendedGallery = [...community.gallery, ...community.gallery]; // Duplicate for more content

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

            <div className="max-w-6xl mx-auto px-6 py-4">


                <div className="mb-10 flex items-center gap-4">
                    <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
                        <ImageIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-text-main">Fotoğraf Galerisi</h1>
                        <p className="text-text-muted">Etkinliklerimizden keyifli anlar.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {extendedGallery.map((img, i) => (
                        <div key={i} className="group relative aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-stone-200">
                            <img
                                src={img}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                alt={`Gallery item ${i}`}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

                            {/* Overlay Info (Optional) */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-bold">2024 Yaz Buluşması</p>
                                <p className="text-white/80 text-xs">Levent, İstanbul</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
