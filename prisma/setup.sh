#!/usr/bin/env bash

cd "$(dirname "$0")/.."

pnpm dlx prisma migrate reset --force
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma migrate deploy
pnpm dlx prisma db push
pnpm dlx prisma generate

node ./prisma/seeders/user.local.js
