import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import CommunityHeader from "@/components/community/CommunityHeader";

export default async function CommunityLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ subdomain: string }>;
}) {
    const { subdomain } = await params;
    const supabase = await createClient();
    const { data: community } = await supabase
        .from('communities')
        .select('name, subdomain')
        .eq('subdomain', subdomain)
        .single();

    // Since this is a layout, we might not want to block everything if fetch fails, 
    // but typically a community layout needs the community context.
    // If community is not found here, usually the page will also 404.
    // We'll pass basic data to header.

    return (
        <div className="flex flex-col min-h-screen bg-stone-50/50 font-sans">
            {/* Global Community Header */}
            {community && <CommunityHeader community={community} />}

            <div className="flex-1">
                {children}
            </div>

            <footer className="py-8 bg-stone-50 border-t border-stone-100 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-stone-400 hover:text-indigo-600 transition-colors text-xs font-bold tracking-widest uppercase opacity-60 hover:opacity-100"
                >
                    Powered by <span className="text-sm">⚡</span> COMINFY
                </Link>
            </footer>
        </div>
    );
}
