#!/usr/bin/env bash

cd "$(dirname "$0")/.."

print_box() {
  local title=$1
  local color=$2
  local reset='\033[0m'
  local color_code

  case $color in
    red) color_code='\033[0;31m' ;;
    green) color_code='\033[0;32m' ;;
    yellow) color_code='\033[0;33m' ;;
    blue) color_code='\033[0;34m' ;;
    magenta) color_code='\033[0;35m' ;;
    cyan) color_code='\033[0;36m' ;;
    *) color_code='\033[0m' ;; # default to no color
  esac

  echo -e "
  ${color_code}#############################################
  ###             ${title}             ###
  #############################################${reset}
  "
}

print_box "PREPARING DB" "cyan"
pnpm dlx prisma migrate reset --force
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma migrate deploy
pnpm dlx prisma db push
pnpm dlx prisma generate

print_box "SEEDING USERS" "green"
node ./prisma/seeders/users.js

print_box "SEEDING TASKS" "yellow"
node ./prisma/seeders/tasks.js