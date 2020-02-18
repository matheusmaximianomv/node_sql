module.exports = function(request, response, next) {
    response.removeHeader(("X-Powered-By"));
    next();
}