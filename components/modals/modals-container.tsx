import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
// import { useModalAction, useModalState } from "./modal-controller";
import { useEffect, Fragment } from "react";
import { usePathname } from "next/navigation";
import { CloseIcon } from "../icons/close-icon";
import dynamic from "next/dynamic";
import { useModalState } from "./modal-controller";
import { useModalAction } from "./modal-controller";
import AddProductForm from "../product/add-product-form";
import EditProductForm from "../product/edit-product-form";
import DeleteProductForm from "../product/delete-product-form";
import ProductViewModal from "../product/product-view-modal";
import { ProductType } from "@/types";
import AddArtistForm from "../music/add-artist-form";

const AuthForm = dynamic(() => import("@/components/auth/auth-form"));

// type ModalToggleProps = "open" | "close";
// interface ModalContainerProps {
//   modalIsOpen?: boolean;
//   modalToggle: (action: ModalToggleProps) => void;
// }

function renderModalContent(
  view: string,
  data: {
    productType: ProductType;
    productSubType: string;
    album?: { name: string; id: string, cover: string };
    artist?: { name: string; id: string };
    action?: {
      onSuccess?: () => any;
      onFailure?: () => any;
    };
  },
) {
  switch (view) {
    case "AUTHFORM":
      return <AuthForm />;
      break;
    case "ADDPRODUCTFORM":
      return <AddProductForm data={data} />;
      break;
    case "EDITPRODUCTFORM":
      return <EditProductForm />;
      break;
    case "DELETEPRODUCTFORM":
      return <DeleteProductForm />;
      break;
    case "PRODUCTVIEWMODAL":
      return <ProductViewModal />;
      break;
    case "ADDARTISTFORM":
      return <AddArtistForm onSuccess={data.action?.onSuccess} />;
      break;
  }
}

export function ModalContainer() {
  const router = useRouter();

  const { view, isOpen, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden xs:p-4"
        onClose={() => closeModal()}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-dark bg-opacity-60 backdrop-blur dark:bg-opacity-80" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-110"
          >
            <div className="relative z-50 inline-block min-h-screen w-full transform overflow-hidden p-4 text-start align-middle transition-all xs:min-h-[auto] xs:w-auto xs:p-0">
              <div className="relative flex min-h-screen items-center overflow-hidden rounded-md xs:block xs:min-h-[auto]">
                <button
                  onClick={() => closeModal()}
                  aria-label="Close panel"
                  className="absolute right-4 top-5 z-10 text-dark-900 outline-none transition-all hover:text-dark focus-visible:outline-none  dark:text-dark-800 hover:dark:text-light-200 md:right-5 md:top-6 lg:right-7 lg:top-7 
																		"
                >
                  <CloseIcon className="h-4 w-4 focus-visible:outline-none lg:h-[18px] lg:w-[18px] 3xl:h-5 3xl:w-5" />
                </button>
                <div className="h-full w-full">
                  {view && renderModalContent(view, data)}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
