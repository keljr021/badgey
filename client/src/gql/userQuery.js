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
    isLocked
    badges {
      id
      userId
      name
      description
      image
      createdAt
      isDraft
      status
      rejectReason
    }
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
    badges {
      id
      userId
      name
      description
      image
      createdAt
      isDraft
      status
      rejectReason
    }
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
    isLocked
    badges {
      id
      userId
      name
      description
      image
      createdAt
      isDraft
      status
      rejectReason
    }
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
    isLocked
  }
}
`;

export const createUser = `
mutation createUser($input: UserInfo) {
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
    isLocked
  }
}
`;

export const updateUser = `
mutation UpdateUser ($id: String, $input: UserInfo) {
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

export const deleteUser = `
mutation DeleteUser ($id: String) {
  deleteUser(id: $id)
}
`;