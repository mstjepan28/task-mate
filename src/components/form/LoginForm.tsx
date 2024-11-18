"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IProps {
  loginAction: (email: string, password: string) => Promise<void>;
}

export const LoginForm = ({ loginAction }: IProps) => {
  const defaultPassword = process.env.NEXT_PUBLIC_DEV_PASSWORD ?? "";
  const defaultEmail = process.env.NEXT_PUBLIC_DEV_EMAIL ?? "";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const data = new FormData(form);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    await loginAction(email, password);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-80 rounded-xl border bg-gray-200 px-4 py-6">
      <div className="pb-4">
        <Label htmlFor="email" className="text-sm">
          Email
        </Label>
        <Input name="email" type="email" defaultValue={defaultEmail} className="bg-white" />
      </div>

      <div className="pb-6">
        <Label htmlFor="email" className="text-sm">
          Password
        </Label>
        <Input name="password" type="password" defaultValue={defaultPassword} className="bg-white" />
      </div>

      <Button className="w-full">Login</Button>
    </form>
  );
};
