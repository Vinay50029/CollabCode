import React from "react";
import {
  Code2,
  User,
  Bell,
  Lock,
  Palette,
  ArrowLeft,
  Save,
} from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm hover:bg-gray-800">
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="h-6 w-px bg-gray-700"></div>

            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-2">
                <Code2 size={18} />
              </div>

              <h1 className="text-lg font-semibold">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-3 rounded-xl border border-gray-800 bg-gray-900 p-2">
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium">
            <User size={16} />
            Profile
          </button>

          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm hover:bg-gray-800">
            <Palette size={16} />
            Preferences
          </button>

          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm hover:bg-gray-800">
            <Bell size={16} />
            Notifications
          </button>

          <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm hover:bg-gray-800">
            <Lock size={16} />
            Security
          </button>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            <p className="mt-1 text-sm text-gray-400">
              Update your personal details
            </p>
          </div>

          {/* Avatar */}
          <div className="mb-8 flex items-center gap-6">
            <img
              src="https://i.pravatar.cc/150"
              alt="avatar"
              className="h-24 w-24 rounded-full border-4 border-gray-700"
            />

            <div>
              <button className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800">
                Change Avatar
              </button>

              <p className="mt-2 text-xs text-gray-500">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          {/* Inputs */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                First Name
              </label>

              <input
                type="text"
                placeholder="John"
                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Doe"
                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 font-medium transition hover:opacity-90">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;