"use client";

import { use } from "react";
import { MOCK_COMMUNITIES } from "@/mocks/communities";
import { ArrowLeft, Info, Calendar, Globe, Twitter, Instagram, Linkedin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage({ params }: { params: Promise<{ subdomain: string }> }) {
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

            <div className="max-w-4xl mx-auto px-6 py-4">


                <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 md:p-12 overflow-hidden relative">
                    {/* Decorative Header */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300"></div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Info className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-text-main">Hakkımızda</h1>
                            <p className="text-text-muted">Topluluğumuzun hikayesi ve amacı.</p>
                        </div>
                    </div>

                    <div className="prose prose-stone max-w-none">
                        <p className="text-lg text-text-muted leading-loose">
                            {community.about}
                        </p>

                        <div className="my-8 h-px bg-stone-100"></div>

                        <h3 className="text-xl font-bold text-text-main mb-4">Misyonumuz</h3>
                        <p className="text-text-muted mb-6">
                            Teknoloji dünyasında bilgi paylaşımını artırmak, üyelerimize kariyerlerinde destek olmak ve güçlü bir iş birliği ağı oluşturmak. Her seviyeden yazılımcının kendini geliştirebileceği kapsayıcı bir ortam sunuyoruz.
                        </p>

                        <h3 className="text-xl font-bold text-text-main mb-4">Neler Yapıyoruz?</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
                            <li className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-text-main">Aylık Meetup'lar</span>
                            </li>
                            <li className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-text-main">Workshop & Hackathon</span>
                            </li>
                            <li className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-text-main">Kariyer Günleri</span>
                            </li>
                            <li className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span className="text-sm font-medium text-text-main">Sosyal Etkinlikler</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
