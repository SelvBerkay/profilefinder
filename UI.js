class UI {
  constructor(){
    this.profileContainer = document.querySelector("#profileContainer")
    this.alert = document.querySelector("#alert")
    this.userList = document.querySelector("#userList")
  }

  showUsers(users) {
    let options;
    users.map(item => {
      options += `<option value="${item.username}">${item.username}</option>`
    })
    this.userList.innerHTML = options;
  }

  showProfile(profile) {
    this.profileContainer.innerHTML = `
      <div class="card card-body mt-2">
        <div class="row">
          <div class="col-md-2">
            <a href="https://placehold.co/"><img src="https://placehold.co/250x250" class="img-thumbnail"></a>
          </div>
          <div class="col-md-10">
            <h4 class="mt-2">Contact</h4>
            <ul class="list-group">
                <li class="list-group-item"><span class="text-primary">Name :</span> ${profile.name}</li>
                <li class="list-group-item"><span class="text-primary">Username :</span> ${profile.username}</li>
                <li class="list-group-item"><span class="text-primary">Email :</span> ${profile.email}</li>
                <li class="list-group-item"><span class="text-primary">Phone :</span> ${profile.phone}</li>
                <li class="list-group-item"><span class="text-primary">Website :</span> ${profile.website}</li>
                <li class="list-group-item"><span class="text-primary">Address :</span> ${profile.address.street} , ${profile.address.suite} , ${profile.address.city} , ${profile.address.zipcode}</li>
               <li class="list-group-item"><span class="text-primary">Company :</span> ${profile.company.name}</li>
            </ul>
            <div class="row">
              <div class="col-md-6">
                <h4 class="mt-2">Posts</h4>
                <div id="posts" class="card w-75 mb-3"></div>
              </div>
              <div class="col-md-6">
                <h4 class="mt-2">Todo</h4>
                <ul id="todo" class="list-group"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }

  showPosts(posts){
    let html = "";

    posts.forEach(item => {
      html += `
      <div class="card-body border-bottom">
        <h5 class="card-title"><span class="text-primary">Title :</span> ${item.title}</h5>
        <p class="card-text"><span class="text-primary">Content :</span> ${item.body}</p>
        <div  id="icons" class="d-flex justify-content-center gap-5 align-items-center w-100">
          <button type="button" class="btn btn-primary commentIcon" data-bs-toggle="modal" data-bs-target="#commentsModal" onclick="ui.renderShowComments(${item.id})">
            <i class="fa-regular fa-comment"></i>
          </button>
          <button type="button" class="btn btn-primary" onclick="ui.likePost(this)"><i class="fa-solid fa-thumbs-up likeIcon"></i></button>    
        </div>
      </div>
      `
    });
    this.profileContainer.querySelector("#posts").innerHTML = html;
  }

  likePost(btn) {
    btn.classList.add("btn-secondary")
    btn.classList.remove("btn-primary")
  }

  async renderShowComments(id) {
    const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    const comments = await commentResponse.json()
    let html = "";
    comments.map(item => {
      html += `
        <div class="card mb-5 p-2">
          <div class="card-header fw-bold">
            ${item.name}
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>${item.body}</p>
              <footer class="blockquote-footer">${item.email}</footer>
            </blockquote>
          </div>
        </div>
      `
    })
    document.querySelector(".modal-body").innerHTML = html
  }

  showTodo(todos) {
    let html = "";

    todos.forEach(item => {
      if(item.completed){
        html += `<li class="list-group-item bg-success d-flex align-items-center justify-content-between">${item.title} <i class="fa-solid fa-check"></i></li>`
      } else {
        html += `<li class="list-group-item bg-warning d-flex justify-content-between align-items-center">${item.title} <i class="fa-regular fa-clock"></i></li>`
      }
    })

    this.profileContainer.querySelector("#todo").innerHTML = html
  }



  showAlert(text) {
    this.alert.innerHTML = `${text} is not found`
    this.alert.classList.add("p-2")
  }


  clear() {
    this.alert.innerHTML = "";
    this.alert.classList.remove("p-2")
    this.profileContainer.innerHTML = "";
  }
}