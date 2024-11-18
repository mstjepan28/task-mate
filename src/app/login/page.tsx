import { LoginForm } from "~/components/form/LoginForm";
import { signIn } from "~/server/auth";
import { MainLayout } from "../../components/layout/MainLayout";

const LoginPage = () => {
  const loginAction = async (email: string, password: string) => {
    "use server";
    await signIn("credentials", { email, password, redirectTo: "/" });
  };

  return (
    <MainLayout>
      <div className="flex size-full flex-col items-center justify-center">
        <div className="pb-4 text-center">
          <h2 className="text-2xl font-medium">Login</h2>
        </div>

        <LoginForm loginAction={loginAction} />
      </div>
    </MainLayout>
  );
};

export default LoginPage;
