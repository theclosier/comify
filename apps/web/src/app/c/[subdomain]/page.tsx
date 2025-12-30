import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import CommunityView from "@/components/community/CommunityView";

export default async function CommunityPage({ params }: { params: Promise<{ subdomain: string }> }) {
    const { subdomain } = await params;
    const supabase = await createClient();

    // 1. Fetch Community by Subdomain
    const { data: community, error: communityError } = await supabase
        .from('communities')
        .select('*')
        .eq('subdomain', subdomain)
        .single();

    if (communityError || !community) {
        console.error("Community fetch error:", communityError);
        return notFound();
    }

    // 2. Fetch Events for this Community
    const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('community_id', community.id)
        .order('start_date', { ascending: true });

    if (eventsError) {
        console.error("Events fetch error:", eventsError);
    }

    // 3. Render Client Component with Real Data
    return <CommunityView community={community} events={events || []} />;
}
