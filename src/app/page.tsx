"use client";

import { useState } from "react";
import { account , ID } from "./appwrite";
import { AppwriteException } from "appwrite";

function LoginPage() {

  const [loggedInUser, setLoggedInUser] = useState <{ name:string} | null> (null);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [name, setName] = useState("");


  const login = async (email: string, password: string) => {
    try{
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
    } catch (error) {
      console.log("Login failed" , error);
    }
  };

  const register = async () => {
    try {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
    } catch (error) {
      if (error instanceof AppwriteException && error.code === 404) {
        console.error("An account with this email already exists.");
        
      } else{
        console.error("Registration failed" , error);
      }
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
        <p className="text-2xl text-yellow-600 mb-4">You are logged in as {loggedInUser.name}</p>
        <button 
        type="button" 
        onClick={logout} 
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Logout
        </button>
      </div>
      </div>
      </>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <p className="text-2xl text-center text-red-600 mb-6">You are not logged in</p>

      <form className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
        type="button" 
        onClick={() => login(email, password)}>
        Login
        </button>

        <button 
        type="button" 
        onClick={register}
        className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
        Register
        </button>


      </form>
    </div>
    </div>
  );
};
export default LoginPage;