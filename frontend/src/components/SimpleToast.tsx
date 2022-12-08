import { MdClose } from "react-icons/md";

interface ISimpleToastProps {
  text: string;
  type: "warn" | "error" | "success";
  handleClose: () => void;
}

export function SimpleToast({ text, type, handleClose }: ISimpleToastProps) {
  function setToastBackgroundColor() {
    switch (type) {
      case "error":
        return "bg-red-500";

      case "success":
        return "bg-green-500";

      case "warn":
        return "bg-yellow-500";
    }
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto rounded-md fixed right-8 top-8 z-50 outline-none drop-shadow-lg">
      <div
        className={`max-w-xs text-sm text-white rounded-md p-4 ${setToastBackgroundColor()}`}
        role="alert"
      >
        <div className="flex">
          {text}
          <div className="ml-3">
            <button
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center rounded-md outline-none"
              onClick={handleClose}
            >
              <MdClose size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
