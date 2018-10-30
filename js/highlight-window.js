(function($, window, document, undefined) {
  var htmlHighlight =
    '<div id="highlight-window"><div class="highlight-window-content"></div></div>';

  function isNotNullOrUndefined(elem) {
    return typeof elem !== "undefined" && elem != null;
  }
  function isNullOrUndefined(elem) {
    return typeof elem === "undefined" || elem == null;
  }

  /* Plugin name and defaults */
  var pluginName = "highlightWindow",
    defaults = {
      style: {
        borderColor: "#038BCF",
        highlightColor: "rgba(255,255,255,.7)",
        paddingHighlight: 10,
        minHeight: 100,
        minWidth: 100
      },
      disallowClickOn: "none"
    };

  function HighlightWindow(options) {
    this.settings = $.extend({}, defaults, options);
    this.highlightDOMElem = null;
    this.init();
  }

  $.extend(HighlightWindow.prototype, {
    init: function() {
      $("body").prepend(htmlHighlight);
      var $elem = $("#highlight-window");
      this.highlightDOMElem = $elem[0];
      return this;
    },
    moveTo: function(elementSelector, options) {
      this.settings = $.extend({}, this.settings, options);
      if (isNotNullOrUndefined(elementSelector)) {
        var highligh = $(this.highlightDOMElem);
        highligh.show();
        var paddingHighlight = this.settings.style.paddingHighlight;
        var minWidth = this.settings.style.minWidth;
        var minHeight = this.settings.style.minHeight;
        this.$elem = $(elementSelector);
        if (this.$elem.length !== 1) {
          console.error(
            "Element selector is not pointing to only 1 element but :" +
            this.$elem.length
          );
          return;
        }
        var elemToHighlight = this.$elem[0];

        var rect = elemToHighlight.getBoundingClientRect();
        highligh.css("top", rect.top - paddingHighlight + "px");
        highligh.css("left", rect.left - paddingHighlight + "px");

        if (this.settings.width) {
          highligh.css("width", this.settings.width + "px");
        } else {
          // if (rect.width < minWidth) {
          //   highligh.css("width", minWidth + 40 + "px");
          // } else {
          highligh.css("width", rect.width + paddingHighlight * 2 + "px");
          // }
        }

        if (this.settings.height) {
          highligh.css("height", this.settings.height + "px");
        } else {
          // if (rect.height < minHeight) {
          //   highligh.css("height", minHeight + "px");
          // } else {
          highligh.css("height", rect.height + paddingHighlight * 2 + "px");
          // }
        }
        if (this.settings.help) {
          highligh
            .find(".highlight-window-content")
            .attr("help", this.settings.help);
        } else {
          highligh.find(".highlight-window-content").removeAttr("help");
        }
        var _this = this;
        this.$elem.hover(function() {
            _this.hide();
            _this.$elem.off('mouseenter mouseleave');
        });
      }
    },
    hide: function() {
      var highlight = $(this.highlightDOMElem);
      highlight.css("width", "");
      highlight.css("top", "");
      highlight.css("left", "");
      highlight.css("height", "");
    }
  });

  $.extend({
    highlightWindow: function(action) {
      if (isNullOrUndefined(action) || action === "init") {
        if (!$.data(document.body, "plugin_" + pluginName)) {
          var newWindowHighlight = new HighlightWindow(arguments[1]);
          $.data(document.body, "plugin_" + pluginName, newWindowHighlight);
          return newWindowHighlight;
        }
      } else if (action === "moveTo") {
        var windowHighlight = $.data(document.body, "plugin_" + pluginName);
        windowHighlight.moveTo(arguments[1], arguments[2]);
        return windowHighlight;
      } else if (action === "hide") {
        var windowHighlight = $.data(document.body, "plugin_" + pluginName);
        windowHighlight.hide();
        return windowHighlight;
      }
    }
  });
})(jQuery, window, document);
