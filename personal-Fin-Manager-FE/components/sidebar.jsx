'use client'
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";

const Sidebar = () => {
    const router = useRouter();

    const logout = async () => {
        try {
            await api.get(`/api/users/logout`);
            toast.success("Logout successful!");
        } catch (err) {
            console.log("Logout failed", err.message);
            // Still logout locally even if API fails
        } finally {
            // Always clear frontend loggedIn cookie and redirect
            document.cookie = "loggedIn=; path=/; max-age=0";
            router.push("/login");
        }
    }

    return (
        <aside className="flex flex-col justify-between h-full w-64 bg-gray-900 text-white p-4">
            <div>
                <h1 >Menu</h1>
                <hr />
                <Link href="/profile" className="block py-2 px-3 rounded hover:bg-gray-700 transition">Dashboard</Link>
                <Link href="/account" className="block py-2 px-3 rounded hover:bg-gray-700 transition">Accounts</Link>
                <Link href="/transactions" className="block py-2 px-3 rounded hover:bg-gray-700 transition">Transactions</Link>
            </div>
            <button
                onClick={logout}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full"
            >
                Logout
            </button>
        </aside>
    )
}

export default Sidebar