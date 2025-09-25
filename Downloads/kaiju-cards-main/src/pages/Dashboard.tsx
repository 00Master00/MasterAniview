import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnime } from "@/contexts/AnimeContext";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Tv, 
  TrendingUp, 
  Users, 
  Star,
  Calendar,
  Eye,
  ArrowRight
} from "lucide-react";

function getTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays} วันที่ผ่านมา`;
  } else if (diffHours > 0) {
    return `${diffHours} ชั่วโมงที่ผ่านมา`;
  } else {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes > 0 ? `${diffMinutes} นาทีที่ผ่านมา` : 'เมื่อสักครู่';
  }
}

export default function Dashboard() {
  const { animeList, activities } = useAnime();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalAnime: 0,
    totalViews: 0,
    averageRating: 0,
    newThisMonth: 0
  });

  useEffect(() => {
    // Calculate stats from actual anime data
    const totalAnime = animeList.length;
    const averageRating = animeList.length > 0 
      ? animeList.reduce((sum, anime) => sum + anime.rating, 0) / animeList.length 
      : 0;
    
    setStats({
      totalAnime,
      totalViews: 285432, // Mock data
      averageRating: Number(averageRating.toFixed(1)),
      newThisMonth: 23 // Mock data
    });
  }, [animeList]);

  // Get top 3 anime by rating for popular section
  const popularAnime = [...animeList]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          ภาพรวมข้อมูล Anime ในระบบ
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="จำนวน Anime ทั้งหมด"
          value={stats.totalAnime.toLocaleString()}
          change="+12% จากเดือนที่ผ่านมา"
          changeType="positive"
          icon={Tv}
        />
        <StatCard
          title="ยอดเข้าชมทั้งหมด"
          value={stats.totalViews.toLocaleString()}
          change="+8% จากเดือนที่ผ่านมา"
          changeType="positive"
          icon={Eye}
        />
        <StatCard
          title="คะแนนเฉลี่ย"
          value={stats.averageRating.toFixed(1)}
          change="เท่าเดิม"
          changeType="neutral"
          icon={Star}
        />
        <StatCard
          title="เพิ่มใหม่เดือนนี้"
          value={stats.newThisMonth}
          change="+15% จากเดือนที่ผ่านมา"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Recent Activity & Popular Anime */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Anime */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Anime ยอดนิยม</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularAnime.map((anime, index) => (
              <div
                key={anime.id}
                onClick={() => navigate(`/anime/${anime.id}`)}
                className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer group"
              >
                <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  {anime.image && anime.image !== "/placeholder.svg" ? (
                    <img 
                      src={anime.image} 
                      alt={anime.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Tv className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">
                    {anime.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {anime.episodes} ตอน • {anime.year}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    ⭐ {anime.rating}
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>กิจกรรมล่าสุด</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {activities.slice(0, 3).map((activity) => {
                const timeAgo = getTimeAgo(activity.timestamp);
                const activityColor = activity.type === 'add' ? 'bg-success' : 
                                    activity.type === 'update' ? 'bg-info' : 'bg-warning';
                const activityTitle = activity.type === 'add' ? 'เพิ่ม Anime ใหม่' :
                                    activity.type === 'update' ? 'อัปเดตข้อมูล' : 'ลบข้อมูล';
                
                return (
                  <div 
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => {
                      if (activity.type !== 'delete') {
                        const anime = animeList.find(a => a.title === activity.animeTitle);
                        if (anime) navigate(`/anime/${anime.id}`);
                      }
                    }}
                  >
                    <div className={`w-2 h-2 ${activityColor} rounded-full mt-2`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activityTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        "{activity.animeTitle}" {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {timeAgo}
                      </p>
                    </div>
                    {activity.type !== 'delete' && (
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}