import { ChartPie, Cube, Home, List, Sparkles, Stack } from "../../Icons";

export interface SidebarItemType {
  path: string;
  text: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const sidebarItemsList: SidebarItemType[] = [
  {
    path: '/',
    text: 'Dashboard',
    Icon: Home,
  },
  {
    path: '/testing',
    text: 'Testing',
    Icon: Sparkles,
  },
  {
    path: '/development',
    text: 'Development',
    Icon: ChartPie,
  },
  {
    path: '/designing',
    text: 'Designing',
    Icon: Cube,
  },
  {
    path: '/statistics',
    text: 'Statistics',
    Icon: List,
  },
  {
    path: '/courses',
    text: 'Courses',
    Icon: Stack,
  },
]