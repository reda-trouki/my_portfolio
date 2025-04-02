"use client";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn("fixed inset-0 overflow-hidden", className)}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-40%,rgba(147,51,234,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_60%,rgba(34,211,238,0.1),transparent)]" />
      </div>
    </div>
  );
};