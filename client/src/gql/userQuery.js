export const fetchUsers = `
query Users {
  users {
    name
    company
    createdAt
    description
    dob
    email
    id
    image
    userType
    username
    lastLogin
  }
}
`;

export const loginUser = `
query loginUser($username: String, $password: String) {
  loginUser(username: $username, password: $password) {
    name
    company
    createdAt
    description
    dob
    email
    id
    image
    userType
    username
    password
    lastLogin
  }
}
`;

export const searchUsers = `
query searchUsers($query: String) {
  searchUsers(query: $query) {
    name
    company
    createdAt
    description
    dob
    email
    id
    image
    userType
    username
  }
}
`;

export const createUser = `
mutation createUser($input: CreateUser) {
  createUser(input: $input) {
    name
    company
    createdAt
    description
    dob
    email
    id
    image
    userType
    username
    password
  }
}
`;