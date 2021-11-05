const users: any = [];

const addUser = (props: any) => {
    let { name, id, room } = props;
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user: any) => user.name === name && user.room === room);
    if (existingUser) {
        return { error: 'Username is Already taken' };
    }
    const user = { id, name, room };
    users.push(user);
    return { user };
};
const removeUser = (id: any) => {
    const index = users.findIndex((user: any) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id: any) => users.find((user: any) => user.id === id);

const getUsersInRoom = (room: any) => users.filter((users: any) => users.room === room);

export { addUser, removeUser, getUser, getUsersInRoom };
