// javascript for users.html

const postContainer = document.querySelector('#post-container');

// number limit of users
let limit = 7;

// fetch users from api
async function renderUsers() {
  let url = `https://jsonplaceholder.typicode.com/users?_limit=${limit}`;

  const res = await fetch(url);
  const users = await res.json();

  let template = '';
  users.forEach(user => {
    template += `
      <div class="post">
        <div class="post-id">${user.id}</div>
        <div class="post-img-wrapper">

        </div>
        <div class="post-info">
          <div class="post-title">${user.name}</div>
          <p class="post-body">Adress: ${user.address.street} - ${user.address.suite}</p>
        </div>
      </div>
      `;

    postContainer.innerHTML = template;
  });
}

// fetch imgaes form db.json file
async function renderImages() {
  const db = '../db.json';

  const res = await fetch(db);
  const data = await res.json();

  if (data) {
    // stops at 7 images
    for (let i = 0; i < limit; i++) {
      let img = new Image();
      img.src = data.users[i].image;
      img.setAttribute('class', 'post-img-wrapper');
      document.getElementsByClassName('post-img-wrapper')[i].appendChild(img);
    }
  }
}

renderUsers();
renderImages();
