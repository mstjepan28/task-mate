import { ScreenHeader } from "./ScreenHeader";

export const CreateEditLayout = async ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex h-dvh max-h-dvh min-h-dvh w-full flex-col text-gray-900">
      <ScreenHeader title={title} />
      <div className="flex basis-full flex-col overflow-y-auto px-2">{children}</div>
    </div>
  );
};
