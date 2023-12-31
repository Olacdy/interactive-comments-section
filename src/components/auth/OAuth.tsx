"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { signIn } from "next-auth/react";

interface OAuthProps {
  isLoading: "credentials" | "google" | false;
  setIsLoading: (value: "credentials" | "google" | false) => void;
}

const OAuth: FC<OAuthProps> = ({ isLoading, setIsLoading }) => {
  const handleClick = async () => {
    setIsLoading("google");
    try {
      await signIn("google");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={!!isLoading} className="w-full" onClick={handleClick}>
      <span className="relative flex items-center justify-center">
        <Icons.google className="w-4 h-4 mr-2" />
        Google
        {isLoading === "google" && (
          <span
            className="absolute -right-6 h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        )}
      </span>
    </Button>
  );
};

export default OAuth;
