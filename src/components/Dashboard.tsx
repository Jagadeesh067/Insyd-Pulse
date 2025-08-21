import React, { useState, useEffect } from 'react';
import { NotificationCenter } from './NotificationCenter';
import { PostCreation } from './PostCreation';
import { UserProfile } from './UserProfile';
import { PostFeed } from './PostFeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, TrendingUp, Bell } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [createdPosts, setCreatedPosts] = useState<string[]>([]);
  const [realTimeActivity, setRealTimeActivity] = useState(0);

  useEffect(() => {
    // Simulate real-time activity counter
    const interval = setInterval(() => {
      setRealTimeActivity(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePostCreate = (content: string) => {
    setCreatedPosts(prev => [content, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Insyd</h1>
              <p className="text-sm text-muted-foreground">
                Architecture Industry Social Network - Notification System POC
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Activity className="w-3 h-3" />
              {realTimeActivity} active users
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">Notifications Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-xs text-muted-foreground">Engagement Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{realTimeActivity}</p>
                  <p className="text-xs text-muted-foreground">Real-time Activity</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <PostCreation onPostCreate={handlePostCreate} />
            <PostFeed newPosts={createdPosts} />
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <NotificationCenter />
            <UserProfile />
            
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Real-time Notifications</span>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Database Connection</span>
                  <Badge variant="secondary" className="text-xs">Connected</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">API Response Time</span>
                  <Badge variant="secondary" className="text-xs">~120ms</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};