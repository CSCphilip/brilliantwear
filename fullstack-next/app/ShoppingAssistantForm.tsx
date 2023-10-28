"use client";

interface ShoppingAssistantFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ShoppingAssistantForm = ({
  handleSubmit,
}: ShoppingAssistantFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        placeholder="What are you seeking?"
        name="product-description"
        maxLength={250}
        className="lg:w-96 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
        required
      ></input>
      <button
        type="submit"
        className="mt-5 bg-blue-500 hover:bg-blue-400 text-white py-2 lg:py-3 px-8 lg:px-20 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default ShoppingAssistantForm;
