import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4 mt-10">
      <div className="max-w-7xl mx-auto pl-6 pr-16 md:pl-10 md:pr-24 flex flex-col md:flex-row items-center md:justify-between gap-3">

        {/* LEFT: Copyright + License */}
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
          © {new Date().getFullYear()} DocMagic. |{" "}
          <Link
            href="https://github.com/Muneerali199/DocMagic/blob/main/LICENSE"
            className="hover:text-blue-600 dark:hover:text-white underline underline-offset-2"
          >
            MIT License
          </Link>
        </div>

        {/* CENTER: Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-800 dark:text-gray-200">
          <Link
            href="https://github.com/Muneerali199/DocMagic/tree/main/docs"
            className="hover:text-blue-600 dark:hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="https://github.com/Muneerali199/DocMagic/issues"
            className="hover:text-blue-600 dark:hover:text-white"
          >
            Issues
          </Link>
          <Link
            href="https://github.com/Muneerali199/DocMagic/graphs/contributors"
            className="hover:text-blue-600 dark:hover:text-white"
          >
            Contributions
          </Link>
          <Link
            href="https://github.com/Muneerali199/DocMagic/discussions"
            className="hover:text-blue-600 dark:hover:text-white"
          >
            Community
          </Link>
        </div>
      </div>
    </footer>
  );
}
