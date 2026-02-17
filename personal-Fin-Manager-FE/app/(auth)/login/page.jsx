"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import React from "react";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({email: "", password: ""});
    const [loading, setLoading] = useState(false);
    
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await api.post( `/api/users/login`, {
                email: user.email,
                password: user.password,
            });
            console.log("login success", response.data);
            
            // Set a frontend cookie so middleware knows user is logged in
            document.cookie = "loggedIn=true; path=/; max-age=86400; SameSite=Lax";
            
            toast.success("Login successful!");
            router.push("/profile");
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
        <h1>{loading ? "Logging in..." : "Login"}</h1>
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
