export const getUsers = state => state.users.data.filter(user => !user.permission);
export const getAssignedUsers = state => state.users.data.filter(user => user.permission);
