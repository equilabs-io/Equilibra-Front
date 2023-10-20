"use client";
import { useState } from "react";
import CreateProjectForm from "@/components/Project/CreateProjectForm";
import { CardProject } from "@/components/Project";
interface FormState {
  description: string;
  link: string;
  fileHash: string;
  name: string;
  category: string;
}

export default function CreateProject() {
  // Function thats Handles Form Change
  const [beneficiary, setBeneficiary] = useState("");
  const [formState, setFormState] = useState<FormState>({
    description: "",
    link: "",
    fileHash: "",
    name: "",
    category: "",
  });

  const handleFormChange = (value: string | number, name: string) => {
    if (name == "beneficiary" && typeof value === "string") {
      setBeneficiary(value);
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };
  //

  return (
    <>
      <CreateProjectForm
        handleFormChange={handleFormChange}
        formState={formState}
        beneficiary={beneficiary}
      />
      <CardProject />
    </>
  );
}
