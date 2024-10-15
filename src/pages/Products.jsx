import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../http/http";
import "../styles/Products.css";
import NavBar from "../Components/Adminnavbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(5); // Number of items per page
  const navigate = useNavigate();

  const thValues = [
    "Name",
    "Product Id",
    "Category",
    "Sub Category",
    "Price",
    "Discount",
    "Description",
    "Title",
    "Set Include",
    "Dimensions",
    "Materials",
    "Uses",
    "Storage",
    "Features",
    "Main Image",
    "Side Image",
    "Shipping",
    "Ideal For",
    "Prefer For",
    "Top Product",
    "Action",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const deletePro = async (id) => {
    if (confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const updatePro = (id, data) => {
    navigate("/admin", {
      state: { id, data },
    });
  };

  // Calculate the current products based on pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Pagination function
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-[#0e0e0e] main-dash" >
      <div className="mb-20">
        <NavBar />
      </div>
      <div className="products-container">
        <div className="header">
          <h1 className="title">Products</h1>
        </div>
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th className="header-cell">#</th>
                {thValues.map((val, index) => (
                  <th key={index} className="header-cell">
                    {val}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={product._id || index}>
                  <td className="cell">{indexOfFirstProduct + index + 1}</td>
                  <td className="cell">{product.name || "N/A"}</td>
                  <td className="cell">{product.productId || "N/A"}</td>
                  <td className="cell">{product.category || "N/A"}</td>
                  <td className="cell">{product.subCategory || "N/A"}</td>
                  <td className="cell">{product.price || "N/A"}</td>
                  <td className="cell">{product.discount || "N/A"}</td>
                  <td className="cell">{product.description || "N/A"} </td>
                  <td className="cell">{product.title || "N/A"}</td>
                  <td className="cell">
                    {product.setInclude && Array.isArray(product.setInclude)
                      ? product.setInclude.join(", ")
                      : "N/A"}
                  </td>
                  <td className="cell">
                    {product.dimensions && Array.isArray(product.dimensions)
                      ? product.dimensions.join(", ")
                      : "N/A"}
                  </td>
                  <td className="cell">
                    {product.materials && Array.isArray(product.materials)
                      ? product.materials.join(", ")
                      : "N/A"}
                  </td>
                  <td className="cell">
                    {product.uses && Array.isArray(product.uses)
                      ? product.uses.join(", ")
                      : "N/A"}
                  </td>
                  <td className="cell">{product.storage || "N/A"}</td>
                  <td className="cell">
                    {product.features && Array.isArray(product.features)
                      ? product.features.join(", ")
                      : "N/A"}
                  </td>
                  <td className="cell">
                    {product.mainImage ? (
                      <img
                        src={"http://3.87.157.93:5000/" + product.mainImage}
                        alt="Main"
                        className="main-image"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="cell">
                    {product.sideImages && product.sideImages.length > 0 ? (
                      <img
                        src={"http://3.87.157.93:5000/" + product.sideImages[0]}
                        alt="Side"
                        className="side-image"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="cell">{product.shipping || "N/A"}</td>
                  <td className="cell">
                    {product.idealFor && Array.isArray(product.idealFor)
                      ? product.idealFor.join(", ")
                      : "N/A"}
                  </td>
                  <td className="cell">
                    {product.preferFor && Array.isArray(product.preferFor)
                      ? product.preferFor.join(", ")
                      : "N/A"}
                  </td>
                  <td className="cell">{product.topProduct ? "Yes" : "No"}</td>
                  <td className="cell actions">
                    <button
                      onClick={() => updatePro(product._id, product)}
                      className="button-update"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deletePro(product._id)}
                      className="button-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-10">
                    <button
                      className="mx-2 py-3 px-5 text-white"
                      style={{background:"unset", border:"1px solid rgb(255, 115, 0)", fontSize:"13px"}}
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        className={`mx-2 py-2 px-4 border text-white`}
                      style={currentPage === index + 1 ? {background:"rgb(255, 115, 0)", border:"1px solid rgb(255, 115, 0)", fontSize:"13px"}:{background:"unset",border:"1px solid rgb(255, 115, 0)", fontSize:"13px"}}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className="mx-2 py-3 px-5 text-white"
                      style={{background:"unset", border:"1px solid rgb(255, 115, 0)", fontSize:"13px"}}
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
      </div>
    </div>
  );
};

export default Products;
