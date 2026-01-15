import { useState, useEffect } from "react";
import { ArrowLeft, Heart, MessageCircle, Clock, User, Send, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { AudioRecorder } from "@/components/AudioRecorder";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PostView = () => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Mock data for the post
  const post = {
    id: "1",
    title: "Bach Partita No. 1 in B-flat major - Allemande",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    description: "Working on this piece for my upcoming recital. Would love feedback on phrasing and tempo, especially in the middle section.",
    instrument: "Piano",
    level: "Advanced",
    composer: "Bach",
    author: "Sarah Chen",
    timeAgo: "2 hours ago",
    likes: 12,
    comments: 8
  };

  // Load user and comments on mount
  useEffect(() => {
    const initializeData = async () => {
      // Check auth state
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      // Load mock comments (you can replace this with real data later)
      const mockComments = [
        {
          id: "1",
          author: "Michael Rodriguez",
          content: "Beautiful phrasing overall! I'd suggest taking a bit more time with the ornaments in measure 16-18 to let them really sing.",
          timestamp_reference: "1:24",
          timeAgo: "1 hour ago",
          likes: 3,
          comment_type: "text"
        },
        {
          id: "2",
          author: "Emma Thompson",
          content: "Your tempo is very musical, but consider building more contrast between the forte and piano sections. The dynamics could be more pronounced.",
          timestamp_reference: "",
          timeAgo: "45 minutes ago",
          likes: 2,
          comment_type: "text"
        },
        {
          id: "3",
          author: "David Kim",
          audio_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Mock audio URL
          timestamp_reference: "2:15",
          timeAgo: "30 minutes ago",
          likes: 1,
          comment_type: "audio"
        }
      ];
      
      setComments(mockComments);
      setLoading(false);
    };
    
    initializeData();
  }, []);

  const handleSubmitTextComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to post comments.",
        variant: "destructive"
      });
      return;
    }
    
    if (!newComment.trim()) {
      toast({
        title: "Empty Comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Mock adding comment (replace with real Supabase call later)
    const newCommentObj = {
      id: Date.now().toString(),
      author: user.email?.split('@')[0] || "Anonymous",
      content: newComment,
      timestamp_reference: timestamp,
      timeAgo: "just now",
      likes: 0,
      comment_type: "text"
    };
    
    setComments(prev => [...prev, newCommentObj]);
    
    toast({
      title: "Comment Added!",
      description: "Your feedback has been shared with the community.",
    });

    setNewComment("");
    setTimestamp("");
  };

  const handleAudioComment = async (audioBlob: Blob) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to post audio comments.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Upload audio to Supabase Storage
      const fileName = `audio-comment-${Date.now()}.webm`;
      const filePath = `${user.id}/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio-comments')
        .upload(filePath, audioBlob, {
          contentType: 'audio/webm'
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('audio-comments')
        .getPublicUrl(uploadData.path);

      // Mock adding audio comment (replace with real Supabase call later)
      const newCommentObj = {
        id: Date.now().toString(),
        author: user.email?.split('@')[0] || "Anonymous",
        audio_url: publicUrl,
        timestamp_reference: timestamp,
        timeAgo: "just now",
        likes: 0,
        comment_type: "audio"
      };
      
      setComments(prev => [...prev, newCommentObj]);
      
    } catch (error) {
      console.error('Error uploading audio:', error);
      throw error;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return null;
    return (
      <Badge variant="outline" className="text-xs bg-accent/20 border-accent">
        @ {timestamp}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Discovery
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video */}
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtubeId}`}
                  title={post.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </Card>

            {/* Post Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{post.instrument}</Badge>
                  <Badge variant="outline" className="border-accent">{post.level}</Badge>
                  <Badge variant="outline" className="border-gold">{post.composer}</Badge>
                </div>
                
                <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.timeAgo}</span>
                </div>

                {post.description && (
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                )}
                
                <div className="flex items-center space-x-6">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </Button>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {post.comments} comments
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Community Feedback</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {comments.map((comment, index) => (
                    <div key={comment.id}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-sm">{comment.author}</h4>
                          {formatTimestamp(comment.timestamp_reference)}
                          {comment.comment_type === 'audio' && (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                              <Volume2 className="w-3 h-3 mr-1" />
                              Audio
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{comment.timeAgo}</span>
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                            <Heart className="w-3 h-3 mr-1" />
                            {comment.likes}
                          </Button>
                        </div>
                      </div>
                      
                      {comment.comment_type === 'audio' && comment.audio_url ? (
                        <div className="mt-3">
                          <AudioPlayer src={comment.audio_url} />
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                      )}
                      
                      {index < comments.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Comment Form */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Share Your Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timestamp">Timestamp (Optional)</Label>
                    <Input
                      id="timestamp"
                      placeholder="e.g., 1:24"
                      value={timestamp}
                      onChange={(e) => setTimestamp(e.target.value)}
                      className="text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Link your comment to a specific moment in the video
                    </p>
                  </div>

                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text">Text Comment</TabsTrigger>
                      <TabsTrigger value="audio">Audio Comment</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="text" className="space-y-4">
                      <form onSubmit={handleSubmitTextComment} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="comment">Your Feedback</Label>
                          <Textarea
                            id="comment"
                            placeholder="Share constructive feedback, suggestions, or encouragement..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={4}
                            className="text-sm"
                          />
                        </div>

                        <Button type="submit" className="w-full" size="sm" disabled={!user}>
                          <Send className="w-4 h-4 mr-1" />
                          Post Text Comment
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="audio" className="space-y-4">
                      <AudioRecorder 
                        onAudioReady={handleAudioComment}
                        disabled={!user}
                      />
                    </TabsContent>
                  </Tabs>

                  {!user && (
                    <p className="text-xs text-muted-foreground text-center p-2 bg-muted rounded">
                      Please log in to post comments
                    </p>
                  )}
                </div>

                <Separator className="my-6" />

                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-3">
                    Keep feedback constructive and supportive
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Community Guidelines
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;