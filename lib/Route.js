/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

var util = require('./util.js'),
  authorize = require('./authorize.js');

var app;

function routeHelper(route, method, args) {
  var extra = args[0],
      roles = route.roles,
      next;

  if (typeof extra === 'function') {
    next = [].slice.call(args);
  }
  else {
    next = [].slice.call(args, 1);
    roles = util.expandRoles(route.roles, extra);
  }

  method.apply(app, [].concat(route.path, authorize(roles), next));
}

var Route = function(path, roles) {
  this.path = path;
  this.roles = roles && util.normalizeRoles(roles);
};

Route.prototype.all = function() {
  routeHelper(this, app.all, arguments);
  return this;
};

Route.prototype.get = function() {
  routeHelper(this, app.get, arguments);
  return this;
};

Route.prototype.post = function() {
  routeHelper(this, app.post, arguments);
  return this;
};

Route.prototype.put = function() {
  routeHelper(this, app.put, arguments);
  return this;
};

Route.prototype.delete = function() {
  routeHelper(this, app.delete, arguments);
  return this;
};

function initializer(expressApp) {
  app = expressApp;
  return Route;
}

module.exports = exports = initializer;
