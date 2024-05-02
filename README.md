

## User Model

The user model describes the operations available for managing users in the system. Below are the available scripts and their functions related to the user model.

- **Get all users:**
  - `bun scripts/users/all.ts`

- **Find user:**
  - `bun scripts/users/find.ts <option>`
    - Options:
      - `-i, --id <userId>`: Search for a user by ID
      - `-e, --email <email>`: Search for a user by email
      - `-n, --nick <nickname>`: Search for a user by nickname
      - `-h, --help`: Display this help message

- **Create user:**
  - `bun scripts/users/create.ts <option>`
    - Options:
      - `-r, --random <integer>`: Create a user with random data between 1 and 10
      - `-j, --json '{"email": "<string>", "nick": "<string>", "fullName": "<string>", "admin": <true|false>}'`: Create a user with JSON data.
        - Enclose the JSON object with curly braces {}
        - Enclose the entire JSON string with single quotes '
        - Enclose field names and string values with double quotes "
      - `-h, --help`: Display this help message

- **Update user:**
  - `bun scripts/users/update.ts <option> <json_details>`
    - Options:
      - `-u, --user <userId> <json_details>`: Update user details by user ID
        - Provide the user ID of the user to edit and new details in JSON format
        - Example: -u 123 '{"email": "new@example.com", "nick": "new_nick", "fullName": "New Full Name", "admin": true}'
      - `-e, --email <email> <json_details>`: Update user details by user EMAIL
        - Provide the email of the user to edit and new details in JSON format
        - Example: -e 'user@example.com' '{"email": "new@example.com", "nick": "new_nick", "fullName": "New Full Name", "admin": true}'
      - `-n, --nick <nickname> <json_details>`: Update user details by user NICK
        - Provide the nickname of the user to edit and new details in JSON format
        - Example: -n 'user_nick' '{"email": "new@example.com", "nick": "new_nick", "fullName": "New Full Name", "admin": true}'
      - `-h, --help`: Display this help message

- **Delete user:**
  - `bun scripts/users/delete.ts <option>`
    - Options:
      - `-u, --user <userId>`: Delete user by user ID
        - Provide the user ID of the user to delete
        - Example: -u 123
      - `-e, --email <email>`: Delete user by user EMAIL
        - Provide the email of the user to delete
        - Example: -e 'user@example.com'
      - `-n, --nick <nickname>`: Delete user by user NICK
        - Provide the nickname of the user to delete
        - Example: -n 'user_nick'
      - `-h, --help`: Display this help message

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