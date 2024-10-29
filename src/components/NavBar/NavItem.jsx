import React from "react";
import { useLocation } from "react-router-dom";

function NavItem({ icon, name, path, onClick }) {
  const active = useLocation();

  return (
    <div
      onClick={onClick}
      className={`w-28 flex flex-col items-center justify-center cursor-pointer
          ${active.pathname === path && "text-yellow-300"} `}
    >
      {icon}
      <span className="text-sm">{name}</span>
    </div>
  );
}

export default NavItem;
