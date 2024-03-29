import { useRecoilValue } from "recoil";
import { getUserDoneState } from "@/recoil/atoms";
import CustomerSidebar from "./customer-sidebar";
import { classnames } from "@/utils/classnames";
import AdminSidebar from "./admin-sidebar";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { useRecoilState } from "recoil";
import { userContext } from "@/context/supabase-context";

interface SidebarProps {
  sidebarIsOpen: boolean;
  className?: string;
}

export default function Sidebar({
  sidebarIsOpen,
  className = "hidden sm:flex fixed bottom-0 z-20 pt-[82px]",
}: SidebarProps) {
  const user = userContext();
  const isMounted = useIsMounted();
  const getUserDone = useRecoilValue(getUserDoneState);

  return (
    <aside
      className={classnames(
        "h-full flex-col justify-between overflow-y-auto bg-light-400  pt-16 text-dark-400  dark:bg-dark-300",
        sidebarIsOpen ? "sm:w-60 xl:w-[75px]" : "sm:w-[75px] xl:w-60 ",
        className,
      )}
    >
      {isMounted &&
        getUserDone &&
        (user?.user_type !== "alpha" ? (
          <CustomerSidebar
            sidebarIsOpen={sidebarIsOpen}
            classname={className}
          />
        ) : (
          <AdminSidebar sidebarIsOpen={sidebarIsOpen} classname={className} />
        ))}
    </aside>
  );
}
