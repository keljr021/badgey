export const fetchDrafts = `
query Drafts {
  drafts {
    id
    userId
    name
    canvas
    createdAt
    updatedAt
  }
}
`;

export const findDraft = `
query Draft($id: String) {
  draft(id: $id) {
    id
    userId
    name
    canvas
    createdAt
    updatedAt
  }
}
`;

export const createDraft = `
mutation createDraft($input: UserInfo) {
  createDraft(input: $input) {
    id
    userId
    name
    canvas
    createdAt
    updatedAt
  }
}
`;

export const updateDraft = `
mutation UpdateDraft ($id: String, $input: UserInfo) {
  updateDraft(id: $id, input: $input) {
    id
    userId
    name
    canvas
    createdAt
    updatedAt
  }
}
`;

export const deleteDraft = `
mutation DeleteDraft ($id: String) {
  deleteDraft(id: $id)
}
`;