import { Iconify } from "../components/iconify/iconify";
import DashboardView from "../sections/dashboard/view/dashboard-view";

import EstimateCreateView from "../sections/estimates/view/estimate-create-view";
import EstimateEditView from "../sections/estimates/view/estimate-edit-view";
import EstimatesView from "../sections/estimates/view/estimates-view";
import ForgetView from "../sections/Forget/view/forget-view";
import LoginView from "../sections/login/view/login-view";
import ProjectCreateView from "../sections/project/view/project-create-view";
import ProjectEditView from "../sections/project/view/project-edit-view";
import ProjectsView from "../sections/project/view/project-view";
import RegisterView from "../sections/Register/view/register-view";

const publicRoutes = [
  { path: "/auth/login", element: <LoginView /> },
  { path: "/auth/register", element: <RegisterView /> },
  { path: "/auth/forgot-password", element: <ForgetView /> },
];

const privateRoutes = [
  {
    text: "Dashboard",
    icon: <Iconify icon={"radix-icons:dashboard"} />,
    path: "/",
    component: <DashboardView />,
  },
  {
    text: "Projects",
    icon: <Iconify icon={"si:projects-alt-duotone"} />,
    path: "/projects",
    component: <ProjectsView />,
  },
  {
    text: "Projects",
    icon: <Iconify icon={"si:projects-alt-duotone"} />,
    path: "/projects/create",
    component: <ProjectCreateView />,
  },
  {
    text: "Projects",
    icon: <Iconify icon={"si:projects-alt-duotone"} />,
    path: "/projects/:id",
    component: <ProjectEditView />,
  },
  {
    text: "Estimates",
    icon: <Iconify icon={"hugeicons:estimate-01"} />,
    path: "/estimates",
    component: <EstimatesView />,
  },
  {
    text: "Estimates",
    icon: "",
    path: "/estimates/create",
    component: <EstimateCreateView />,
  },
  {
    text: "Estimates",
    icon: "",
    path: "/estimates/:id",
    component: <EstimateEditView />,
  },
];

export { publicRoutes, privateRoutes };
