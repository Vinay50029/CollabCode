import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-zinc-950 text-white">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl rounded-3xl p-8 relative z-10 shadow-2xl">

        {/* Header */}
        <div className="space-y-4 text-center">

          <div className="mx-auto bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-xl w-fit">
            <Code2 className="h-8 w-8 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Welcome back
            </h1>

            <p className="text-zinc-400 mt-2">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5 mt-8">

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-zinc-300">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-zinc-300">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" />

              <label
                htmlFor="remember"
                className="text-sm text-zinc-400 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In */}
          <Link to="/dashboard">
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition font-medium"
            >
              Sign In
            </button>
          </Link>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700"></div>
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google */}
        <button className="w-full flex items-center justify-center py-3 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 transition">

          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />

            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />

            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />

            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>

          Sign in with Google
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-zinc-400 mt-6">
          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-blue-400 hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}