import { useState, useEffect } from "react"

// OAuth redirect URI
// const facebook_uri = "https://mern-estate-9e8ae.firebaseapp.com/__/auth/handler"

const FacebookOAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userAccessToken, setUserAccessToken] = useState(null)

  useEffect(() => {
    window.fbAsyncInit = () => {
      FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      })

      FB.AppEvents.logPageView()

      FB.getLoginStatus(function (response) {
        statusChangeCallback(response)
      })

      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
      function testAPI() { 
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
    };

    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = "https://connect.facebook.net/en_US/sdk.js"
      fjs.parentNode.insertBefore(js, fjs)
    })(document, "script", "facebook-jssdk")
  }, []); // Run the effect only once on component mount

  const statusChangeCallback = (response) => {
    console.log("statusChangeCallback")
    console.log(response)
    if (response.status === "connected") {
      // Logged into your app and Facebook.
      testAPI()
    } else {
      // Not logged into your app or we are unable to tell.
      setIsLoggedIn(false)
      setUserAccessToken(null)
      console.log("Unable to login to app.")
    }
  }

  const handleFacebookClick = async () => {
    try {
      const provider = new FacebookAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      console.log(result)
    } catch (error) {
      console.log("Could not sign in with Facebook ", error)
    }
  }

  return (
    <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
    </fb:login-button>
  )
}

export default FacebookOAuth
