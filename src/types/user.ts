import type { User } from "@prisma/client";

export type TFriend = {
  id: User["id"];
  name: User["name"];
  email: User["email"];
  image: User["image"];
};
