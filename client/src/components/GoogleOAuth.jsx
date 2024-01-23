import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from "../../firebase.js"
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/slices/userSlice.js"
import { useNavigate } from "react-router-dom"

const GoogleOAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      const response = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      })
      // Save the Google api response in the data variable and dispatch it to the Redux store
      const data = await response.json()
      try {
        console.log(data)
        dispatch(signInSuccess(data))
        navigate("/")
      } catch (error) {
        console.log("Could not dispatch Google sign in data ", error)
      }
    } catch (error) {
      console.log("Could not sign in with Google ", error)
    }
  }

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="btn bg-blue-500 text-white p-3"
    >
      Continue with Google
    </button>
  )
}

export default GoogleOAuth
