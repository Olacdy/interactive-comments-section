"use client";

import { Button } from "../ui/button";
import { Icons } from "../Icons";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "../ui/use-toast";

const Logout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      toast({
        variant: "destructive",
        description: (
          <p className="font-rubik">Something went wrong. Try again later.</p>
        ),
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="inline-flex items-center justify-center p-2 sm:hidden">
            <span
              className="h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            />
          </div>
          <Button disabled={isLoading} variant="outline">
            <p className="hidden pr-2 text-lg sm:inline">Logout</p>
            <span
              className="ml-2 h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            />
          </Button>
        </>
      ) : (
        <Button variant="outline" onClick={handleLogout}>
          <p className="hidden pr-2 text-lg sm:inline">Logout</p>
          <Icons.logout className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};

export default Logout;
