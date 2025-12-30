import clsx from "clsx";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: 'blue' | 'purple' | 'emerald' | 'rose' | 'amber';
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp, color = 'blue' }: StatsCardProps) {

    // Light Theme Colors (Pastel/Soft backgrounds with strong icons)
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
        emerald: "bg-emerald-50 text-emerald-600",
        rose: "bg-rose-50 text-rose-600",
        amber: "bg-amber-50 text-amber-600",
    };

    return (
        <div className="glass-card p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-default group">
            <div className="flex justify-between items-start mb-4">
                <div className={clsx("p-3 rounded-xl transition-colors duration-300", colors[color], "group-hover:scale-110")}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <span className={clsx(
                        "text-xs font-bold px-2.5 py-1 rounded-full border",
                        trendUp
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-rose-50 text-rose-700 border-rose-100"
                    )}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-stone-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-stone-900 tracking-tight">{value}</h3>
            </div>
        </div>
    );
}
