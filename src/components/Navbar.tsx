"use client";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import { Button } from "./ui/button";
import { NavigationMenuDemo } from "./ui/NavigationMenu";
import { motion } from "framer-motion";
import Link from "next/link";
const Navbar = () => {
  const logo = "/images/trackerr.png";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <motion.nav
    //   className={`sticky top-0 flex items-center justify-between p-5   ${
    //     scrolled ? " border rounded-lg bg-white  " : "bg-transparent"
    //   }`}
    //   initial={{ y: -100 }}
    //   animate={{ y: 0 }}
    //   transition={{ duration: 1 }}
    // >

    <motion.nav
      className="sticky top-0 flex items-center justify-between p-5 bg-white "
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="nav-left flex items-center justify-center gap-2">
        <Image src={logo} width={35} height={35} alt="logo" />
        <p className="font-bold text-2xl">trackr</p>
        <NavigationMenuDemo />
      </div>
      <div className="nav-right flex items-center justify-between gap-3">
        <Link href="/sign-in">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="default">Get Started</Button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
