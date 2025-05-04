import { useAuth  } from "../context/AuthContext"


function Profile() {

 const {user} = useAuth()

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        <h1 className="text-3xl font-bold">{user.username}</h1>
        <p>{user.email}</p>
      </div>
    </div>
  )
}

export default Profile