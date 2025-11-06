"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeProvider";
import logo from "@/public/logo.png";
import profile from "@/public/profile.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    id: 1,
    text: "Home",
    link: "/",
  },
  {
    id: 2,
    text: "Stores",
    link: "/stores",
  },
  {
    id: 3,
    text: "Products",
    link: "/products",
  },
  {
    id: 4,
    text: "About",
    link: "/about",
  },
];

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [providers, setProviders] = useState(null);

  const { data: session } = useSession(); // Add this line

  const profileImage = session?.user?.image;

  const providerId =
    providers &&
    Object.values(providers).map((provider) => {
      provider.id;
    });

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      console.log(res);

      setProviders(res);
    };

    setAuthProviders();
  }, []);

  const toggleNavbar = () => {
    setOpenNavbar((openNavbar) => !openNavbar);
  };
  const closeNavbar = () => {
    setOpenNavbar(false);
  };
  return (
    <>
      <div
        onClick={() => {
          closeNavbar();
        }}
        aria-hidden="true"
        className={`fixed bg-gray-800/40 inset-0 z-30 ${
          openNavbar ? "flex lg:hidden" : "hidden"
        }`}
        data-oid="_j6l0ac"
      />

      <header
        className="absolute inset-x-0 top-0 h-20 flex items-center z-50"
        data-oid="j-uxl0j"
      >
        <div
          className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 relative z-50"
          data-oid="rkx0bnt"
        >
          <nav
            className="flex items-center justify-between w-full relative"
            data-oid="zzp6fy0"
          >
            {/* Logo */}
            <div className="hidden lg:block bg-inherit" data-oid="3trlnkf">
              <Link
                href="/"
                className="flex items-center ml-3"
                data-oid="53tds2_"
              >
                <Image
                  className="h-10 w-auto dark:invert"
                  src={logo}
                  alt="Ohi!"
                  data-oid="gye.-x."
                />
              </Link>
            </div>

            {/* Navbar Links */}
            <div
              className={`
                          absolute top-10 px-5 sm:px-8 md:px-12 lg:z-auto
                          lg:px-0 lg:pt-0 lg:top-0 
                          bg-white dark:bg-gray-900 lg:dark:bg-transparent  rounded-xl border border-gray-200 
                          dark:border-gray-800 shadow-sm shadow-gray-100 dark:shadow-transparent  
                          lg:border-none lg:shadow-none lg:rounded-none lg:bg-transparent 
                          w-full lg:justify-between py-6 lg:py-0 lg:relative flex flex-col lg:flex-row transition-all duration-300 ease-linear origin-top
                          ${
                            openNavbar
                              ? ""
                              : "invisible opacity-20 translate-y-6 lg:visible lg:opacity-100 lg:translate-y-0"
                          }
                      `}
              data-oid="zao9rip"
            >
              <ul
                className="text-gray-700 dark:text-gray-100 w-full flex lg:items-center gap-y-4 lg:gap-x-8 flex-col lg:flex-row lg:w-full lg:justify-center"
                data-oid="adnk6.i"
              >
                {navItems.map((navItem, index) => (
                  <li key={navItem.text} data-oid="7zp.y:k">
                    <Link
                      href={navItem.link}
                      className="transition hover:text-emerald-500 ease-linear text-lg"
                      data-oid="b_ov3ga"
                    >
                      {navItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
              {!session ? (
                <div
                  className="lg:min-w-max flex flex-col lg:flex-row lg:items-center gap-4 mt-8 lg:mt-0 w-full sm:w-max"
                  data-oid="wo7c_po"
                >
                  <>
                    <Button
                      key={1}
                      onClick={() => signIn(providerId)}
                      // className='bg-emerald-400 text-black dark:text-white dark:bg-emerald-900'
                      variant="outline"
                      data-oid=":ob:rrm"
                    >
                      <FcGoogle className="h-5 w-5 mr-3" data-oid="w0-01yf" />
                      Login | Register
                    </Button>
                  </>
                </div>
              ) : (
                <div
                  className="lg:min-w-max flex flex-col lg:flex-row lg:items-center gap-4 mt-8 lg:mt-0 w-full sm:w-max"
                  data-oid="c80qyad"
                >
                  <Button
                    key={3}
                    onClick={() => signOut(providerId)}
                    data-oid="68yf9l_"
                  >
                    Logout
                    <FaArrowRightFromBracket
                      className="h-5 w-5 ml-3"
                      data-oid=":9t7ydr"
                    />
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                toggleNavbar();
              }}
              aria-label="toggle navbar"
              className="outline-none lg:hidden w-7 h-auto flex flex-col relative children:flex"
              data-oid="r2lb47r"
            >
              <span
                aria-hidden="true"
                className={`
                                  w-6 origin-left h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                                  ${
                                    openNavbar
                                      ? "rotate-[40deg] -translate-y-[0.350rem] scale-x-100"
                                      : " scale-x-75"
                                  }
                              `}
                data-oid="-e64q5m"
              />

              <span
                aria-hidden="true"
                className={`
                                  w-6 origin-center mt-1 h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                                  ${openNavbar ? "opacity-0 scale-x-0" : ""}
                              `}
                data-oid="u-7mhxa"
              />

              <span
                aria-hidden="true"
                className={`
                                  w-6 origin-left mt-1 h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                                  ${
                                    openNavbar
                                      ? "-rotate-[40deg] -translate-y-[0.150rem] scale-x-100"
                                      : "scale-x-50"
                                  }
                              `}
                data-oid="zq-3n6f"
              />
            </button>

            {/* Mobile Logo */}
            <div
              className="inline-flex relative lg:hidden bg-inherit"
              data-oid="gocjpxp"
            >
              <Link
                href="#"
                className="flex items-center gap-2"
                data-oid="gfrooh-"
              >
                <Image
                  className="h-10 w-auto dark:invert"
                  src={logo}
                  alt="Ohi!"
                  data-oid="1l1x-ai"
                />
              </Link>
            </div>

            <div
              className="flex ml-2 pl-2 border-l border-gray-100 dark:border-gray-800 min-w-max items-center gap-x-3"
              data-oid="2ald47f"
            >
              {/* <button className="outline-none flex relative text-gray-700 dark:text-gray-300 p-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dark:flex hidden">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                  </svg>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dark:hidden">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                  </svg>
                                  <span className="sr-only">switch theme</span>
                              </button> */}
              <ThemeToggle data-oid="s__6e-m" />
              {session && (
                <>
                  <DropdownMenu data-oid="dczz77_">
                    <DropdownMenuTrigger asChild data-oid="wrrs8wi">
                      <Avatar data-oid="wwqas39">
                        <AvatarImage
                          src={profileImage}
                          alt={profile}
                          data-oid="1pw1s1a"
                        />
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent data-oid="gx-3v2r">
                      <DropdownMenuLabel data-oid="sh0:hq_">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator data-oid="t3fcbc5" />
                      <DropdownMenuItem data-oid="yb0:6y9">
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="-wzq9:m">
                        Products
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="ilu:::l">
                        Purchases
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="zrlwkyw">
                        Messages
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
export default Navbar;
