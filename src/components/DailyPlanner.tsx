import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, CheckCircle2, Circle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTodayTasks, addTask, toggleTask, deleteTask, type PlannerTask } from "@/lib/planner-store";

export function DailyPlanner() {
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setTasks(getTodayTasks());
  }, []);

  const refresh = () => setTasks(getTodayTasks());

  const handleAdd = () => {
    if (!newTask.trim()) return;
    addTask(newTask.trim());
    setNewTask("");
    refresh();
  };

  const handleToggle = (id: string) => {
    toggleTask(id);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    refresh();
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-1">
        <CalendarDays className="w-5 h-5 text-secondary" />
        <h2 className="font-display text-lg text-foreground">Daily Planner</h2>
      </div>
      <p className="text-xs text-muted-foreground font-body mb-4">{today}</p>

      {/* Progress */}
      {tasks.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs font-body text-muted-foreground mb-1">
            <span>{completedCount}/{tasks.length} done</span>
            <span>{Math.round((completedCount / tasks.length) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      )}

      {/* Add task */}
      <div className="flex gap-2 mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a task..."
          className="text-sm font-body bg-background/50 border-border/60"
        />
        <Button
          size="icon"
          onClick={handleAdd}
          disabled={!newTask.trim()}
          className="shrink-0 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        <AnimatePresence initial={false}>
          {tasks.length === 0 && (
            <p className="text-sm text-muted-foreground italic font-body text-center py-6">
              No tasks yet — plan your day ✨
            </p>
          )}
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-background/50 border border-border/40 group"
            >
              <button onClick={() => handleToggle(task.id)} className="shrink-0">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-secondary" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/50" />
                )}
              </button>
              <span
                className={`flex-1 text-sm font-body ${
                  task.completed
                    ? "line-through text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4 text-destructive/60 hover:text-destructive" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
