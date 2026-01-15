import { useState, useEffect } from "react";
import { Music, Search, User, Plus, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
      navigate('/');
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <Music className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Sonata Share
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Discover
          </Link>
          <Link to="/create" className="text-foreground hover:text-primary transition-colors">
            Share Music
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link to="/create">
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary">
              <Plus className="w-4 h-4 mr-2" />
              Share Music
            </Button>
          </Link>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.email?.split('@')[0]}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;