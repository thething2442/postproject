import { NextResponse } from "next/server"

// Mock data based on your Neo4j structure
const mockPosts = [
  {
    id: "166ad1fe-6501-4d24-a06f-fd387090c4c1",
    content: "Just another random post.",
    createdAt: {
      year: { low: 2025, high: 0 },
      month: { low: 9, high: 0 },
      day: { low: 25, high: 0 },
      hour: { low: 3, high: 0 },
      minute: { low: 50, high: 0 },
      second: { low: 28, high: 0 },
      nanosecond: { low: 126000000, high: 0 },
      timeZoneOffsetSeconds: { low: 0, high: 0 },
    },
    author: {
      username: "KeepAliveUser",
    },
  },
  {
    id: "2881b2a3-a189-4832-8481-6d0a59b0b4dd",
    content: "Hello Neo4j!",
    createdAt: {
      year: { low: 2025, high: 0 },
      month: { low: 9, high: 0 },
      day: { low: 25, high: 0 },
      hour: { low: 3, high: 0 },
      minute: { low: 50, high: 0 },
      second: { low: 27, high: 0 },
      nanosecond: { low: 941000000, high: 0 },
      timeZoneOffsetSeconds: { low: 0, high: 0 },
    },
    author: {
      id: "a2e6a979-91b5-447a-96c5-3c80beae4f64",
      username: "Alice",
    },
  },
  {
    id: "3f8b9c2d-e4f5-4a6b-8c9d-1e2f3a4b5c6d",
    content:
      "Loving this new social network! The interface is so clean and modern. Can't wait to connect with more people here.",
    createdAt: {
      year: { low: 2025, high: 0 },
      month: { low: 9, high: 0 },
      day: { low: 25, high: 0 },
      hour: { low: 2, high: 0 },
      minute: { low: 30, high: 0 },
      second: { low: 15, high: 0 },
      nanosecond: { low: 500000000, high: 0 },
      timeZoneOffsetSeconds: { low: 0, high: 0 },
    },
    author: {
      id: "b3f7c8e9-d2a1-4c5b-9e8f-7a6b5c4d3e2f",
      username: "TechEnthusiast",
    },
  },
  {
    id: "4a9b8c7d-f6e5-5b4a-9c8d-2f3e4a5b6c7d",
    content:
      "Just finished reading an amazing article about the future of web development. The possibilities are endless!",
    createdAt: {
      year: { low: 2025, high: 0 },
      month: { low: 9, high: 0 },
      day: { low: 25, high: 0 },
      hour: { low: 1, high: 0 },
      minute: { low: 15, high: 0 },
      second: { low: 42, high: 0 },
      nanosecond: { low: 750000000, high: 0 },
      timeZoneOffsetSeconds: { low: 0, high: 0 },
    },
    author: {
      id: "c4e8d9f0-e3b2-5d6c-af9e-8b7c6d5e4f3a",
      username: "WebDevPro",
    },
  },
]

// Helper function to convert Neo4j datetime to JavaScript Date
function convertNeo4jDateTime(neo4jDate) {
  return new Date(
    neo4jDate.year.low,
    neo4jDate.month.low - 1, // JavaScript months are 0-indexed
    neo4jDate.day.low,
    neo4jDate.hour.low,
    neo4jDate.minute.low,
    neo4jDate.second.low,
    Math.floor(neo4jDate.nanosecond.low / 1000000), // Convert nanoseconds to milliseconds
  )
}

// Helper function to format relative time
function getRelativeTime(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString()
}

export async function GET() {
  try {
    // TODO: Replace with actual Neo4j query
    // const session = driver.session()
    // const result = await session.run(
    //   'MATCH (p:Post)-[:AUTHORED_BY]->(u:User) RETURN p, u ORDER BY p.createdAt DESC LIMIT 20'
    // )
    // const posts = result.records.map(record => ({
    //   ...record.get('p').properties,
    //   author: record.get('u').properties
    // }))

    // For now, use mock data and convert the datetime format
    const formattedPosts = mockPosts.map((post) => ({
      id: post.id,
      content: post.content,
      createdAt: convertNeo4jDateTime(post.createdAt),
      relativeTime: getRelativeTime(convertNeo4jDateTime(post.createdAt)),
      author: {
        id: post.author.id || null,
        username: post.author.username,
        avatar: `/placeholder.svg?height=40&width=40&query=${post.author.username} avatar`,
      },
    }))

    return NextResponse.json({ posts: formattedPosts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
