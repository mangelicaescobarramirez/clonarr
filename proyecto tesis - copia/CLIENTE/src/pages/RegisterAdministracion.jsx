import { useForm } from "react-hook-form";
import { registerRequestamd } from "../api/authadm.js";

function RegisterAdministracion() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-lime-600 h-screen flex justify-center items-center">
      <form
        className="bg-neutral-300 p-8 rounded-md"
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          const rest = await registerRequestamd(values);
          console.log(rest);
        })}
      >
        <div>
          <label htmlFor="Id_admin">ID Administración:</label>
          <input
            type="text"
            {...register("Id_admin", { required: true })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            {...register("correo", { required: true })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            {...register("contraseña", { required: true })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="rol">Rol:</label>
          <input
            type="text"
            {...register("rol", { required: true })}
            className="w-full p-4 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-lime-600 text-white p-2 rounded-md mt-4"
        >
          Registro
        </button>
      </form>
    </div>
  );
}

export default RegisterAdministracion;

