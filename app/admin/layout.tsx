import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <main className="px-4 lg:px-8 py-6 md:py-12">
      <div className="w-full">{children}</div>
    </main>
  );
}

export default layout;
