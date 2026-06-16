import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpenText,
  BriefcaseBusiness,
  GraduationCap,
  Home,
  Mic2,
  ScrollText,
} from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ size?: number }>;
};

const menuItems: MenuItem[] = [
  { id: "home", label: "Home", path: "/", icon: Home },
  { id: "publications", label: "Publications", path: "/publications", icon: ScrollText },
  { id: "talks", label: "Talks", path: "/talks", icon: Mic2 },
  { id: "teaching", label: "Teaching", path: "/teaching", icon: GraduationCap },
  { id: "projects", label: "Projects", path: "/projects", icon: BriefcaseBusiness },
  { id: "research-intro", label: "Research", path: "/research-intro", icon: BookOpenText },
];

const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="menu-bar-pill"
      style={{
        position: "fixed",
        top: "14px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "fit-content",
        maxWidth: "calc(100vw - 16px)",
        backgroundColor: "rgba(248, 249, 251, 0.98)",
        border: "1px solid #d4d7dd",
        borderRadius: "14px",
        boxShadow: "0 8px 25px rgba(20, 24, 32, 0.14)",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        overflowX: "auto",
        backdropFilter: "blur(6px)",
      }}
    >
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: isActive ? "#d4d7dd" : "transparent",
              color: isActive ? "#2e5c8a" : "#5c6370",
              fontSize: "14px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "#f8f9fb";
                e.currentTarget.style.color = "#141820";
              }
            }}
            onMouseOut={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#5c6370";
              }
            }}
          >
            <Icon size={16} />
            <span className="menu-bar-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MenuBar;
