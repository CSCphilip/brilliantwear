import Link from "next/link";

export default function PopularBrands() {
  // NOTE: This is a mockup of the popular brands
  const popularBrands: string[] = [
    "Adidas",
    "Timberland",
    "Jordan",
    "Skechers",
    "Converse",
    "Nike",
    "Vans",
    "Gideon",
    "Levi's",
    "Scott",
    "Hugo Boss",
    "Hermès",
    "Les Deux",
    "Jack & Jones",
    "Gina Tricot",
    "Haglöfs",
    "Vagabond",
    "Michael Kors",
    "Ralph Lauren",
    "Esprit",
    "Calvin Klein",
    "Belstaff",
    "Under Armour",
    "Makia",
    "Helly Hansen",
    "Björn Borg",
    "Tommy Hilfiger",
    "G-star",
    "Filippa K",
    "Vero Moda",
    "Tiger of Sweden",
    "GANT",
  ];

  return (
    <div className="bg-primary mt-5 flex">
      <div className="pt-5">
        <Triangle rotate="180" />
      </div>
      <div className="grow mb-7">
        <h2 className="font-inter font-normal pt-3 text-center">
          Popular Brands
        </h2>
        <div className="mt-3 px-4 grid grid-cols-2 gap-y-2 gap-x-7">
          {popularBrands.slice(0, 20).map((brand, index) => {
            return (
              <Link
                key={index}
                href={`/products?brand=${encodeURIComponent(brand)}`}
                className={`font-inter font-normal hover:underline ${
                  index % 2 === 0 && "text-right"
                } truncate`}
              >
                {brand}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="pb-5 flex flex-col justify-end">
        <Triangle rotate="0" />
      </div>
    </div>
  );
}

function Triangle({ rotate }: { rotate: string }) {
  return (
    <div
      className={`border-t-[80px] border-t-transparent
                  border-r-[50px] border-l-[#f1f1f1]
                  border-b-[80px] border-b-transparent
                  rotate-${rotate}`}
    />
  );
}
