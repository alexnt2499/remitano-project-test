/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { usePopup } from "./../../contexts/CommonPopupContext";
import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment } from "react";

interface ICommonPopup {}

const CommonPopup: FC<ICommonPopup> = () => {
  const { popupContext, closePopup } = usePopup();

  if (!popupContext || !popupContext.contents) return null;

  const { open, contents, type } = popupContext;

  const { title, description, submitButtonTitle, closeButtonTitle } = contents;

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closePopup}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center  justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full py-12 px-10 rounded-3xl ${
                  type === "confirm" ? "max-w-2xl" : "max-w-2xl"
                } transform overflow-hidden rounded-ms bg-white bg-vcx-black-500 p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="fixed left-[-130px] bottom-0 -z-50"></div>

                <Dialog.Title
                  as="h3"
                  className={`text-xl font-bold leading-6 text-primary-500 ${
                    type === "confirm" ? "text-left" : "text-center"
                  }`}
                >
                  {title}
                </Dialog.Title>
                <div className="mt-4">
                  {description && (
                    <p className="text-sm">
                      {Array.isArray(description)
                        ? description.map((element: any, index) => (
                            <span key={index}>
                              {element} <br />
                              <br />
                            </span>
                          ))
                        : description}
                    </p>
                  )}
                </div>

                <div
                  className={`mt-4 flex ${
                    type === "confirm"
                      ? "flex-row-reverse justify-start"
                      : "flex-col justify-end"
                  } `}
                >
                  {submitButtonTitle ? (
                    <button
                      type="submit"
                      className="inline-flex  p-0 justify-center items-center rounded-md border border-transparent bg-success-500 hover:bg-success-600 px-4 py-2  font-medium text-white  "
                    >
                      <p>{submitButtonTitle}</p>
                    </button>
                  ) : null}

                  {closeButtonTitle ? (
                    <button
                      type="button"
                      className={`bg-primary-500 rounded-lg py-3 text-white ${
                        type === "confirm" ? "mr-2" : "mt-2"
                      } p-0`}
                      onClick={closePopup}
                    >
                      {closeButtonTitle}
                    </button>
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CommonPopup;
