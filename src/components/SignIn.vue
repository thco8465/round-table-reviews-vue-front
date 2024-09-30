<template>
  <div class="container">
    <h2>Sign In</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <input type="email" name="email" v-model="formData.email" placeholder="Email" class="input" />
      <input type="text" name="username" v-model="formData.username" placeholder="Username" class="input" />
      <input type="password" name="password" v-model="formData.password" placeholder="Password" class="input" required />
      <button type="submit" class="button">Sign In</button>
    </form>
    <p class="prompt">Don't have an account?</p>
    <div class="signUpPrompt">
      <RouterLink to="/SignUp" class="signUpButton">Sign Up Here</RouterLink>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SignIn',
  setup(props, { emit }) {
    const formData = ref({ email: '', username: '', password: '' });
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        const response = await fetch(`${process.env.VUE_APP_API_URL}/api/authRoutes/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData.value),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token); // Store token
          console.log('Sign-in successful:', data);

          // Emit an event to let the parent know sign-in is successful
          emit('authenticated', true); // Emit event AFTER setting the token

          await router.push('/Home'); // Redirect to Home
        } else {
          console.error('Sign-in failed:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return {
      formData,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f3e8;
  /* Light parchment or old paper color */
  border: 2px solid #4a3c2b;
  /* Dark brown border */
  border-radius: 12px;
  /* Rounded corners */
  padding: 20px;
  margin: 20px auto;
  font-family: 'Garamond', serif;
  /* Medieval-style font */
  color: #3b2a1a;
  /* Dark text color for contrast */
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Cinzel', serif;
  /* Example of a medieval-inspired font */
}

.form {
  font-family: 'Cinzel', serif;
  /* Example of a medieval-inspired font */
  display: flex;
  flex-direction: column;
}

.input {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.prompt {
  text-align: center;
  padding: 10px;
}

.button {
  padding: 10px;
  margin-top: 10px;
  background-color: #B08D57;
  /* Gold color for medieval feel */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  /* Add smooth transitions */

}

.button:hover {
  background-color: #DAA520;
  /* Darker gold for hover effect */
  transform: scale(1.05);
}

.signUpPrompt {
  margin-top: 10px;
  text-align: center;
}

.signUpButton {
  padding: 10px 10px;
  background-color: #B08D57;
  /* Button background */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  /* Add smooth transitions */
}

.signUpButton:hover {
  background-color: #DAA520;
  /* Darker gold for hover effect */
  transform: scale(1.05);
}
</style>