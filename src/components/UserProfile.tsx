import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Building, MapPin, UserCheck, UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  followers: number;
  following: number;
  isFollowing: boolean;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Architect',
    title: 'Senior Architect',
    company: 'Design Studios Inc.',
    location: 'Mumbai, India',
    followers: 234,
    following: 156,
    isFollowing: false,
  },
  {
    id: '2',
    name: 'Sarah Builder',
    title: 'Sustainable Design Lead',
    company: 'Green Architecture Co.',
    location: 'Bangalore, India',
    followers: 187,
    following: 98,
    isFollowing: true,
  },
  {
    id: '3',
    name: 'Mike Designer',
    title: 'Urban Planner',
    company: 'City Planning Solutions',
    location: 'Delhi, India',
    followers: 156,
    following: 201,
    isFollowing: false,
  },
];

export const UserProfile: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleFollow = (userId: string, isCurrentlyFollowing: boolean) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              isFollowing: !isCurrentlyFollowing,
              followers: !isCurrentlyFollowing 
                ? user.followers + 1 
                : user.followers - 1
            }
          : user
      )
    );

    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: !isCurrentlyFollowing ? "Following!" : "Unfollowed",
        description: !isCurrentlyFollowing 
          ? `You are now following ${user.name}` 
          : `You unfollowed ${user.name}`,
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Suggested Professionals</h2>
      {users.map((user) => (
        <Card key={user.id} className="w-full">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/10">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="space-y-2">
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.title}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {user.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {user.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span className="font-medium">{user.followers}</span> followers
                    </div>
                    <div>
                      <span className="font-medium">{user.following}</span> following
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant={user.isFollowing ? "secondary" : "default"}
                size="sm"
                onClick={() => handleFollow(user.id, user.isFollowing)}
                className="min-w-[100px]"
              >
                {user.isFollowing ? (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};