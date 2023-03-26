import React from "react";
import { Link } from "react-router-dom";

function UserDropdownMenu(props, { user, isAdmin }) {
  return (
    <ul className="user-dropdown-menu">
      <li className="user-dropdown-menu__item">
        <img src={user.profileImage} alt="User Profile" />
        <span>{user.name}</span>
        <i className="fas fa-angle-down"></i>
        <ul className="user-dropdown-menu__sub-menu">
          <li>
            <Link to="/profile">Profil</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to="/services">Meine Services</Link>
              </li>
              <li>
                <Link to="/appointments">Meine Termine</Link>
              </li>
            </>
          )}
          {!isAdmin && (
            <li>
              <Link to="/bookings">Meine Buchungen</Link>
            </li>
          )}
        </ul>
      </li>
    </ul>
  );
}

export default UserDropdownMenu;
