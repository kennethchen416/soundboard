import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import SearchAndFilters from "@/components/SearchAndFilters";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState("All Instruments");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedComposer, setSelectedComposer] = useState("All Composers");
  const [sortBy, setSortBy] = useState("recent");

  // Mock data for posts
  const mockPosts = [
    {
      id: "1",
      title: "Bach Partita No. 1 in B-flat major - Allemande",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      instrument: "Piano",
      level: "Advanced",
      composer: "Bach",
      author: "Sarah Chen",
      timeAgo: "2 hours ago",
      likes: 12,
      comments: 8
    },
    {
      id: "2", 
      title: "Mozart Sonata K. 331 - First Movement",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      instrument: "Piano",
      level: "Intermediate",
      composer: "Mozart",
      author: "Alex Rivera",
      timeAgo: "4 hours ago",
      likes: 8,
      comments: 5
    },
    {
      id: "3",
      title: "Paganini Caprice No. 24 - Practice Session",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      instrument: "Violin",
      level: "Professional",
      composer: "Paganini",
      author: "Emma Thompson",
      timeAgo: "6 hours ago",
      likes: 24,
      comments: 12
    },
    {
      id: "4",
      title: "Chopin Nocturne Op. 9 No. 2 - Evening Practice",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      instrument: "Piano",
      level: "Intermediate",
      composer: "Chopin",
      author: "Michael Rodriguez",
      timeAgo: "8 hours ago",
      likes: 15,
      comments: 9
    },
    {
      id: "5",
      title: "Bach Cello Suite No. 1 - Prelude",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      instrument: "Cello",
      level: "Advanced",
      composer: "Bach",
      author: "David Kim",
      timeAgo: "12 hours ago",
      likes: 18,
      comments: 7
    },
    {
      id: "6",
      title: "Debussy Clair de Lune - First Attempt",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      instrument: "Piano",
      level: "Beginner",
      composer: "Debussy",
      author: "Lisa Park",
      timeAgo: "1 day ago",
      likes: 6,
      comments: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Global Music Community
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Share your musical performances and receive constructive feedback from musicians around the world
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-300"
            onClick={() => window.open('/create', '_self')}
          >
            <Plus className="w-5 h-5 mr-2" />
            Share Your Music
          </Button>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedInstrument={selectedInstrument}
          onInstrumentChange={setSelectedInstrument}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          selectedComposer={selectedComposer}
          onComposerChange={setSelectedComposer}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Performances
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
