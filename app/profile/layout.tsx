import { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3 py-16 px-4 sm:px-8 lg:px-16">
        {children}
      </div>
    </div>
  );
}

export default layout;
