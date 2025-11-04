"use client";

import { Button } from "../ui";
import { Logo, BurgerMenu, Close } from "../icons";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Full Viewport Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        className={`sticky top-0 z-50 backdrop-blur-2xl ${
          isMenuOpen ? "bg-white" : "bg-white/80"
        }`}
      >
        <div className="container-lg py-4 px-5 md:py-6 md:px-10">
          <div className="flex items-center justify-between gap-16">
            <Link href="/" className="shrink-0">
              {/* Mobile Logo */}
              <div className="md:hidden">
                <Logo width={66} height={24} />
              </div>
              {/* Desktop Logo */}
              <div className="hidden md:block">
                <Logo width={110} height={40} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-4 md:gap-8">
                <li>
                  <Link href="/" className="font-medium text-(--text-strong)">
                    Personal Injury
                  </Link>
                </li>
                <li>
                  <Link href="/" className="font-medium text-(--text-strong)">
                    Pre-Litigation
                  </Link>
                </li>
                <li>
                  <Link href="/" className="font-medium text-(--text-strong)">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/" className="font-medium text-(--text-strong)">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>

            <Button className="hidden md:block">Schedule a Call</Button>

            {/* Mobile Menu Button */}
            <AnimatePresence mode="wait">
              <motion.button
                key={isMenuOpen ? "close" : "burger"}
                className="md:hidden flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <Close /> : <BurgerMenu />}
              </motion.button>
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Outside Header */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="fixed top-[56px] left-0 right-0 bottom-0 md:hidden bg-white backdrop-blur-2xl overflow-hidden z-40  flex flex-col justify-between h-[calc(100vh-56px)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-lg py-6 px-5 w-full">
              <ul className="flex flex-col gap-8">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  <Link
                    href="/"
                    className="font-medium text-2xl text-(--text-strong)"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Personal Injury
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  <Link
                    href="/"
                    className="font-medium text-2xl text-(--text-strong)"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pre-Litigation
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                >
                  <Link
                    href="/"
                    className="font-medium text-2xl text-(--text-strong)"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Careers
                  </Link>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <Link
                    href="/"
                    className="font-medium text-2xl text-(--text-strong)"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </motion.li>
                <motion.li
                  className="pt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: 0.25 }}
                >
                  <Button onClick={() => setIsMenuOpen(false)}>
                    Schedule a Call
                  </Button>
                </motion.li>
              </ul>
            </div>
            <ul className="container-lg w-[calc(100%-48px)] flex mb-8">
              <li className="grow leading-tight font-medium text-(--text-soft) cursor-pointer">
                Facebook
              </li>
              <li className="grow leading-tight font-medium text-(--text-soft) cursor-pointer">
                Instagram
              </li>
              <li className="grow leading-tight font-medium text-(--text-soft) cursor-pointer">
                Tiktok
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
