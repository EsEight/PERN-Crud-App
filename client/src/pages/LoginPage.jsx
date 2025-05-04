import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, errors: loginErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(()  => {
     if(isAuthenticated) navigate("/tasks")
  },[isAuthenticated])

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {
          loginErrors.map((error,i) => (
            <div className="bg-red-500 p-2 my-2" key={i}> {error} </div>
          )) 
        } 
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          

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

          <button className="bg-indigo-500 px-4 py-1 rounded-sm">Login</button>
        </form>
        <p className="flex gap-x-2 justify-between ">
        Do not have an account? <Link className="bg-sky-500 px-4 py-1 rounded-sm" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
