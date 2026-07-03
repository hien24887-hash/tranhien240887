import { NavLink } from "react-router-dom";
import RewardBadge from "../mascot/RewardBadge";

const links = [
  { to: "/", label: "Trang chủ", end: true },
  { to: "/rules", label: "Quy tắc đọc" },
  { to: "/transcribe", label: "Viết phiên âm" },
  { to: "/read", label: "Đọc truyện" },
  { to: "/danhvantienganh", label: "Luyện đọc 50 ngày" },
  { to: "/wardrobe", label: "Tủ đồ" },
];

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        🔤 Luyện Phiên Âm IPA
      </NavLink>
      <div className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <RewardBadge />
    </nav>
  );
}
