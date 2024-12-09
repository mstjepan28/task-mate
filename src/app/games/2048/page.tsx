import { MainLayout } from "~/components/layout/MainLayout";
import { Game2048 } from "./2048";

export default function Page() {
  return (
    <MainLayout>
      <div className="flex h-full items-center justify-center">
        <Game2048 />
      </div>
    </MainLayout>
  );
}
