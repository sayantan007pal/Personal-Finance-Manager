"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            queueMicrotask(() => {
                setStatus("error");
                setMessage("Invalid verification link. Missing token.");
            });
            return;
        }

        let cancelled = false;
        const verifyEmail = async () => {
            try {
                const response = await api.post(
                    `/api/users/verifyemail`,
                    { token }
                );
                if (!cancelled) {
                    setStatus("success");
                    setMessage(response.data.message || "Email verified successfully!");
                }
            } catch (error) {
                if (!cancelled) {
                    setStatus("error");
                    setMessage(error.response?.data?.message || "Verification failed");
                }
            }
        };

        verifyEmail();
        return () => { cancelled = true; };
    }, [searchParams]);

    return (
        <>
            {status === "loading" && <p>Verifying your email...</p>}
            
            {status === "success" && (
                <div>
                    <p style={{ color: "green" }}>{message}</p>
                    <Link href="/login">Go to Login</Link>
                </div>
            )}
            
            {status === "error" && (
                <div>
                    <p style={{ color: "red" }}>{message}</p>
                    <Link href="/signup">Back to Signup</Link>
                </div>
            )}
        </>
    );
}

export default function VerifyEmailPage() {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Email Verification</h1>
            <hr />
            <Suspense fallback={<p>Loading...</p>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    );
}
