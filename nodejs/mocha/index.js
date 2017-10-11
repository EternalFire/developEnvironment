var expect = require('chai').expect;
require('should');

function add(x,y) {
  return x + y;
}


describe('test suit', function() {
  describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
      expect(add(1, 1)).to.be.equal(2);
    });

  });

  describe('#indexOf()', function() {
    context('when not present', function() {
      it('should not throw an error', function() {
        (function() {
          [1,2,3].indexOf(4);
        }).should.not.throw();
      });
      it('should return -1', function() {
        [1,2,3].indexOf(4).should.equal(-1);
      });
    });
    context('when present', function() {
      it('should return the index where the element first appears in the array', function() {
        [1,2,3].indexOf(3).should.equal(2);
      });
    });
  });
});