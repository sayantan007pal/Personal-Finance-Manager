"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";


export default function ProfilePage(){

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const router = useRouter();
    const logout = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`);
            toast.success("Logout successful!");
            router.push("/login");
        } catch (err) {
            console.log("Logout failed", err.message);
            toast.error("Logout failed");
        }
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <hr />
            <button
            onClick={logout}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Logout
        </button>
        </div>
    )
}

