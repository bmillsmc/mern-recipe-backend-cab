const {User: UserModel} = require('../../models');
const UsersData = require('../data/users.json');

UserModel.deleteMany({}).then(() => {
    UserModel.create(UsersData).then(users => {
        console.log(users);
        process.exit();
    });
});