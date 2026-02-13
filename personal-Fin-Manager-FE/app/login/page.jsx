"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import React from "react";


export default function LoginPage() {
    
    const [user, setUser] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
                email: user.email,
                password: user.password,
            });
            console.log("login success", response.data);
            toast.success("Login successful!");
            // router.push("/");
            return;
        } catch (err) {
            console.log("login failed", err.message);
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    
    }
    return (
        <>
        <div>
        <h1>Login</h1>
        <hr />
        </div>  
        <div>
        <label htmlFor="email">Email</label>
        <input className = "p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email" 
        id="email" 
        value={user.email} 
        onChange={(e) => setUser({...user, email: e.target.value})} 
        />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input className = "p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password" 
        id="password" 
        value={user.password} 
        onChange={(e) => setUser({...user, password: e.target.value})} 
        />
        </div>
        <div>
        <button className = "p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
        </button>
        </div>
        <Link className="text-blue-600 hover:text-blue-800 underline mt-4 inline-block" href="/signup"> Visit Sign Up page</Link> 
        </>
    )
}
