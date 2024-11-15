import { Box, Home, Pencil, Cube } from "../../Icons";

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
    path: '/customer-order',
    text: 'Customer Orders',
    Icon: Pencil,
  },
  {
    path: '/delivery-order',
    text: 'Delivery Orders',
    Icon: Box,
  },
  {
    path: '/olap',
    text: 'Olap Cubes',
    Icon: Cube,
  },
]