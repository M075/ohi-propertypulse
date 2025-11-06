import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <section
      className="bg-emerald-50 dark:bg-black min-h-screen flex-grow"
      data-oid="r72vi_8"
    >
      <div className="container m-auto max-w-2xl py-24" data-oid="erks4s7">
        <div
          className="bg-white dark:bg-zinc-950 px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0"
          data-oid="8ta_h0s"
        >
          <div className="flex justify-center" data-oid="s0fzse4">
            <FaExclamationTriangle
              className="text-yellow-400 text-8xl fa-5x"
              data-oid="vh9wbcf"
            />
          </div>
          <div className="text-center" data-oid="pl4ba4d">
            <h1
              className="text-3xl font-bold mt-4 mb-2 dark:text-foreground"
              data-oid="ftbgon7"
            >
              Page Not Found
            </h1>
            <p className="text-xl mb-10" data-oid="w0lf7a_">
              The page you are looking for does not exist.
            </p>
            <Link
              href="/"
              className="bg-emerald-500 hover:bg-emerald-800 text-white  py-4 px-6 rounded-full"
              data-oid="ezfrcn1"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow" data-oid="2mj2vnu"></div>
    </section>
  );
};
export default NotFoundPage;
