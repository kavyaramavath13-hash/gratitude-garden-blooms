import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Copy, Share2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const quotes = [
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
];

const bgGradients = [
  "from-pink-100 via-rose-50 to-amber-50",
  "from-emerald-100 via-teal-50 to-cyan-50",
  "from-violet-100 via-purple-50 to-fuchsia-50",
  "from-amber-100 via-yellow-50 to-lime-50",
  "from-sky-100 via-blue-50 to-indigo-50",
  "from-rose-100 via-pink-50 to-orange-50",
];

const Quotes = () => {
  const [index, setIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const getNewQuote = useCallback(() => {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * quotes.length);
    } while (newIndex === index && quotes.length > 1);
    setIndex(newIndex);
    setBgIndex((prev) => (prev + 1) % bgGradients.length);
  }, [index]);

  const copyQuote = () => {
    const q = quotes[index];
    navigator.clipboard.writeText(`"${q.text}" — ${q.author}`);
    toast({ title: "Copied!", description: "Quote copied to clipboard." });
  };

  const shareQuote = () => {
    const q = quotes[index];
    if (navigator.share) {
      navigator.share({ text: `"${q.text}" — ${q.author}` });
    } else {
      copyQuote();
    }
  };

  const quote = quotes[index];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradients[bgIndex]} transition-all duration-700 flex items-center justify-center p-4`}>
      <div className="w-full max-w-lg">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-display font-bold text-center text-foreground mb-8"
        >
          Random Quote Generator
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/50"
        >
          <Quote className="w-8 h-8 text-primary/40 mb-4" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg sm:text-xl font-display italic text-foreground leading-relaxed mb-4">
                "{quote.text}"
              </p>
              <p className="text-sm font-body text-muted-foreground text-right">
                — {quote.author}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            <Button onClick={copyQuote} variant="outline" size="icon" className="rounded-full">
              <Copy className="w-4 h-4" />
            </Button>
            <Button onClick={shareQuote} variant="outline" size="icon" className="rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button onClick={getNewQuote} className="rounded-full px-6 gap-2 font-body">
              <RefreshCw className="w-4 h-4" />
              New Quote
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Quotes;
