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
import { motion } from "framer-motion";
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
  {
    name: "Super Fake DAI",
    symbol: "DAIx",
    address: "0x4e17a5e14331038a580c84172386f1bc2461f647",
  },
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
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  let [categories] = useState([
    {
      name: "Info",
      component: <Form />,
    },
    {
      name: "Add Projects",
      component: <AddProjectList />,
    },
    {
      name: "Fund",
      component: <AddFunds />,
    },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full  px-2 py-0 sm:px-0 space-y-4">
      <Tab.Group selectedIndex={selectedIndex}>
        <Tab.List className="flex space-x-1  bg-surface p-1">
          {categories.map((category, index) => (
            <Tab
              onClick={() => setSelectedIndex(index)}
              as={motion.button}
              key={category.name}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-6 text-sm lg:text-lg tracking-wider leading-5 relative",
                  "ring-white/60 ring-offset-none focus:outline-none focus:ring-none",
                  selected
                    ? "text-primary shadow font-semibold "
                    : "text-textSecondary hover:bg-white/[0.12] hover:text-white"
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
      {/* TODO: new logic */}
      <h4>Fill the form to create a pool</h4>
      <form
        className="mx-auto w-full rounded-lg max-h-[600px] overflow-y-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="space-y-2">
          <div className="pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <InputText
                  label="Pool name"
                  name="name"
                  handleChange={handleChange}
                  value={formState.name}
                  type="text"
                  placeholder="What's your pool name?"
                />
              </div>
              <div className="sm:col-span-4 md:col-span-5">
                <InputText
                  label="Description"
                  name="description"
                  handleChange={handleChange}
                  value={formState.description}
                  type="textarea"
                  rows={4}
                  placeholder="Pool description..."
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
                <InputText
                  label="List address"
                  name="governanceToken"
                  handleChange={handleChange}
                  //value={formState.governanceToken}
                  type="text"
                  placeholder="Governance token contract address..."
                  required
                />
              </div>
              <div className="sm:col-span-4">
                <InputText
                  label="Minimun Stake"
                  name="governanceToken"
                  handleChange={handleChange}
                  // value={formState.governanceToken}
                  type="number"
                  placeholder="Example 4%..."
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
                <InputText
                  label="Max streaming per month"
                  name="governanceToken"
                  handleChange={handleChange}
                  //value={formState.governanceToken}
                  type="number"
                  placeholder="Example 5%..."
                  required
                />
              </div>
              {/* <div className="sm:col-span-4">
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
              {/* </motion.div>
                  )}
                </AnimatePresence>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-6">
          <CustomButton text="Create pool" type="submit" styles="" />
        </div>
      </form>
    </>
  );
};

const AddProjectList = () => {
  return (
    <>
      {/* TODO: add projects and logic  */}
      <h4>
        Select the projects you would like to be elegible bt the community
      </h4>
    </>
  );
};

const AddFunds = () => {
  return (
    <>
      <h4>How much do you want to add to the pool?</h4>
      <div className="w-full h-[600px] flex flex-col space-y-8 items-center justify-center">
        <div>
          <label htmlFor="price" className="sr-only">
            Fund
          </label>
          <div className="relative mt-2 h-64 w-64 rounded-full shadow-sm ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full h-full  bg-surface rounded-full border-0 py-1.5 pl-7 pr-12 placeholder:text-gray-400 sm:text-sm md:text-2xl sm:leading-6 text-center ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-surface_var"
              placeholder="0.00"
              aria-describedby="price-currency"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-primary sm:text-sm" id="price-currency">
                DAIx
              </span>
            </div>
          </div>
        </div>
        {/* TODO!: logic */}
        <button>Deposit</button>
      </div>
    </>
  );
};
