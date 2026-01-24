export const fetchBadges = `
query Badges {
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
        users {
            id
            name
            username
            image
        }
    }
}
`;

export const findBadge = `
query badge($id: String) {
    badge(id: $id) {
        id
        userId
        name
        description
        image
        createdAt
        isDraft
        status
        rejectReason
        user {
            id
            name
            username
            image
        }
    }
}
`;

export const createBadge = `
mutation createBadge($input: BadgeInfo) {
    createBadge(input: $input) {
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
`;

export const updateBadge = `
mutation updateBadge($id: String, $input: BadgeInfo) {
    updateBadge(id: $id, input: $input) {
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
`;

export const deleteBadge = `
mutation deleteBadge($id: String) {
    deleteBadge(id: $id)
}
`;