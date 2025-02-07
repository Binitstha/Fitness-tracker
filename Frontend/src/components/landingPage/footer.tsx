import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="text-2xl font-bold">
            <Image
              src="/logo.svg"
              alt="logo"
              height={150}
              width={150}
              className="dark:invert p-3"
            />
          </Link>
          <p className="mt-2 text-sm ">Your personal fitness companion</p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-8">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </nav>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm ">
          © {new Date().getFullYear()} MyFitPal. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="#">
            <Facebook size={20} />
          </Link>
          <Link href="#">
            <Twitter size={20} />
          </Link>
          <Link href="#">
            <Instagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
