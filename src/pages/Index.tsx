import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flower2, Sparkles, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GratitudeGarden } from "@/components/GratitudeGarden";
import { getEntries, getTodayEntry, saveEntry, getStreak, type GratitudeEntry } from "@/lib/gratitude-store";

const Index = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [todayEntry, setTodayEntry] = useState<GratitudeEntry | undefined>();
  const [text, setText] = useState("");
  const [justPlanted, setJustPlanted] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setEntries(getEntries());
    setTodayEntry(getTodayEntry());
    setStreak(getStreak());
  }, []);

  const handleSubmit = () => {
    if (!text.trim()) return;
    const entry = saveEntry(text.trim());
    setEntries(getEntries());
    setTodayEntry(entry);
    setStreak(getStreak());
    setText("");
    setJustPlanted(true);
    setTimeout(() => setJustPlanted(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Flower2 className="w-6 h-6 text-primary" />
            <span className="text-xs font-body tracking-widest uppercase text-muted-foreground">Daily Ritual</span>
            <Flower2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-2">
            Gratitude Garden
          </h1>
          <p className="text-muted-foreground font-body text-sm max-w-md mx-auto">
            Write one thing you're grateful for each day and watch your garden grow
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6 mb-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <Flower2 className="w-4 h-4 text-secondary" />
            <span className="text-sm font-body">
              <span className="font-medium text-foreground">{entries.length}</span>
              <span className="text-muted-foreground ml-1">planted</span>
            </span>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-sm font-body">
                <span className="font-medium text-foreground">{streak}</span>
                <span className="text-muted-foreground ml-1">day streak</span>
              </span>
            </div>
          )}
        </motion.div>

        {/* Garden */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <GratitudeGarden entries={entries} />
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-6 shadow-sm"
        >
          {todayEntry ? (
            <div className="text-center py-4">
              <AnimatePresence>
                {justPlanted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="mb-3"
                  >
                    <Sparkles className="w-8 h-8 text-accent mx-auto" />
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="font-display text-lg text-foreground mb-2">Today's seed is planted 🌱</p>
              <p className="text-muted-foreground text-sm font-body italic">"{todayEntry.text}"</p>
              <p className="text-xs text-muted-foreground/60 mt-3 font-body">Come back tomorrow to grow your garden</p>
            </div>
          ) : (
            <>
              <label className="block font-display text-lg text-foreground mb-3">
                What are you grateful for today?
              </label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Today I'm grateful for..."
                className="mb-4 bg-background/50 border-border/60 focus:border-primary resize-none font-body text-sm min-h-[100px]"
                maxLength={280}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-body">{text.length}/280</span>
                <Button
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className="rounded-full px-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-body"
                >
                  <Flower2 className="w-4 h-4" />
                  Plant a seed
                </Button>
              </div>
            </>
          )}
        </motion.div>

        {/* Recent entries */}
        {entries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <h2 className="font-display text-lg text-foreground mb-4">Recent Gratitudes</h2>
            <div className="space-y-3">
              {[...entries]
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 7)
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Flower2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-body">{entry.text}</p>
                      <p className="text-xs text-muted-foreground mt-1 font-body">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
