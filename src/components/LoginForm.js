// LoginForm.js

// Import necessary libraries
import React from 'react';

// Define the functional component LoginForm
const LoginForm = () => {
  return (
    // Form element for user login
    <form>
      {/* Label and input for username */}
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      
      {/* Label and input for password */}
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      
      {/* Submit button for the form */}
      <button type="submit">Login</button>
    </form>
  );
};

// Export the LoginForm component for use in other parts of the application
export default LoginForm;