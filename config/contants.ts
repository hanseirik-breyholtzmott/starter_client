import { ReactElement } from "react";
import { LucideIcon } from "lucide-react";

//icons
import {
  LayoutDashboard,
  FileText,
  PackageSearch,
  User,
  ArrowLeftRight,
} from "lucide-react";

interface NavItem {
  name: string;
  path: string;
  icon?: ReactElement | LucideIcon;
  permissions?: UserRole[];
  subMenu?: NavItem[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

type UserRole = "admin" | "user" | "guest";

type NavStructure = (NavGroup | NavItem)[];

const nav: NavStructure = [
  {
    title: "Menu",
    items: [
      {
        name: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
        permissions: ["admin", "user"],
      },
      {
        name: "Report",
        path: "/report",
        icon: FileText,
        permissions: ["admin", "user"],
      },
      {
        name: "Products",
        path: "/products",
        icon: PackageSearch,
        permissions: ["admin", "user"],
      },
    ],
  },
  {
    title: "Finanical",
    items: [
      {
        name: "transations",
        path: "/profile",
        icon: FileText,
        permissions: ["admin", "user"],
      },
      {
        name: "Settings",
        path: "/settings",
        icon: FileText,
        permissions: ["admin", "user"],
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        name: "Profile",
        path: "/profile",
        icon: FileText,
        permissions: ["admin", "user"],
      },
      {
        name: "Settings",
        path: "/settings",
        icon: FileText,
        permissions: ["admin", "user"],
      },
    ],
  },
  // You can also have items outside of groups
  {
    name: "Help",
    path: "/help",
    icon: FileText,
    permissions: ["admin", "user"],
  },
];

interface NavItemr {
  title: string;
  icon: React.ComponentType; // Use React.ComponentType to define an icon component
  path: string;
  permissions: string[];
  type?: "link" | "button"; // Optional type to distinguish between link and button if needed
}

const profileNav: NavItemr[] = [
  {
    title: "Profile",
    icon: User,
    path: "/profile",
    permissions: ["admin", "user"],
    type: "link",
  },
  {
    title: "Transactions",
    icon: ArrowLeftRight,
    path: "/profile",
    permissions: ["admin", "user"],
    type: "link",
  },
];

export default { nav, profileNav };
