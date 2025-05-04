import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md flex flex-col items-center">
        <h1 className="text-4xl font-bold my-5">Tasks App</h1>
        <Link className="bg-indigo-500 px-4 py-1 rounded-sm" to="/login">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
