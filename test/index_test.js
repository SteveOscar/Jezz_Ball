const chai = require('chai'); const assert = chai.assert;
const Index = require('../lib/index');

describe('Index', function() {
  context('Gameboard exists', function(){
    it('Finds gameboard element on DOM', function(){
      var gameBoard = document.getElementById('game');
      assert(gameBoard).to.not.equal(null);
    });
  });

  context('Orientation is recorded in the DOM', function(){
    var orientationField = document.getElementById('direction');

    it('Orientation field is present but hidden in DOM', function(){
      assert(orientationField).to.not.equal(null);
      assert(orientationField).getAttribute('display').to.equal('none');
    });

    it('Initiates with an orientation of horizontal', function(){
      assert(orientationField.innerHTML).to.equal('Horizontal');
    });
  });

  context('Canvas size is originally set to 180000 on DOM', function(){
    var originalSizeElement = document.getElementById('original_canvas_size');
    var originalSize = (600 * 300);
    it('Original size is present but hidden', function(){
      assert(originalSizeElement.innerHTML).to.equal(originalSize);
      assert(originalSizeElement).getAttribute('display').to.equal('none');
    });

  });
});
