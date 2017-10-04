'use strict';

module.exports = header => {
    if (!header || typeof header !== 'string') {
        return false;
    }

    const authorization = header.includes('Basic') ? header.replace('Basic', '').trim() : '';
    if (!authorization) {
        return false;
    }

    const decodeAuthString = new Buffer(authorization, 'base64').toString('utf-8');
    if (!decodeAuthString) {
        return false;
    }

    return decodeAuthString.split(':');
};