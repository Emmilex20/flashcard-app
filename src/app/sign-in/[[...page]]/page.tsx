"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl flex max-w-4xl w-full overflow-hidden">
        {/* Left Side (Optional Image or Branding) */}
        <div className="w-1/2 bg-indigo-600 p-10 text-white hidden lg:flex flex-col justify-center items-center">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <h2 className="text-3xl font-bold mt-4">Welcome Back!</h2>
          <p className="mt-2 text-lg text-indigo-100">
            Sign in to continue using Flashcards.
          </p>
        </div>

        {/* Right Side (Clerk SignIn) */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10">
          <SignIn
            appearance={{
              elements: {
                card: "shadow-none",
              },
              variables: {
                colorPrimary: "#4f46e5",
              },
            }}
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  );
}
