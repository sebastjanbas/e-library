"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Image from "next/image";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (previous < latest && latest > 200) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-200%" },
      }}
      animate={navHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: easeInOut }}
      className="fixed z-50 overflow-hidden flex left-1/2 -translate-x-1/2 px-6 py-3 justify-between items-center top-5 inset-0 h-fit rounded-full w-[90%] md:w-full md:max-w-2xl bg-neutral-100/80 backdrop-blur-lg"
    >
      <div className="p-0 m-0 h-auto">
        <Link href={"/"}>
          <Image src={"/logo.svg"} height={32} width={32} alt="Company logo" />
        </Link>
      </div>
      <div className="flex items-center gap-8 text-foreground">
        <Link href={"/pricing"} className="flex items-stretch">
          <span className="text-base tracking-wide font-semibold">Pricing</span>
        </Link>
        <Link href={"/sign-in"} className="flex items-stretch">
          <span className="text-base tracking-wide font-semibold">Log in</span>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
