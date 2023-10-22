"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

interface InputImageProps {
  handleChange: (value: string, name: string) => void;
  name: string;
  label?: string;
  required?: boolean;
}

export default function InputImage({
  handleChange,
  name,
  label = undefined,
  required = false,
}: InputImageProps) {
  const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];

    const ipfsUpload = ipfsFileUpload(selectedFile);

    toast
      .promise(ipfsUpload, {
        pending: "Uploading to IPFS...",
        success: "Successfully uploaded!",
        error: "Ups, something went wrong with IPFS",
      })
      .then(() => {
        setFile(selectedFile);
      })
      .catch((error: any) => {
        console.error(`Failed to upload file: ${error}`);
      });
  };

  const ipfsFileUpload = async (selectedFile: File) => {
    const data = new FormData();
    data.set("file", selectedFile);
    try {
      const res = await fetch("/api/ipfs", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json?.IpfsHash) {
        handleChange(json.IpfsHash, name);
      } else {
        return Promise.reject("No ipfshash returned");
      }
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  };

  return (
    <>
      <label
        htmlFor="cover-photo"
        className="block"
      >
        {label}
      </label>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
        <div className="text-center">
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              alt="Project cover photo"
              width={200}
              height={200}
            />
          ) : (
            <>
              <div className="mt-4 flex flex-col text-sm leading-6 text-gray-400 ">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-500"
                  aria-hidden="true"
                />
                <label
                  htmlFor={name}
                  className="relative cursor-pointer rounded-lg bg-gray-900 font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-200 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-primary transition-colors duration-200 ease-in-out"
                >
                  <span>Upload a file</span>
                  <input
                    id={name}
                    name={name}
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                    required={required}
                  />
                </label>

                <p className="pl-1">or drag and drop</p>
                <p className="text-xs leading-5 text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
