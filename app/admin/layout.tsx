"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useModalAction } from "@/components/modals/modal-controller";
import { UserStateType } from "@/types";
import { useRecoilValue } from "recoil";
import { userState } from "@/recoil/atoms";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const user = useRecoilValue<UserStateType | null>(userState);
  const { openModal } = useModalAction();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
      openModal("AUTHFORM");
    } else if (user.user_type !== "alpha") {
      router.push("/");
    }
  }, [user]);

  return <>{user && user.user_type == "alpha" && children}</>;
}
