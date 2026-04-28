"use client";

import { useLocation, useNavigate } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./menubar";
import {
  BookOpenText,
  BriefcaseBusiness,
  GraduationCap,
  Home,
  Lightbulb,
  Mic2,
  ScrollText,
} from "lucide-react";

type NavItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

const topLevelItems: NavItem[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "Publications", path: "/publications", icon: ScrollText },
  { label: "Talks", path: "/talks", icon: Mic2 },
  { label: "Teaching", path: "/teaching", icon: GraduationCap },
  { label: "Projects", path: "/projects", icon: BriefcaseBusiness },
];

const researchItems: NavItem[] = [
  { label: "Research Intro", path: "/research-intro", icon: BookOpenText },
];

export default function AppMenuBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const triggerClass = (active: boolean) =>
    active
      ? "text-blue-700 bg-blue-50 data-[state=open]:bg-blue-100 data-[state=open]:text-blue-800"
      : "";

  return (
    <div className="fixed left-1/2 top-3 z-[1000] -translate-x-1/2 md:top-5">
      <Menubar className="mx-auto h-auto w-fit max-w-[calc(100vw-1.5rem)] justify-center overflow-x-auto rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg">
        {topLevelItems.map((item) => {
          const Icon = item.icon;

          return (
            <MenubarMenu key={item.path}>
              <MenubarTrigger
                className={`flex items-center gap-2 whitespace-nowrap ${triggerClass(isActive(item.path))}`}
                onClick={() => navigate(item.path)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </MenubarTrigger>
            </MenubarMenu>
          );
        })}

        <MenubarMenu>
          <MenubarTrigger
            className={`flex items-center gap-2 whitespace-nowrap ${triggerClass(
              researchItems.some((item) => isActive(item.path)),
            )}`}
          >
            <Lightbulb className="h-4 w-4" />
            Research
          </MenubarTrigger>
          <MenubarContent className="w-60">
            {researchItems.map((item) => {
              const Icon = item.icon;

              return (
                <MenubarItem
                  key={item.path}
                  className="flex items-center gap-2"
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </MenubarItem>
              );
            })}

            <MenubarSeparator />

            <MenubarSub>
              <MenubarSubTrigger>Quick Links</MenubarSubTrigger>
              <MenubarSubContent className="w-48">
                <MenubarItem className="flex items-center gap-2" onClick={() => navigate("/")}>
                  <Home className="h-4 w-4" />
                  Back to Home
                </MenubarItem>
                <MenubarItem
                  className="flex items-center gap-2"
                  onClick={() => navigate("/publications")}
                >
                  <ScrollText className="h-4 w-4" />
                  Latest Publications
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
