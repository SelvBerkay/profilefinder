class Profile {
  constructor() {
    this.clientId = "";
    this.clientSecret = "";
  }


  async getUsers() {
    const usersResponse = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const users = await usersResponse.json()
    return users
  }

  async getProfile(username) {

    const profileResponse = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
    const profile = await profileResponse.json()


    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${profile[0].id}`)
    const posts = await postResponse.json()

    const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`)
    const todos = await todoResponse.json()
    
    return {
      profile,posts,todos
    }
  }
}