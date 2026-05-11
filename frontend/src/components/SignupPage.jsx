import React from "react";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

const SignupPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 text-white">
      {/* Background Blur Effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[-100px] top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/20 blur-3xl"></div>

        <div className="absolute bottom-1/4 right-[-100px] h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-pink-500/10 blur-3xl"></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-gray-800 bg-gray-900/70 p-8 shadow-2xl backdrop-blur-xl">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 w-fit rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <Code2 size={32} />
          </div>

          <h1 className="text-3xl font-bold">Create Account</h1>

          <p className="mt-2 text-sm text-gray-400">
            Start collaborating with your team
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Username */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Username
            </label>

            <input
              type="text"
              placeholder="johndoe"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Signup Button */}
          <button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold transition hover:opacity-90">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;