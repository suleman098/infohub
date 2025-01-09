"use client";

import { usePathname } from "next/navigation";

// Define valid routes
const validRoutes = [
  "/",
  "/login",
  "/signup",
  "/foryou",
  "/search",
  "/userdetails",
];

export default function RouteGuard({ children }) {
  const pathname = usePathname();


  if (!validRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
}
