





// const toggleFormButton = document.getElementById('toggleFormButton');
// const formContainer = document.getElementById('formContainer');
// const formTitle = document.getElementById('formTitle');
// const form = document.getElementById('form');
// const toggleFormType = document.getElementById('toggleFormType');

// let isSignup = true;

// // Show/Hide Form
// toggleFormButton.addEventListener('click', () => {
//   formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
//   updateForm();
// });

// // Switch between Signup/Login
// toggleFormType.addEventListener('click', () => {
//   isSignup = !isSignup;
//   updateForm();
// });

// function updateForm() {
//   form.innerHTML = '';
//   formTitle.textContent = isSignup ? 'Sign Up' : 'Login';
//   if (isSignup) {
//     form.innerHTML = `
//       <input type="email" id="email" placeholder="Email" required />
//       <input type="password" id="password" placeholder="Password" required />
//       <input type="text" id="mobNo" placeholder="Mobile Number" required />
//       <button type="submit">Sign Up</button>`;
//   } else {
//     form.innerHTML = `
//       <input type="email" id="loginEmail" placeholder="Email" required />
//       <input type="password" id="loginPassword" placeholder="Password" required />
//       <button type="submit">Login</button>`;
//   }
//   attachSubmitHandler();
// }

// function attachSubmitHandler() {
//   form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     if (isSignup) {
//       const email = document.getElementById('email').value;
//       const password = document.getElementById('password').value;
//       const mobNo = document.getElementById('mobNo').value;

//       fetch('http://localhost:5000/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, mobNo }),
//       })
//         .then((res) => res.json())
//         .then((data) => alert(data.message))
//         .catch(console.error);
//     } else {
//       const email = document.getElementById('loginEmail').value;
//       const password = document.getElementById('loginPassword').value;

//       fetch('http://localhost:5000/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       })
//         .then((res) => res.json())
//         .then((data) => alert(data.message))
//         .catch(console.error);
//     }
//   });
// }

document.getElementById('goToSignup').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('signupForm').style.display = 'block';  // Show Sign Up
  document.getElementById('loginForm').style.display = 'none';    // Hide Login
  const errorMessage = document.getElementById('errorMessage');

});

// Show Login Form and hide Sign Up Form
document.getElementById('goToLogin').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('signupForm').style.display = 'none';    // Hide Sign Up
  document.getElementById('loginForm').style.display = 'block';    // Show Login
});

// Sign up form submission handler
document.getElementById('signup').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const mobNo = document.getElementById('mobNo').value.trim();

  let isValid = true;

  if (!email.includes('@')) {
    displayError('email', 'Please enter a valid email.');
    isValid = false;
  }

  if (password.length < 6) {
    displayError('password', 'Password must be at least 6 characters long.');
    isValid = false;
  }

  if (mobNo.length !== 10 || isNaN(mobNo)) {
    displayError('mobNo', 'Mobile number must be 10 digits long.');
    isValid = false;
  }

  if (isValid) {
    // Make POST request to save sign-up details
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, mobNo })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      document.getElementById('signup').reset();
    })
    .catch(error => console.error('Error:', error));
  }
});

// Login form submission handler
document.getElementById('login').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  let isValid = true;

  if (!email.includes('@')) {
    displayError('loginEmail', 'Please enter a valid email.');
    isValid = false;
  }

  if (password.length < 6) {
    displayError('loginPassword', 'Password must be at least 6 characters long.');
    isValid = false;
  }

  if (isValid) {
    // Make POST request to login
    fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => console.error('Error:', error));
  }
});

function displayError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.createElement('span');
  errorElement.style.color = 'red';
  errorElement.textContent = message;

  const existingError = field.parentNode.querySelector('.error');
  if (existingError) {
    existingError.remove();
  }

  field.parentNode.appendChild(errorElement);
  errorElement.classList.add('error');
}









