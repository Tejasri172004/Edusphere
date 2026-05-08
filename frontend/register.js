
async function sendOTP() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Please enter email first");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    alert(data.msg);

  } catch (err) {
    console.error(err);
    alert("Error sending OTP");
  }
}



document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const message = document.getElementById("message");
  message.textContent = "";

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
    role: document.getElementById("role").value,
    otp: document.getElementById("otp").value.trim()
  };

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    message.style.color = res.ok ? "green" : "red";
    message.textContent = result.msg;

  } catch (err) {
    console.error(err);
    message.style.color = "red";
    message.textContent = "Something went wrong";
  }
});