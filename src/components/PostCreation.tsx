import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlusCircle, Image, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PostCreation: React.FC<{ onPostCreate?: (content: string) => void }> = ({ onPostCreate }) => {
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsPosting(true);
    
    // Simulate API call
    setTimeout(() => {
      onPostCreate?.(content);
      setContent('');
      setIsPosting(false);
      toast({
        title: "Post created!",
        description: "Your post has been shared with your followers.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Create Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your architectural insights, project updates, or industry thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="sm" disabled>
                <Image className="w-4 h-4 mr-2" />
                Image
              </Button>
              <Button type="button" variant="ghost" size="sm" disabled>
                <FileText className="w-4 h-4 mr-2" />
                Document
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {content.length}/500
              </span>
              <Button 
                type="submit" 
                disabled={!content.trim() || isPosting || content.length > 500}
                className="min-w-[80px]"
              >
                {isPosting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};