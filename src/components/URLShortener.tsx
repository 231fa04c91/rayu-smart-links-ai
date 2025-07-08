
import { useState } from 'react';
import { Copy, Link, QrCode, Share2, Settings, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

const URLShortener = () => {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [expirationEnabled, setExpirationEnabled] = useState(false);

  const generateShortUrl = async () => {
    if (!url) {
      toast({
        title: "Please enter a URL",
        description: "You need to provide a URL to shorten",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with loading animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomId = customAlias || Math.random().toString(36).substring(2, 8);
    const shortUrl = `rayu.link/${randomId}`;
    setShortenedUrl(shortUrl);
    setIsLoading(false);

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6C63FF', '#4DAAF8', '#FF6584']
    });
    
    toast({
      title: "Link shortened successfully! 🎉",
      description: "Your short link is ready to share",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://${shortenedUrl}`);
    toast({
      title: "Copied to clipboard! 📋",
      description: "Your short link is ready to share",
    });
  };

  const downloadQR = () => {
    toast({
      title: "QR Code downloaded! 📱",
      description: "QR code saved to your downloads",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Shortener Card */}
      <Card className="url-card glass-effect border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center space-x-2">
            <Link className="w-6 h-6 text-primary-500" />
            <span>Shorten Your URL</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enter your long URL
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/your-very-long-url-here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1 pulse-border transition-all duration-300 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {showAdvanced && (
              <div className="grid md:grid-cols-2 gap-4 animate-slide-up">
                <div>
                  <Label htmlFor="alias" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Custom alias (optional)
                  </Label>
                  <Input
                    id="alias"
                    placeholder="my-link"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Password Protection</Label>
                    <Switch
                      checked={isPasswordProtected}
                      onCheckedChange={setIsPasswordProtected}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Set Expiration</Label>
                    <Switch
                      checked={expirationEnabled}
                      onCheckedChange={setExpirationEnabled}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
              </Button>
            </div>
          </div>

          <Button
            onClick={generateShortUrl}
            disabled={isLoading}
            className="w-full btn-primary text-white font-semibold py-3 text-lg"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating magic...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Shorten URL</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Result Card */}
      {shortenedUrl && (
        <Card className="url-card glass-effect border-white/20 shadow-2xl animate-scale-in">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span>Your Short Link is Ready!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Input
                value={`https://${shortenedUrl}`}
                readOnly
                className="border-none bg-transparent text-lg font-mono"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={downloadQR} className="flex items-center space-x-2">
                <QrCode className="w-4 h-4" />
                <span>Download QR</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Preview</span>
              </Button>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>• Link clicks: <span className="font-semibold text-primary-500">0</span></p>
              <p>• Created: <span className="font-semibold">Just now</span></p>
              <p>• Status: <span className="font-semibold text-green-500">Active</span></p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default URLShortener;
