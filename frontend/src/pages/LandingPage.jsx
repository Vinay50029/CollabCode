import { Link } from 'react-router';
import { Button } from '../components/Button';
import { Code2, Users, Zap, Lock, Globe, Terminal } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900">
      <nav className="border-b border-white/10 backdrop-blur-xl bg-gray-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-white">CodeSync</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
          ✨ Real-time collaboration for developers
        </div>
        <h1 className="text-6xl mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Code Together in Real Time
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          The most powerful collaborative code editor for teams. Write, review, and ship code together with real-time synchronization.
        </p>
        <div className="flex items-center justify-center gap-4 mb-16">
          <Link to="/dashboard">
            <Button variant="primary" size="lg">
              <Terminal className="w-5 h-5" />
              Create Room
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" size="lg">
              <Users className="w-5 h-5" />
              Join Room
            </Button>
          </Link>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-3xl opacity-20 rounded-3xl"></div>
          <div className="relative rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-xl p-2 shadow-2xl">
            <div className="bg-gray-950 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-500 ml-4">App.tsx</span>
              </div>
              <div className="p-6 text-left font-mono text-sm">
                <div className="text-purple-400">export</div>{' '}
                <div className="inline text-purple-400">function</div>{' '}
                <div className="inline text-yellow-400">Hero</div>
                <div className="inline text-gray-400">() {'{'}</div>
                <div className="ml-4 mt-2">
                  <span className="text-purple-400">return</span> {'<'}
                  <span className="text-pink-400">div</span>{' '}
                  <span className="text-orange-400">className</span>
                  <span className="text-gray-400">=</span>
                  <span className="text-green-400">"</span>
                </div>
                <div className="ml-8 text-gray-500">
                  {'//'} Tailwind utility classes
                </div>
                <div className="ml-8">
                  <span className="text-green-400">flex items-center justify-center</span>
                </div>
                <div className="ml-8">
                  <span className="text-green-400">bg-gradient-to-r from-blue-600</span>
                </div>
                <div className="ml-8">
                  <span className="text-green-400">to-purple-600 text-white p-8</span>
                </div>
                <div className="ml-4">
                  <span className="text-green-400">"</span>
                  <span className="text-gray-400">{'>'}</span>
                </div>
                <div className="ml-8">
                  {'<'}
                  <span className="text-pink-400">h1</span>
                  {'>'}
                  <span className="text-white">Code Together!</span>
                  {'</'}
                  <span className="text-pink-400">h1</span>
                  {'>'}
                </div>
                <div className="ml-4">
                  {'</'}
                  <span className="text-pink-400">div</span>
                  {'>'}
                </div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-white">Built for Modern Teams</h2>
          <p className="text-gray-400 text-lg">Everything you need to code together seamlessly</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl mb-3 text-white">Real-Time Collaboration</h3>
            <p className="text-gray-400">See your teammates' cursors and edits as they type. No more merge conflicts.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl mb-3 text-white">Lightning Fast</h3>
            <p className="text-gray-400">Powered by cutting-edge technology for instant synchronization across the globe.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-pink-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-xl mb-3 text-white">Secure by Default</h3>
            <p className="text-gray-400">End-to-end encryption ensures your code stays private and protected.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-green-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl mb-3 text-white">Smart Code Editor</h3>
            <p className="text-gray-400">Syntax highlighting, autocomplete, and IntelliSense for 50+ languages.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-yellow-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4">
              <Terminal className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl mb-3 text-white">Integrated Terminal</h3>
            <p className="text-gray-400">Run commands, test code, and debug right from your editor workspace.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl mb-3 text-white">Work Anywhere</h3>
            <p className="text-gray-400">Access your code from any device with our cloud-based platform.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-gray-900/50 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-white">CodeSync</span>
              </div>
              <p className="text-gray-400 text-sm">The future of collaborative coding.</p>
            </div>
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            © 2026 CodeSync. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
