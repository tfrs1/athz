'use strict';

var athz = require('../lib/athz.js');
var chai = require('chai'),
    expect = chai.expect;


describe('Schffoling', function() {
  describe('test', function() {
    it('should pass', function() {
      expect(athz.awesome()).to.equal('awesome');
    });
  });
});
