const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});



document.getElementById('signin-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent the form from submitting traditionally

  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;

  const data = { email, password };

  try {
    const response = await fetch('http://localhost:3060/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Sign in successful: ' + result.message);

      // Redirect based on the dashboard field from the server response
      if (result.dashboard === 'admin_dashboard') {
        
        window.location.href = './Frontend/adminDashboard.html';
      } else {
        window.location.href = './Frontend/userDashboard.html';
      }
    } else {
      alert('Error: ' + result.error); // Display the error message from the server
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was an issue with the sign-in process. Please try again later.');
  }
});


document.getElementById('signup-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form from submitting traditionally

  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const data = { name, email, password };

  try {
    const response = await fetch('http://localhost:3060/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      alert('Sign up successful: ' + result.message); // Customize the response message
    } else {
      alert('Error: ' + result.message); // Display the error message
    }
  } catch (error) {
    console.error('Error:', error);
    alert('There was an issue with the sign-up process');
  }
});
