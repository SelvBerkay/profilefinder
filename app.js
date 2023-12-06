const profile = new Profile()
const ui = new UI()
const searchProfile = document.querySelector("#searchProfile")



document.addEventListener("DOMContentLoaded", () => {
  profile.getUsers()
  .then(res => {
    ui.showUsers(res)
  })
})


searchProfile.addEventListener("keyup", (event) => {
  ui.clear()
  let textvalue = event.target.value;
  let text = textvalue.charAt(0).toUpperCase() + textvalue.slice(1)
  if (text !== ''){
    profile.getProfile(text)
    .then(res => {
      if(res.profile.length === 0) {
        ui.showAlert(text)
      } else {
        ui.showProfile(res.profile[0])
        ui.showPosts(res.posts)
        ui.showTodo(res.todos)
      }
    })
    .catch(err => ui.showAlert(text))
  }
})

