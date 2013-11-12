'use strict';

describeComponent('lib/modal', function () {

  it('should be defined', function () {
    setupComponent();
    expect(this.component).toBeDefined();
  });

  describe('listens to uiModalRequested', function () {
    beforeEach(function () {
      setupComponent(
        '<div id="modal"></div>',
        {
          toggleUsingCSS: false
        }
      );
    });

    var eventSpy = spyOnEvent(document, 'uiModalRequested');

    it('shows the current modal', function () {
      this.component.trigger(document, 'uiModalRequested', {
        id: 'modal'
      });
      expect(this.$node).toBeVisible();
    });

    // show all
    it('shows the modal if no id is provided', function () {
      this.component.trigger(document, 'uiModalRequested');
      expect(this.$node).toBeVisible();
    });

    it('is on top of the other modals', function () {
      this.component.trigger(document, 'uiModalRequested');
      expect(this.$node).toHaveClass(this.component.attr.aboveClass);
    });

    it('fires uiModalShown', function () {
      var eventShowSpy = spyOnEvent(document, 'uiModalShown');
      this.component.trigger(document, 'uiModalRequested');
      expect(eventShowSpy).toHaveBeenTriggeredOn(document);
    });
  });

  it('is open when autoOpen is true', function () {
    setupComponent({
      autoOpen: true
    });

    expect(this.$node).toBeVisible();
  });

  describe('listens to uiModalCloseRequested', function () {
    beforeEach(function () {
      setupComponent(
        '<div id="modal"></div>',
        {
          toggleUsingCSS: false
        }
      );
    });

    var eventSpy = spyOnEvent(document, 'uiModalCloseRequested');

    it('hides the current modal', function () {
      this.component.trigger(document, 'uiModalCloseRequested', {
        id: 'modal'
      });
      expect(this.$node).not.toBeVisible();
    });

    // hide all
    it('hides the modal if no id is provided', function () {
      this.component.trigger(document, 'uiModalCloseRequested');
      expect(this.$node).not.toBeVisible();
    });

    it('fires uiModalHidden', function () {
      var eventHideSpy = spyOnEvent(document, 'uiModalHidden');
      this.component.trigger(document, 'uiModalCloseRequested');
      expect(eventHideSpy).toHaveBeenTriggeredOn(document);
    });
  });

  it('listens for clicks on the close selector and is hidden afterwards', function () {
    setupComponent(
      '<div class="modal"><a href="#modal" class="modal-close">close</a></div>',
      {
        toggleUsingCSS: false
      }
    );

    this.component.select('closeBtnSelector').trigger('click');
    expect(this.$node).not.toBeVisible();
  });

  it('is hidden when clicking outside the modal dialog (the backdrop)', function () {
    setupComponent(
      '<div class="modal"><div class="modal-content"></div></div>',
      {
        toggleUsingCSS: false
      }
    );

    this.component.show();
    this.component.trigger('click');
    expect(this.$node).not.toBeVisible();
  });

  it('can\'t be hidden when closeEnabled is false', function () {
    setupComponent(
      '<div class="modal"><div class="modal-content"></div><a href="#modal" class="modal-close">close</a></div>',
      {
        closeEnabled: false,
        toggleUsingCSS: false
      }
    );

    this.component.show();
    this.component.trigger(document, 'uiModalCloseRequested');
    this.component.select('closeBtnSelector').trigger('click');
    this.component.trigger('click');
    expect(this.$node).toBeVisible();
  });

  describe('listens to uiModalToggleFullScreen', function () {
    beforeEach(function () {
      setupComponent(
        '<div id="modal"></div>',
        {
          toggleUsingCSS: false
        }
      );
    });

    var eventSpy = spyOnEvent(document, 'uiModalToggleFullScreen');

    it('goes fullscreen', function () {
      this.component.trigger(document, 'uiModalToggleFullScreen', {
        id: 'modal'
      });
      expect(this.$node).toHaveClass(this.component.attr.fullScreenClass);
    });

    // fullscreen all
    it('goes fullscreen if no id is provided', function () {
      this.component.trigger(document, 'uiModalToggleFullScreen');
      expect(this.$node).toHaveClass(this.component.attr.fullScreenClass);
    });

    it('goes fullscreen and fires uiModalFullScreenEnabled if it wasn\'t in fullscreen mode', function () {
      var eventSpy = spyOnEvent(document, 'uiModalFullScreenEnabled');

      this.component.trigger(document, 'uiModalToggleFullScreen');
      expect(this.$node).toHaveClass(this.component.attr.fullScreenClass);
      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });

    it('exits fullscreen and fires uiModalFullScreenDisabled if it was in fullscreen mode', function () {
      var eventSpy = spyOnEvent(document, 'uiModalFullScreenDisabled');

      this.$node.addClass(this.component.attr.fullScreenClass);
      this.component.trigger(document, 'uiModalToggleFullScreen');
      expect(this.$node).not.toHaveClass(this.component.attr.fullScreenClass);
      expect(eventSpy).toHaveBeenTriggeredOn(document);
    });
  });
});
