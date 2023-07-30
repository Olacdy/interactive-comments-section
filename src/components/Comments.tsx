import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CommentsProps {
  children: ReactNode;
  depth: number;
}

const Comments: FC<CommentsProps> = ({ children, depth }) => {
  return (
    <div
      className={cn("flex flex-col space-y-4", {
        "border-l-2 border-light-gray": depth > 0,
      })}
      style={{
        paddingLeft: `${depth * 15}px`,
      }}>
      {children}
    </div>
  );
};

export default Comments;
