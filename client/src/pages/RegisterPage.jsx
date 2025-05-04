import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });

  return (
  <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <h1 className="text-2xl font-bold">Register</h1>
      <form onSubmit={onSubmit}>
        {
          registerErrors.map((error,i) => (
            <div className="bg-red-500 p-2" key={i}> {error} </div>
          )) 
        }
        {errors.username && (
          <p className="text-red-500">Username Is Required</p>
        )}
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-700 outline-none text-white px-2 py-2 rounded-md my-2"
          placeholder="Write your username"
        />

        {errors.email && <p className="text-red-500">Email Is Required</p>}

        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 outline-none text-white px-2 py-2 rounded-md my-2"
          placeholder="Write your email"
        />

        {errors.password && (
          <p className="text-red-500">Password Is Required</p>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          className="w-full bg-zinc-700 outline-none text-white px-2 py-2 rounded-md my-2"
          placeholder="Write your password"
        />

        <button className="bg-indigo-500 px-4 py-1 rounded-sm">Register</button>
      </form>
      <p className="flex gap-x-2 justify-between ">
        Already have an account? <Link className="bg-sky-500 px-4 py-1 rounded-sm" to="/login">Login</Link>
        </p>
    </div>
  </div>
  );
}

export default RegisterPage;
