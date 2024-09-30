<template>
  <div class="container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <input
        type="text"
        name="firstName"
        v-model="formData.firstName"
        placeholder="First Name"
        class="input"
        required
      />
      <input
        type="text"
        name="lastName"
        v-model="formData.lastName"
        placeholder="Last Name"
        class="input"
        required
      />
      <input
        type="text"
        name="username"
        v-model="formData.username"
        placeholder="Username"
        class="input"
        required
      />
      <input
        type="email"
        name="email"
        v-model="formData.email"
        placeholder="Email"
        class="input"
        required
      />
      <input
        type="password"
        name="password"
        v-model="formData.password"
        placeholder="Password"
        class="input"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        v-model="formData.confirmPassword"
        placeholder="Confirm Password"
        class="input"
        required
      />
      <button type="submit" class="button">
        Sign Up
      </button>
    </form>
  </div>
</template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'SignUp',
    setup() {
      const formData = ref({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
  
      const router = useRouter();
  
      const handleSubmit = async () => {
        try {
          const response = await fetch(`${process.env.VUE_APP_API_URL}/api/authRoutes/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.value),
          });
  
          const result = await response.json();
          console.log('Sign-up result:', result);
  
          if (response.ok) {
            router.push('/Home'); // Redirect on success
          }
  
          // Handle any additional logic for unsuccessful sign-up here
        } catch (error) {
          console.error('Error during sign-up:', error);
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
  background: #f5f3e8; /* Light parchment or old paper color */
  border: 2px solid #4a3c2b; /* Dark brown border */
  border-radius: 12px; /* Rounded corners */
  padding: 20px;
  margin: 20px auto;
  font-family: 'Garamond', serif; /* Medieval-style font */
  color: #3b2a1a; /* Dark text color for contrast */
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Cinzel', serif; /* Example of a medieval-inspired font */
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .input {
    padding: 10px;
    margin: 10px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .button {
    padding: 10px;
    margin-top: 10px;
    background-color: #B08D57;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.5s ease;
  }
  
  .button:hover {
    background-color: #DAA520;
    transform: scale(1.05);
  }
</style>
  