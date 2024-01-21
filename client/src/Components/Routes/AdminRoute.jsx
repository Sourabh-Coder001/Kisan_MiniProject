import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/adminauth`);
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                // Handle errors if the request fails
                console.error("Error while fetching user authentication:", error);
                setOk(false);
            }
        };
        // Ensure to call the function to perform authentication check
        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet path=""/>: <Spinner/>   ;
}
