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
    
    }
    return (
        <>
        <div>
        <h1>Login</h1>
        <hr />
        </div>  
        <div>
        <label htmlFor="email">Email</label>
        <input 
        type="email" 
        id="email" 
        value={user.email} 
        onChange={(e) => setUser({...user, email: e.target.value})} 
        />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        id="password" 
        value={user.password} 
        onChange={(e) => setUser({...user, password: e.target.value})} 
        />
        </div>
        <div>
        <button onClick={onLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
        </button>
        </div>
        <Link href="/signup"> Visit Sign Up page</Link> 
        </>
    )
}
