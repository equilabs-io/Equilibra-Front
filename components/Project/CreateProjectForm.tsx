"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useContractWrite } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import InputText from "@/components/Form/InputText";
import InputImage from "@/components/Form/InputImage";
import InputSelect from "@/components/Form/InputSelect";
import { projectRegistry } from "@/constants/abis";
import CustomButton from "@/components/CustomButton";

interface ErrorCause {
  metaMessages: string[];
}

const categories = [
  { id: 1, name: "(DeFi) Decentralized Finance" },
  { id: 2, name: "(DAO) Decentralized Autonomous Organization" },
  { id: 3, name: "(NFT) Non-Fungible Token" },
  { id: 4, name: "Cross-Chain Interoperability Protocols" },
  { id: 5, name: "Smart Contract Security Auditing Services" },
  { id: 6, name: "(DEX) Decentralized Exchanges" },
  { id: 7, name: "Cryptocurrency Mining Pools" },
  { id: 8, name: "Blockchain-Based Supply Chain Management" },
  { id: 9, name: "Decentralized Social Networks" },
  { id: 10, name: "Blockchain-Based Voting Systems" },
  { id: 11, name: "Public Goods" },
  { id: 12, name: "Others" },
];

type createProjectForm = {
  handleFormChange: (value: string | number, name: string) => void;
  formState: {
    description: string;
    link: string;
    fileHash: string;
    name: string;
    category: string;
  };
  beneficiary: string;
};

export default function CreateProjectForm({
  handleFormChange,
  formState,
  beneficiary,
}: createProjectForm) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ipfsUpload = ipfsJsonUpload();

    toast
      .promise(ipfsUpload, {
        pending: "Uploading to IPFS...",
        success: "Successfully uploaded!",
        error: "Ups, something went wrong with IPFS.",
      })
      .then((ipfsHash: string) => {
        const abiCoder = new ethers.utils.AbiCoder();
        const encodedData = abiCoder.encode(["string"], [ipfsHash]);

        write({
          args: [debouncedBeneficiary, encodedData],
        });

        // id, admin, beneficiary, data
        // updateProject
        // write({
        //   args: [
        //     7 as number,
        //     "0x584ddfb0bdd922ff1fbf3e85e7e781d5816b4f23",
        //     debouncedBeneficiary,
        //     encodedData,
        //   ],
        // });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const debouncedBeneficiary = useDebounce(beneficiary);

  const { write, data, error, isError, isLoading, isSuccess } =
    useContractWrite({
      address: projectRegistry.address,
      abi: projectRegistry.abi,
      functionName: "registerProject",
    });

  //TODO: remove this, use to check if the contract is working
  if (data) {
    console.log(data);
  }
  if (error) {
    console.log(error);
  }

  const ipfsJsonUpload = async () => {
    try {
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "content-type": "application/json",
        },
      });
      const json = await response.json();
      if (json?.IpfsHash) {
        return Promise.resolve(json.IpfsHash);
      } else {
        return Promise.reject("No ipfshash returned");
      }
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Created a Project!");
    } else if (isError && error) {
      toast.error((error.cause as ErrorCause)?.metaMessages[0]);
    }
  }, [isLoading, isSuccess, isError, error]);

  return (
    <>
      <form
        className="mx-auto w-full max-w-5xl p-6 rounded-lg bg-surface"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="space-y-12">
          <div className="pb-12">
            <h4>Fill the form to create a project</h4>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <InputText
                  label="Project name"
                  name="name"
                  handleChange={handleFormChange}
                  value={formState.name}
                  type="text"
                  placeholder="My project name..."
                  required
                />
              </div>
              {/* beneficary */}
              <div className="sm:col-span-4">
                <InputText
                  label="Beneficiary address"
                  name="beneficiary"
                  handleChange={handleFormChange}
                  value={beneficiary}
                  type="text"
                  placeholder="Eth address..."
                  required
                />
              </div>
              {/* link */}
              <div className="sm:col-span-4">
                <InputText
                  label="Project link"
                  name="link"
                  handleChange={handleFormChange}
                  value={formState.link}
                  type="text"
                  placeholder="Project link..."
                />
              </div>
              {/* description */}
              <div className="col-span-full">
                <InputText
                  label="Description"
                  name="description"
                  handleChange={handleFormChange}
                  value={formState.description}
                  type="textarea"
                  rows={6}
                  placeholder="Project description..."
                  required
                />
              </div>
              {/* category */}
              <div className="sm:col-span-4">
                <InputSelect
                  list={categories}
                  label="Category"
                  name="category"
                  handleChange={handleFormChange}
                  required
                />
              </div>
              {/* cover imag */}
              <div className="col-span-full">
                <InputImage
                  label="Cover photo"
                  name="fileHash"
                  handleChange={handleFormChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <CustomButton text="Create project" type="submit" />
        </div>
      </form>
    </>
  );
}
