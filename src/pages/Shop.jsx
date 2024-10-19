import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Shop.css";
import { useProductList } from "../Data/Data";
import CartContext from "../../cartContext";
import { ColorRing } from "react-loader-spinner";

// Mapping of categories and sub-categories for the filters
const categories = {
  "Kitchen Chef Set": [
    "Damascus Steel Chef Sets",
    "Carbon Steel Chef Sets",
  ],
  "Chef Knifes": ["Fillet Knives"],
  Daggers: ["Damascus Steel Daggers", "D2 Steel Daggers"],
  Swords: [
    "Medieval Swords",
    "Premium Swords",
    "Vikings Swords",
    "Fantasy Swords",
    "Samurai Swords",
    "Damascus Steel Swords",
    "Stainless Steel Swords",
  ],
  "Bowie Knives": [
    "Stag Horn",
    "Camping Bowie Knife",
    "Hunting Bowie Knife",
  ],
  "EDC Knives": [
    "Folding knives",
    "Fixed Blade Knives",
    "KeyChain Knives",
    "Hunting Skinner Knives",
  ],
};

// Utility function to convert URL category to original category name
const formatCategory = (urlCategory) => {
  const formatted = Object.keys(categories).find(
    (category) => category.toLowerCase().replace(/ /g, "-") === urlCategory.toLowerCase()
  );
  return formatted || urlCategory;
};

const Shop = () => {
  const { products = [], loading, error } = useProductList();
  const { addToCart } = useContext(CartContext);
  const [showFilter, setShowFilter] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Set number of products per page
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");

    if (category) {
      const formattedCategory = formatCategory(category);
      setSelectedCategories([formattedCategory]);
    }
  }, [location.search]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleCheckboxChange = (event) => {
    setFilters({
      ...filters,
      [event.target.id]: event.target.checked,
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const filteredProducts = products.filter((product) => {
    const productCategory = product.category.toLowerCase().replace(/ /g, "-");
    const productSubCategory = product.subCategory
      ?.toLowerCase()
      .replace(/ /g, "-");

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesSubCategory = productSubCategory
      ? filters[productSubCategory] ||
        Object.values(filters).every((value) => !value)
      : true;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.title.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  // Calculate the products to display based on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const visibleProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page navigation
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  // Get sub-categories based on selected categories
  const selectedSubCategories = selectedCategories.reduce((acc, category) => {
    return acc.concat(categories[category] || []);
  }, []);

  return (
    <div>
      {loading ? (
        <div style={{display:"flex", justifyContent:"center", padding:"70px 0"}}>
        <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#ff7300', '#ff7300', '#ff7300', '#ff7300', '#ff7300']}
        />
        </div>
       
      ) : error ? (
        <p>Error fetching products: {error.message}</p>
      ) : (
        <>
          <div
            className={`${selectedCategories.join(" ")} subpages-header flex flex-col justify-center items-center mb-[80px]`}
          >
            <div className="container flex flex-col justify-center items-center">
              <h1 className="text-[30px] uppercase lgheading-org font-bold text-center my-5 text-white">
                {selectedCategories.length > 0
                  ? selectedCategories.join(", ")
                  : "All Products"}
              </h1>
              <p className="paraorg max-w-[600px] text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
                itaque eum quae eius? Incidunt dolor voluptates iste quo
                perferendis. Omnis, cum. Vero, reprehenderit eius quasi
                doloremque animi incidunt laudantium aliquid?
              </p>
            </div>
          </div>

          <div className="container">
            <section className="section-1-shop">
              <div className="flex flex-col lg:flex-row gap-[40px]">
                <button
                  onClick={toggleFilter}
                  className="filtertoggle block lg:hidden"
                >
                  Filter
                </button>
                <div
                  className={`filter-show w-[300px] ${
                    showFilter ? "hidden" : "block"
                  } lg:block`}
                >
                  <div>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="inputshop w-[100%]"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div>
                    <h3 className="sm-heading mt-10">Categories</h3>
                    <div className="categoreis-filterbox w-[300px] mt-5">
                      {/* Categories Section */}
                      {Object.keys(categories).map((category) => (
                        <div key={category}>
                          <input
                            type="checkbox"
                            id={category.toLowerCase().replace(/ /g, "-")}
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategorySelect(category)}
                          />
                          <label
                            htmlFor={category.toLowerCase().replace(/ /g, "-")}
                            className="paraorg mx-5"
                          >
                            {category.toUpperCase()}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories Section - Grouped by Category */}
                  {selectedCategories.length > 0 && (
                    <div className="categoreis-filterbox w-[300px] mt-5">
                      {selectedCategories.map((category) => (
                        <div key={category} className="mt-4">
                          <h4 className="sm-heading text-white" style={{ fontSize: "16px" }}>
                            {category}
                          </h4>
                          {categories[category].map((subCategory) => {
                            const subCategoryId = `${category
                              .toLowerCase()
                              .replace(/ /g, "-")}-${subCategory
                              .toLowerCase()
                              .replace(/ /g, "-")}`;
                            return (
                              <div key={subCategory} className="ml-4 mt-2">
                                <input
                                  type="checkbox"
                                  id={subCategoryId}
                                  checked={
                                    filters[subCategory.toLowerCase().replace(/ /g, "-")] || false
                                  }
                                  onChange={handleCheckboxChange}
                                />
                                <label
                                  htmlFor={subCategoryId}
                                  className="paraorg mx-5"
                                >
                                  {subCategory}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <p className="text-white text-[15px] mt-7 showresults">
                    Total Results {filteredProducts.length}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 my-20 gap-10 gap-y-[30px]">
                    {visibleProducts.map((element) => (
                      <div
                        className="grid md:grid-cols-2 gap-10 productshop relative"
                        key={element._id}
                      >
                        <Link to={`/product/${element._id}`}>
                          <img
                            className="w-[100%] h-[250px] object-cover rounded-xl"
                            src={
                              "https://api.edgedynasty.com:5000/" +
                              element.mainImage
                            }
                            alt={element.title}
                          />
                        </Link>
                        <div className="text-white relative">
                          <h3 className="text-[22px] font-[700]">
                            {element.name}
                          </h3>
                          <span>$ {element.price} USD</span>
                          <div className="flex items-center gap-5">
                            <span>available</span>
                          </div>
                          <p className="paraorg">{element.title}</p>
                          <div className="m-5 w-[100%] absolute bottom-20">
                            <button
                              className="text-white ml-[-10px] py-3 w-[86%]"
                              style={{
                                fontSize: "15px",
                                background: "#ff7300",
                                fontWeight: "600",
                              }}
                              onClick={() => handleAddToCart(element)}
                            >
                              Add To Cart
                            </button>
                          </div>
                          <Link to={`/product/${element._id}`}>
                            <div className="m-5 w-[100%] absolute bottom-0">
                              <button
                                className="bg-black-500 text-white ml-[-10px] py-3 w-[86%]"
                                style={{
                                  fontSize: "15px",
                                  border: "2px solid #ff7300",
                                }}
                              >
                                Buy now
                              </button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex justify-center mt-10">
                    <button
                      className="mx-2 py-3 px-5 text-white"
                      style={{
                        background: "unset",
                        border: "1px solid rgb(255, 115, 0)",
                        fontSize: "13px",
                      }}
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        className="mx-2 py-2 px-4 border text-white"
                        style={
                          currentPage === index + 1
                            ? {
                                background: "rgb(255, 115, 0)",
                                border: "1px solid rgb(255, 115, 0)",
                                fontSize: "13px",
                              }
                            : {
                                background: "unset",
                                border: "1px solid rgb(255, 115, 0)",
                                fontSize: "13px",
                              }
                        }
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className="mx-2 py-3 px-5 text-white"
                      style={{
                        background: "unset",
                        border: "1px solid rgb(255, 115, 0)",
                        fontSize: "13px",
                      }}
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
