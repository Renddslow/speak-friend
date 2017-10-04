'use strict';

const test = require('tape');
const getUserDataFromHeader = require('./getUserDataFromHeader');

test('getUserDataFromHeader: if header string is empty ', t => {
    const userAuth = getUserDataFromHeader({});
    t.notOk(userAuth, 'userAuth returns false');
    t.end();
});

test('getUserDataFromHeader: if header is not basic authentication ', t => {
    const userAuth = getUserDataFromHeader('abc123!');
    t.notOk(userAuth, 'userAuth returns false');
    t.end();
});

test('getUserDataFromHeader: if header is supplied ', t => {
    const encodedString = new Buffer('github-user:secret').toString('base64');
    const userAuth = getUserDataFromHeader(`Basic ${encodedString}`);
    const expected = ['github-user', 'secret'];
    t.deepEquals(userAuth, expected, 'userAuth returns false');
    t.end();
});