"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { login } from "@/Features/authSlice/authSlice";
import { useAppDispatch } from "@/Hooks/hooks";
import "./globals.css";

const LoginContainer = styled.div`
  @apply flex items-center justify-center p-4;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

export default function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateForm = (): boolean => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    localStorage.setItem("token", "mock-jwt-token");
    dispatch(
      login({
        email: email,
        token: "mock-jwt-token",
        password: password,
      })
    );
    router.push("/dashboard");
  };

  return (
    <LoginContainer>
      <div className="bg-gray-700 p-8 rounded-lg shadow-md w-4xl sm:ml-[30%] ml-[50%]">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </LoginContainer>
  );
}
