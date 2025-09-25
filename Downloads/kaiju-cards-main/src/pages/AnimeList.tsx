import { useState } from "react";
import { Link } from "react-router-dom";
import { useAnime } from "@/contexts/AnimeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  Calendar,
  Tv,
  Filter
} from "lucide-react";

const genreColors: Record<string, string> = {
  "Action": "bg-destructive/10 text-destructive",
  "Drama": "bg-info/10 text-info",
  "Fantasy": "bg-primary/10 text-primary",
  "Romance": "bg-pink-100 text-pink-700",
  "Comedy": "bg-warning/10 text-warning",
  "Adventure": "bg-success/10 text-success",
  "Supernatural": "bg-purple-100 text-purple-700",
  "Historical": "bg-amber-100 text-amber-700"
};

export default function AnimeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const { animeList, deleteAnime } = useAnime();

  const filteredAnime = animeList.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anime.titleJapanese.includes(searchTerm);
    const matchesGenre = !selectedGenre || anime.genre.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  const allGenres = Array.from(new Set(animeList.flatMap(anime => anime.genre)));

  const handleDelete = (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบ Anime นี้?")) {
      deleteAnime(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            รายการ Anime
          </h1>
          <p className="text-muted-foreground">
            จัดการข้อมูล Anime ทั้งหมดในระบบ
          </p>
        </div>
        <Link to="/anime/add">
          <Button className="bg-gradient-primary hover:opacity-90 shadow-elegant">
            <Plus className="w-4 h-4 mr-2" />
            เพิ่ม Anime ใหม่
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ค้นหาชื่อ Anime หรือชื่อภาษาญี่ปุ่น..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">ทุก Genre</option>
                {allGenres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          แสดง {filteredAnime.length} จาก {animeList.length} รายการ
        </p>
      </div>

      {/* Anime Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnime.map((anime) => (
          <Card key={anime.id} className="bg-gradient-card border-border shadow-card hover:shadow-hover transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                {anime.image && anime.image !== "/placeholder.svg" ? (
                  <img 
                    src={anime.image} 
                    alt={anime.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Tv className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                {anime.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{anime.titleJapanese}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Genres */}
              <div className="flex flex-wrap gap-1">
                {anime.genre.slice(0, 3).map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className={`text-xs ${genreColors[genre] || 'bg-muted/50 text-muted-foreground'}`}
                  >
                    {genre}
                  </Badge>
                ))}
                {anime.genre.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{anime.genre.length - 3}
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-warning" />
                  <span className="font-medium">{anime.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tv className="w-4 h-4 text-info" />
                  <span>{anime.episodes} ตอน</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{anime.year}</span>
                </div>
                <div>
                  <Badge
                    variant={anime.status === "Ongoing" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {anime.status}
                  </Badge>
                </div>
              </div>

              {/* Studio */}
              <p className="text-xs text-muted-foreground border-t pt-3">
                Studio: {anime.studio}
              </p>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Link to={`/anime/edit/${anime.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="w-4 h-4 mr-1" />
                    แก้ไข
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(anime.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnime.length === 0 && (
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="text-center py-12">
            <Tv className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              ไม่พบ Anime ที่ค้นหา
            </h3>
            <p className="text-muted-foreground mb-4">
              ลองเปลี่ยนคำค้นหาหรือลบตัวกรองดู
            </p>
            <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedGenre(""); }}>
              ล้างการค้นหา
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}