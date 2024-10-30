import React from "react";
import { useNavigate } from "react-router-dom";
import { RiTimerFill } from "react-icons/ri";
import { IoTimer } from "react-icons/io5";

import NavItem from "./NavItem";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="sticky bottom-0 min-w-lvw flex justify-center bg-black text-white">
            <div className="min-w-16 flex">
                <NavItem
                    icon={<RiTimerFill className="size-8" />}
                    name={"Stopwatch"}
                    path={"/"}
                    onClick={() => navigate("/")}
                ></NavItem>
                <NavItem
                    icon={<IoTimer className="size-8" />}
                    name={"Timers"}
                    path={"/timer"}
                    onClick={() => navigate("/timer")}
                ></NavItem>
            </div>
        </div>
    );
}

export default Navbar;
