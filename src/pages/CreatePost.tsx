import { useState } from "react";
import { ArrowLeft, Upload, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    youtubeUrl: "",
    description: "", 
    instrument: "",
    level: "",
    composer: ""
  });

  const instruments = [
    "Piano", "Violin", "Guitar", "Cello", "Flute", 
    "Trumpet", "Saxophone", "Clarinet", "Oboe", "Bassoon", "French Horn", 
    "Trombone", "Tuba", "Percussion", "Voice", "Organ", "Harp", "Other"
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Professional"];

  const composers = [
    "Bach", "Mozart", "Beethoven", "Chopin", "Brahms",
    "Tchaikovsky", "Debussy", "Liszt", "Rachmaninoff", "Schubert", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.youtubeUrl || !formData.instrument || !formData.level) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    // YouTube URL validation
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(formData.youtubeUrl)) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive"
      });
      return;
    }

    // Simulate successful submission
    toast({
      title: "Performance Shared!",
      description: "Your performance has been shared with the community.",
    });

    // Reset form
    setFormData({
      title: "",
      youtubeUrl: "",
      description: "",
      instrument: "",
      level: "",
      composer: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Discovery
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Share Your Music</h1>
            <p className="text-muted-foreground">
              Share your performance with the global music community and receive constructive feedback
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <span>Performance Details</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Bach Partita No. 1 - Allemande"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="text-base"
                />
              </div>

              {/* YouTube URL */}
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL *</Label>
                <Input
                  id="youtubeUrl"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                  className="text-base"
                />
                <p className="text-sm text-muted-foreground">
                  Paste the full YouTube URL of your performance
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Share any context about your performance, areas you'd like feedback on, or questions for the community..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="text-base"
                />
              </div>

              {/* Instrument */}
              <div className="space-y-2">
                <Label>Instrument *</Label>
                <Select 
                  value={formData.instrument} 
                  onValueChange={(value) => setFormData({...formData, instrument: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your instrument" />
                  </SelectTrigger>
                  <SelectContent>
                    {instruments.map((instrument) => (
                      <SelectItem key={instrument} value={instrument}>
                        {instrument}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Level */}
              <div className="space-y-2">
                <Label>Skill Level *</Label>
                <Select 
                  value={formData.level} 
                  onValueChange={(value) => setFormData({...formData, level: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Composer */}
              <div className="space-y-2">
                <Label>Composer (Optional)</Label>
                <Select 
                  value={formData.composer} 
                  onValueChange={(value) => setFormData({...formData, composer: value === "Other" ? "" : value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select composer or leave blank" />
                  </SelectTrigger>
                  <SelectContent>
                    {composers.map((composer) => (
                      <SelectItem key={composer} value={composer}>
                        {composer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-300"
                size="lg"
              >
                <Upload className="w-4 h-4 mr-2" />
                Share Performance
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            By sharing your performance, you're contributing to a supportive community of musicians.
            <br />
            All feedback is meant to be constructive and encouraging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;