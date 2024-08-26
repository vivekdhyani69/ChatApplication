//helping functions

const users  = [

]
///id and soccket instances
function addUser({ id, name, room }) {
    const user = { id, name, room };
    users.push(user);
    return { user };
}

function getUser(id) {
    return users.find((user) => user.id === id);
}

function removeUser(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}
const getUserInRoom = (room)=> users.filter((user)=>user.room === room)

module.exports ={addUser,removeUser,getUser,getUserInRoom}