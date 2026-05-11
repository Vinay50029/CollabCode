"use client";

import { useTheme } from "next-themes";
import { Toaster , ToasterProps } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme 
      className="toaster group"
      style={
        {
          "--normal-bg")",
          "--normal-text")",
          "--normal-border")",
        } 
      }
      {...props}
    />
  );
};

export { Toaster };
