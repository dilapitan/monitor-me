<template>
  <v-container>
    <br /><br />
    <v-row>
      <v-col class="text-center">
        <v-btn @click="loginWithGoogle()">Login with Google</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from '@/firebase/config/.env.js'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default {
  name: 'Login',

  methods: {
    loginWithGoogle() {
      console.log('Loggin in with Google...')

      const provider = new GoogleAuthProvider()
      console.log('provider:', provider)
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          console.log('token:', token)
          // The signed-in user info.
          const user = result.user
          console.log('user:', user)
          // ...
        })
        .catch((error) => {
          console.log('error:', error)
          // Handle Errors here.
          // const errorCode = error.code
          // const errorMessage = error.message
          // // The email of the user's account used.
          // const email = error.email
          // // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error)
          // ...
        })
    },
  },
}
</script>
