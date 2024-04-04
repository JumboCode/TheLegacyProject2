import Sidebar, { ISideBar } from "@components/Sidebar";
import React from "react";

interface CollapsibleSidebarContainerProps extends ISideBar {
  children?: React.ReactNode;
}

const CollapsibleSidebarContainer = (
  props: CollapsibleSidebarContainerProps
) => {
  const { buttons, children } = props;

  return (
    <div className="flex min-h-full w-full flex-col gap-y-6 bg-[#F4F0EB] px-7 lg:grid lg:grid-cols-12 lg:px-0">
      <div className="lg:col-span-2">
        <Sidebar buttons={buttons} />
      </div>
      <div className="col-span-12 lg:col-span-10 lg:px-7 lg:py-[104px]">
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSidebarContainer;
