/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

var util = require('./util.js'),
    authorize = require('./authorize.js'),
    routeInitializer = require('./Route.js');

var app,
    Route;

function routeHelper(method, args) {
  var path = args[0],
      roles = args[1],
      next;

  if (typeof roles === 'function') {
    next = [].slice.call(args, 1);
    roles = undefined;
  }
  else {
    next = [].slice.call(args, 2);
    roles = util.normalizeRoles(roles);
  }

  method.apply(app, [].concat(path, authorize(roles), next));
}

function initialize(expressApp) {
  app = expressApp;
  app.use(app.router);
  Route = routeInitializer(app);
}

function route(path, roles) {
  return new Route(path, roles);
}

function all() {
  routeHelper(app.all, arguments);
}

function get() {
  routeHelper(app.get, arguments);
}

function post() {
  routeHelper(app.post, arguments);
}

function put() {
  routeHelper(app.put, arguments);
}

function delete_() {
  routeHelper(app.delete, arguments);
}

module.exports = exports;
exports.initialize = initialize;
exports.route = route;
exports.all = all;
exports.get = get;
exports.post = post;
exports.put = put;
exports.delete = delete_;
