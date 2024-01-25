const ourForm = document.getElementById("ourForm");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");

ourForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("/auth/login", {
      email: emailField.value,
      password: passwordField.value,
    });

    // Handle successful response
    localStorage.setItem("ourToken", response.data.data.token);
    console.log("Login successful");
  } catch (error) {
    // Handle error response
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error data:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
      alert("Gagal login: " + error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      alert("Error request: " + error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error: " + error.message);
    }
  }
});
