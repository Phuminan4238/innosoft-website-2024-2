// NavItem.js
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavItem = ({ href, isActive, children }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a className={`block py-2 px-3 md:p-0 rounded ${isActive(href)}`}>
        {children}
      </a>
    </Link>
  );
};

export default NavItem;
