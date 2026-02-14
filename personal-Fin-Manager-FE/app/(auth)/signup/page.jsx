"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import React from "react";


export default function SignUpPage() {
    const router = useRouter();
    
    const [user, setUser] = useState({email: "", password: "", username: "", fullName: ""});
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await api.post( `/api/users/signup`, {
                username: user.username,
                email: user.email,
                password: user.password,
                fullName: user.fullName,
            });
            console.log("Signup success", response.data);
            toast.success("Signup successful!");
            router.push("/login");
            return;
        } catch (err) {
            console.log("Signup failed", err.message);
            toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
        }
    
        useEffect(() => {
            if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 && user.fullName.length > 0){
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }, [user])

    return (
        <div>
        <div>
        <h1>Sign Up</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({...user, username: e.target.value})}
        />
        </div>
        <div>
        <label htmlFor="fullName">Full Name</label>
        <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="text"
          id="fullName"
          value={user.fullName}
          onChange={(e) => setUser({...user, fullName: e.target.value})}
        />
        </div>
        <div>
        <label htmlFor="email">Email</label>
        <input 
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
        />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
        />
        </div>
        <div>
        <button className = "p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignUp} disabled={loading || buttonDisabled}>
            {loading ? "Signing up..." : "Sign Up"}
        </button>
        </div>
        <Link className="text-blue-600 hover:text-blue-800 underline mt-4 inline-block" href="/login">Visit Login page</Link>
        </div>
    )
}

