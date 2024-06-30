import config from './config.js';

function showSection(section) {
  document
    .querySelectorAll('.section')
    .forEach((sec) => sec.classList.add('hidden'))
  document.getElementById(section).classList.remove('hidden')
}

/* 
  * USUARIOS
  *
  */
function createUser() {
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  const age = document.getElementById('userAge').value;

  fetch(`${config.apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, age }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      alert('User created successfully');
      getUsers();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error creating user');
    });
}

function getUsers() {
  fetch(`${config.apiUrl}/users`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Users:', data)
      displayUsersAsTable(data);
    })
    .catch((error) => {
      console.error('Error:', error)
      alert('Error fetching users')
    })
}

function displayUsersAsTable(users) {
  const userResult = document.getElementById('userResult');
  userResult.innerHTML = ''; // Clear previous results

  if (users.length === 0) {
    userResult.innerHTML = '<tr><td colspan="5">No users found.</td></tr>';
    return;
  }

  users.forEach(user => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td><button onclick="deleteUser(${user.id})">Delete</button></td>
    `;
    userResult.appendChild(row);
  });
}

function deleteUser(userId) {
  fetch(`${config.apiUrl}/users/${userId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      alert('User deleted successfully');
      getUsers(); // Refresh the user list
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error deleting user');
    });
}

/* 
  * POSTS
  *
  *
  */

function createPost() {
  const user_id = document.getElementById('postUserId').value;
  const title = document.getElementById('postTitle').value;
  const content = document.getElementById('postContent').value;

  fetch(`${config.apiUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, title, content }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      alert('Post created successfully');
      getPosts(); // Refresh the post list
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error creating post');
    });
}

function getPosts() {
  fetch(`${config.apiUrl}/posts`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Posts:', data);
      displayPostsAsTable(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error fetching posts');
    });
}

function displayPostsAsTable(posts) {
  const postResult = document.getElementById('postResult');
  postResult.innerHTML = '';

  if (posts.length === 0) {
    postResult.innerHTML = '<tr><td colspan="5">No posts found.</td></tr>';
    return;
  }

  posts.forEach(post => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${post.id}</td>
      <td>${post.user_id}</td>
      <td>${post.title}</td>
      <td>${post.content}</td>
      <td><button onclick="deletePost(${post.id})">Delete</button></td>
    `;
    postResult.appendChild(row);
  });
}

function deletePost(postId) {
  fetch(`${config.apiUrl}/posts/${postId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      alert('Post deleted successfully');
      getPosts(); // Refresh the post list
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error deleting post');
    });
}

/* 
* COMMENTS
*
*
*/

function createComment() {
  const post_id = document.getElementById('commentPostId').value;
  const user_id = document.getElementById('commentUserId').value;
  const content = document.getElementById('commentContent').value;

  fetch(`${config.apiUrl}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post_id, user_id, content }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      alert('Comment created successfully');
      getComments(); // Refresh the comment list
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error creating comment');
    });
}

function getComments() {
  fetch(`${config.apiUrl}/comments`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Comments:', data);
      displayCommentsAsTable(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error fetching comments');
    });
}

function displayCommentsAsTable(comments) {
  const commentResult = document.getElementById('commentResult');
  commentResult.innerHTML = ''; // Clear previous results

  if (comments.length === 0) {
    commentResult.innerHTML = '<tr><td colspan="5">No comments found.</td></tr>';
    return;
  }

  comments.forEach(comment => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${comment.id}</td>
      <td>${comment.post_id}</td>
      <td>${comment.user_id}</td>
      <td>${comment.content}</td>
      <td><button onclick="deleteComment(${comment.id})">Delete</button></td>
    `;
    commentResult.appendChild(row);
  });
}

function deleteComment(commentId) {
  fetch(`${config.apiUrl}/comments/${commentId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      alert('Comment deleted successfully');
      getComments(); // Refresh the comment list
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error deleting comment');
    });
}

/* 
* CATEGORIAS
*
*
*/

function createCategory() {
const name = document.getElementById('categoryName').value;

fetch(`${config.apiUrl}/categories`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name }),
})
  .then((response) => {
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text) });
    }
    return response.json();
  })
  .then((data) => {
    console.log('Success:', data);
    alert('Category created successfully');
    getCategories(); // Refresh the category list
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error creating category');
  });
}

function getCategories() {
fetch(`${config.apiUrl}/categories`)
  .then((response) => response.json())
  .then((data) => {
    console.log('Categories:', data);
    displayCategoriesAsTable(data);
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error fetching categories');
  });
}

function displayCategoriesAsTable(categories) {
const categoryResult = document.getElementById('categoryResult');
categoryResult.innerHTML = ''; // Clear previous results

if (categories.length === 0) {
  categoryResult.innerHTML = '<tr><td colspan="3">No categories found.</td></tr>';
  return;
}

categories.forEach(category => {
  const row = document.createElement('tr');
  
  row.innerHTML = `
    <td>${category.id}</td>
    <td>${category.name}</td>
    <td><button onclick="deleteCategory(${category.id})">Delete</button></td>
  `;
  categoryResult.appendChild(row);
});
}

function deleteCategory(categoryId) {
fetch(`${config.apiUrl}/categories/${categoryId}`, {
  method: 'DELETE',
})
  .then((response) => {
    if (!response.ok) {
      return response.text().then(text => { throw new Error(text) });
    }
    alert('Category deleted successfully');
    getCategories(); // Refresh the category list
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Error deleting category');
  });
}

window.showSection = showSection;

window.createUser = createUser;
window.getUsers = getUsers;
window.deleteUser = deleteUser;
window.displayUsersAsTable=displayUsersAsTable

window.getPosts = getPosts
window.createPost = createPost
window.deletePost =deletePost
window.displayPostsAsTable=displayPostsAsTable

window.createComment = createComment;
window.getComments = getComments;
window.deleteComment = deleteComment;
window.displayCommentsAsTable = displayCommentsAsTable;

window.getCategories= getCategories
window.deleteCategory = deleteCategory
window.createCategory= createCategory
window.displayCategoriesAsTable=displayCategoriesAsTable
