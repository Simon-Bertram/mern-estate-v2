import { useSelector } from "react-redux"

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className="container mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="h-20 w-20 rounded-full self-center object-cover cursor-pointer mt-2"
        />
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
        />
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
        />
        <button className="btn bg-slate-700 text-white p-3 uppercase">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
