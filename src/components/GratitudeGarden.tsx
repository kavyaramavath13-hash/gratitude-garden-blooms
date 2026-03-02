import { GardenPlant } from "./GardenPlant";
import type { GratitudeEntry } from "@/lib/gratitude-store";

interface GratitudeGardenProps {
  entries: GratitudeEntry[];
}

export function GratitudeGarden({ entries }: GratitudeGardenProps) {
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="relative w-full min-h-[220px] rounded-2xl overflow-hidden border border-border bg-gradient-to-t from-muted/60 via-card to-card">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-transparent to-transparent" />
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-garden-soil/20 to-transparent rounded-b-2xl" />

      {/* Plants */}
      <div className="relative flex items-end justify-center gap-1 flex-wrap px-4 pt-8 pb-4 min-h-[200px]">
        {sorted.length === 0 && (
          <p className="text-muted-foreground text-sm italic font-body self-center">
            Your garden is waiting to bloom ✨
          </p>
        )}
        {sorted.map((entry, i) => (
          <GardenPlant key={entry.id} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}
