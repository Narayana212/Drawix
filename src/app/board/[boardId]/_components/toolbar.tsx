import React from "react";

import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";

export default function Toolbar() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <div>
          <Pencil />
        </div>
        <div>
          <Square />
        </div>
        <div>
          <Circle />
        </div>
        <div>
          <MousePointer2 />
        </div>
        <div>
          <Type />
        </div>
        <div>
            <StickyNote/>
        </div>
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div>
          <Undo2 />
        </div>
        <div>
          <Redo2 />
        </div>
      </div>
    </div>
  );
}


export const ToolbarSkeleton = () => {
  return (
    <Skeleton className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
};
