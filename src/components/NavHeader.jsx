import React from "react";
import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <div class="navbar bg-base-100">
      <div class="navbar-start my-2">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 p-z shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Globe</a>
            </li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Favorites</a>
            </li>
            <li>
              <a>Media Library</a>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-4xl">Planetarium</a>
      </div>
      <div class="navbar-end">
        <ul>
          <li>
            <Link className="btn btn-ghost normal-case">Globe</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavHeader;
