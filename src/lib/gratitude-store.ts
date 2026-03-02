export interface GratitudeEntry {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  flowerType: number; // 0-5 different flower/plant types
  createdAt: number;
}

const STORAGE_KEY = "gratitude-garden-entries";

export function getEntries(): GratitudeEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveEntry(text: string): GratitudeEntry {
  const entries = getEntries();
  const today = new Date().toISOString().slice(0, 10);
  
  // Remove existing entry for today if any
  const filtered = entries.filter(e => e.date !== today);
  
  const entry: GratitudeEntry = {
    id: crypto.randomUUID(),
    date: today,
    text,
    flowerType: Math.floor(Math.random() * 6),
    createdAt: Date.now(),
  };
  
  filtered.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return entry;
}

export function getTodayEntry(): GratitudeEntry | undefined {
  const today = new Date().toISOString().slice(0, 10);
  return getEntries().find(e => e.date === today);
}

export function getStreak(): number {
  const entries = getEntries().sort((a, b) => b.date.localeCompare(a.date));
  if (entries.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = checkDate.toISOString().slice(0, 10);
    
    if (entries.find(e => e.date === dateStr)) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  
  return streak;
}
