"use client";

import React, { useState } from "react";
import LHSLogo from "./LHSLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

// Define our navigation items centrally for DRY code
interface NavItemConfig {
  label: string;
  href: string;
  color: string;
}

const navigationItems: NavItemConfig[] = [
  { label: "Ventas", href: "/ventas", color: "navGreen" },
  // { label: "Alquiler", href: "/alquiler", color: "navBlue" }, // Commented out for now
  { label: "Contacto", href: "/contacto", color: "navRed" },
];

const NavItem: React.FC<NavItemConfig & { isActive: boolean }> = ({
  label,
  href,
  color,
  isActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the color class based on the color name
  const getColorClass = (colorName: string) => {
    switch (colorName) {
      case 'navGreen':
        return 'border-navGreen text-navGreen';
      case 'navRed':
        return 'border-navRed text-navRed';
      case 'navBlue':
        return 'border-navBlue text-navBlue';
      default:
        return 'border-black dark:border-white';
    }
  };
  
  const colorClass = getColorClass(color);
  const [borderClass, textClass] = colorClass.split(' ');
  
  return (
    <Link href={href}>
      <div
        className={`transition-all duration-300 cursor-pointer text-xl pt-4 border-b-4 
          ${isActive ? `${borderClass} ${textClass}` : isHovered ? borderClass : 'border-transparent'}
          ${isActive ? '' : 'hover:text-black dark:text-beigh dark:hover:text-white'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {label}
      </div>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full px-6 py-2 bg-white dark:bg-macbookGreyLight shadow-md transition-colors duration-300">
      <div className="flex justify-between items-center max-w-[1400px] mx-auto">
        <LHSLogo title="LHS" concept="Concept" />
        <div className="block sm:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <X className="w-6 h-6 dark:text-white" /> : <Menu className="w-6 h-6 dark:text-white" />}
          </button>
        </div>
        <div
          id="nav-content"
          className={`flex-col sm:flex-row sm:flex space-x-6 items-center text-gray-700 dark:text-gray-300 -md ${isOpen ? "flex" : "hidden"} sm:flex text-right`}
        >
          {navigationItems.map((item) => (
            <NavItem 
              key={item.href} 
              {...item} 
              isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)} 
            />
          ))}
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
