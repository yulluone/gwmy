import NavLink from "@/components/ui/nav-link";
import { DashboardIcon } from "../icons/dashboard-icon";
import { MyShopIcon } from "../icons/myshop-icon";
import { SettingsIcon } from "../icons/settings-icon";
import { HelpIcon } from "../icons/help-icon";
import { OrdersIcon } from "../icons/orders-icon";
import { ProductsIcon } from "../icons/products";
import { EventsIcon } from "../icons/events-icon";
import { MusicIcon } from "../ui/music-icon";

interface SidebarProps {
  sidebarIsOpen: boolean;
  classname?: string;
}

export default function AdminSidebar({
  sidebarIsOpen,
  classname,
}: SidebarProps) {
  return (
    <div className="flex h-full w-full flex-col">
      <nav className="flex flex-col">
        {/* <NavLink
          title="My Shop"
          href="/"
          sidebarIsOpen={sidebarIsOpen}
          icon={<MyShopIcon className="h-6 w-6 text-current" />}
        /> */}
        {/* <NavLink
          title="Dashboard"
          href="/admin/dashboard"
          sidebarIsOpen={sidebarIsOpen}
          icon={<DashboardIcon className="h-6 w-6 text-current" />}
        />
        <NavLink
          title="Orders"
          href="/admin/orders"
          sidebarIsOpen={sidebarIsOpen}
          icon={<OrdersIcon className="h-6 w-6 text-current" />}
        /> */}
        <NavLink
          title="My Music"
          href="/admin/my-music"
          sidebarIsOpen={sidebarIsOpen}
          icon={<MusicIcon className="h-6 w-6 text-current" />}
        />
        <NavLink
          title="My Products"
          href="/admin/my-products"
          sidebarIsOpen={sidebarIsOpen}
          icon={<ProductsIcon className="h-6 w-6 text-current" />}
        />
        <NavLink
          title="My Events"
          href="/admin/my-events"
          sidebarIsOpen={sidebarIsOpen}
          icon={<EventsIcon className="h-6 w-6 fill-inherit text-current " />}
        />
      </nav>

      <nav className="mt-auto flex flex-col pb-4">
        <NavLink
          title="Settings"
          href="/settings"
          sidebarIsOpen={sidebarIsOpen}
          icon={<SettingsIcon className="h-6 w-6 text-current" />}
        />
        <NavLink
          title="Help"
          href="/help"
          sidebarIsOpen={sidebarIsOpen}
          icon={<HelpIcon className="h-6 w-6 text-current" />}
        />
      </nav>
    </div>
  );
}
