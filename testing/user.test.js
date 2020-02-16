// use the path of your model 
const User = require('../model/users');
const mongoose = require('mongoose');
// use the new name of the database 
const url = 'mongodb://localhost:27017/ApplicationTesting';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('User Upload Testing', () => {
    // the code below is for insert testing  
    var id = '';
    it('Add User', () => {
        const user = {
            'image': 'any.jpg',
            'username': 'GunjanShakya',
            'address': 'Kathmandu',
            'email': 'gunjan.shakya@gmail.com',
            'phone': '9865984793',
            'password': 'Any<3',
            'gender':'Male'
        };
        return User.create(user)
            .then((user_res) => {
                id = user_res._id;

                expect(user_res.username).toEqual('GunjanShakya');
            });
    });

        // Update User

        it('updateuser testing', () => {
            const userupdate = {
                username: 'NikhilKapali'
            }
            console.log(id)
            return User.findByIdAndUpdate(id, userupdate, {
                new: true
            }).then((userupdate) => {
                expect(userupdate.username).toEqual('NikhilKapali');
            });
        });

    // User Delete Testing
    it('testing User Delete', async () => {
        const status = await
            User.deleteMany({
                username: 'GunjanShakya'
            });
        expect(status.ok).toBe(1);
    });

});