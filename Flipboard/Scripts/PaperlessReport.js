
$(document).ready(function () {

    var iframe = $("iframe");

    if (iframe.length == 0) {
        $("#cert").hide();
    }
    else {
        $("#cert").show();
    }

    var p = 1;
    var u = undefined;
    var v = undefined;
    var cacelled = 0;

    try {
        u = new SpeechSynthesisUtterance();
        v = window.speechSynthesis.getVoices();

        var tries = 0;
        while (tries < 10 && (v == null || v == undefined || v.length == 0)) {
            v = window.speechSynthesis.getVoices();
            tries++;
        }
        u.voice = v.filter(function (voice) { return voice.name == "Google UK English Female"; })[0]; // Note: some voices don"t support altering params
        u.voiceURI = "native";
        u.volume = 1; // 0 to 1
        u.rate = 1.25; // 0.1 to 10
        u.pitch = 1; //0 to 2
        u.lang = "en-GB";
    }
    catch (e) {
        console.log(e);
    }

    $("#speaker").click(function () {
        if (u != undefined) {
            if (iframe.length == 0) {
                if ($("#category-dashboard").length == 1) {
                    u.text = "Metro styled category dashboard";
                }
                else {
                    u.text = $.trim($("#brand").text());
                }
                window.speechSynthesis.speak(u);
            }
            else {
                if ($(".box-close", iframe.contents()).css("display") == "block") {
                    
                    $("#stop > i").fadeIn();
                    p = $("p[data-tts][style]", iframe.contents()).length;
                    cacelled = 0;
                    speakParagraph(0, 1);
                }
                else {
                    $("#stop > i").fadeIn();
                    p = $(".front h3[data-tts]:visible", iframe.contents()).length;
                    cacelled = 0;
                    speakParagraph(0, 0);
                }
            }
        }
    })

    $("#stop").click(function () {
        cacelled = 1;
        window.speechSynthesis.pause();
        window.speechSynthesis.cancel();
        $(this).children("i").fadeOut()
    })

    $(window).resize(function () {
        if (iframe.length > 0) {
            resizeflippage(iframe);
        }
    });

    speakParagraph = function (i, j) {
        if (!cacelled && i < p) {
            var msg = j == 0
                      ? $(".front h3[data-tts]:visible:eq(" + i + ")", iframe.contents()).justtext()
                      : $("p[data-tts][style]:visible:eq(" + i + ")", iframe.contents()).text();
            u.text = msg;
            u.onend = function (e) { setTimeout("speakParagraph(" + i + "+1, " + j + ");", 1500); };
            window.speechSynthesis.speak(u);
        }
        else {
            $("#stop > i").fadeOut();
        }
    }

    speakSegament = function (i) {
        if (!cacelled && i < p) {
            var msg = $.trim($("p[data-tts][style]", iframe.contents()).text());
            u.text = msg.substring(i * 250, (i + 1) * 250 -1);
            u.onend = function (e) { setTimeout("speakSegament(" + i + "+1);", 250); };
            window.speechSynthesis.speak(u);
        }
        else {
            $("#stop > i").fadeOut();
        }
    }
});

function resizeflippage(elm) {
    $(elm).height($(window.top).height() - 150)
          .width($(window.top).width() - 35);

    if (!$(elm).is("visible")) $(elm).fadeIn();
}

$.fn.justtext = function () {

    return $(this).clone()
            .children()
            .remove()
            .end()
            .text();
};


/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) {
    "use strict";

    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================

    var Collapse = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Collapse.DEFAULTS, options)
        this.transitioning = null

        if (this.options.parent) this.$parent = $(this.options.parent)
        if (this.options.toggle) this.toggle()
    }

    Collapse.DEFAULTS = {
        toggle: true
    }

    Collapse.prototype.dimension = function () {
        var hasWidth = this.$element.hasClass("width")
        return hasWidth ? "width" : "height"
    }

    Collapse.prototype.show = function () {
        if (this.transitioning || this.$element.hasClass("in")) return

        var startEvent = $.Event("show.bs.collapse")
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var actives = this.$parent && this.$parent.find("> .panel > .in")

        if (actives && actives.length) {
            var hasData = actives.data("bs.collapse")
            if (hasData && hasData.transitioning) return
            actives.collapse("hide")
            hasData || actives.data("bs.collapse", null)
        }

        var dimension = this.dimension()

        this.$element
          .removeClass("collapse")
          .addClass("collapsing")
          [dimension](0)

        this.transitioning = 1

        var complete = function () {
            this.$element
              .removeClass("collapsing")
              .addClass("in")
              [dimension]("auto")
            this.transitioning = 0
            this.$element.trigger("shown.bs.collapse")
        }

        if (!$.support.transition) return complete.call(this)

        var scrollSize = $.camelCase(["scroll", dimension].join("-"))

        this.$element
          .one($.support.transition.end, $.proxy(complete, this))
          .emulateTransitionEnd(350)
          [dimension](this.$element[0][scrollSize])
    }

    Collapse.prototype.hide = function () {
        if (this.transitioning || !this.$element.hasClass("in")) return

        var startEvent = $.Event("hide.bs.collapse")
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        var dimension = this.dimension()

        this.$element
          [dimension](this.$element[dimension]())
          [0].offsetHeight

        this.$element
          .addClass("collapsing")
          .removeClass("collapse")
          .removeClass("in")

        this.transitioning = 1

        var complete = function () {
            this.transitioning = 0
            this.$element
              .trigger("hidden.bs.collapse")
              .removeClass("collapsing")
              .addClass("collapse")
        }

        if (!$.support.transition) return complete.call(this)

        this.$element
          [dimension](0)
          .one($.support.transition.end, $.proxy(complete, this))
          .emulateTransitionEnd(350)
    }

    Collapse.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }


    // COLLAPSE PLUGIN DEFINITION
    // ==========================

    var old = $.fn.collapse

    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data("bs.collapse")
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == "object" && option)

            if (!data) $this.data("bs.collapse", (data = new Collapse(this, options)))
            if (typeof option == "string") data[option]()
        })
    }

    $.fn.collapse.Constructor = Collapse


    // COLLAPSE NO CONFLICT
    // ====================

    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old
        return this
    }


    // COLLAPSE DATA-API
    // =================
    $(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function (e) {

        var $this = $(this), href
        var target = $this.attr("data-target")
            || e.preventDefault()
            || (href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "") //strip for ie7
        var $target = $(target)
        var data = $target.data("bs.collapse")
        var option = data ? "toggle" : $this.data()
        var parent = $this.attr("data-parent")
        var $parent = parent && $(parent)

        if (!data || !data.transitioning) {
            if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass("collapsed")
            $this[$target.hasClass("in") ? "addClass" : "removeClass"]("collapsed")
        }

        $target.collapse(option)
    })

}(window.jQuery);

