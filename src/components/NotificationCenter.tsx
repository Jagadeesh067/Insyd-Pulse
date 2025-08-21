import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, User, Heart, MessageCircle, UserPlus } from 'lucide-react';

interface Notification {
  id: string;
  type: 'follow' | 'like' | 'comment' | 'post';
  message: string;
  user: string;
  timestamp: Date;
  read: boolean;
}

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'follow',
      message: 'started following you',
      user: 'John Architect',
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: '2',
      type: 'like',
      message: 'liked your post about sustainable design',
      user: 'Sarah Builder',
      timestamp: new Date(Date.now() - 600000),
      read: false,
    },
    {
      id: '3',
      type: 'comment',
      message: 'commented on your project showcase',
      user: 'Mike Designer',
      timestamp: new Date(Date.now() - 900000),
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'follow': return <UserPlus className="w-4 h-4" />;
      case 'like': return <Heart className="w-4 h-4" />;
      case 'comment': return <MessageCircle className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark all read
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
              !notification.read 
                ? 'bg-primary/5 border-primary/20' 
                : 'bg-muted/30 border-border/50'
            }`}
            onClick={() => !notification.read && markAsRead(notification.id)}
          >
            <div className={`p-2 rounded-full ${
              !notification.read ? 'bg-primary/10' : 'bg-muted'
            }`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{notification.user}</span>{' '}
                <span className="text-muted-foreground">{notification.message}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatTime(notification.timestamp)}
              </p>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};