// javascript for index.html

// variables
const postContainer = document.querySelector('#post-container');
const modalContainer = document.querySelector('.modal-container ');
const modal = document.querySelector('.modal');

const searchPosts = document.querySelector('.search');

// -----------------------------------------------------------------
// Show ALL Posts
async function renderPosts(term) {
  let url = 'https://jsonplaceholder.typicode.com/posts';

  const res = await fetch(url);
  const posts = await res.json();

  let template = '';

  posts.forEach((post, index) => {
    if (!post || post.id === null) {
      postContainer.innerHTML = '';
    } else {
      template += `
      <div class="post">
        <div class="post-id">${post.id}</div>
        <div class="post-info">
          <div class="post-title">${post.title}</div>
          <p class="post-body">${post.body.slice(0, 100)}</p>
          <a id='single-post' href='/index.html?id=${
            post.id
          }'>Read more ... </a>
        </div>
      </div>

      `;
      postContainer.innerHTML = template;
      modal.style.display = 'none';
      modalContainer.style.display = 'none';
    }
  });
}

// -----------------------------------------------------------------
// Show clicked Post

const id = new URLSearchParams(window.location.search).get('id');

async function getSinglePost() {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

  const res = await fetch(url);
  const post = await res.json();

  if (!post || post.id == null) {
    modal.innerHTML = '';
  } else {
    const template = `
      <div class="post">
        <div class="post-id">${post.id}</div>
        <div class="post-info">
          <div class="post-title">${post.title}</div>
          <p class="post-body">${post.body}</p>
        </div>
      </div>

 `;
    modal.innerHTML = template;
    modalContainer.style.display = 'flex';
    modal.style.display = 'flex';
  }
}

// filter posts - search
function filterPosts(e) {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toLowerCase();
    const body = post.querySelector('.post-body').innerText.toLowerCase();

    // if it's a match what we search for
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// close the getSinglePost modal
window.addEventListener('click', () => {
  modalContainer.style.display = 'none';
  modal.style.display = 'none';

  // remove selected post id from url
  window.history.back();
});

// filter posts
searchPosts.addEventListener('input', filterPosts);

// show initial Posts
renderPosts();
// show single Post
getSinglePost();
