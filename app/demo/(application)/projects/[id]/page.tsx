export default function ProjectId({ params }: { params: any }) {
  const { id } = params;
  return (
    <>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-0">
        <div className="max-h-[160px] w-full">
          <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
            <img
              src={`https://effigy.im/a/0x5BE8Bb8d7923879c3DDc9c551C5Aa85Ad0Fa4dE3`}
              className="h-[full] max-h-[160px] w-full overflow-hidden rounded-t-2xl object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-1 lg:grid-cols-3 ">
            <div className="col-span-2  min-h-[100px] space-y-4 p-4">
              <div className=" flex justify-between">
                <h1 className="flex gap-x-3 text-base leading-7">
                  <span className="text-4xl font-semibold">
                    Project
                    <span className="ml-2 text-primary">
                      {id.slice(0, 5)}...
                    </span>
                  </span>
                </h1>
                {/* <span className="inline-flex items-center rounded-md bg-pink-100/10 px-4 py-1 text-xs font-medium">
                  <Link
                    href={`https://goerli.etherscan.io/address/${pool?.mimeToken.address}`}
                    isExternal
                  >
                    <p className="text-clip overflow-hidden max-w-content text-primary_var">
                      Governance: {pool?.mimeToken.name}
                    </p>
                  </Link>
                </span> */}
              </div>
              <div className="py-4 text-justify text-gray-300">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus doloremque sunt repudiandae, molestiae adipisci
                  aspernatur omnis et inventore quia, eius consequuntur
                  architecto mollitia, quo asperiores laudantium. Enim tempora
                  reprehenderit quaerat alias magnam voluptatibus, ea nisi
                  doloribus tenetur, voluptatum sit saepe ratione delectus
                  maiores. Perferendis veritatis quis itaque? Quis tempore a
                  quia. Molestiae, laudantium culpa! Necessitatibus dolorem aut
                  porro ipsam accusamus aspernatur tempora, ipsum delectus
                  reprehenderit numquam nam? Libero molestiae, minima vero
                  molestias assumenda iusto vitae non quaerat soluta atque amet
                  expedita nisi ratione sit. Provident ullam nihil aspernatur
                  quos maxime tenetur debitis veritatis minima cum vitae!
                  Tempora consectetur illum maiores!
                </p>
              </div>
              {/* <div className="flex flex-col my-4 bg-background rounded-xl justify-between py-4 ">
                <div className="p-2 rounded-lg hover:bg-surface transition-transform ease-in-out duration-200">
                  <Link
                    href={`https://goerli.etherscan.io/address/`}
                    isExternal
                  >
                    <p className="font-mono mt-0 text-gray-300">
                      <span className="text-gray-400">contract address: </span>{" "}
                      {"address"}
                    </p>
                  </Link>
                </div>
                <div className="p-2 rounded-lg hover:bg-surface transition-transform ease-in-out duration-200">
                  {/* <span className="text-slate-900 font-mono">owner</span>{" "} */}
              {/* <p className="font-mono mt-0 text-gray-300">
                    <span className="text-gray-400">owner: </span>
                    {"owner"}
                  </p>
                </div>
              </div>  */}
            </div>
            <div className=" border-red-300">
              <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-2">
                <div className="col-span-2 h-96 w-full border-2">
                  <h3>Recieving x from:</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
