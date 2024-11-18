# Helpers

## Prisma migration commands

```shell
# reset all migrations
p dlx prisma migrate reset

# create new migration
p dlx prisma migrate dev --name migration_name

# deploy migrations 
p dlx prisma migrate deploy 

# run user seeder
node prisma/seeders/user.js
```
