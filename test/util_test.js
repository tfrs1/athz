/*
 * athz
 * https://github.com/aleksandar-micic/athz
 *
 * Copyright (c) 2014 Aleksandar Micic
 * Licensed under the MIT license.
 */

'use strict';

var util = require('../lib/util.js'),
    expect = require('chai').expect;

describe('util', function() {
  describe('#normalizeRoles', function() {
    it('should normalize string', function() {
      expect(util.normalizeRoles('admin')).to.deep.equal([{role: 'admin'}]);
    });

    it('should normalize array of strings', function() {
      expect(util.normalizeRoles(['admin', 'mod']))
        .to.deep.equal([{role: 'admin'}, {role: 'mod'}]);
    });

    it('should normalize object', function() {
      expect(util.normalizeRoles({role: 'admin'}))
        .to.deep.equal([{role: 'admin'}]);
    });

    describe('as input', function() {
      it('should expect undefined', function() {
        expect(util.normalizeRoles()).to.be.undefined;
      });

      it('should expect string', function() {
        expect(util.normalizeRoles('test')).to.be.ok;
      });

      it('should expect array', function() {
        expect(util.normalizeRoles([])).to.be.ok;
      });
    });
  });

  describe('#indexOfRole', function() {
    it('should return -1 if role is not found', function() {
      expect(util.indexOfRole([], {role: 'admin'})).to.equal(-1);
      expect(util.indexOfRole([{role: 'admin'}], {role: 'mod'})).to.equal(-1);
    });

    it('should return index of role if found', function() {
      expect(util.indexOfRole([{role: 'admin'}], {role: 'admin'})).to.equal(0);
    });
  });

  describe('#expandRoles', function() {
    it('should add new roles', function() {
      expect(util.expandRoles([], {role: 'admin'})).to.have.length(1);
    });

    it('should replace existing roles', function() {
      var expanded = util.expandRoles([{role: 'admin'}], {role: 'admin', extra: true});
      expect(expanded).to.have.length(1);
      expect(expanded[0]).to.contain.keys('extra');
    });
  });
});
