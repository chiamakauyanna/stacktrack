import {
  FolderKanban,
  CheckCircle2,
  Timer,
  FileText,
  ClipboardList,
  ClipboardCheck,
  Clock8,
  TrendingUp,
  Layers,
  BarChart2,
  Smartphone,
  Clock,
  ListChecks,
} from "lucide-react";

export const steps = [
  {
    step: "1",
    title: "Create a Project",
    desc: "Start with a simple project setup.",
  },
  {
    step: "2",
    title: "Add Stages",
    desc: "Break the project into clear stages.",
  },
  {
    step: "3",
    title: "Add Tasks",
    desc: "Fill each stage with actionable task to track progress.",
  },
  {
    step: "4",
    title: "Track Progress",
    desc: "Monitor completion rates automatically.",
  },
];

export const features = [
  {
    name: "Structured Projects",
    description:
      "Break projects into clear stages and tasks — no more messy to-do lists.",
    icon: Layers,
  },
  {
    name: "Progress Tracking",
    description:
      "Track completion stage by stage, and see progress at a glance.",
    icon: BarChart2,
  },
  {
    name: "Always Accessible",
    description: "Works across devices so you never lose track.",
    icon: Smartphone,
  },
];

export const summaryCards = (summary) => [
  {
    label: "Total Projects",
    value: summary.total_projects,
    icon: FolderKanban,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    label: "Completed Projects",
    value: summary.completed_projects,
    icon: CheckCircle2,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    label: "Active Projects",
    value: summary.active_projects,
    icon: Timer,
    bg: "bg-pink-100",
    text: "text-pink-600",
  },
  {
    label: "Draft Projects",
    value: summary.draft_projects,
    icon: FileText,
    bg: "bg-gray-100",
    text: "text-gray-600",
  },
  {
    label: "Total Tasks",
    value: summary.total_tasks,
    icon: ClipboardList,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
  {
    label: "Completed Tasks",
    value: summary.completed_tasks,
    icon: ClipboardCheck,
    bg: "bg-emerald-100",
    text: "text-emerald-600",
  },
  {
    label: "Pending Tasks",
    value: summary.pending_tasks,
    icon: Clock8,
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
  {
    label: "Avg Progress (%)",
    value: summary.average_project_progress,
    icon: TrendingUp,
    bg: "bg-cyan-100",
    text: "text-cyan-600",
  },
];

export const stats = (total, inProgress, completed, pending) => [
  {
    label: "Total Tasks",
    value: total,
    icon: ClipboardList,
    color: "text-gray-700",
    bg: "bg-gray-100",
  },
  {
    label: "In Progress",
    value: inProgress,
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Completed",
    value: completed,
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    label: "Pending",
    value: pending,
    icon: ListChecks,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
];
