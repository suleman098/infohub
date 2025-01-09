"use client";

import {
  FaSignInAlt,
  FaSignOutAlt,
  FaSearch,
  FaUser,
  FaHome,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useAppContext } from "../context/AppContext";
import Navbutton from "./Navbutton";
import RouteGuard from "./RouteGuard";

function Navbar() {
  const { user } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  // Guard clause to hide Navbar on specific routes
  if (pathname === "/notfound") {
    return null;
  }

  const handleLoginClick = () => {
    router.push("/pages/login");
  };

  const handleLogoutClick = () => {
    signOut(auth).catch((error) => {
      console.error("Error logging out:", error.message);
    });
  };

  const handleSearchClick = () => {
    router.push("/pages/search");
  };

  const handleForyouPageClick = () => {
    router.push("/pages/foryou");
  };

  const handleUserDetailsClick = () => {
    router.push("/pages/userdetails");
  };

  return (
    <RouteGuard>

    <div className="navbar bg-white border-2 border-gray-300 rounded-xl shadow-md w-full px-4">
      <div className="navbar-center flex justify-between w-full">
        <a className="btn btn-ghost text-black text-xl">Info Hub</a>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Navbutton onClick={handleSearchClick}>
                <FaSearch />
              </Navbutton>
              <Navbutton onClick={handleForyouPageClick}>
                <FaHome />
              </Navbutton>
              <Navbutton onClick={handleUserDetailsClick}>
                <FaUser />
              </Navbutton>
              <Navbutton onClick={handleLogoutClick}>
                <FaSignOutAlt />
              </Navbutton>
            </>
          ) : (
            <Navbutton onClick={handleLoginClick}>
              <FaSignInAlt />
            </Navbutton>
          )}
        </div>
      </div>
    </div>
   </RouteGuard>
  );
}

export default Navbar;
