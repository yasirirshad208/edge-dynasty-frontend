import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css"; // Reusing the existing CSS
import NavBar from "../Components/Adminnavbar";
import { format } from "date-fns";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage] = useState(5); // Number of items per page
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which order's dropdown is open

  const navigate = useNavigate(); // If navigation is required
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("No auth token found.");
        return;
      }

      try {
        const response = await axios.get(
          "https://api.edgedynasty.com:5000/api/order/get/all",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Fixed template literal syntax
            },
          }
        );
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  const thValues = [
    "Order Id",
    "Products Id",
    "Product Name",
    "Quantity",
    "Amount",
    "Shipping",
    "Email",
    "First Name",
    "Last Name",
    "Country",
    "Street Address 1",
    "Street Address 2",
    "State",
    "City",
    "Post Code",
    "Phone",
    "Order Status",
    "Created At",
  ];

  // Map order status to background colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "processing":
        return "bg-[#ffc107] text-black rounded-[50rem] text-[13px] px-3 py-1 text-center";
      case "delivered":
        return "bg-green-500 text-black rounded-[50rem] text-[13px] px-3 py-1 text-center";
      case "cancelled":
        return "bg-red-500 text-white rounded-[50rem] text-[13px] px-3 py-1 text-center";
      case "returned":
        return "bg-blue-500 text-white rounded-[50rem] text-[13px] px-0 py-1 text-center";
      default:
        return "bg-gray-500 text-white rounded-[50rem] text-[13px] px-3 py-1"; // Default style
    }
  };

  // Handle order status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `https://api.edgedynasty.com:5000/api/order/update/status/${orderId}`, // Fixed template literal syntax
        { orderStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed template literal syntax
          },
        }
      );

      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      );
      setOrders(updatedOrders);
      setDropdownOpen(null); // Close the dropdown after updating
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Calculate the current orders based on pagination
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate the total number of pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Pagination function
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="bg-[#0e0e0e] main-dash">
      <div className="mb-20">
        <NavBar />
      </div>
      <div className="products-container">
        <div className="header">
          <h1 className="title">Orders</h1>
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
              {currentOrders.map((order, index) => (
                <tr key={index}>
                  <td className="cell">{indexOfFirstOrder + index + 1}</td>
                  <td className="cell">ED{order.orderId}</td>
                  <td className="cell">
                    {order.products.map((product) => (
                      <div key={product._id.productId}>{product._id.productId}</div>
                    ))}
                  </td>
                  <td className="cell">
                    {order.products.map((product) => (
                      <div key={product._id}>{product._id.name}</div>
                    ))}
                  </td>
                  <td className="cell">
                    {order.products.map((product) => (
                      <div key={product._id}>{product.quantity}</div>
                    ))}
                  </td>
                  <td className="cell">{order.amount || "N/A"}</td>
                  <td className="cell">{order.shipping || "N/A"}</td>
                  <td className="cell">{order.email || "N/A"}</td>
                  <td className="cell">{order.firstName || "N/A"}</td>
                  <td className="cell">{order.lastName || "N/A"}</td>
                  <td className="cell">{order.country || "N/A"}</td>
                  <td className="cell">{order.streetAddress1 || "N/A"}</td>
                  <td className="cell">{order.streetAddress2 || "N/A"}</td>
                  <td className="cell">{order.state || "N/A"}</td>
                  <td className="cell">{order.city || "N/A"}</td>
                  <td className="cell">{order.postCode || "N/A"}</td>
                  <td className="cell">{order.phone || "N/A"}</td>

                  {/* Order Status with dropdown */}
                  <td className="cell">
                    <div className="relative">
                      <div
                        onClick={() =>
                          setDropdownOpen(dropdownOpen === order._id ? null : order._id)
                        }
                        className={`cursor-pointer order-status-text ${getStatusStyle(order.orderStatus)}`}
                      >
                        {order.orderStatus || "N/A"}
                      </div>

                      {dropdownOpen === order._id && (
                        <div className="absolute bg-[#0e0e0e] border mt-1 p-2 z-30">
                          <div
                            className="status-option cursor-pointer p-3 hover:bg-[#1f2937]"
                            onClick={() => handleStatusChange(order._id, "processing")}
                          >
                            Processing
                          </div>
                          <div
                            className="status-option cursor-pointer p-3 hover:bg-[#1f2937]"
                            onClick={() => handleStatusChange(order._id, "delivered")}
                          >
                            Delivered
                          </div>
                          <div
                            className="status-option cursor-pointer p-3 hover:bg-[#1f2937]"
                            onClick={() => handleStatusChange(order._id, "cancelled")}
                          >
                            Cancelled
                          </div>
                          <div
                            className="status-option cursor-pointer p-3 hover:bg-[#1f2937]"
                            onClick={() => handleStatusChange(order._id, "returned")}
                          >
                            Returned
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Created At */}
                  <td className="cell">
                    {order.createdAt
                      ? format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")
                      : "N/A"}
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
                      color: "#fff",
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
  );
};

export default Orders;
