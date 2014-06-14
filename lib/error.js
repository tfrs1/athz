'use strict';

function AuthorizationError(message) {
  this.name = 'AuthorizationError';
  this.message = message || 'Error while authorizing';
}
AuthorizationError.prototype = new Error();
AuthorizationError.prototype.constructor = AuthorizationError;

module.exports = exports;
exports.AuthorizationError = AuthorizationError;
