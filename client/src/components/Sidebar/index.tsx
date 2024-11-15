import { useEffect, useMemo, useState } from "react"
import { Search } from "../Icons";
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
    <div className="h-screen w-[320px] flex p-6 gap-8 flex-col">
      <p className="text-3xl font-bold">
        VL
      </p>
      <div className="flex w-full gap-4 items-center h-[55px] p-[16px] rounded-2xl bg-[#F5F5F5]">
        <Search />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="flex flex-col gap-4">
        {linksItems}
      </div>
    </div>
  )
}

export default Sidebar