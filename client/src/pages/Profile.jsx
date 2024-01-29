import { useSelector, useDispatch } from "react-redux"
import { useRef, useState, useEffect } from "react"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { app } from "../../firebase"
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/slices/userSlice"

const Profile = () => {
  const { currentUser, isLoading, error } = useSelector((state) => state.user)
  const profilePicRef = useRef()
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(null)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (filePercentage === 100) {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000) // Display success message for 3 seconds
    }
  }, [filePercentage])

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileUpload = (file) => {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage(app)
    // Make a unique file name with timestamp
    const fileName = new Date().getTime() + file.name
    // Create a storage reference from our storage service
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(Math.round(progress))
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused")
            break
          case "running":
            console.log("Upload is running")
            break
        }
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      }
    )
  }

  const handleChange = (e) => {
    // Update form data state with new input
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      // Sent updated user data to backend
      const updatedUser = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await updatedUser.json()
      console.log(`data: `, data)

      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }

      // Update user in Redux store
      dispatch(updateUserSuccess(data.user))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  return (
    <div className="container mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={profilePicRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => profilePicRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="h-20 w-20 rounded-full self-center object-cover cursor-pointer mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError && (
            <span className="text-red-700">
              Error uploading image (must be less than 2 MB)
            </span>
          )}
          {filePercentage > 0 && filePercentage < 100 && (
            <span className="text-green-700">
              Uploading image... {filePercentage}%
            </span>
          )}
          {filePercentage === 100 && showSuccessMessage && (
            <span className="text-green-700">Image uploaded successfully!</span>
          )}
        </p>
        <input
          id="username"
          defaultValue={currentUser.username}
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          id="email"
          defaultValue={currentUser.email}
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="btn bg-slate-700 text-white p-3 uppercase"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <hr className="my-5" />
      <p className="text-red-700 text-center">
        {error ? `Error: ${error}` : ""}
      </p>
      <p className="text-green-700 text-center">
        {updateSuccess ? "User updated successfully." : ""}
      </p>
    </div>
  )
}

export default Profile
