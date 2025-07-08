
import { useState, useEffect } from 'react';
import { Copy, Link, QrCode, BarChart3, Sparkles, Moon, Sun, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import URLShortener from '@/components/URLShortener';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('shortener');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Floating background orbs */}
      <div className="floating-orb w-72 h-72 -top-36 -left-36" style={{ animationDelay: '0s' }} />
      <div className="floating-orb w-96 h-96 -bottom-48 -right-48" style={{ animationDelay: '2s' }} />
      <div className="floating-orb w-64 h-64 top-1/2 left-1/4" style={{ animationDelay: '4s' }} />

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Link className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Rayu</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => setActiveTab('shortener')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === 'shortener' 
                    ? 'bg-white/20 text-primary-600 font-semibold' 
                    : 'text-gray-600 hover:text-primary-500'
                }`}
              >
                Shortener
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === 'dashboard' 
                    ? 'bg-white/20 text-primary-600 font-semibold' 
                    : 'text-gray-600 hover:text-primary-500'
                }`}
              >
                Analytics
              </button>
            </nav>
            
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="w-10 h-10 p-0 rounded-full glass-effect border-white/20"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {activeTab === 'shortener' && (
          <div className="animate-slide-up">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-6">
                Smart Links
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                The only URL shortener with AI-driven smart redirection, real-time privacy controls, 
                and zero-login instant shortening.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-primary-500" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <QrCode className="w-4 h-4 text-secondary-500" />
                  <span>QR Codes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-accent-500" />
                  <span>Analytics</span>
                </div>
              </div>
            </div>

            <URLShortener />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="animate-slide-up">
            <Dashboard />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
