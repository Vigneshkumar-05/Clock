import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { RiTimerFill } from "react-icons/ri";
import { IoTimer } from "react-icons/io5";

type NavItemType = {
  icon: ReactElement;
  name: string;
  path: string;
  onClick: () => void;
};

const NavItem: React.FC<NavItemType> = ({ icon, name, path, onClick }) => {
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
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky bottom-0 min-w-lvw flex justify-center bg-black text-white">
      <div className="min-w-16 flex">
        <NavItem
          icon={<RiTimerFill className="size-8" />}
          name={"Stopwatch"}
          path={"/"}
          onClick={() => navigate("/")}
        />

        <NavItem
          icon={<IoTimer className="size-8" />}
          name={"Timers"}
          path={"/timer"}
          onClick={() => navigate("/timer")}
        />
      </div>
    </div>
  );
};

export default Navbar;
