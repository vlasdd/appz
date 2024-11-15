import { useEffect, useMemo, useState } from "react"
import SidebarItem from "./components/SidebarItem"
import { sidebarItemsList, SidebarItemType } from "./constants/items"

const Sidebar = () => {
  const [currentSidebarItems, setCurrentSidebarItems] = useState<SidebarItemType[]>(sidebarItemsList);
  const [searchValue, setSearchValue] = useState<string>('');
  const linksItems = useMemo(() => currentSidebarItems.map((item) => (
    <SidebarItem
      key={item.text}
      item={item}
    />
  )), [currentSidebarItems]);

  useEffect(() => {
    if(searchValue === '') {
      setCurrentSidebarItems(sidebarItemsList);
      return;
    }
    const filteredSidebarItems = sidebarItemsList.filter((item) => (
      item.text.toLowerCase().includes(searchValue.toLowerCase())
    ));
    setCurrentSidebarItems(filteredSidebarItems)
  }, [searchValue])

  return (
    <div className="h-screen min-w-[75px] max-w-[75px] flex p-4 gap-8 flex-col pt-16">
      <div className="flex flex-col gap-4">
        {linksItems}
      </div>
    </div>
  )
}

export default Sidebar