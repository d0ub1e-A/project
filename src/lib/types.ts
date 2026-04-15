import type { LucideIcon } from "lucide-react";

export type NavPrimaryProps = {
  items: {
    title: string;
    to: string;
    icon: LucideIcon;
    activeOptions: { exact: boolean };
  }[];
};
