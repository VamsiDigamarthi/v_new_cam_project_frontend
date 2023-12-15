import React from "react";
import "./Sidebar.css";
import { SiPowerautomate } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { LiaSuperpowers } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout } from "../../action/AuthAction";
import { useDispatch } from "react-redux";

export const Sidebar = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathValue = location.pathname;

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="sidebar__main">
      {pathValue !== "/login" && (
        <section className="sidebar__left__side">
          <SiPowerautomate size={30} color="#ff6f00" />
          <Link to="/">
            <IoHome size={20} color="white" />
          </Link>
          <Link to="/super-admin">
            <MdAdminPanelSettings size={20} color="white" />
          </Link>
          <Link to="/admin">
            <LiaSuperpowers size={20} color="white" />
          </Link>
          <div className="side_bar_logout_icon" onClick={handleLogOut}>
            <RiLogoutCircleLine size={30} />
          </div>
        </section>
      )}

      <main className="sidebar__right__side">{children}</main>
    </div>
  );
};
