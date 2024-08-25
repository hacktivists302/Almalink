import { sideLinks } from "../utility/utility";
import { Link } from "react-router-dom";
import cross from "../assets/Cross.svg";
import bars from "../assets/Left.svg";
import { useState } from "react";

export function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`bg-slate-900 fixed z-50 top-0 left-0 h-screen flex-shrink-0 ${
        isCollapsed ? "w-20" : "w-72"
      } overflow-hidden transition-all  duration-300`}
    >
      <img
        className={`absolute top-4 ${
          isCollapsed ? "right-5" : "right-4"
        } z-10 cursor-pointer`}
        onClick={() => setIsCollapsed(!isCollapsed)}
        src={isCollapsed ? bars : cross}
        alt="Toggle Icon"
        width={30}
        height={30}
      />
      <div className="flex flex-col h-full justify-center items-center">
        <div className="flex flex-col w-11/12 gap-10 items-start">
          {sideLinks.map((nav, index) => (
            <NavigateButton
              key={index}
              isCollapsed={isCollapsed}
              title={nav.title}
              icon={nav.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NavigateButton({ title, icon, isCollapsed }) {
  return (
    <div
      className={` flex ${
        isCollapsed ? "justify-center" : "items-center gap-10 justify-start"
      } w-full hover:bg-slate-700 rounded-lg p-2 text-slate-200`}
    >
      <Link to={`/user/${title}`} >
      <img
        src={icon}
        alt={`${title} icon`}
        width={25}
        height={25}
        className={`${!isCollapsed ? "mr-2" : ""}`}
        />
        </Link>
      {!isCollapsed && (
        <Link
          className="flex-1 text-left text-2xl font-medium"
          to={`/user/${title}`}
        >
          {title}
        </Link>
      )}
    </div>
  );
}
