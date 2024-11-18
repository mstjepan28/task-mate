"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export const LoginForm = ({ onLogin }: IProps) => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const data = new FormData(form);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    await onLogin(email, password);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-80 rounded-xl border bg-gray-200 px-4 py-6">
      <div className="pb-4">
        <Label htmlFor="email">Email</Label>
        <Input name="email" type="email" className="bg-white" />
      </div>

      <div className="pb-6">
        <Label htmlFor="email">Password</Label>
        <Input name="password" type="password" className="bg-white" />
      </div>

      <Button className="w-full">Login</Button>
    </form>
  );
};
