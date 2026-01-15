import { Heart, MessageCircle, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  id: string;
  title: string;
  youtubeUrl: string;
  instrument: string;
  level: string;
  composer?: string;
  author: string;
  timeAgo: string;
  likes: number;
  comments: number;
}

const PostCard = ({ 
  id, 
  title, 
  youtubeUrl, 
  instrument, 
  level, 
  composer, 
  author, 
  timeAgo, 
  likes, 
  comments 
}: PostCardProps) => {
  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(youtubeUrl);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-border/50">
      <div className="relative aspect-video overflow-hidden">
        {thumbnailUrl && (
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {instrument}
          </Badge>
          <Badge variant="outline" className="bg-background/90 border-accent text-foreground">
            {level}
          </Badge>
          {composer && (
            <Badge variant="outline" className="bg-background/90 border-gold text-foreground">
              {composer}
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <User className="w-4 h-4 mr-1" />
          <span className="mr-3">{author}</span>
          <Clock className="w-4 h-4 mr-1" />
          <span>{timeAgo}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{comments}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-primary/10 hover:text-primary"
            onClick={() => window.open(`/post/${id}`, '_self')}
          >
            View & Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;