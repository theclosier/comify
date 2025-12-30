import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import EditEventForm from "@/components/admin/EditEventForm";

export default async function EventEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: event, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !event) {
        notFound();
    }

    return <EditEventForm event={event} />;
}
