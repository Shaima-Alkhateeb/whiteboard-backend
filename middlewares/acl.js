'use strict';

const acl = (capability) => {
    return (req, res, next) => {
        try {
            if (req.user.capabilities.includes(capability) || req.user.id == req.body.userID || req.user.id == req.params.userID){
                next();
            } else {
                next(`Access Denied for ${capability}`);
            }
        } catch (error) {
            next('You Are not Allowed to do this');
        }
    };
};


module.exports = acl;
