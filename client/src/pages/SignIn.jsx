import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      console.log(data)
      if (data.success === false) {
        setError(data.message)
        setIsLoading(false)
        return
      }
      setIsLoading(false)
      setError(null)
      navigate("/")
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          id="email"
          onChange={handleChange}
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button disabled={isLoading} className="btn bg-gray-600 text-white p-3">
          {isLoading ? "Loading..." : "Sign In"}
        </button>
        <button className="btn bg-blue-500 text-white p-3">
          Continue with Google
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500 font-semibold hover:underline underline-offset-4">
            Register
          </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}

export default SignIn
