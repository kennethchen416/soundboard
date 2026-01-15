import { Search, Filter, SortAsc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedInstrument: string;
  onInstrumentChange: (instrument: string) => void;
  selectedLevel: string;
  onLevelChange: (level: string) => void;
  selectedComposer: string;
  onComposerChange: (composer: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SearchAndFilters = ({
  searchQuery,
  onSearchChange,
  selectedInstrument,
  onInstrumentChange,
  selectedLevel,
  onLevelChange,
  selectedComposer,
  onComposerChange,
  sortBy,
  onSortChange
}: SearchAndFiltersProps) => {
  const instruments = [
    "All Instruments", "Piano", "Violin", "Guitar", "Cello", "Flute", 
    "Trumpet", "Saxophone", "Clarinet", "Oboe", "Bassoon", "French Horn", 
    "Trombone", "Tuba", "Percussion", "Voice", "Organ", "Harp", "Other"
  ];

  const levels = [
    "All Levels", "Beginner", "Intermediate", "Advanced", "Professional"
  ];

  const composers = [
    "All Composers", "Bach", "Mozart", "Beethoven", "Chopin", "Brahms",
    "Tchaikovsky", "Debussy", "Liszt", "Rachmaninoff", "Schubert", "Other"
  ];

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "popular", label: "Most Popular" },
    { value: "activity", label: "Recent Activity" },
    { value: "oldest", label: "Oldest First" }
  ];

  return (
    <div className="bg-card rounded-lg border p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <Search className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Discover Music</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search performances..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Instrument Filter */}
        <Select value={selectedInstrument} onValueChange={onInstrumentChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Instrument" />
          </SelectTrigger>
          <SelectContent>
            {instruments.map((instrument) => (
              <SelectItem key={instrument} value={instrument}>
                {instrument}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Level Filter */}
        <Select value={selectedLevel} onValueChange={onLevelChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Skill Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Composer Filter */}
        <Select value={selectedComposer} onValueChange={onComposerChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Composer" />
          </SelectTrigger>
          <SelectContent>
            {composers.map((composer) => (
              <SelectItem key={composer} value={composer}>
                {composer}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full">
            <div className="flex items-center space-x-2">
              <SortAsc className="w-4 h-4" />
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-muted-foreground">
          Found 42 performances
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            onSearchChange("");
            onInstrumentChange("All Instruments");
            onLevelChange("All Levels");
            onComposerChange("All Composers");
            onSortChange("recent");
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFilters;