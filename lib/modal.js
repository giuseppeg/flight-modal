define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(modal);

  /**
   * Module function
   */

  function modal() {
    this.defaultAttrs({
      dialogSelector: '.modal-content',
      activeClass: 'modal-is-active',
      inactiveClass: 'modal-is-inactive',
      aboveClass: 'modal-is-above',
      toggleUsingCSS: false,
      autoOpen: false,

      // Close button
      closeEnabled: true,
      closeBtnSelector: '.modal-close',

      // Fullscreen mode
      fullScreenEnabled: true,
      fullScreenClass: 'modal-fullscreen',
      fullScreenBtnSelector: '.modal-fullscreen-btn'
    });

    this.show = function (event, data) {
      if (data && data.id !== this.node.id) {
        // Requested a Modal different than the current one
        // let's place this "instance" in "background"
        this.$node.removeClass(this.attr.aboveClass);
        return;
      }

      if (!this.attr.toggleUsingCSS) {
        this.$node.show();
      }

      this.$node.removeClass(this.attr.inactiveClass);
      this.$node.addClass(this.attr.activeClass);
      this.$node.addClass(this.attr.aboveClass);
      this.$htmlElem.addClass(this.attr.activeClass);

      this.trigger(document, 'uiModalShown', {
        id: this.node.id
      });
    };

    this.close = function (event, data) {
      this.$node.removeClass(this.attr.aboveClass);

      if (event) {
        // Check for event ownership
        // when trying to close a specific Modal
        if (
          event.type !== 'click' &&
          data && data.id !== this.node.id
        ) {
          return;
        }

        if (!event.isDefaultPrevented()) {
          event.preventDefault();
        }
      }

      // close the Modal
      if (!this.attr.toggleUsingCSS) {
        this.$node.hide();
      }

      this.$node.removeClass(this.attr.activeClass);
      this.$node.addClass(this.attr.inactiveClass);
      this.$htmlElem.removeClass(this.attr.activeClass);

      // exit the fullscreen mode
      if (this.attr.fullScreenEnabled) {
        this.$node.removeClass(this.attr.fullScreenClass);
      }

      this.trigger(document, 'uiModalHidden', {
        id: this.node.id
      });
    };

    this.closeBackdrop = function (event) {
      if ($(event.target).closest(this.attr.dialogSelector).length === 0) {
        this.close();
      }
    };

    this.toggleFullScreen = function (event, data) {
      var evt = 'uiModalFullScreenEnabled';

      if (event) {
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
        }
      }

      this.$node.toggleClass(this.attr.fullScreenClass);

      if (!this.$node.hasClass(this.attr.fullScreenClass)) {
        evt = 'uiModalFullScreenDisabled';
      }

      this.trigger(document, evt, {
        id: this.node.id
      });
    };

    this.teardownAllModals = function () {
      this.close();
      this.teardown();
    };

    this.teardownModal = function (event, data) {
      if (data && data.id === this.node.id) {
        this.close();
        this.teardown();
      }
    };

    this.after('initialize', function () {
      this.$htmlElem = $('html');

      // Autoopen logic
      if (this.attr.autoOpen) {
        this.show();
      } else {
        this.close();
      }

      // Open on uiModalRequested
      this.on(document, 'uiModalRequested', this.show);

      // Teardown logic
      this.on(document, 'uiModalTeardownAll', this.teardownAllModals);
      this.on(document, 'uiModalTeardown', this.teardownModal);
      this.on('teardown', this.close);

      /**
       * Fullscreen logic
       */

      if (this.attr.fullScreenEnabled) {
        // Toggle on click
        this.on('click', {
          fullScreenBtnSelector: this.toggleFullScreen
        });

        this.on(document, 'uiModalToggleFullScreen', this.toggleFullScreen);
      }

      /**
       * Close logic
       */

      if (!this.attr.closeEnabled) {
        return;
      }

      // Close when uiModalCloseRequested fires on document
      this.on(document, 'uiModalCloseRequested', this.close);

      // Close using the close button
      this.on('click', {
        closeBtnSelector: this.close
      });

      // Close by clicking the backdrop
      this.on('click', this.closeBackdrop);
    });
  }
});