import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addProduct, updateProduct } from "../http/http";
import TagInput from "../Components/TagInput";
import NavBar from "../Components/Adminnavbar";
import "../styles/Addproduct.css";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, data } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    productId: "",
    category: "",
    subCategory: "",
    description: "",
    price: "",
    discount: "",
    title: "",
    storage: "",
    shipping: "",
    setInclude: [],
    dimensions: [],
    materials: [],
    uses: [],
    features: [],
    preferFor: [],
    idealFor: [],
    topProduct: false,
  });
  const [mainImage, setMainImage] = useState(null);
  const [sideImages, setSideImages] = useState([]);
  const [existingMainImage, setExistingMainImage] = useState("");
  const [existingSideImages, setExistingSideImages] = useState([]);
  const [error, setError] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const categories = {
    "Kitchen Chef Set": [
      "Damascus Steel Chef Sets",
      "Carbon Steel Chef Sets",
      "Chef Knifes",
      "Fillet Knives",
    ],
    Daggers: ["Damascus Steel Daggers", "D2 Steel Daggers"],
    Swords: [
      "Medieval Swords",
      "Premium Swords",
      "Vikings Swords",
      "Movie Replica Swords",
      "Samurai Swords",
    ],
    Axes: ["Vikings Axe", "Damascus Steel Axe", "Carbon Steel Axe"],
    "Bowie Knives": ["Stag Horn", "Camping Bowie Knife", "Hunting Bowie Knife"],
    "EDC Knives": [
      "Folding knives",
      "Fixed Blade Knives",
      "KeyChain Knives",
      "Hunting Skinner Knives",
    ],
  };

  useEffect(() => {
    setCategoriesList(Object.keys(categories));
    
    if (id && data) {
      // Update each field individually
      setFormData((prevData) => ({
        ...prevData,
        name: data.name || "",
        productId: data.productId || "",
        category: data.category || "",
        subCategory: data.subCategory || "",
        description: data.description || "",
        price: data.price || "",
        discount: data.discount || "",
        title: data.title || "",
        storage: data.storage || "",
        shipping: data.shipping || "",
        setInclude: data.setInclude || [],
        dimensions: data.dimensions || [],
        materials: data.materials || [],
        uses: data.uses || [],
        features: data.features || [],
        preferFor: data.preferFor || [],
        idealFor: data.idealFor || [],
        topProduct: data.topProduct || false,
      }));
      setExistingMainImage(data.mainImage || "");
      setExistingSideImages(data.sideImages || []);
      setSubCategories(categories[data.category] || []);
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "category") {
      setSubCategories(categories[value] || []);
      setFormData((prevData) => ({
        ...prevData,
        subCategory: "",
      }));
    }
  };

  const handleTagChange = (tagType, tags) => {
    setFormData((prevData) => ({
      ...prevData,
      [tagType]: tags,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "mainImage") {
      setMainImage(files[0]);
    } else if (name === "sideImages") {
      setSideImages([...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => form.append(key, item));
        } else {
          form.append(key, formData[key]);
        }
      }

      if (mainImage) {
        form.append("mainImage", mainImage);
      } else if (existingMainImage) {
        form.append("existingMainImage", existingMainImage);
      }

      if (sideImages.length > 0) {
        sideImages.forEach((image) => form.append("sideImages", image));
      } else {
        existingSideImages.forEach((image) =>
          form.append("existingSideImages", image)
        );
      }

      const response = id
        ? await updateProduct(id, form)
        : await addProduct(form);
      alert("Product saved successfully");
      navigate("/products");
    } catch (err) {
      setError("Failed to save product");
      console.error("Error details:", err.response || err.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter key
    }
  };
  

  return (
    <div className="">
      <div className="mb-20">
        <NavBar />
      </div>
      <div className="container">
        <div className=" max-w-[900px] p-[20px]  admin mb-20 mx-auto   text-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <h1 className="lgheading-org">Add Product Details</h1>

            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="productId" className="block text-sm font-medium">
                Product Id
              </label>
              <input
                type="text"
                id="productId"
                placeholder="Enter product id"
                className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Choose...</option>
                  {Object.keys(categories).map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="subCategory"
                  className="block text-sm font-medium"
                >
                  Sub Category
                </label>
                <select
                  id="subCategory"
                  className="mt-1 block w-full  text-white border border-gray-700 rounded-lg p-2"
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  required
                  
                >
                  <option value="">Choose...</option>
                  {subCategories.map((subCat, index) => (
                    <option key={index} value={subCat}>
                      {subCat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="2"
                placeholder="Enter description..."
                className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    id="price"
                    placeholder="Enter Price"
                    className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg pl-8 p-2"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="discount" className="block text-sm font-medium">
                  Discount
                </label>
                <input
                  type="number"
                  id="discount"
                  placeholder="Enter discount"
                  className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter title"
                className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="storage" className="block text-sm font-medium">
                Storage
              </label>
              <input
                type="text"
                id="storage"
                placeholder="Enter storage"
                className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                name="storage"
                value={formData.storage}
                onChange={handleInputChange}
              />
            </div>

            {/* {isShippingVisible && (
              <div className="mb-4">
                <label htmlFor="shipping" className="block text-sm font-medium">
                  Shipping
                </label>
                <input
                  type="text"
                  id="shipping"
                  placeholder="Enter shipping details"
                  className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                  name="shipping"
                  value={formData.shipping}
                  onChange={handleInputChange}
                />
              </div>
            )} */}

            <div className="mb-4">
              <label htmlFor="setInclude" className="block text-sm font-medium">
                Set Includes
              </label>
              <TagInput
                tagsData={formData.setInclude}
                onTagsChange={(tags) => handleTagChange("setInclude", tags)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dimensions" className="block text-sm font-medium">
                Dimensions
              </label>
              <TagInput
                tagsData={formData.dimensions}
                onTagsChange={(tags) => handleTagChange("dimensions", tags)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="materials" className="block text-sm font-medium">
                Materials
              </label>
              <TagInput
                tagsData={formData.materials}
                onTagsChange={(tags) => handleTagChange("materials", tags)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="uses" className="block text-sm font-medium">
                Uses
              </label>
              <TagInput
                tagsData={formData.uses}
                onTagsChange={(tags) => handleTagChange("uses", tags)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="features" className="block text-sm font-medium">
                Features
              </label>
              <TagInput
                tagsData={formData.features}
                onTagsChange={(tags) => handleTagChange("features", tags)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="preferFor" className="block text-sm font-medium">
                Prefer For
              </label>
              <TagInput
                tagsData={formData.preferFor}
                onTagsChange={(tags) => handleTagChange("preferFor", tags)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="idealFor" className="block text-sm font-medium">
                Ideal For
              </label>
              <TagInput
                tagsData={formData.idealFor}
                onTagsChange={(tags) => handleTagChange("idealFor", tags)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="topProduct" className="block text-sm font-medium">
                Top Product
              </label>
              <select
                id="topProduct"
                className="mt-1 block w-full bg-gray-900 text-white border border-gray-700 rounded-lg p-2"
                name="topProduct"
                value={formData.topProduct ? "true" : "false"}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    topProduct: e.target.value === "true",
                  }))
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="mainImage" className="block text-sm font-medium">
                Main Image
              </label>
              <input
                type="file"
                id="mainImage"
                name="mainImage"
                className="mt-1"
                onChange={handleFileChange}
                style={{width:"100%"}}
              />
              {existingMainImage && (
                <img
                  src={"http://3.87.157.93:5000/" + existingMainImage}
                  alt="Existing Main"
                  className="mt-2 max-w-xs"
                />
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="sideImages" className="block text-sm font-medium">
                Side Images
              </label>
              <input
                type="file"
                id="sideImages"
                name="sideImages"
                multiple
                className="mt-1"
                onChange={handleFileChange}
                style={{width:"100%"}}
              />
              {existingSideImages.length > 0 && (
                <div className="mt-2 flex flex-wrap">
                  {existingSideImages.map((image, index) => (
                    <img
                      key={index}
                      src={"http://3.87.157.93:5000/" + image}
                      className="w-24 h-24 object-cover mr-2"
                    />
                  ))}
                </div>
              )}
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <button
              style={{ width: "200px" }}
              type="submit"
              className="maintbn"
            >
              {id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;