import { useState } from "react";
import FormField from "../components/FormField";
import { categories } from "../utils/Categories";
import { useProductStore } from "../stores/useProductStore";

const AddProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });
  const { createProduct, isLoading } = useProductStore();
  const handleUploadImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result ?? "" }));
      };
      reader.readAsDataURL(file); // convert image into Base64 format
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      console.log("error creating a product", error.message);
    }
  };

  return (
    <div className="rounded-lg px-6 mb-8 w-full max-w-2xl">
      <h2 className="text-2xl font-semibold m-6 text-primary-500">
        Create New Product
      </h2>
      <div className="bg-primary-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Name"
            type="text"
            value={newProduct.name}
            required
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
            className="w-full px-3 py-2 text-primary-200 bg-primary-700 border border-primary-600 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-primary-200"
            >
              Description
            </label>
            <div className="relative rounded-md shadow-sm">
              <textarea
                id="description"
                rows="4"
                required
                value={newProduct.description}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, description: e.target.value });
                }}
                className="w-full px-3 py-2 text-primary-200 bg-primary-700 border border-primary-600 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <FormField
            label="Price"
            type="number"
            value={newProduct.price}
            required
            onChange={(e) => {
              setNewProduct({ ...newProduct, price: e.target.value });
            }}
            className="w-full px-3 py-2 text-primary-200 bg-primary-700 border border-primary-600 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-primary-200"
            >
              Category
            </label>
            <div className="relative rounded-md shadow-sm">
              <select
                id="category"
                required
                value={newProduct.category}
                onChange={(e) => {
                  setNewProduct({ ...newProduct, category: e.target.value });
                }}
                className="w-full px-3 py-2 text-primary-200 bg-primary-700 border border-primary-600 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.text} value={category.path}>
                    {category.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <FormField
            label="Stock"
            type="number"
            value={newProduct.stock}
            required
            onChange={(e) => {
              setNewProduct({ ...newProduct, stock: e.target.value });
            }}
            className="w-full px-3 py-2 text-primary-200 bg-primary-700 border border-primary-600 rounded-md shadow-sm placeholder-primary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          <div className="mt-1 flex flex-col justify-center">
            <label
              htmlFor="image"
              className="text-sm font-medium text-primary-200"
            >
              Upload Image
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-primary-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <input
                id="image"
                type="file"
                required
                onChange={handleUploadImage}
                className="-space-y-4 pl-10 cursor-pointer w-full px-3 py-2 text-primary-200 bg-primary-700 
            border border-primary-600 rounded-md shadow-sm placeholder-primary-400 
            focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                accept="image/*"
              />
            </div>
            {newProduct.image && (
              <span className="text-sm text-primary-400">Image Uploaded</span>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium
             text-primary-50 bg-primary-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
