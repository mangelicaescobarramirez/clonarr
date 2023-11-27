import { Link } from "react-router-dom";

function RegistroUsuario() {
  return (
    <div>
      {/* Header */}
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl py-2 font-bold text-white">Registro de Usuario</h1>
        <p className="text-md text-slate-400">
          ¡Regístrate para acceder a todos nuestros servicios y funciones
          increíbles! 
        </p>
        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Empezar
        </Link>
      </header>
      {/* Registro Section */}
      <section className="bg-gray-200 p-10">
        <h2 className="text-3xl font-bold mb-4">Completa tu Registro</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              className="w-full bg-white text-gray-800 p-4 py-2 rounded-md"
              id="nombre"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="correo">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full bg-white text-gray-800 p-4 py-2 rounded-md"
              id="correo"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2" htmlFor="contraseña">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full bg-white text-gray-800 p-4 py-2 rounded-md"
              id="contraseña"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="bg-zinc-500 text-white px-4 py-2 rounded-md"
          >
            Registrarse
          </button>
        </form>
      </section>
    </div>
  );
}

export default RegistroUsuario;

