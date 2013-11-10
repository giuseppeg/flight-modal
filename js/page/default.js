define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var modal = require('component/modal');

  /**
   * Module exports
   */

  return initialize;

  /**
   * Module function
   */

  function initialize() {
    var $document = $(document);

    modal.attachTo('.modal');

    $('.modal-toggle').on('click', function (e) {
      e.preventDefault();
      $document.trigger('uiModalRequested', {
        id: this.hash.slice(1)
      });
    });

    $('.modal-all').on('click', function (e) {
      e.preventDefault();
      $document.trigger('uiModalRequested');
    });
  }

});
