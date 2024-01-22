"use client";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, Fragment } from "react";

type TransactionModalProps = {
  isLoading?: boolean;
  isWaitLoading?: boolean;
  isSuccess?: boolean;
  isWaitSuccess?: boolean;
  isError?: boolean;
  error?: any;
  disabledButton?: any;
  label: string;
  action?: string;
  hash?: string;
  writeFunction?: () => void;
};

export default function TransactionModal({
  isLoading,
  isWaitLoading,
  isSuccess,
  isWaitSuccess,
  isError,
  error,
  disabledButton,
  label,
  action,
  hash,
  writeFunction,
}: TransactionModalProps) {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  // useEffect(() => {
  //   if (openTransactionModal) {
  //     handle?.();
  //   }
  // }, [openTransactionModal]);

  const handleModal = () => {
    setOpenTransactionModal(!openTransactionModal);
    writeFunction?.();
  };

  return (
    <>
      <button
        onClick={handleModal}
        className="w-full rounded-full border px-6 py-1 text-xl transition-opacity duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-highlight disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabledButton}
      >
        {label}
      </button>
      <Transition.Root show={openTransactionModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenTransactionModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-700 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative flex min-h-[284px] min-w-[520px] transform flex-col items-center justify-between overflow-hidden rounded-lg bg-surface px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div className="flex justify-center">
                    {(isLoading || isWaitLoading) && (
                      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
                    )}

                    {isWaitSuccess && (
                      <div className="text-6xl text-primary">&#10003;</div>
                    )}
                  </div>

                  {!isWaitSuccess && (
                    <div>
                      <span className="text-lg">Action: {action}</span>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col space-y-2 text-center">
                    {isLoading && (
                      <>
                        <span className="text-sm text-textSecondary">
                          Awaiting User Signature
                        </span>
                        <span className="text-sm text-textSecondary">
                          Check Your Wallet ...
                        </span>
                      </>
                    )}
                    {isWaitLoading && (
                      <>
                        <div className="flex flex-col items-center justify-center">
                          <ArrowUpTrayIcon
                            className="h-6 w-6 animate-pulse text-textSecondary"
                            aria-hidden="true"
                          />
                          <span className="animate-pulse text-textSecondary">
                            Broadcasting Transaction to Goerli ...
                          </span>
                        </div>
                      </>
                    )}
                    {(isWaitSuccess || isError) && (
                      <button
                        className="absolute right-3 top-3 hover:opacity-70"
                        onClick={() => setOpenTransactionModal(false)}
                      >
                        close
                      </button>
                    )}
                    {isWaitSuccess && (
                      <>
                        <span className="ani text-primary">
                          Transaction Succesful
                        </span>
                        <a
                          target="_blank"
                          href={`https://goerli.etherscan.io/tx/${hash}`}
                        >
                          <span className="text-sm text-textSecondary underline">
                            View on Etherscan
                          </span>
                        </a>
                      </>
                    )}

                    {isError && (
                      <>
                        <div className="absolute left-5 top-5 flex">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-400"
                            aria-hidden="true"
                          />
                          <p className="ml-2">Upps...</p>
                        </div>
                        <span>{error?.details.toString()}</span>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
