import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  BookOpenIcon,
  MailIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { JSX } from "react";

type MenuItemT = {
  name: string;
  to: string;
  icon: JSX.Element;
};
const menuItems: MenuItemT[] = [
  {
    name: "About",
    to: "#habout",
    icon: <HomeIcon className="inline-block w-14 h-14 mr-1" />,
  },
  {
    name: "Projects",
    to: "#haprojects",
    icon: <BriefcaseIcon className="inline-block w-14 h-14 mr-1" />,
  },
  {
    name: "Experience",
    to: "#haexperience",
    icon: <BookOpenIcon className="inline-block w-14 h-14 mr-1" />,
  },
  {
    name: "Contact",
    to: "#hacontact",
    icon: <MailIcon className="inline-block w-14 h-14 mr-1" />,
  },
];

export default function Navigation() {
  return (
    <NavigationMenu id="navigation">
      <NavigationMenuList>
        {menuItems.map((item, key) => (
          <NavigationMenuLink
            href={item.to}
            key={`${key}-${item.name}`}
            className="w-14 h-14 flex items-center justify-center  hover:text-red-500"
          >
            {item.icon}
          </NavigationMenuLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
