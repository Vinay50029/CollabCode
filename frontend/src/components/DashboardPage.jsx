import { Link } from "react-router-dom";
import {
  Code2,
  Plus,
  Users,
  Clock,
  TrendingUp,
  Settings,
  LogOut,
  Home,
  FolderCode,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900 flex flex-col">
        
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-lg">
              <Code2 className="h-5 w-5 text-white" />
            </div>

            <span className="font-semibold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CodeSync
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={Home} label="Dashboard" active />
          <NavItem icon={FolderCode} label="My Rooms" />
          <NavItem icon={Users} label="Shared with me" />

          <Link to="/settings">
            <NavItem icon={Settings} label="Settings" />
          </Link>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800">
            
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold">
              J
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-zinc-400">
                john@example.com
              </p>
            </div>

            <Link to="/">
              <LogOut className="h-4 w-4 text-zinc-400 hover:text-white cursor-pointer" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, John!
              </h1>

              <p className="text-zinc-400">
                Here's what's happening with your projects
              </p>
            </div>

            <Link to="/editor">
              <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition">
                <Plus className="h-5 w-5" />
                Create New Room
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <StatsCard
              title="Total Rooms"
              value="12"
              subtitle="+2 from last week"
              icon={<FolderCode className="h-5 w-5 text-blue-400" />}
            />

            <StatsCard
              title="Active Collaborators"
              value="8"
              subtitle="Across all rooms"
              icon={<Users className="h-5 w-5 text-green-400" />}
            />

            <StatsCard
              title="Code Sessions"
              value="47"
              subtitle="+12% from last month"
              icon={<TrendingUp className="h-5 w-5 text-purple-400" />}
            />
          </div>

          {/* Recent Rooms */}
          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Recent Rooms
              </h2>

              <button className="flex items-center text-blue-400 hover:text-blue-300">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRooms.map((room) => (
                <Link key={room.id} to="/editor">

                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:scale-105 transition-all cursor-pointer">

                    <div className="flex items-start justify-between">
                      
                      <div>
                        <h3 className="text-lg font-semibold">
                          {room.name}
                        </h3>

                        <p className="text-sm text-zinc-400 mt-1">
                          {room.description}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          room.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-zinc-700 text-zinc-400"
                        }`}
                      >
                        {room.status}
                      </span>
                    </div>

                    <div className="space-y-3 mt-5 text-sm text-zinc-400">

                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4" />
                        {room.language}
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {room.collaborators} collaborators
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Updated {room.lastUpdated}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Create Room Card */}
          <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-zinc-800 rounded-2xl p-8 text-center space-y-4">

            <div className="mx-auto bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl w-fit">
              <Plus className="h-8 w-8 text-white" />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Start a new coding session
              </h3>

              <p className="text-zinc-400">
                Create a new room and invite your team to collaborate in real-time
              </p>
            </div>

            <Link to="/editor">
              <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition">
                Create New Room
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer ${
        active
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function StatsCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{title}</p>
        {icon}
      </div>

      <div className="mt-4">
        <h2 className="text-3xl font-bold">{value}</h2>

        <p className="text-sm text-zinc-400 mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

const recentRooms = [
  {
    id: 1,
    name: "React Dashboard",
    description: "Building an analytics dashboard",
    language: "TypeScript",
    collaborators: 3,
    lastUpdated: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    name: "API Backend",
    description: "Node.js REST API development",
    language: "JavaScript",
    collaborators: 2,
    lastUpdated: "5 hours ago",
    status: "active",
  },
  {
    id: 3,
    name: "Mobile App",
    description: "Flutter mobile application",
    language: "Dart",
    collaborators: 4,
    lastUpdated: "1 day ago",
    status: "inactive",
  },
];