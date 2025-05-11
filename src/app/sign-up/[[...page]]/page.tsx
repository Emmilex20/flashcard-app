"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row max-w-4xl w-full overflow-hidden">
        
        {/* Left Branding Section */}
        <div className="w-full lg:w-1/2 bg-indigo-600 p-10 text-white flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
          <h2 className="text-2xl sm:text-3xl font-bold mt-4 text-center">Welcome to Flashcards!</h2>
          <p className="mt-2 text-base sm:text-lg text-indigo-100 text-center">
            Create your account and start exploring.
          </p>
        </div>

        {/* Right Sign-Up Section */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex justify-center items-center">
          <SignUp
            appearance={{
              elements: {
                card: "shadow-none w-full",
              },
              variables: {
                colorPrimary: "#4f46e5",
              },
            }}
            path="/sign-up"
            routing="path"
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </div>
  );
}
