"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useContractWrite } from "wagmi";
import { ethers } from "ethers";
import { Tab } from "@headlessui/react";
import InputText from "@/components/Form/InputText";
import InputImage from "@/components/Form/InputImage";
import { toast } from "react-toastify";
import InputSelect from "@/components/Form/InputSelect";
import CustomButton from "@/components/CustomButton";
import InputSwitch from "@/components/Form/InputSwitch";
import { motion, AnimatePresence } from "framer-motion";
interface FormState {
  description: string;
  fundingToken: string;
  governanceToken: string;
  name: string;
  isMultiSig: boolean;
  multiSigOwners: any[];
  sigsRequired: number;
}

const tokens = [
  { id: 1, name: "USDC" },
  { id: 2, name: "USDT" },
  { id: 3, name: "DAI" },
  { id: 4, name: "ETH" },
];

export default function CreatePool() {
  // const { write, data, error, isError, isLoading, isSuccess } =
  //   useContractWrite({
  //     address: projectRegistry.address,
  //     abi: projectRegistry.abi,
  //     functionName: "registerProject",
  //   });

  // const ipfsJsonUpload = async () => {
  //   try {
  //     const response = await fetch("/api/ipfs", {
  //       method: "POST",
  //       body: JSON.stringify(formState),
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     });
  //     const json = await response.json();
  //     if (json?.IpfsHash) {
  //       return Promise.resolve(json.IpfsHash);
  //     } else {
  //       return Promise.reject("No ipfshash returned");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     return Promise.reject(err);
  //   }
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Successfully Created a Pool!");
  //   } else if (isError && error) {
  //     toast.error((error.cause as ErrorCause).metaMessages[0]);
  //   }
  // }, [isLoading, isSuccess, isError]);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  let [categories] = useState([
    {
      name: "Info",
      component: <Form />,
    },
    {
      name: "Projects",
      component: <h1>hello world</h1>,
    },
    {
      name: "Funding",
      component: <h1>hello world</h1>,
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log(selectedIndex);

  return (
    <div className="w-full  px-2 py-0 sm:px-0 space-y-4">
      <Tab.Group selectedIndex={selectedIndex}>
        <Tab.List className="flex space-x-1  bg-blue-900/10 p-1">
          {categories.map((category, index) => (
            <Tab
              onClick={() => setSelectedIndex(index)}
              as={motion.button}
              key={category.name}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-6 text-md font-mono leading-5 relative",
                  "ring-white/60 ring-offset-none focus:outline-none focus:ring-none",
                  selected
                    ? "text-primary shadow font-semibold "
                    : "text-slate-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {selectedIndex === index && (
                <motion.div
                  layoutId="pool"
                  className="border-b-2 border-primary w-full h-full absolute top-0 left-0"
                ></motion.div>
              )}
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((component, idx) => (
            <Tab.Panel
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={idx}
              className={classNames(
                "rounded-xl bg-background p-3",
                "ring-offset-none focus:outline-none focus:ring-none"
              )}
            >
              {component.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

const Form = () => {
  const [formState, setFormState] = useState<FormState>({
    description: "",
    fundingToken: "",
    governanceToken: "",
    name: "",
    isMultiSig: false,
    multiSigOwners: ["", "", ""],
    sigsRequired: 2,
  });

  const handleChange = (
    value: string | number | boolean,
    name: string,
    index?: number
  ) => {
    if (index !== undefined) {
      const auxArr = [...formState.multiSigOwners];
      auxArr[index] = value;
      setFormState({ ...formState, [name]: auxArr });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    // const ipfsUpload = ipfsJsonUpload();

    // toast
    //   .promise(ipfsUpload, {
    //     pending: "Uploading to IPFS...",
    //     success: "Successfully uploaded!",
    //     error: "Ups, something went wrong with IPFS.",
    //   })
    //   .then((ipfsHash: string) => {
    const abiCoder = new ethers.utils.AbiCoder();
    // const encodedData = abiCoder.encode(["string"], [ipfsHash]);

    // console.log("ipfs json hash: " + ipfsHash);
    // write({
    // args: [debouncedBeneficiary, encodedData],
    // });
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
  };
  return (
    <>
      <form
        className="mx-auto w-full rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="space-y-2">
          <div className="border-b pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <InputText
                  label="Pool name"
                  name="name"
                  handleChange={handleChange}
                  value={formState.name}
                  type="text"
                  placeholder="My pool name"
                  required
                />
              </div>
              <div className="col-span-full">
                <InputText
                  label="Description"
                  name="description"
                  handleChange={handleChange}
                  value={formState.description}
                  type="textarea"
                  rows={4}
                  placeholder="Pool description..."
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <InputText
                  label="Governance token address"
                  name="governanceToken"
                  handleChange={handleChange}
                  value={formState.governanceToken}
                  type="text"
                  placeholder="Governance token contract address..."
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <InputSelect
                  list={tokens}
                  label="Funding token"
                  name="fundingToken"
                  handleChange={handleChange}
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <InputSwitch
                  label="Multisig pool with Gnosis Safe"
                  name="isMultiSig"
                  handleChange={handleChange}
                  value={formState.isMultiSig}
                />
                <AnimatePresence>
                  {formState.isMultiSig && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="sm:col-span-4 flex flex-col gap-2 mt-2"
                    >
                      <div className="my-2">
                        <InputText
                          label="Wallet address"
                          name="multiSigOwners"
                          handleChange={handleChange}
                          value={formState.multiSigOwners[0]}
                          index={0}
                          type="text"
                          placeholder="Wallet address..."
                          required
                        />
                      </div>
                      <div className="my-2">
                        <InputText
                          label="Wallet address"
                          name="multiSigOwners"
                          handleChange={handleChange}
                          value={formState.multiSigOwners[1]}
                          index={1}
                          type="text"
                          placeholder="Wallet address 2..."
                          required
                        />
                      </div>
                      <div className="my-2">
                        <InputText
                          label="Wallet address"
                          name="multiSigOwners"
                          handleChange={handleChange}
                          value={formState.multiSigOwners[2]}
                          index={2}
                          type="text"
                          placeholder="Wallet address 3..."
                          required
                        />
                      </div>
                      <div className="my-2">
                        <InputText
                          label="Signatures required"
                          name="sigsRequired"
                          handleChange={handleChange}
                          value={formState.sigsRequired}
                          type="number"
                          placeholder="My pool name"
                          required
                        />
                      </div>
                      {/* <div className="border-b mt-2"></div> */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <CustomButton text="Create pool" type="submit" />
        </div>
      </form>
    </>
  );
};
