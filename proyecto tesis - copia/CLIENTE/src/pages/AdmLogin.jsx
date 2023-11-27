import React, { useState } from "react";
import { Link } from "react-router-dom";
function LoginAdm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Aquí puedes agregar la lógica de autenticación
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-zinc-800 p-4 md:p-8 text-center">
        <h1 className="text-5xl py-2 font-bold text-white">Welcome to React Tasks</h1>
        <p className="text-md text-slate-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          fugit doloremque molestias recusandae labore repellat amet dicta tempore
          necessitatibus facilis repellendus voluptas ducimus maiores deserunt sed
          quo ratione provident debitis aut, voluptatem aliquam iste blanditiis
          ex? Voluptatibus, fuga quasi necessitatibus cumque optio error enim,
          officia accusantium vitae doloremque, molestias modi.
        </p>
      
      </header>
      {/* Login Form */}
      <section className="bg-gray-200 p-4 md:p-10 flex-grow">
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="border p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="border p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-zinc-500 text-white px-4 py-2 rounded-md w-full"
            >
              Login
            </button>
          </form>
        </div>
      </section>
      {/* Services Section */}
      <section className="bg-gray-200 p-4 md:p-10">
        {/* ... (código existente) */}
      </section>
      {/* Testimonials Section */}
      <section className="bg-white p-4 md:p-10">
        {/* ... (código existente) */}
      </section>
    </div>
  );
}
export default LoginAdm;