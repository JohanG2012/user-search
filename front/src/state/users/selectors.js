export const getUsers = state => state.users.data.filter(user => !user.permission);
export const getUsersWithPersmissions = state => state.users.data.filter(user => user.permission);
