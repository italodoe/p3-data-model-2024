## seed
rm -rf prisma/dev.db ## for dev.db 
bunx prisma db push ## optional
bun prisma/seed.ts


## scripts
bun scripts/users/all.ts


bun scripts/users/find.ts <option>
Options:
  -i, --id <userId>             Search for a user by ID
  -e, --email <email>           Search for a user by email
  -n, --nick <nickname>         Search for a user by nickname
  -h, --help                    Display this help message;


bun scripts/users/create.ts <option>
Options:
  -r, --random <integer>    Create a user with random data between 1-10

  -j, --json '{"email": "<string>", "nick": "<string>", "fullName": "<string>", "admin": <true|false>}'
                            Create a user with JSON data.
                            Enclose the JSON object with curly braces {}
                            Enclose the entire JSON string with single quotes '
                            Enclose field names and string values with double quotes "

  -h, --help                Display this help message
