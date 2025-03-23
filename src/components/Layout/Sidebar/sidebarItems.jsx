import { Iconify } from "../../iconify/iconify";

const SideBarItems = [
  {
    text: "Dashboard",
    icon: <Iconify icon={"uiw:dashboard"} />,
    path: "/",
  },
  {
    text: "Projects",
    icon: <Iconify icon={"memory:apps"} />,
    path: "/projects",
  },
  {
    text: "Estimates",
    icon: <Iconify icon={"lucide-lab:dollar-sign-square"} />,
    path: "/estimates",
  },
];

export default SideBarItems;
