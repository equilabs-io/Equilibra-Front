export const LaunchAppButton = ({ center = false }) => {
  return (
    <>
      <div
        className={`w-full absolute top-0 p-6 flex justify-end ${
          center && "justify-center"
        }`}
      >
        <button className="bg-[#00FFC4] text-black py-2 px-4 rounded-full text-sm hover:opacity-80">
          Launch App
        </button>
      </div>
    </>
  );
};
