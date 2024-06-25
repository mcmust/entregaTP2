const apiUrl = 'http://localhost:5000/users'

function fetchUsers() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const usersDiv = document.getElementById('users')
      usersDiv.innerHTML = ''
      data.forEach((user) => {
        const userDiv = document.createElement('div')
        userDiv.innerHTML = `
          <h3>${user.name}</h3>
          <p>${user.email}</p>
          <p>${user.age}</p>
          <button onclick="deleteUser(${user.id})">Delete</button>
          <button onclick="editUser(${user.id}, '${user.name}', '${user.email}', ${user.age})">Edit</button>
        `
        usersDiv.appendChild(userDiv)
      })
    })
}

function addUser(event) {
  event.preventDefault()
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const age = document.getElementById('age').value

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, age }),
  })
    .then((response) => response.json())
    .then(() => {
      fetchUsers()
      document.getElementById('addUserForm').reset()
    })
}

function deleteUser(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  }).then(() => fetchUsers())
}

function editUser(id, name, email, age) {
  const newName = prompt('Enter new name:', name)
  const newEmail = prompt('Enter new email:', email)
  const newAge = prompt('Enter new age:', age)

  if (newName && newEmail && newAge) {
    fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName, email: newEmail, age: newAge }),
    }).then(() => fetchUsers())
  }
}

document.getElementById('addUserForm').addEventListener('submit', addUser)

fetchUsers()
