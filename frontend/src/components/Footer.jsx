import { AiOutlineLinkedin } from "react-icons/ai";
import { FaInstagram, FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";

const navigation = [
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <AiOutlineLinkedin className="text-2xl text-white hover:text-indigo-700" />
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: <FaInstagram className="text-2xl text-white hover:text-indigo-700" />,
  },
  {
    name: "Twitter",
    href: "#",
    icon: <FaTwitter className="text-2xl text-white hover:text-indigo-700" />,
  },
  {
    name: "GitHub",
    href: "#",
    icon: <FaGithub className="text-2xl text-white hover:text-indigo-700" />,
  },
  {
    name: "YouTube",
    href: "#",
    icon: <FaYoutube className="text-2xl text-white hover:text-indigo-700" />,
  },
];

export default function Example() {
  return (
    <footer className="bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center leading-5 text-white text-sm">
            &copy; 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
