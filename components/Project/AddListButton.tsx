"use client";

type AddListButtonProps = {
  active: boolean;
  id: string;
  projectCheckout: string[];
};

const AddListButton = ({ active, id, projectCheckout }: AddListButtonProps) => {
  return (
    <>
      <div className="absolute right-4 top-4  flex  justify-end">
        <button
          disabled={active}
          onClick={() => projectCheckout(id)}
          className={`w-full min-w-[170px] rounded-md px-4 ${
            active
              ? "bg-primary text-black"
              : "bg-surface text-white hover:bg-primary hover:text-black"
          }`}
        >
          {`${active ? "Listed" : "Add to list"}`}
        </button>
      </div>
    </>
  );
};

export default AddListButton;
