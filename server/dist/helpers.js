"use strict";
var users = [];
var addUser = function (_a) {
    var id = _a.id, name = _a.name, room = _a.room;
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    var existingUser = users.find(function (user) { return users.name === name && users.room === room; });
    if (existingUser) {
        return { error: 'Username is Already taken' };
    }
    var user = { id: id, name: name, room: room };
    users.push(user);
    return { user: user };
};
