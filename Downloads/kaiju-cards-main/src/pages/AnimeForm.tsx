import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAnime } from "@/contexts/AnimeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  X, 
  Plus, 
  Save,
  ArrowLeft,
  ImageIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnimeFormData {
  title: string;
  titleJapanese: string;
  description: string;
  episodes: number;
  rating: number;
  year: number;
  studio: string;
  status: string;
  genres: string[];
  image: string;
}

const statusOptions = ["Ongoing", "Completed", "Upcoming", "Movie"];
const availableGenres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror",
  "Mystery", "Romance", "Sci-Fi", "Supernatural", "Thriller", "Historical",
  "Sports", "Music", "School", "Military", "Mecha"
];

export default function AnimeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addAnime, updateAnime, getAnimeById } = useAnime();
  const isEditing = !!id;

  const [formData, setFormData] = useState<AnimeFormData>({
    title: "",
    titleJapanese: "",
    description: "",
    episodes: 0,
    rating: 0,
    year: new Date().getFullYear(),
    studio: "",
    status: "Upcoming",
    genres: [],
    image: ""
  });

  // Load existing anime data for editing
  useEffect(() => {
    if (isEditing && id) {
      const anime = getAnimeById(parseInt(id));
      if (anime) {
        setFormData({
          title: anime.title,
          titleJapanese: anime.titleJapanese,
          description: anime.description || "",
          episodes: anime.episodes,
          rating: anime.rating,
          year: anime.year,
          studio: anime.studio,
          status: anime.status,
          genres: anime.genre,
          image: anime.image
        });
        if (anime.image) {
          setImagePreview(anime.image);
        }
      }
    }
  }, [id, isEditing, getAnimeById]);

  const [newGenre, setNewGenre] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleInputChange = (field: keyof AnimeFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenreAdd = (genre: string) => {
    if (genre && !formData.genres.includes(genre)) {
      setFormData(prev => ({
        ...prev,
        genres: [...prev.genres, genre]
      }));
    }
    setNewGenre("");
  };

  const handleGenreRemove = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.filter(g => g !== genre)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          image: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณากรอกชื่อ Anime",
        variant: "destructive"
      });
      return;
    }

    if (formData.genres.length === 0) {
      toast({
        title: "ข้อผิดพลาด", 
        description: "กรุณาเลือกอย่างน้อย 1 Genre",
        variant: "destructive"
      });
      return;
    }

    // Save anime data
    const animeData = {
      title: formData.title,
      titleJapanese: formData.titleJapanese,
      description: formData.description,
      genre: formData.genres,
      rating: formData.rating,
      episodes: formData.episodes,
      status: formData.status,
      year: formData.year,
      studio: formData.studio,
      image: formData.image || "/placeholder.svg"
    };

    if (isEditing && id) {
      updateAnime(parseInt(id), animeData);
    } else {
      addAnime(animeData);
    }
    
    toast({
      title: "สำเร็จ!",
      description: isEditing ? "อัปเดตข้อมูล Anime เรียบร้อยแล้ว" : "เพิ่ม Anime ใหม่เรียบร้อยแล้ว",
    });

    navigate("/anime");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/anime")}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isEditing ? "แก้ไข Anime" : "เพิ่ม Anime ใหม่"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "อัปเดตข้อมูล Anime ที่มีอยู่" : "เพิ่มข้อมูล Anime ใหม่เข้าสู่ระบบ"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>ข้อมูลพื้นฐาน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">ชื่อ Anime *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="เช่น Attack on Titan"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titleJapanese">ชื่อภาษาญี่ปุ่น</Label>
                    <Input
                      id="titleJapanese"
                      value={formData.titleJapanese}
                      onChange={(e) => handleInputChange("titleJapanese", e.target.value)}
                      placeholder="เช่น 進撃の巨人"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">เรื่องย่อ</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="เขียนเรื่องย่อของ Anime..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="episodes">จำนวนตอน</Label>
                    <Input
                      id="episodes"
                      type="number"
                      value={formData.episodes}
                      onChange={(e) => handleInputChange("episodes", parseInt(e.target.value) || 0)}
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rating">คะแนน</Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.rating}
                      onChange={(e) => handleInputChange("rating", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">ปี</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => handleInputChange("year", parseInt(e.target.value) || 0)}
                      min="1900"
                      max="2030"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">สถานะ</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studio">สตูดิโอ</Label>
                  <Input
                    id="studio"
                    value={formData.studio}
                    onChange={(e) => handleInputChange("studio", e.target.value)}
                    placeholder="เช่น Mappa, Ufotable"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Genres */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Genres *</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selected Genres */}
                <div className="flex flex-wrap gap-2">
                  {formData.genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="flex items-center space-x-1 bg-primary/10 text-primary"
                    >
                      <span>{genre}</span>
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-destructive"
                        onClick={() => handleGenreRemove(genre)}
                      />
                    </Badge>
                  ))}
                </div>

                {/* Add Genre */}
                <div className="flex flex-wrap gap-2">
                  {availableGenres
                    .filter(genre => !formData.genres.includes(genre))
                    .map((genre) => (
                      <Button
                        key={genre}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenreAdd(genre)}
                        className="text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {genre}
                      </Button>
                    ))}
                </div>

                {/* Custom Genre */}
                <div className="flex space-x-2">
                  <Input
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="เพิ่ม Genre ใหม่..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={() => handleGenreAdd(newGenre)}
                    disabled={!newGenre.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Upload */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>รูปภาพ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Image Preview */}
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border hover:border-primary transition-colors duration-200">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        ไม่มีรูปภาพ
                      </p>
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    อัปโหลดรูปภาพ
                  </Button>
                  {imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImagePreview("");
                        setFormData(prev => ({ ...prev, image: "" }));
                      }}
                      className="w-full text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4 mr-2" />
                      ลบรูปภาพ
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 shadow-elegant"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? "อัปเดตข้อมูล" : "เพิ่ม Anime"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}