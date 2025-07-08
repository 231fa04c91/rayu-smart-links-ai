
import { useState } from 'react';
import { BarChart3, TrendingUp, Globe, Smartphone, ExternalLink, Eye, Clock, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for demonstration
  const stats = {
    totalClicks: 12547,
    totalLinks: 89,
    clicksToday: 342,
    topPerformer: 'rayu.link/marketing'
  };

  const recentLinks = [
    {
      id: 1,
      shortUrl: 'rayu.link/blog-post',
      originalUrl: 'https://example.com/my-amazing-blog-post',
      clicks: 156,
      created: '2 days ago',
      status: 'active'
    },
    {
      id: 2,
      shortUrl: 'rayu.link/product',
      originalUrl: 'https://shop.example.com/product/special-offer',
      clicks: 89,
      created: '5 days ago',
      status: 'active'
    },
    {
      id: 3,
      shortUrl: 'rayu.link/promo',
      originalUrl: 'https://example.com/summer-promotion-2024',
      clicks: 267,
      created: '1 week ago',
      status: 'active'
    }
  ];

  const topCountries = [
    { name: 'United States', clicks: 4521, percentage: 36 },
    { name: 'United Kingdom', clicks: 2134, percentage: 17 },
    { name: 'Germany', clicks: 1876, percentage: 15 },
    { name: 'Canada', clicks: 1245, percentage: 10 },
    { name: 'Australia', clicks: 892, percentage: 7 }
  ];

  const deviceStats = [
    { name: 'Desktop', clicks: 7528, percentage: 60 },
    { name: 'Mobile', clicks: 3762, percentage: 30 },
    { name: 'Tablet', clicks: 1257, percentage: 10 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Analytics Dashboard
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Track your link performance with detailed insights
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center space-x-2 mb-8">
        {['24h', '7d', '30d', '90d'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            onClick={() => setTimeRange(range)}
            className={timeRange === range ? 'btn-primary' : ''}
          >
            {range}
          </Button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-effect border-white/20 hover:scale-105 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Clicks</p>
                <p className="text-3xl font-bold text-primary-600">{stats.totalClicks.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+12.5%</span>
              <span className="text-gray-500 ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 hover:scale-105 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Links</p>
                <p className="text-3xl font-bold text-secondary-600">{stats.totalLinks}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">+5</span>
              <span className="text-gray-500 ml-1">this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 hover:scale-105 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Clicks Today</p>
                <p className="text-3xl font-bold text-accent-600">{stats.clicksToday}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Clock className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-gray-500">Last updated: 5 min ago</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/20 hover:scale-105 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Performer</p>
                <p className="text-lg font-bold text-purple-600 truncate">{stats.topPerformer}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-purple-500 font-medium">267 clicks</span>
              <span className="text-gray-500 ml-1">this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Links */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ExternalLink className="w-5 h-5 text-primary-500" />
              <span>Recent Links</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLinks.map((link) => (
                <div key={link.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="flex-1">
                    <p className="font-semibold text-primary-600">{link.shortUrl}</p>
                    <p className="text-sm text-gray-500 truncate">{link.originalUrl}</p>
                    <p className="text-xs text-gray-400">{link.created}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{link.clicks} clicks</p>
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card className="glass-effect border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-secondary-500" />
              <span>Top Countries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{country.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{country.clicks.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{country.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Statistics */}
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-accent-500" />
            <span>Device Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {deviceStats.map((device, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg">{device.name}</h3>
                <p className="text-2xl font-bold text-primary-600 mt-2">{device.clicks.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{device.percentage}% of total</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
