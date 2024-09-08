import {
  LucideIcon,
  LayoutDashboard,
  FileText,
  Package,
  Users,
  ArrowLeftRight,
  Settings,
  MessageSquare,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export type NavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
  category: "Menu" | "Financial" | "Tools";
  subMenu?: NavLink[];
};

export const navLinks: NavLink[] = [
  {
    name: "Folkekraft",
    href: "/dashboard/folkekraft",
    icon: LayoutDashboard,
    category: "Menu",
  },
  {
    name: "Transaksjoner",
    href: "/dashboard/transactions",
    icon: LayoutDashboard,
    category: "Financial",
  },
];

export const adminNavLinks: NavLink[] = [
  {
    name: "Caplist",
    href: "/dashboard",
    icon: LayoutDashboard,
    category: "Menu",
  },
  {
    name: "Pools & Programs",
    href: "/dashboard/report",
    icon: FileText,
    category: "Menu",
  },
  {
    name: "Incentive agreements",
    href: "/dashboard/products",
    icon: Package,
    category: "Menu",
  },
  {
    name: "Exercising options",
    href: "/dashboard/customer",
    icon: Users,
    category: "Menu",
  },
  {
    name: "Valuation",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
    category: "Financial",
  },
  {
    name: "Stakeholder",
    href: "/admin/stakeholders",
    icon: FileText,
    category: "Financial",
  },
  {
    name: "Documents",
    href: "/dashboard/settings",
    icon: Settings,
    category: "Tools",
  },
  {
    name: "Feedback",
    href: "/dashboard/feedback",
    icon: MessageSquare,
    category: "Tools",
  },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: HelpCircle,
    category: "Tools",
  },
];

/*
export const navLinks: NavLink[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    category: "Menu",
    subMenu: [
      {
        name: "Admin",
        href: "/dashboard/admin",
        icon: LayoutDashboard,
        category: "Menu",
      },
    ],
  },
  {
    name: "Report",
    href: "/dashboard/report",
    icon: FileText,
    category: "Menu",
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: Package,
    category: "Menu",
  },
  {
    name: "Customers",
    href: "/dashboard/customer",
    icon: Users,
    category: "Menu",
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
    category: "Financial",
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: FileText,
    category: "Financial",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    category: "Tools",
  },
  {
    name: "Feedback",
    href: "/dashboard/feedback",
    icon: MessageSquare,
    category: "Tools",
  },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: HelpCircle,
    category: "Tools",
  },
];
*/
