const mocha = require('mocha');
const assert = require('assert');
const User = require('../models/User');

// Describe Tests
describe('Saving records', () => {
    // Create tests
    it('Saves a record to the database', async (done) => {
        var user = new User({
            username: 'sgr98',
            email: 'sagar@sagar.com',
            password: 'sagar123',
            first_name: 'Sagar',
            last_name: 'Singh',
        });
        await user.save();
        assert(user.isNew === false);
        done();
        // user.save().then(function(){
        //     assert(user.isNew === false);
        //     done();
        // })
    });
});
