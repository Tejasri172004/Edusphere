document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // ✅ DEFINE HERE
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const message = document.getElementById("message");

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }) // ✅ use here
    });

    const data = await res.json();

    if (res.ok) {
      message.style.color = "green";
      message.textContent = "Login successful";

      localStorage.setItem("currentUser", JSON.stringify(data.user));

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      message.style.color = "red";
      message.textContent = data.msg;
    }

  } catch (err) {
    console.error(err);
    message.style.color = "red";
    message.textContent = "Something went wrong";
  }
});