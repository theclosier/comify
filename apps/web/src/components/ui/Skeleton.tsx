import clsx from "clsx";

interface SkeletonProps {
    className?: string;
}

/**
 * Basic pulsing block
 */
export function Skeleton({ className }: SkeletonProps) {
    return (
        <div className={clsx("animate-pulse bg-stone-200 rounded-lg", className)} />
    );
}

/**
 * Text placeholders (lines)
 */
export function SkeletonText({ className, lines = 1 }: { className?: string, lines?: number }) {
    return (
        <div className={clsx("space-y-2", className)}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} className={clsx("h-4 w-full", i === lines - 1 && lines > 1 ? "w-2/3" : "")} />
            ))}
        </div>
    );
}

/**
 * Circle (Avatar) placeholder
 */
export function SkeletonAvatar({ className, size = "w-10 h-10" }: { className?: string, size?: string }) {
    return (
        <Skeleton className={clsx("rounded-full flex-shrink-0", size, className)} />
    );
}
