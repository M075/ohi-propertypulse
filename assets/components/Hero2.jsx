"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeroSection() {
  return (
    <>
      <section className="relative w-full py-14" data-oid="ojxzx24">
        <div
          className="absolute top-0 inset-x-0 h-64 flex items-start"
          data-oid="ef2.ell"
        >
          <div
            className="h-24 w-2/3 bg-gradient-to-br from-emerald-500 opacity-20 blur-2xl dark:from-emerald-500 dark:invisible dark:opacity-40"
            data-oid="bjik9br"
          ></div>
          <div
            className="h-20 w-3/5 bg-gradient-to-r from-emerald-500 opacity-40 blur-2xl dark:from-emerald-500 dark:opacity-40"
            data-oid="m4g0puw"
          ></div>
        </div>
        <div
          className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 relative"
          data-oid="t82.04_"
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 w-44 left-0 hidden dark:flex"
            data-oid="a-d5an0"
          >
            <div
              className="h-full md:h-1/2 lg:h-full w-full bg-gradient-to-tr opacity-40 dark:blur-2xl dark:from-emerald-500 dark:opacity-20"
              data-oid="-87xww-"
            ></div>
          </div>
          <div
            className="grid lg:grid-cols-2 gap-10 xl:gap-14 relative pt-24 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto"
            data-oid="_pygs-v"
          >
            <div className="lg:py-6" data-oid="0f:hkz5">
              <div className="text-center lg:text-left" data-oid="86j.on2">
                <span
                  className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  data-oid=":zn45gk"
                >
                  New season available{" "}
                  <Link
                    href="#"
                    className="underline text-emerald-700 dark:text-white font-semibold"
                    data-oid="bnu3pu6"
                  >
                    here
                  </Link>
                </span>
                <h1
                  className="text-gray-800 pt-4 dark:text-white font-bold text-4xl md:text-5xl lg:text-6xl"
                  data-oid="8f6:42r"
                >
                  Find and listen <br data-oid="p13y-nj" /> Favorite
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-[#8cd66a]"
                    data-oid="m90jb82"
                  >
                    Podcast
                  </span>
                  on internet
                </h1>
              </div>
              <p
                className="text-gray-600 dark:text-gray-300 mt-8 text-center lg:text-left mx-auto max-w-xl"
                data-oid="rn8xdd5"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                beatae omnis ipsa magnam neque ut nam nesciunt esse fugit
                praesentium hic magni possimus illo consequatur.
              </p>
              <div
                className="flex items-center gap-4 mt-8 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0"
                data-oid="az4-h2m"
              >
                <Link
                  href="#"
                  className="px-7 relative text-white h-12 flex w-full sm:w-max justify-center items-center before:bg-emerald-500 before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95"
                  data-oid="t7v3t9c"
                >
                  <span className="relative text-white" data-oid="fbzn0w9">
                    {" "}
                    Join Us
                  </span>
                </Link>
                <Link
                  href="#"
                  className="px-7 relative text-emerald-500 h-12 flex w-full sm:w-max justify-center items-center before:bg-emerald-500/5 dark:before:bg-emerald-500/10 before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95"
                  data-oid="s5_f7_8"
                >
                  <span
                    className="relative text-emerald-500 flex items-center gap-x-3"
                    data-oid="y34lzwr"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3 h-3"
                      data-oid="eh5oaob"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                        data-oid="pg78slp"
                      />
                    </svg>
                    Listening Episode
                  </span>
                </Link>
              </div>

              {/* Avatars and worldwide listeners */}
              {/* <div className="flex items-center text-center flex-col sm:flex-row gap-4 sm:gap-0 mt-8 w-max mx-auto lg:mx-0">
                      <div className="flex items-center -space-x-2">
                          <Image src="/images/sidebiew.webp" height={900} width={1240} alt="avatar" className="w-10 h-10 rounded-full ring-4 ring-white dark:ring-gray-950 object-cover" />
                          <Image src="/images/sidebiew.webp" height={900} width={1240} alt="avatar" className="w-10 h-10 rounded-full ring-4 ring-white dark:ring-gray-950 object-cover" />
                          <Image src="/images/sidebiew.webp" height={900} width={1240} alt="avatar" className="w-10 h-10 rounded-full ring-4 ring-white dark:ring-gray-950 object-cover" />
                          <Image src="/images/sidebiew.webp" height={900} width={1240} alt="avatar" className="w-10 h-10 rounded-full ring-4 ring-white dark:ring-gray-950 object-cover" />
                          <span className="w-10 h-10 rounded-full ring-4 ring-white dark:ring-gray-950 bg-gray-200 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 flex items-center justify-center">
                              300+
                          </span>
                      </div>
                      <span className="pl-2 text-gray-600 dark:text-gray-200"> WordWide listners </span>
                   </div> */}
            </div>

            {/* Images on right */}
            <div className="lg:h-full hidden md:flex" data-oid="ixqgby2">
              <div
                className="flex w-full h-96 min-h-[24rem] lg:min-h-[none] lg:w-full lg:h-full items-center relative"
                data-oid="6yqkwql"
              >
                <div
                  className="absolute z-0 top-1/2 -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-25 from-emerald-500 to-pink-300 dark:from-[#570cac] dark:to-emerald-500 blur-2xl"
                  data-oid="v_yoclv"
                ></div>
                <div
                  className="absolute w-3/5 h-full z-10 p-1 -translate-y-1/2 top-1/2 right-3 rounded-3xl bg-whitee dark:bg-gray-950  shadow-lg shadow-gray-100 dark:shadow-transparent  border border-gray-200 dark:border-gray-800"
                  data-oid="43y6ne7"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="In studio"
                    width={900}
                    height={900}
                    loading="lazy"
                    className="w-full h-full rounded-2xl object-cover objet-left"
                    data-oid="ul286bg"
                  />
                </div>
                <div
                  className="absolute -translate-y-1/2 top-1/2 h-[calc(80%-2rem)] w-[calc(40%-20px)] p-1 rounded-3xl bg-white dark:bg-gray-950  shadow-lg shadow-gray-100 dark:shadow-transparent  border border-gray-200 dark:border-gray-800"
                  data-oid="yys_hi5"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1633878353683-c621100b29a4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Happy in studio"
                    width={900}
                    height={900}
                    loading="lazy"
                    className="w-full h-full rounded-2xl object-cover object-right"
                    data-oid=":2emqyl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
