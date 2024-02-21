import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <main className="grow px-8 bg-information-background bg-cover bg-center flex justify-center items-center">
      <div className="my-10 bg-gray-100 opacity-95 rounded-md p-4 max-w-[530px]">
        <h2 className="mb-2">About Brilliantwear</h2>
        <p>
          Brilliantwear originated from the vision to establish an innovative
          online clothing store seamlessly integrating Artificial Intelligence,
          reflected in its name "brilliant" denoting intelligence. From this,
          the idea of a shopping assistant was born, designed to assist users in
          discovering clothes through searches like "Shoes for a wedding" or
          "Running shorts in green". At the same time, offering a wide range of
          clothing items, ensuring that everyone can find something to wear. At
          Brilliantwear, we believe that fashion and technology are the perfect
          match.
        </p>
      </div>
    </main>
  );
}
