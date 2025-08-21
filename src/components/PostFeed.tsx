import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Post {
  id: string;
  author: string;
  authorTitle: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Sarah Builder',
    authorTitle: 'Sustainable Design Lead',
    content: 'Just completed a fascinating project on green building materials. The future of architecture lies in sustainability and innovation. What are your thoughts on biomimetic design principles?',
    timestamp: new Date(Date.now() - 7200000),
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: '2',
    author: 'Mike Designer',
    authorTitle: 'Urban Planner',
    content: 'Exploring the intersection of technology and urban planning. Smart cities are not just about IoT sensors, but about creating human-centered spaces that adapt to community needs.',
    timestamp: new Date(Date.now() - 14400000),
    likes: 31,
    comments: 12,
    isLiked: true,
  },
];

export const PostFeed: React.FC<{ newPosts?: string[] }> = ({ newPosts = [] }) => {
  const [posts, setPosts] = useState<Post[]>([
    ...newPosts.map((content, index) => ({
      id: `new-${index}`,
      author: 'You',
      authorTitle: 'Architecture Professional',
      content,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isLiked: false,
    })),
    ...mockPosts,
  ]);

  const handleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );

    const post = posts.find(p => p.id === postId);
    if (post && !post.isLiked) {
      toast({
        title: "Post liked!",
        description: `${post.author} will be notified about your reaction.`,
      });
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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Your Feed</h2>
      {posts.map((post) => (
        <Card key={post.id} className="w-full">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{post.author}</h4>
                    <span className="text-sm text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">{post.authorTitle}</p>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {formatTime(post.timestamp)}
                    </span>
                  </div>
                  
                  <p className="mt-2 text-sm">{post.content}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`gap-2 ${post.isLiked ? 'text-rose-600' : ''}`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  {post.likes}
                </Button>
                
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </Button>
                
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};