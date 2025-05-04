import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-800 mb-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to="/">Tasks App</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to="/add-task"
              >
                Add task
              </Link>
            </li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to="/tasks"
              >
                Tasks
              </Link>
            </li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to="/profile"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login{" "}
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
