import React, { memo } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { SidebarItemType } from '../../constants/items';

type SidebarItemProps = {
  item: SidebarItemType;
}

const SidebarItem: React.FC<SidebarItemProps> = memo(({ item }) => {
  const location = useLocation();
  const { Icon } = item;
  const isLocationCurrent = location.pathname === item.path;

  return (
    <Link
      to={item.path}
      className={`flex w-full gap-4 items-center justify-center h-[45px] rounded-lg ${isLocationCurrent && 'bg-[#C8BCF6]'}`}
    >
      <Icon />
    </Link>
  )
})

export default SidebarItem