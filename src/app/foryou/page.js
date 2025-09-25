"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Home, MessageCircle, Search, Settings, Users, Heart, Share, MoreHorizontal, Plus } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import useApi from "@/hooks/use-api"
export default function Dashboard() {
  const apiGet = process.env.NEXT_PUBLIC_GET_ALL_POST
  const [posts, setPosts] = useState([])
  const { get, loading } = useApi()
  const fetchPosts = useCallback(async () => {
    try {
      const url = process.env.NEXT_PUBLIC_GET_ALL_POST;
      if (!url) {
        console.error("API URL environment variable NEXT_PUBLIC_GET_ALL_POST is not set.");
        setPosts([]);
        return;
      }
      const data = await get(url)
      if (data && data.posts) {
        const formattedPosts = data.posts.map(post => {
          if (!post.createdAt || typeof post.createdAt !== "object") {
            return { ...post, relativeTime: "Invalid date" }
          }
          const { year, month, day, hour, minute, second } = post.createdAt
          if (year === undefined || month === undefined || day === undefined) {
            return { ...post, relativeTime: "Invalid date" }
          }
          const date = new Date(year.low, month.low - 1, day.low, hour?.low || 0, minute?.low || 0, second?.low || 0)
          return {
            id: post.id,
            content: post.content,
            author: post.author,
            relativeTime: date.toLocaleString(),
          }
        })
        setPosts(formattedPosts)
      } else {
        setPosts([])
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPosts([])
    }
  }, [get])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className="min-h-screen bg-background dark">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-primary">ConnectHub</h1>
              <nav className="hidden md:flex items-center space-x-6">
                <Button variant="ghost" size="sm" className="text-primary">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
                <Button variant="ghost" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Explore
                </Button>
                <Button variant="ghost" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Network
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/user-profile-illustration.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/user-profile-illustration.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">John Doe</CardTitle>
                    <CardDescription>Welcome back to ConnectHub!</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">127</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">1.2k</div>
                    <div className="text-xs text-muted-foreground">Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">892</div>
                    <div className="text-xs text-muted-foreground">Following</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">#TechNews</Badge>
                  <span className="text-xs text-muted-foreground">12.5k posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">#WebDev</Badge>
                  <span className="text-xs text-muted-foreground">8.2k posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">#AI</Badge>
                  <span className="text-xs text-muted-foreground">15.7k posts</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/user-profile-illustration.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Button variant="outline" className="w-full justify-start text-muted-foreground bg-transparent">
                      <Plus className="mr-2 h-4 w-4" />
                      What's on your mind, John?
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">For You</h2>
              <Button variant="ghost" size="sm" onClick={fetchPosts}>
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                          <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded animate-pulse" />
                        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{post.author.username}</div>
                          <div className="text-xs text-muted-foreground">{post.relativeTime}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                          <Heart className="mr-2 h-4 w-4" />
                          {Math.floor(Math.random() * 50) + 5} likes
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {Math.floor(Math.random() * 20) + 1} comments
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground">No posts found. Start following people to see their posts!</p>
                </CardContent>
              </Card>
            )}

            {/* Welcome Message */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">🎉 Welcome to ConnectHub!</CardTitle>
                <CardDescription>
                  This is your dashboard with real posts from your network. Connect with friends and share your thoughts
                  with the community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• View and interact with posts from your network</p>
                  <p>• Share your own content and thoughts</p>
                  <p>• Discover trending topics and new connections</p>
                  <p>• Manage your profile and settings</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
