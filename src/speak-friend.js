'use strict';

const randomBytes = require('random-bytes');
const redis = require('redis');
const client = redis.createClient();
const Bluebird = require('bluebird');
const hashWrapper = require('hashWrapper');

// three main modes
// friend: auth middleware, checks token in the url or header
// and ensures that it is still valid
// speak: login function. Takes a username and password. Verifies with some datasource and hashes a userId and some user defined data as well as permission levels in memory
// close: logout function. Deletes the in-memory hash from the store

// errors:
// user attempts to supply login on some endpoint that is not login { status: 403, message: Please login in at <login endpoint> }
// user fails a login attempt on login endpoint: { status: 403, message: Incorrect login credentials }
// user attempt to access a public endpoint without any auth: { status: 403, message: Permission Denied }
// user attempts to access a private endpoint without any auth { status: 404 }

// config:
const config = {
    host: 'localhost',
    port: 6379,
    db: 0,
    ttl: 1440
};

const enter = permissionLevel => {
    return (req, res, next) => {
        const authHeader = req.get('authorization');
        if (authHeader) {
            const token = authHeader.includes('Bearer') ? authHeader.replace('Bearer ') : '';
        } else {
            const token = req.query.token || req.query.key;
        }

        if (!token) {
            res.statusCode = 403
            res.json();
        }

        const userHash = redis.hgetall(token);
        req.user = userHash;
        req.permissionLevel = permissionLevel;
        next();
    }
};

const speakFriend = getUser => {
    return (req, res, next) => {
        const userData = getUserDataFromHeader(req.get('authorization'));
        if (!userData) {
            res.statusCode = 403;
            res.json(AuthException(312));
        }
        getUser(username, password).then(user => {
            randomBytes(13).then(string => {
            	redis.hmset(string.toString('hex'), hashWrapper(user));
            });
        });

    };
};

const getUser = (username, password) => {
    return Bluebird.try(() => {

    });
};
