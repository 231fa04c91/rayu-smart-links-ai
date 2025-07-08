
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/20 bg-white/10 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <h3 className="text-2xl font-bold gradient-text">Rayu</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              The smartest URL shortener with AI-driven redirection, real-time analytics, 
              and privacy controls. Make your links work smarter.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-primary-500 transition-colors">URL Shortener</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">QR Codes</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Custom Domains</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">API</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><a href="#" className="hover:text-primary-500 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © 2024 Rayu. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-gray-600 dark:text-gray-300 text-sm">for the web</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
