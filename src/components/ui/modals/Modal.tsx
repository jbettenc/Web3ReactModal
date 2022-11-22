import React from "react";
import { useRef, useEffect, useState } from "react";
import Transition from "../animation/Transition";

interface ModalProps {
  children?: JSX.Element[];
  id?: string;
  title?: string;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  maxSizeClass?: string;
  showHeader?: boolean;
  transparentBg?: boolean;
  shadow?: boolean;
}

function Modal({
  children,
  id,
  title,
  modalOpen,
  setModalOpen,
  maxSizeClass = "max-w-lg",
  showHeader = true,
  transparentBg = false,
  shadow = true
}: ModalProps) {
  const modalContent = useRef<HTMLDivElement>(null);
  const [shouldEnableScroll, handleShouldEnableScroll] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      if (!document.body.classList.contains("noscroll")) {
        document.body.classList.add("noscroll");
        handleShouldEnableScroll(true);
      }
    } else {
      if (shouldEnableScroll && document.body.classList.contains("noscroll")) {
        document.body.classList.remove("noscroll");
      }
    }
  }, [modalOpen]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modalContent.current) return;
      if (!modalOpen || modalContent.current.contains(target as Node)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [modalOpen, setModalOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!modalOpen || key !== "Escape") return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        appear={true}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        appear={true}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className={`${transparentBg ? "" : "bg-white "}${
            shadow ? "shadow-lg " : ""
          }rounded overflow-auto max-h-full ${maxSizeClass}`}
        >
          {showHeader ? (
            <div className="px-5 py-3 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-slate-800">{title}</div>
                <button
                  className="text-slate-400 hover:text-slate-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalOpen(false);
                  }}
                >
                  <div className="sr-only">Close</div>
                  <svg className="w-4 h-4 fill-current">
                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                  </svg>
                </button>
              </div>
            </div>
          ) : null}
          {children}
        </div>
      </Transition>
    </>
  );
}

export default Modal;
