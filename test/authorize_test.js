/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

var authorize = require('../lib/authorize.js'),
    expect = require('chai').expect;

describe('authorize', function() {
  describe('#authorize', function() {
    var roles = [
        {role: 'admin'},
        {role: 'moderator'}
      ],
      test = function(roles, req, done) {
        return function() {
          authorize(roles)(req, {}, done);
        };
      };

    it('should throw when user is undefined', function() {
      expect(test(roles, {})).to.throw('User not authenticated');
    });

    it('should throw when user does not have role', function() {
      var req = {
        user: {}
      };

      expect(test(roles, req)).to.throw('User does not have a role');
    });

    it('should not authorize when user is not a member of specified roles', function() {
      var req = {
        user: {
          role: 'unknown'
        }
      };

      expect(test(roles, req)).to.throw('Not authorized');
    });

    it('should authorize when user is a member of specified roles', function(done) {
      var req = {
        user: {
          role: 'admin'
        }
      };

      test(roles, req, done)();
    });
  });
});

