

const logRequest = (req, res, next) => {
    console.log("Request received");
    next()  ;   

};

module.exports = logRequest;