import { MainLayout } from "~/components/layout/MainLayout";

export default function Game2048() {
  return (
    <MainLayout>
      <div className="flex h-full items-center justify-center">
        <div className="grid grid-cols-4 grid-rows-4 gap-2 rounded-lg border bg-primary p-2">
          {Array.from({ length: 16 }).map((_, i) => {
            return (
              <div
                key={i}
                className="flex aspect-square size-20 items-center justify-center rounded-lg border bg-primary-foreground"
              ></div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
