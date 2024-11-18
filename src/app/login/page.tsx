import { Input } from "~/components/ui/input";
import { MainLayout } from "../../components/layout/MainLayout";
import { Button } from "~/components/ui/button";
import { Label } from "@radix-ui/react-label";

const LoginPage = () => {
  return (
    <MainLayout>
      <div className="flex size-full flex-col items-center justify-center">
        <div className="pb-4 text-center">
          <h2 className="text-2xl font-medium">Login</h2>
        </div>

        <form className="w-full max-w-80 rounded-xl border bg-gray-200 px-4 py-6">
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
      </div>
    </MainLayout>
  );
};

export default LoginPage;
