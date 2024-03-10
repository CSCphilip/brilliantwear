import Link from "next/link";

export default function PopularBrands() {
  // NOTE: This is a mockup of the popular brands
  const popularBrands: string[] = [
    "Zephyr",
    "Lumina",
    "Verve",
    "Looma",
    "Zestra",
    "Ombra",
    "Ethos",
    "Quill",
    "Zaraq",
    "Nebula",
    "Celestial Drapes",
    "Ephemeral Ensemble",
    "Urbane Canvas",
    "Sapphire Haven",
    "Ethereal Elegance",
    "Infinite Threads",
    "Velvet Odyssey",
    "Muse Mirage",
    "Noir Nova",
    "Svelte",
    "Mirage",
    "Cresta",
    "Zephyra",
    "Elysium",
    "Azurea",
    "Quanta",
    "Solace",
    "Jovial",
    "Zenith",
    "Ethereal Vogue",
    "Urban Luxe Attire",
    "Retro Charm Couture",
  ];

  return (
    <div className="bg-primary mt-5 lg:mt-7 flex">
      <div className="pt-5 lg:hidden">
        <Triangle rotate={270} />
      </div>
      <div className="hidden lg:block lg:ms-7">
        <Triangle rotate={0} />
      </div>
      <div className="grow h-[371px] lg:h-[275px] mb-7 overflow-y-hidden">
        <h2 className="font-interSansSerif font-normal pt-3 lg:py-5 text-center">
          Popular Brands
        </h2>
        <div
          className="mt-3 lg:mt-0 px-4 lg:px-0 grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 gap-y-2 
                        gap-x-7 lg:gap-y-7 lg:gap-x-10"
        >
          {popularBrands.map((brand, index) => {
            return (
              <Link
                key={index}
                href={`/products?brand=${encodeURIComponent(brand)}`}
                className={`font-interSansSerif hover:underline ${
                  index % 2 === 0 && "text-right lg:text-start"
                } truncate`}
              >
                {brand}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="pb-5 flex flex-col justify-end lg:hidden">
        <Triangle rotate={90} />
      </div>
      <div className="hidden lg:me-7 lg:flex lg:flex-col lg:justify-end">
        <Triangle rotate={180} />
      </div>
    </div>
  );
}

function Triangle({ rotate }: { rotate: number }) {
  if (rotate === 0) {
    return (
      <div
        className="border-l-[80px] border-l-transparent
      border-t-[50px] border-l-[#f1f1f1]
      border-r-[80px] border-r-transparent"
      />
    );
  } else if (rotate === 90) {
    return (
      <div
        className="border-t-[80px] border-t-transparent
                  border-r-[50px] border-l-[#f1f1f1]
                  border-b-[80px] border-b-transparent"
      />
    );
  } else if (rotate === 180) {
    return (
      <div
        className="border-l-[80px] border-l-transparent
                 border-b-[50px] border-l-[#f1f1f1]
                 border-r-[80px] border-r-transparent"
      />
    );
  } else if (rotate === 270) {
    return (
      <div
        className="border-t-[80px] border-t-transparent
    border-l-[50px] border-l-[#f1f1f1]
    border-b-[80px] border-b-transparent"
      />
    );
  }
}
