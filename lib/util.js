/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

function normalizeRoles(roles) {
  if (!roles) { return undefined; }

  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  return roles.map(function(item) {
    if (typeof item === 'string') {
      item = {role: item};
    }
    else {
      item = JSON.parse(JSON.stringify(item));
    }

    return item;
  });
}

function indexOfRole(roles, role) {
  var result = -1;
  roles.forEach(function(item, index) {
    if (item.role === role.role) {
      return result = index;
    }
  });

  return result;
}

function expandRoles(roles, extra) {
  if (!roles) {
    return extra;
  }

  roles = roles.slice(0);

  normalizeRoles(extra).forEach(function(item) {
    var idx = indexOfRole(roles, item);

    if (idx !== -1) {
      roles[idx] = item;
    }
    else {
      roles.push(item);
    }
  });

  return roles;
}

module.exports = exports;
exports.normalizeRoles = normalizeRoles;
exports.indexOfRole = indexOfRole;
exports.expandRoles  = expandRoles;

