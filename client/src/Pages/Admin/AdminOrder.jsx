import React, { useState, useEffect } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import Footer from "../../Components/Layout/Footer";
const { Option } = Select;

const AdminOrder = () => {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ]);
      const [changeStatus, setChangeStatus] = useState("");
      const [orders, setOrders] = useState([]);
      const [auth, setAuth] = useAuth();
    
      const getOrders = async () => {
        try {
          const { data } = await axios.get(`http://localhost:8080/api/allorders`);
          setOrders(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        if (auth?.token) getOrders();
      }, [auth?.token]);
    
      const handelChange = async (orderId, value) => {
        try {
          const { data } = await axios.put(
            `http://localhost:8080/api/orderstatus/${orderId}`,
            {
              status: value,
            }
          );
          getOrders();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <Layout title={"All Order data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders.map((o, i) => (
            <div key={i} className="border-shadow mb-4">
              <table key={i} className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                    <Select
                        bordered={false} // Correct prop name: 'bordered'
                        onChange={(value) => handelChange(o._id, value)} // Pass order ID correctly
                        defaultValue={o?.status}
                      >
                        {status.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td>{o?.buyer?.name}</td>
                    <td>{moment(o?.createdAt).fromNow()}</td>
                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>

              <div className="container">
                {o?.products?.map((p, index) => (
                  <div key={index} className="row mb-2 p-3 card flex-row">
                    <div className="col-md-4">
                      <img
                        src={`http://localhost:8080/api/productphoto/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100px"
                        height="100px"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>{p.name}</p>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>Price : {p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </Layout>
  );
};

export default AdminOrder;
