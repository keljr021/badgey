export const fetchUsers = `
query Users {
  users {
    id
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

export const findUser = `
query User($id: String) {
  user(id: $id) {
    id
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
    isEmailVerified
    isLocked
  }
}
`;

export const loginUser = `
query loginUser($username: String, $password: String) {
  loginUser(username: $username, password: $password) {
    id
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
    id
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
    id
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

export const updateUser = `
mutation UpdateUser ($id: String, $input: CreateUser) {
  updateUser(id: $id, input: $input) {
    id
    userType
    image
    name
    username
    email
    dob
    company
    description
    createdAt
    lastLogin
    isEmailVerified
    isLocked
  }
}
`;