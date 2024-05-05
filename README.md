# Project Name: User-Video Management System

## Description
This project provides a set of scripts for managing users, videos, and comments within a system. These scripts offer functionalities like creating, finding, updating, and deleting users, videos, and comments.

---

## User

### Find all users
- **Usage**: `bun scripts/users/all.ts [options]` or `bunx tsx scripts/users/all.ts [options]`
- **Description**: This script retrieves all users along with their videos and comments.
- **Options**:
  - `-h, --help`: Display this help message

### Create user
- **Usage**: `bun scripts/users/create.ts [options]` or `bun tsx scripts/users/create.ts [options]`
- **Options**:
  - `-r, --random <integer>`: Create between 1-10 users with random data
  - `-j, --json '{"email": "<string>", "nick": "<string>", "fullName": "<string>", "admin": <true|false>}'`: Create a user with JSON data.
    - Enclose the JSON object with curly braces {}
    - Enclose the entire JSON string with single quotes '
    - Enclose field names and string values with double quotes "

### Find user
- **Usage**: `bun scripts/users/find.ts [options]` or `bun tsx scripts/users/find.ts [options]`
- **Options**:
  - `-i, --id <userId>`: Search for a user by userId
  - `-e, --email <email>`: Search for a user by email
  - `-n, --nick <nickname>`: Search for a user by nickname
  - `-h, --help`: Display this help message

### Update user
- **Usage**: `bun scripts/users/update.ts [options]` or `bunx tsx scripts/users/update.ts [options]`
- **Options**:
  - `-i, --id <userId> '<json_details>'`: Update user details by user ID
  - `-e, --email <email> '<json_details>'`: Update user details by user EMAIL
  - `-n, --nick <nickname> '<json_details>'`: Update user details by user NICK
  - `-h, --help`: Display this help message

### Delete user
- **Usage**: `bun scripts/users/delete.ts [options]` or `bun tsx scripts/users/delete.ts [options]`
- **Options**:
  - `-i, --id <userId>`: Delete user by user ID
  - `-e, --email <email>`: Delete user by user EMAIL
  - `-n, --nick <nickname>`: Delete user by user NICK
  - `-h, --help`: Display this help message

---

## Video

### Find all videos
- **Usage**: `bun scripts/videos/all.ts [options]` or `bunx tsx scripts/videos/all.ts [options]`
- **Description**: This script retrieves all videos along with their authors and comments.
- **Options**:
  - `-h, --help`: Display this help message

### Create video
- **Usage**: `bun scripts/videos/create.ts [options]` or `bun tsx scripts/videos/create.ts [options]`
- **Options**:
  - `-j, --json '{ "title": "<string>", "url": "<string>", "description": "<string>"|<null>, "authorId": <number>}'`: Create a video with JSON data.
    - Enclose the JSON object with curly braces {}
    - Enclose the entire JSON string with single quotes '
    - Enclose field names and string values with double quotes "
- **Options**:
  - `-h, --help`: Display this help message

### Find video
- **Usage**: `bun scripts/videos/find.ts [options]` or `bun tsx scripts/videos/find.ts [options]`
- **Options**:
  - `-i, --id <videoId>`: Search for a video by videoId
  - `-a, --author <authorId>`: Search for a video by authorId
  - `-e, --email <email>`: Search for a video by author email
  - `-n, --nick <nickname>`: Search for a video by author nickname
  - `-u, --url <url>`: Search for a video by url
  - `-t, --title <term>`: Search for a video by title
  - `-d, --description <term>`: Search for a video by description
  - `-h, --help`: Display this help message

### Update video
- **Usage**: `bun scripts/videos/update.ts [options]` or `bunx tsx scripts/videos/update.ts [options]`
- **Options**:
  - `-i, --id <videoId> '<json_details>'`: Update video details by video ID
  - `-url, --url <url> <json_details>`: Update video details by video URL
  - `-d, --description <videoId> <term>`: Update video description by video ID
  - `-t, --title <videoId> <term>`: Update video title by video ID
  - `-v, --views <videoId>`: Update video views by video ID
  - `-h, --help`: Display this help message

### Delete video
- **Usage**: `bun scripts/videos/delete.ts [options]` or `bun tsx scripts/videos/delete.ts [options]`
- **Options**:
  - `-i, --id <videoId>`: Delete video by video ID
  - `-u, --url <url_code>`: Delete user by video URL code
  - `-a, --author <authorId>`: Delete user by video AUTHOR
  - `-h, --help`: Display this help message

---

## Comment

### Find all comments
- **Usage**: `bun scripts/comments/all.ts [options]` or `bunx tsx scripts/comments/all.ts [options]`
- **Description**: This script retrieves all comments along with their videos, authors, and comments.
- **Options**:
  - `-h, --help`: Display this help message

### Create comment
- **Usage**: `bun scripts/comments/create.ts [options]` or `bun tsx scripts/comments/create.ts [options]`
- **Options**:
  - `-j, --json '{ "text": "<string>", "videoId": <number>, "authorId": <number>, "parentId": <number>|<null> }'`: Create a comment with JSON data.
    - Enclose the JSON object with curly braces {}
    - Enclose the entire JSON string with single quotes '
    - Enclose field names and string values with double quotes "
- **Options**:
  - `-h, --help`: Display this help message

### Find comment
- **Usage**: `bun scripts/comments/find.ts [options]` or `bun tsx scripts/comments/find.ts [options]`
- **Options**:
  - `-i, --id <commentId>`: Find a comment by its ID
  - `-a, --author <authorId>`: Find comments by author ID
  - `-e, --email <email>`: Find comments by author email
  - `-n, --nick <nickname>`: Find comments by author nickname
  - `-v, --video <videoId>`: Find comments by video ID
  - `-u, --url <url>`: Find comments by video URL
  - `-va, --video-author <videoId> <authorId>`: Find comments by video ID and author ID
  - `-p, --parent <commentId>`: Find comments by parent ID
  - `-h, --help`: Display this help message

### Update comment
- **Usage**: `bun scripts/comments/update.ts [options]` or `bunx tsx scripts/comments/update.ts [options]`
- **Options**:
  - `-j, --json '<json_details>'`: Update comment details by comment ID
    - Example: `-j '{ "text": "This song pumped me up so hard I cleaned my whole room.", "commentId": 52, "parentId": 37 }'`
  - `-h, --help`: Display this help message

### Delete comment
- **Usage**: `bun scripts/comments/delete.ts [options]` or `bun tsx scripts/comments/delete.ts [options]`
- **Options**:
  - `-i, --id <commentId>`: Delete a comment by its ID
    - Example: `-i 22`
  - `-v, --video <videoId>`: Delete comments by video ID
    - Example: `-v 33`
  - `-a, --author <authorId>`: Delete comments by author ID
    - Example: `-a 55`
  - `-h, --help`: Display this help message
---
## Installation
To install and run the project, follow these steps:

1. Run `bun install` to install dependencies.
2. Run `docker-compose -f docker/docker-compose.yml up -d` to start Docker containers.
3. Run `bunx prisma db push` to apply database migrations.
4. Run `bunx prisma db seed` to seed the database.


## Database Dev Seeding

To seed the database, follow these steps:

```bash
# (Optional) Delete the current development database file
rm -rf prisma/dev.db

# (Optional) Push any pending migrations to the database
bunx prisma db push

# Seed the database with initial data
bun prisma/seed.ts