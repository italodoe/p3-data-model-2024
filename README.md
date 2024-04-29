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