/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

+(function(w, $) {
  w.getLoading = function(width, height, color) {
    var width = width || 30
    var height = height || 10
    var color = color || '#666'
    var svg = '' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" viewBox="0 0 120 30" fill="' + color + '">' +
      '<circle cx="15" cy="15" r="14.2893">' +
      '<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />' +
      '<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />' +
      '</circle>' +
      '<circle cx="60" cy="15" r="9.7107" fill-opacity="0.3">' +
      '<animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite" />' +
      '<animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" />' +
      '</circle>' +
      '<circle cx="105" cy="15" r="14.2893">' +
      '<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />' +
      '<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />' +
      '</circle>' +
      '</svg>'
    return svg
  }
})(window, jQuery)

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

+ function($) {
  'use strict';

  // Select CLASS DEFINITION
  // =========================
  var backdrop = '.select-backdrop'

  var Select = function(option) {
    this.option = option
    this.el = option.$el
    this.render()
    this.el.data('select', this)
  }

  Select.VERSION = '3.3.6'

  function closeSelects(e) {
    if (e && $(e.target).hasClass('ctrl')) return
    if (e && e.which === 3) return
    $(backdrop).remove()
    $('.open.select-menu').each(function() {
      $(this).removeClass('open')
    })
  }

  function stopEvent(e) {
    e.stopPropagation()
  }

  function fillTag(c, values) {
    var $tagContainer
    $tagContainer = c.$select.find('.select-tag')
    if ($tagContainer.length == 0) {
      $tagContainer = $('<div class="row select-tag"></div>')
      c.$select.prepend($tagContainer)
    }
    $tagContainer.empty()
    $.each(values, function(i, item) {
      var $tag = $('<div class="col-sm-4"><div class="tag-item" data-id="' + item.id + '"><span class="tag-val" title="' + item.name + '">' + item.name + '</span><span class="tag-delete">&times;</span></div></div>')
      $tag.find('.tag-delete').on('click', c.tagDelete.bind(c))
      $tagContainer.append($tag)
    })
  }

  Select.prototype._renderFromTag = function($ctrl) {
    var _this = this
    this.isSelect = true
    this.el.hide()
    this.data = []
    var $container = ''
    if (this.el.next().hasClass('select')) {
      $container = this.el.next()
    } else {
      var $container = $('<div class="select"></div>')
      this.el.after($container)
    }
    $container.empty()
    $container.append($ctrl)
    if (this.el.children().length > 0) {
      this.el.children().each(function(i, item) {
        var $item = $(item)
        var obj = { id: $item.val(), name: $item.text() }
        var $li = _this.createItem(obj)
        _this.$ul.append($li)
        _this.data.push(obj)
        if (_this.option.multiple && $item.attr('selected')) {
          if (!_this.value) _this.value = []
          _this.value.push(obj)
          $li.find('input:checkbox').attr('checked', true)
        }
      })
    }
    $container.append(this.$ul)
  }

  Select.prototype._renderTree = function($ctrl) {
    var $container = $('<div class="select"></div>')
    this.el.empty()
    this.el.append($container)
    $container.append($ctrl)
    if (this.option.search) {
      this.$ul = $('<div class="select-menu"></div>')
      this.$select = this.$ul
      var $searchDiv = $('<div class="select-search-div"></div>')
      var $searcher = $('<input class="form-control">')
      $searchDiv.append($searcher)
      this.$ul.append($searchDiv)
      $container.append(this.$ul)
      var $tree = $('<div class="panel-tree"></div>')
      this.$ul.append($tree)
      this.tree = $tree.tree(this.option.treeOption)
      this.tree.el.on('bs.tree.select', this.treeSelect.bind(this))
        .on('bs.tree.unselect', this.treeUnSelect.bind(this))
        .on('bs.tree.change', this.treeChange.bind(this))
        .on('bs.tree.render', this.treeRender.bind(this))
      $searcher.on('keyup.bs.select', this.treeSearch.bind(this))
    } else {
      this.$ul = $('<div class="select-menu"></div>')
      var $tree = $('<div class="panel-tree"></div>')
      this.$ul.append($tree)
      this.$select = this.$ul
      $container.append(this.$ul)
      this.tree = $tree.tree(this.option.treeOption)
      this.tree.el.on('bs.tree.select', this.treeSelect.bind(this))
        .on('bs.tree.unselect', this.treeUnSelect.bind(this))
        .on('bs.tree.change', this.treeChange.bind(this))
    }
  }

  Select.prototype._renderFromData = function($ctrl) {
    var _this = this
    this.el.empty()
    this.el.append($ctrl)
    this.data = []
    if (this.option.data && this.option.data.length > 0) {
      $.each(this.option.data, function(i, item) {
        if (typeof item === 'string') item = { id: item, name: item }
        _this.$ul.append(_this.createItem(item))
        _this.data.push(item)
      })
    } else {
      var ndf = _this.option.noDataFormater
      if (ndf) {
        _this.$ul.append('<li>'  + ($.isFunction(ndf) ? ndf() : ndf) +  '</li>')
      } else {
        _this.$ul.append('<li><div>暂无数据！</div></li>')
      }
    }

    this.el.append(this.$ul)
  }

  Select.prototype._renderFromUrl = function($ctrl) {
    this.el.empty()
    this.el.append($ctrl)
    if (this.option.multiple) {
      // this.el.append($ctrl)
      this.$select = $('<div class="select-menu" style="max-height: none;"></div>')
      if (this.option.search) {
        var $searchDiv = $('<div class="select-search-div"></div>')
        var $searcher = $('<input class="form-control">')

        // 限制快速输入时发送多次请求
        // $searcher.on('keyup.bs.select', this.search.bind(this))
        var searchTimer = null
        var _this = this

        $searcher.on('input.bs.select', function(e) {
          if (searchTimer) {
            clearTimeout(searchTimer)
          }
          searchTimer = setTimeout(_this.search.bind(_this, e), 100)
        })
        $searchDiv.append($searcher)
        this.$select.append($searchDiv)
      }
      var temp = '<li><div class="loading">' + getLoading() + '</div></li>'
      this.$ul.append(temp)
      this.$ul.removeClass('select-menu').css({ padding: '0', overflow: 'auto', height: '210px' })
      this.$select.append(this.$ul)
      this.renderFooter()
      this.el.append(this.$select)
    } else {
      var temp = '<li><div class="loading">' + getLoading() + '</div></li>'
      this.$ul.append(temp)
      this.el.append(this.$ul)
    }
  }

  Select.prototype.renderFooter = function() {
    var _this = this
    var $selectFooter = $('<div class="select-footer"></div>')
    if (!this.option.hideButton) {
      var $footerBtn = $('<button class="btn btn-default footer-btn">' + (this.option.buttonText || '确定') + '</button>')
      $footerBtn.on('click', function(e) {
        if (_this.option.buttonConfirm) {
          var result = _this.option.buttonConfirm.call(_this, e)
          if (result !== false) {
            closeSelects()
          }
        } else {
          closeSelects()
        }
      })
      $selectFooter.append($footerBtn)
      this.$select.append($selectFooter)
    }
  }

  Select.prototype.render = function() {
    var option = this.option
    var $ctrl = this.createCtrl()
    this.$ul = $('<ul class="select-menu"></ul>')
    this.$select = this.$ul
    if (this.el[0].tagName == 'SELECT') {
      this._renderFromTag($ctrl)
    } else if (option.treeOption) {
      this._renderTree($ctrl)
    } else if (option.data) {
      this._renderFromData($ctrl)
    } else if (option.url) {
      this._renderFromUrl($ctrl)
    }
    if (!option.search && !option.multiple && !option.treeOption) {
      $ctrl.before('<span class="scaret"></span>')
    }
    if (this.option.value) this.setValue(this.option.value)
    $ctrl.on('click.bs.select', this.toggle.bind(this))
      .on('keydown.bs.select.data-api', Select.prototype.keydown)
  }

  Select.prototype.createItem = function(obj) {
    var $li = $('<li>')
    var $item = null
    var title = obj.name
    if (this.option.highlight) {
      title = $('<div>' + obj.name + '</div>').text()
    }
    if (this.option.itemFormater) {
      $item = $(this.option.itemFormater(obj))
    } else {
      if (this.option.multiple) {
        $item = $('<a href="javascript:;" title="' + title + '" data-id="' + obj.id + '"><input type="checkbox"> ' + obj.name + '</a>')
      } else {
        $item = $('<a href="javascript:;" title="' + title + '" data-id="' + obj.id + '">' + obj.name + '</a>')
      }
    }
    $item.on('click.bs.select.data-api', this.selectItem.bind(this))
    $li.append($item)
    return $li;
  }

  Select.prototype.createCtrl = function() {
    var $ctrl = null
    if (this.option.search && !this.option.multiple && !this.option.treeOption) {
      $ctrl = $('<input class="form-control ctrl"' + (this.option.disabled ? ' disabled' : ' ') + 'placeholder="' + (this.option.placeholder || '') + '">')
      if (this.option.url) {
        $ctrl.on('keyup.bs.select', this.search.bind(this))
      } 
      else {
        $ctrl.on('keyup.bs.select', this.filter.bind(this))
      }
    } else {
      var $ops = this.el.find('option')
      var selectValue = $($ops[0]).text()
      for (var i = 0; i < $ops.length; i++) {
        if ($ops[i].selected) {
          selectValue = $($ops[i]).text()
          break
        }
      }
      $ctrl = $('<button type="button" class="form-control ctrl"' + (this.option.disabled ? ' disabled' : ' ') + '>' + (selectValue || this.option.placeholder || '') + '</button>')
    }
    return $ctrl;
  }

  Select.prototype.setValue = function(value) {
    var $ctrl = this._findCtrl()
    this.value =  value
    var ids = []
    var names = []
    var id = ''
    var name = ''
    if (this.option.multiple) {
      $.each(this.value, function(i, item)  {
        ids.push(item.id)
        names.push(item.name)
      })
      id = ids.join(',')
      name = names.join(',')

      this._checkedValue(ids)
      if (this.option.search) fillTag(this, value)
    } else {
      id = value.id
      name = value.name
    }

    if (this.option.search && !this.option.multiple) {
      $ctrl.val(name)
    } else {
      $ctrl.text(name)
    }
    $ctrl.data('id', id)
    $ctrl.attr('title', name)

    if (this.isSelect) this.$ul.parent().prev().val(id)
    this.toggleClearBtn()
  }

  Select.prototype._getValueBy = function(filed, value)  {
    if (this.option.multiple && $.isArray(value)) {
      var values = []
      for (var i = 0; i < value.length; i++) {
        for (var j = 0; j < this.data.length; j++) {
          if (value[i] == this.data[j][filed]) {
            values.push(this.data[j])
          }
        }
      }
      return values
    } else {
      var value;
      for (var j = 0; j < this.data.length; j++) {
        if (value == this.data[j][filed]) {
          value = this.option.multiple ? [this.data[j]] : this.data[j]
        }
      }
      return value
    }
  }

  Select.prototype.setValueById = function(id) {
    if (!this.data) return
    var value = this._getValueBy('id', id)
    if (value) this.setValue(value)
  }

  Select.prototype.setValueByName = function(name) {
    if (!this.data) return
    var value = this._getValueBy('name', name)
    if (value) this.setValue(value)
  }

  Select.prototype.toggleClearBtn = function() {
    if (!this.option.search && !this.option.multiple && !this.option.treeOption) {
      return
    }
    var $ctrl = this._findCtrl()
    if ($ctrl.text() || $ctrl.val()) {
      if (this.option.placeholder && ($ctrl.text().trim() == this.option.placeholder || $ctrl.val().trim() == this.option.placeholder)) return
      if ($ctrl.prev().hasClass('form-control-feedback')) return
      var $clearBtn = $('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
      $clearBtn.on('click.bs.select', this.handleClear.bind(this))
      $ctrl.before($clearBtn)
    } else if ($ctrl.prev().hasClass('form-control-feedback')) {
      $ctrl.prev().remove()
      $ctrl.text(this.option.placeholder || '')
    }
    if (this.option.disabled) {
      if (this.isSelect) {
        this.el.next().find('.glyphicon-remove').hide()
      } else {
        this.el.find('.glyphicon-remove').hide()
      }
    } else {
      if (this.isSelect) {
        this.el.next().find('.glyphicon-remove').show()
      } else {
        this.el.find('.glyphicon-remove').show()
      }
    }
  }

  Select.prototype.tagDelete = function(e) {
    var item = $(e.currentTarget).parent()
    if (this.option.treeOption) {
      this.tree.unCheck(item.data('id'))
    } else {
      this.$ul.find('a[data-id="' + item.data('id') + '"] input').prop('checked', false)
      this._removeValueItem({ id: item.data('id') })
      this.triggerSelect()
    }
    e.stopPropagation()
  }

  Select.prototype._findCtrl = function() {
    if (this.isSelect) {
      return this.el.next().find('.ctrl')
    }

    return this.el.find('.ctrl')
  }

  Select.prototype.handleClear = function(e) {
    var ctrl = this._findCtrl()
    this.clearValue()
    var evt = { currentTarget: ctrl[0] }
    this.$select.removeClass('open')
    this.toggle(evt)
    ctrl.focus()
    this.$select.find('.select-search-div input').focus()
    e.stopPropagation()
  }

  Select.prototype.clearValue = function(e) {
    var ctrl = this._findCtrl()
    if (this.option.multiple) {
      this.$ul.find(':checked').prop('checked', false)
    }

    if (this.option.treeOption) {
      this.tree.clearValue()
    }

    var $selectTag = this.$select.parent().prev()
    if (this.isSelect) {
      $selectTag.find('option[selected]').attr('selected', false)
      $selectTag.val('')
    }
    if (this.option.search && !this.option.treeOption && !this.option.multiple) {
      ctrl.val('')
    } else {
      ctrl.text(this.option.placeholder || '')
      this.$select.find('.select-search-div input').val('')
    }
    ctrl.data('id', '')
    if (this.option.search) {
      this.el.find('.select-tag').remove()
    }
    this.value = undefined
    ctrl.prev().remove()
    this.el.trigger('bs.select.clear', [this])
  }

  Select.prototype.treeUnSelect = function(e, item)  {
    var _this = this
    $.each(item, function(i, ii) {
      _this._removeValueItem(ii)
    })

    this.el.trigger('bs.select.unselect', [item, this])
  }

  Select.prototype._isExists = function(item) {
    if (!this.value) return false
    var result = true
    for (var i = 0; i < this.value.length; i++) {
      if (item.id == this.value[i].id) {
        return true
      }
    }
    return false
  }

  Select.prototype.treeSelect = function(e, item) {
    var _this = this

    $.each(item, function(i, ii) {
      if (!_this._isExists(ii)) _this._addValueItem(ii)
    })

    this.el.trigger('bs.select.select', [item, this])
  }

  Select.prototype.treeChange = function(e) {
    var $ul = this.$ul
    var $ctrl = $ul.prev()
    var ids = []
    var names = []
    $.each(this.value, function(i, item) {
      ids.push(item.id)
      names.push(item.name)
    })
    $ctrl.text(names.join(','))
    $ctrl.attr('title', $ctrl.text())
    $ctrl.data('id', ids.join(','))
    if (this.option.search) {
      fillTag(this, this.value)
    }
    this.toggleClearBtn()
    this.el.trigger('bs.select.change', [this.value, this])
  }


  Select.prototype.treeRender = function(e) {
    var ids = []
    $.each(this.value || [], function(i, item) {
      ids.push(item.id)
    })
    if (ids) this._checkedValue(ids)
  }

  Select.prototype._selectedOption = function() {
    var $select = this.$select.parent().prev()
    if (this.option.multiple) {
      $select.val($.map(this.value, function(i) {
        return i.id + '' }))
    } else {
      $select.val(this.value.id + '')
    }
  }

  Select.prototype.selectItem = function(e) {
    var $ul = this.$select
    var $ctrl = $ul.prev()
    var value = $(e.currentTarget).text()
    var id = $(e.currentTarget).data('id')
    var item = { id: id, name: value }
    if (this.option.multiple) {
      var $cb = $(e.currentTarget).find('input')
      if (e.target.tagName !== 'INPUT') $cb.prop('checked', !$cb.prop('checked'))
      if ($cb.prop('checked')) {
        var e = $.Event('bs.select.select', { target: e.currentTarget })
        this.el.trigger(e, [item, this])
        this._addValueItem(item)
      } else {
        var e = $.Event('bs.select.unselect', { target: e.currentTarget })
        this.el.trigger(e, [item, this])
        this._removeValueItem(item)
      }
      this.triggerSelect()
      if (this.isSelect) this._selectedOption()
    } else {
      this.value = item
      if (this.option.search) {
        $ctrl.val(value)
      } else {
        $ctrl.text(value)
      }
      $ctrl.data('id', id)
      $ctrl.attr('title', value)

      if (this.isSelect) this._selectedOption()
      this.toggleClearBtn()
      closeSelects(e)
      var e1 = $.Event('bs.select.change', { target: e.currentTarget })
      var e2 = $.Event('bs.select.select', { target: e.currentTarget })
      this.el.trigger(e1, [item, this])
      this.el.trigger(e2, [item, this])
    }
  }

  Select.prototype.treeSearch = function (e) {
    this.tree.search(e, this.value)
  }

  Select.prototype._addValueItem = function(item) {
    this.value = this.value || []
    this.value.push(item)
  }

  Select.prototype._removeValueItem = function(item) {
    var _this = this
    for (var i = 0; i < _this.value.length; i++) {
      if (_this.value[i].id === item.id) {
        _this.value.splice(i, 1)
        break
      }
    }
  }

  Select.prototype.triggerSelect = function() {
    var $ul = this.$select
    var $ctrl = $ul.prev()
    var values = []
    var ids = []
    $.each(this.value, function(i, item) {
      values.push(item.name)
      ids.push(item.id)
    })
    var value = values.join(',')
    if (this.option.search) {
      fillTag(this, this.value)
    }
    $ctrl.data('id', ids.join(','))
    $ctrl.text(value)
    $ctrl.attr('title', value)
    this.toggleClearBtn()
    this.el.trigger('bs.select.change', [this.value, this])
    var $search = this.$select.find('.select-search-div input')
    if ($search.length > 0) $search[0].select()
  }

  Select.prototype.getId = function() {
    var ids = this.$select.prev().data('id')
    if (ids === undefined) ids = ''
    if (this.option.multiple) return ids.split(',')
    return ids
  }

  Select.prototype.getName = function() {
    var names = ''
    if (this.option.search  && !this.option.multiple) {
      names = this.$select.prev().val()
    } else {
      names = this.$select.prev().text()
    }
    names = names.replace(this.option.placeholder, '')
    if (!this.option.multiple) return names || ''
    return names ? names.split(',') : []
  }

  Select.prototype.getValue = function() {
    var ids = this.getId()
    var names = this.getName()
    if (!this.option.multiple) return { id: ids, name: names }
    var values = []
    $.each(ids, function(i) {
      values.push({ id: ids[i], name: names[i] })
    })
    return values
  }

  Select.prototype.enable = function() {
    if (this.isSelect) {
      this.el.next().find('.ctrl').attr('disabled', false)
    } else {
      this.el.find('.ctrl').attr('disabled', false)
    }
    this.el.find('.glyphicon-remove').show()
  }

  Select.prototype.disable = function() {
    if (this.isSelect) {
      this.el.next().find('.ctrl').attr('disabled', true)
      this.el.next().find('.glyphicon-remove').hide()
    } else {
      this.el.find('.ctrl').attr('disabled', true)
      this.el.find('.glyphicon-remove').hide()
    }
  }

  Select.prototype.setParams = function(params) {
    this.option.params = params
  }

  Select.prototype.setInitData = function(data) {
    this.option.initData = data
  }

  Select.prototype._checkedValue = function(ids) {
    var _this = this
    if (this.option.treeOption) {
      this.tree._checkedValue(ids)
    } else {
      $.each(ids, function(i, id) {
        _this.$ul.find('a[data-id="' + id + '"] input').prop('checked', true)
      })
    }
  }

  Select.prototype.search  = function(e) {
    var _this = this
    this.data = []
    var params = this.option.params || {}
    var value = $(e.currentTarget).val()
    if(_this.lastJQXHR && _this.lastJQXHR.readyState !== 4) _this.lastJQXHR.abort()
    if (this.option.multiple) {
      value = this.$select.find('.select-search-div input').val()
    }
    if (!value) {
      if ($(e.currentTarget).prev().hasClass('glyphicon-remove')) $(e.currentTarget).prev().remove()

      if (this.option.search && this.option.initData) {
        this.$ul.empty()
        if (this.option.initMark) {
          this.$ul.append('<li class="init-mark">' + this.option.initMark + '</li>')
        }
        $.each(this.option.initData, function(i, item) {
          _this.$ul.append(_this.createItem(item))
        })

        if (this.option.multiple) {
          var ids = this.$select.prev().data('id')
          if (ids === undefined) ids = ''
          this._checkedValue(ids.split(','))
        }
        return
      }
    }
    params[this.option.keyword || 'q'] = value
    _this.lastJQXHR = $.ajax({
      data: params,
      url: this.option.url
    }).done(function(data) {
      _this.$ul.empty()
      if (_this.option.dataFormater) {
        data = _this.option.dataFormater(data)
      }

      $.each(data, function(i, item) {
        var text = ''
        var id = ''
        if (typeof item === 'string') {
          text = item
          id = text
        } else {
          text = item.name
          id = item.id || item.name
          if (_this.option.nameField) {
            text = item[_this.option.nameField] + ''
          }
          if (_this.option.idField) {
            id = item[_this.option.idField]
          }
        }
        item.id = id
        item.name = text
        if (_this.option.highlight) {
          text = text.replace(value, '<font style="color: red;">' + value + '</font>')
        }
        _this.$ul.append(_this.createItem(item))
        _this.data.push(item)
      })
      if (_this.option.multiple) {
        var ids = _this.$select.prev().data('id')
        if (ids === undefined) ids = ''
        _this._checkedValue(ids.split(','))
      }
      handleUnusual(_this.$ul, _this, value)
    })
  }

  function highlightWord(target, $ul, value, item) {
    var text = ''
    if (typeof item === 'string') {
      text = item
    } else {
      text = item.name
    }
    if (text.indexOf(value) !== -1) {
      if (target.option.highlight) {
        text = text.replace(value, '<font style="color: red;">' + value + '</font>')
      }
      $ul.append(target.createItem({ id: item.id, name: text }))
    }
  }

  Select.prototype.filter = function (e) {
    var _this = this
    var $el = $(e.currentTarget)
    var value = $el.val()
    var $ul = $el.next()
    $ul.empty()
    if (!value && $el.prev().hasClass('glyphicon-remove')) {
      $el.prev().remove()
    }
    if (this.isSelect) {
      this.el.children().each(function(i, item) {
        highlightWord(_this, $ul, value, { id: $(item).val(), name: $(item).text() })
      })
    } else {
      $.each(this.option.data, function(i, item) {
        highlightWord(_this, $ul, value, item)
      })
    }

    handleUnusual($ul, this, value)
  }

  function handleUnusual(ul, obj, value) {
    obj.toggleClearBtn()
    if (ul.children().length == 0) {
      var nff = obj.option.notFoundFormater
      if (nff) {
        ul.append('<li>'  + ($.isFunction(nff) ? nff(value) : nff) +  '</li>')
      } else {
        if (value) {
          ul.append('<li><div class="no-data">没有找到 “<span>' + (value || '') + '</span>”</div></li>')
        } else {
          ul.append('<li><div class="no-data">暂无数据！</div></li>')
        }
      }
    }

    if (obj.option.beforeOpen && $.isFunction(obj.option.beforeOpen)) {
      var result = obj.option.beforeOpen(obj)
        // have undefined
      if (result === false) return
    }

    if (!ul.hasClass('open')) ul.addClass('open')
  }

  Select.prototype.toggle = function(e) {
    var $this = $(e.currentTarget)

    if ($this.is('.disabled, :disabled')) return

    if (this.option.beforeOpen && $.isFunction(this.option.beforeOpen)) {
      var result = this.option.beforeOpen(this)
        // have undefined
      if (result === false) return
    }

    var isActive = this.$select.hasClass('open')

    if (isActive) {
      $(backdrop).remove()
      $('.select-menu').removeClass('open')
    } else {
      if ('ontouchstart' in document.documentElement && !this.$select.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('select-backdrop')
          .insertAfter($this)
          .on('click', closeSelects)
      }

      this.$select.css('width', this.option.width || $this.css('width'))
      this.$ul.css('max-height', (this.option.rows || 10) * 35 + 2 + 'px')
      toggleDirection(this.$select)

      if (!this.$select.hasClass('open')) {
        closeSelects()
        this.$select.addClass('open')
        var _this = this
        if (this.option.search) {
          this.$select.find('.select-search-div input').focus()
          if (this.option.url) {
            this.search(e)
          } else if (this.option.data) {
            this.filter(e)
          }
        }
      } else {
        this.$select.remvoeClass('open')
      }
    }
    // return false
  }

  Select.prototype.keydown = function(e) {
    if (!/(38|40|27)/.test(e.which)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent = $this;
    if (!$this.hasClass('select-menu')) $parent = $this.next()

    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $this.trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find(desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index <= 0) {
      index = $items.length - 1 // cycle up
    } else if (e.which == 38 && index > 0) {
      index-- // up
    } else if (e.which == 40 && index < $items.length - 1) {
      index++ // down
    } else if (e.which == 40 && index >= $items.length - 1) {
      index = 0 // cycle down
    }

    if (!~index) index = 0

    $items.eq(index).trigger('focus')
  }

  function onScrollPosition() {
    var $select = $(document).find('.select-menu.open')
    if ($select.length > 0) {
      toggleDirection($select)
    }
  }

  // :TODO 会一下拉长，一下缩短，闪屏
  function handleDirection($select, $ctrl, bottomHeight, topHeight, height) {
    if (bottomHeight < height && topHeight < height) {
      if (bottomHeight < topHeight) {
        if (!$ctrl.hasClass('dropup')) $ctrl.addClass('dropup')
        $select.css('max-height', topHeight + 'px')
      } else {
        if ($ctrl.hasClass('dropup')) $ctrl.removeClass('dropup')
        $select.css('max-height', topHeight + 'px')
      }
    } else {
      if (topHeight > height) {
        if (!$ctrl.hasClass('dropup')) $ctrl.addClass('dropup')
        $select.css('max-height', height + 'px')
      } else {
        if ($ctrl.hasClass('dropup')) $ctrl.removeClass('dropup')
        $select.css('max-height', height + 'px')
      }
    }
  }

  function toggleDirection($select) {
    var lastTop = $(document).data('scroll_top') || 99999
    var top = $(document).scrollTop()
    $(document).data('scroll_top', top)
    var height = $select.height() + 12
    var winHeight = $(window).height()
    var dropTop = $select.prev().offset().top

    var $ctrl = $select.closest('.select')

    var topHeight = dropTop - top  // 上面的空白高度
    var bottomHeight = top - dropTop + winHeight - $ctrl.height() // 下面空白高度

    // 向下滚动
    if (top > lastTop) {
      if (bottomHeight > height) {
        if ($ctrl.hasClass('dropup')) $ctrl.removeClass('dropup')
      } else if (bottomHeight > topHeight) {
        if ($ctrl.hasClass('dropup')) $ctrl.removeClass('dropup')
      }
    } else {
      if (bottomHeight > height) {
        if ($ctrl.hasClass('dropup')) $ctrl.removeClass('dropup')
      } else if (bottomHeight < height && topHeight > height) {
        if (!$ctrl.hasClass('dropup')) $ctrl.addClass('dropup')
      } else if (topHeight > bottomHeight) {
        if (!$ctrl.hasClass('dropup')) $ctrl.addClass('dropup')
      }
    }
  }

  // Select PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    option = option || {}
    option.$el = $(this)
    if (option.$el.length === 1) {
      return new Select(option)
    } else if (option.$el.length > 1) {
      var selects = []
      option.$el.each(function(i, el) {
        option.$el = $(el)
        selects.push(new Select(option))
      })
      return selects
    }
  }

  var old = $.fn.select

  $.fn.select = Plugin
  $.fn.select.Constructor = Select


  // Select NO CONFLICT
  // ====================

  $.fn.select.noConflict = function() {
    $.fn.select = old
    return this
  }

  // APPLY TO STANDARD Select ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.select', closeSelects)
    .on('keydown.bs.select.data-api', '.select-menu', Select.prototype.keydown)
    .on('click.bs.select.data-api', '.select-menu', stopEvent)
    .on('scroll.bs.select.data-api', onScrollPosition)

  $(function() {
    var nodes = $('select[data-toggle="select"]')
    $.each(nodes, function(i, item) {
      var $el = $(item)
      var opts = {}
      if ($el.attr('multiple')) opts.multiple = true
      $el.select(opts)
    })
  })

}(jQuery);

+function ($) {
  'use strict';

  var Tree = function (option) {
    this.option = option
    this.el = option.$el
    this.render(this.option.data || this.option.url)
  }

  Tree.VERSION = '3.3.6'

  Tree.prototype.clearValue = function () {
    this.el.find('input:checked').prop('checked', false)
  }

  Tree.prototype.unCheck = function (id) {
    var target = this.el.find('input[data-id=' + id + ']')
    target.prop('checked', false)
    checkPrtCheck(target.parent())
    cancelPrtCheck(target.parent())
    this.triggerSelect(target)
  }

  Tree.prototype.render = function (data) {
    if (typeof data === 'string') {
      this.getUrlData(data)
    } else {
      var $ul = $('<ul></ul>')
      $ul = this.createNode($ul, data, 0)
      this.hiddenRoot($ul)
      this.el.empty().append($ul)
      this.eachTree ($ul)
      this.el.trigger('bs.tree.render', [this])
    }
  }

  Tree.prototype.search = function (e) {
    var params = {}
    params[this.option.keyword || 'q'] = $(e.target).val()
    this.getUrlData(this.option.url, params)
  }

  Tree.prototype.hiddenRoot = function (curTag) {
    if (this.option.hiddenRoot) {
      curTag.addClass('indent-gap')
      var $rootCtrl = curTag.children(':first').children(':first')
      $rootCtrl.remove()
    }
  }

  Tree.prototype.eachTree = function (curTag) {
    var _this = this
    if (curTag.find('li').length) {
      $.each(curTag.find('li'), function () {
        if (_this.mathSelectValues($(this).children('p.branch').children('label').find('span').text())){
          $(this).children('p.branch').children('label').find('input').prop('checked', true)
        }
        checkPrtCheck($(this))
        cancelPrtCheck($(this))
      })
    }
  }

  Tree.prototype.getUrlData = function (url, params) {
    var _this = this
    $.ajax({
      url: url,
      data: params,
      dataType: 'json'
    }).then(function (data) {
      if (_this.option.dataFormater && $.isFunction(_this.option.dataFormater)) {
        data = _this.option.dataFormater(data)
      }
      _this.render(data)
    });
  }

  Tree.prototype.mathSelectValues = function (name) {
    var selectValues = this.option.selectValues || []
    var flag = false
    if (selectValues.length) {
      $.each(selectValues, function (i, v) {
        if (name.indexOf(v) !== -1) flag = true
      })
    }
    return flag
  }

  Tree.prototype._checkedValue = function (ids) {
    var _this = this
    $.each(ids, function (i, id) {
      var target = _this.el.find('input[data-id="' + id + '"]')
      target.prop('checked', true)
    })
  }

  function toogleChildren(e) {
    $(e.currentTarget).parent().parent().find('ul').toggle()
    $(e.currentTarget).parent().parent().find('.fold').toggleClass('unfold')
  }

  Tree.prototype.outputVal = function (e) {
    e.stopPropagation()
    var $curTagPrt = $(e.currentTarget).parent().parent().parent()

    checkPrtCheck($curTagPrt)
    cancelPrtCheck($curTagPrt)
    this.triggerSelect($(e.currentTarget))
  }

  Tree.prototype.triggerSelect = function (target) {
    var checked = target.prop('checked')
    var isLeaf = target.hasClass('leaf')
    var changeValues = []
    this.el.find('input.leaf:checked').each(function (i, ii) {
      changeValues.push({ id: $(ii).data('id'), name: $(ii).next().text() })
    })

    var selectValues = []
    if (isLeaf) {
      selectValues = [{ id: target.data('id'), name: target.next().text()}]
    } else {
      target.parent().parent().next().find('input.leaf').each(function (i, ii) {
        selectValues.push({ id: $(ii).data('id'), name: $(ii).next().text() })
      })
    }
    if (checked) {
      this.el.trigger('bs.tree.select', [selectValues])
    } else {
      this.el.trigger('bs.tree.unselect', [selectValues])
    }
    this.el.trigger('bs.tree.change', [changeValues])
  }

  function checkPrtCheck(curTag) {
    if (curTag.find('li').length) {
      if (curTag.children('p.branch').children('label').find('input').prop('checked')) {
        curTag.children('p.branch').next().find('input').prop('checked', true)
      } else {
        curTag.children('p.branch').next().find('input').prop('checked', false)
      }
    }
  }

  function cancelPrtCheck(curTag) {
    if (curTag.children('p.branch').children('label').find('input').prop('checked')) {
      var prtCheck = true
      curTag.siblings('li').each(function () {
        if (!$(this).children('p.branch').children('label').find('input').prop('checked')) {
          prtCheck = false
        }
      });
      if (prtCheck) {
        curTag.parent().parent().children('p.branch').children('label').find('input').prop('checked', true)
        cancelPrtCheck(curTag.parent().parent())
      }
    } else {
      if (curTag.parent().parent().length) {
        if ((curTag.parent().parent())[0].tagName === 'LI') {
          curTag.parent().parent().children('p.branch').children('label').find('input').prop('checked', false)
          cancelPrtCheck(curTag.parent().parent())
        }
      }
    }
  }

  Tree.prototype.createNode = function ($ul, data, level) {
    if (!data) return
    var id = data.id
    var name = data.name
    var children = data.children
    var $li
    if (this.option.idField) id = data[this.option.idField]
    if (this.option.nameField) name = data[this.option.nameField]
    if (this.option.childrenField) children = data[this.option.childrenField]

    if (!children) {
      $li = $('<li class="leaf-box"><p class="branch" style="padding-left: ' + (level > 1 ? level * 22 + 15.5 + 10  : level * 37 + 10) + 'px;"><label class="panel-checkbox"><input class="leaf" type="checkbox" data-id="' + id + '"><span class="name-val">' + name + '</span></label></p></li>')
      $li.find('input').on('click.bs.tree', this.outputVal.bind(this))
      $ul.append($li)
      return $ul
    } else {
      var $icon = $('<span class="fold unfold"><i class="h-line"></i><i class="v-line"></i></span>')
      $icon.on('click.bs.tree', toogleChildren)
      $li = $('<li><p class="branch" style="padding-left: ' + (level * 22 + 10) + 'px;"><label class="panel-checkbox"><input type="checkbox" data-id="' + id + '"><span class="name-val">' + name + '</span></label></p></li>')
      $li.find('input').on('click.bs.tree', this.outputVal.bind(this))
      $li.find('label').before($icon)
      $ul.append($li)
    }
    level++
    var $sub = $('<ul></ul>')
    $ul.find('li:last p').after($sub)
    var _this = this
    $.each(children, function (i, item) {
      _this.createNode($sub, item, level)
    })
    return $ul
  }

  function Plugin(option) {
    option = option || {}
    option.$el = $(this)
    return new Tree(option)
  }

  var old = $.fn.select

  $.fn.tree = Plugin
  $.fn.tree.Constructor = Tree

  $.fn.tree.noConflict = function () {
    $.fn.tree = old
    return this
  }

}(jQuery);

+function ($) {
  var MMGrid = function (element, options) {
    this._id = (((1 + Math.random()) * 0x10000) | 0).toString(16);
    this._loadCount = 0;
    this.opts = options;
    this._initLayout($(element));
    this._initHead();
    this._initOptions();
    this._initEvents();
    this._setColsWidth();
    if (this.opts.fullWidthRows) {
      this._fullWidthRows();
    }

    // 初始化插件
    for (var i = 0; i < this.opts.plugins.length; i++) {
      var plugin = this.opts.plugins[i];
      plugin.init($.extend(element, this));
    }

    if (options.autoLoad) {
      var that = this;
      this.opts = options;
      setTimeout(function () {

        if (options.url) {
          that.load();
        } else {
          that.load(options.items);
        }
      }, 0); // chrome style problem
    }

  };

  // see: http://tanalin.com/en/articles/ie-version-js/
  var browser = function () {
    var isIE = !!window.ActiveXObject;
    var isIE10 = isIE && !!window.atob;
    var isIE9 = isIE && document.addEventListener && !window.atob;
    var isIE8 = isIE && document.querySelector && !document.addEventListener;
    var isIE7 = isIE && window.XMLHttpRequest && !document.querySelector;
    var isIE6 = isIE && !window.XMLHttpRequest;

    return {
      isIE: isIE,
      isIE6: isIE6,
      isIE7: isIE7,
      isIE8: isIE8,
      isIE9: isIE9,
      isIE10: isIE10
    };
  }();

  MMGrid.prototype = {

    _initLayout: function ($el) {
      var opts = this.opts;
      var $elParent = $el.parent();
      var elIndex = $el.index();

      var mmGrid = [
        '<div class="mmGrid">',
        '<style></style>',
        '<div class="mmg-headWrapper">',
        '<table class="mmg-head" cellspacing="0"></table>',
        '</div>',
        '<div class="mmg-colResizePointer"></div>',
        '<div class="mmg-colResizePointer-before"></div>',
        '<div class="mmg-backboard">',
        '<a class="mmg-btnBackboardUp"><i class="glyphicon glyphicon-arrow-up"></i></a>',
        '</div>',
        '<div class="mmg-bodyWrapper"></div>',
        '<a class="mmg-btnBackboardDn"><i class="glyphicon glyphicon-arrow-down"></i></a>',
        '<div class="mmg-message">' + this.opts.noDataText + '</div>',
        '<div class="mmg-mask mmg-transparent"></div>',
        '<div class="mmg-loading">',
        '<div class="mmg-loadingImg"></div>',
        '<div class="mmg-loadingText">' + this.opts.loadingText + '</div>',
        '</div>',

        '</div>'
      ];
      // fix in IE7,IE6
      if (browser.isIE7 || browser.isIE6) {
        $el.prop('cellspacing', 0);
      }


      // cached object
      var $mmGrid = $(mmGrid.join(''));
      this.$mmGrid = $mmGrid;
      this.$style = $mmGrid.find('style');
      this.$headWrapper = $mmGrid.find('.mmg-headWrapper');
      this.$head = $mmGrid.find('.mmg-head');
      this.$backboard = $mmGrid.find('.mmg-backboard');
      this.$bodyWrapper = $mmGrid.find('.mmg-bodyWrapper');
      this.$body = $el.removeAttr('style').addClass('mmg-body');
      this._insertEmptyRow();
      this.$body.appendTo(this.$bodyWrapper);



      // 放回原位置
      if (elIndex === 0 || $elParent.children().length == 0) {
        $elParent.prepend(this.$mmGrid);
      } else {
        $elParent.children().eq(elIndex - 1).after(this.$mmGrid);
      }


      // fix in ie6
      if (browser.isIE6 && (!opts.width || opts.width === 'auto')) {
        $mmGrid.width('100%');
        $mmGrid.width($mmGrid.width() - ($mmGrid.outerWidth(true) - $mmGrid.width()));
      } else {
        $mmGrid.width(opts.width);
      }

      if (browser.isIE6 && (!opts.height || opts.height === 'auto')) {
        $mmGrid.height('100%');
        $mmGrid.height($mmGrid.height() - ($mmGrid.outerHeight(true) - $mmGrid.height()));
      } else {
        $mmGrid.height(opts.height);
      }

      if (opts.checkCol) {
        var chkHtml = opts.multiSelect ? '<input type="checkbox" class="checkAll" >' : '<input type="checkbox" disabled="disabled" class="checkAll">';
        opts.cols.unshift({
          title: chkHtml,
          width: 20,
          align: 'center',
          lockWidth: true,
          checkCol: true,
          renderer: function () {
            return '<input type="checkbox" class="mmg-check">';
          }
        });
      }

      if (opts.indexCol) {
        opts.cols.unshift({
          title: '#',
          width: opts.indexColWidth,
          align: 'center',
          lockWidth: true,
          indexCol: true,
          renderer: function (val, item, rowIndex) {
            return '<label class="mmg-index">' + (rowIndex + 1) + '</label>';
          }
        });
      }
    },

    _expandCols: function (cols) {
      var newCols = [];
      if (!cols) {
        return newCols;
      }
      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
        var col = cols[colIndex];
        if (col.cols) {
          newCols.push(col);
          newCols.push.apply(newCols, this._expandCols(col.cols));
        } else {
          newCols.push(col);
        }
      }
      return newCols;
    },

    _leafCols: function () {
      var opts = this.opts;
      var newCols = [];
      var cols = this._expandCols(opts.cols);
      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
        var col = cols[colIndex];
        if (!col.cols) {
          newCols.push(col);
        }
      }
      return newCols;
    },

    _expandThs: function () {
      return this.$head.find('th').sort(function (a, b) {
        return parseInt($(a).data('colindex')) - parseInt($(b).data('colindex'));
      });
    },

    _leafThs: function () {
      return this.$head.find('th').filter(function () {
        return !$.data(this, 'col').cols;
      }).sort(function (a, b) {
        return parseInt($(a).data('colindex')) - parseInt($(b).data('colindex'));
      });
    },

    _colsWithTitleDeep: function (cols, deep) {
      var newCols = [];
      if (!cols) {
        return newCols;
      }
      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
        var col = cols[colIndex];
        if (deep === 1) {
          newCols.push(col);
        } else {
          newCols.push.apply(newCols, this._colsWithTitleDeep(col.cols, deep - 1));
        }
      }
      return newCols;
    },

    _titleDeep: function (cols) {
      var deep = 1;
      for (var colIndex = 0; colIndex < cols.length; colIndex++) {
        var col = cols[colIndex];
        if (col.cols) {
          var newDeep = 1 + this._titleDeep(col.cols);
          if (deep < newDeep) {
            deep = newDeep;
          }
        }
      }
      return deep;
    },

    _titleHtml: function (col, rowspan) {
      var opts = this.opts;

      var titleHtml = [];
      if (!col.cols) {
        titleHtml.push('<th class="');
        var colIndex = $.inArray(col, this._expandCols(opts.cols));
        titleHtml.push(this._genColClass(colIndex));
        titleHtml.push(' " ');
        titleHtml.push(' rowspan="');
        titleHtml.push(rowspan);
        titleHtml.push('" colspan="');
        titleHtml.push(1);
        titleHtml.push('" data-colIndex="');
        titleHtml.push(colIndex);
        titleHtml.push('" >');
        titleHtml.push('<div class="mmg-titleWrapper" >');
        titleHtml.push('<span class="mmg-title ');
        if (col.sortable) titleHtml.push('mmg-canSort ');
        titleHtml.push('">');
        if (col.titleHtml) {
          titleHtml.push(col.titleHtml);
        } else {
          titleHtml.push(col.title);
        }
        titleHtml.push('</span><div class="mmg-sort"><i class="glyphicon"></i></div>');
        if (!col.lockWidth) titleHtml.push('<div class="mmg-colResize"></div>');
        titleHtml.push('</div></th>');
      } else {
        var displayColsLength = col.cols.length;
        $.each(col.cols, function (index, item) {
          if (item.hidden) {
            displayColsLength--;
          }
        });
        if (displayColsLength === 0) {
          col.hidden = true;
        }
        titleHtml.push('<th class="');
        var colIndex = $.inArray(col, this._expandCols(opts.cols));
        titleHtml.push(this._genColClass(colIndex));
        titleHtml.push(' mmg-groupCol" ');
        titleHtml.push(' rowspan="');
        titleHtml.push(rowspan - 1);
        titleHtml.push('" colspan="');
        titleHtml.push(displayColsLength);
        titleHtml.push('" data-colIndex="');
        titleHtml.push(colIndex);
        titleHtml.push('" >');
        titleHtml.push('<div class="mmg-titleWrapper" >');
        titleHtml.push('<span class="mmg-title ');
        if (col.sortable) titleHtml.push('mmg-canSort ');
        titleHtml.push('">');
        if (col.titleHtml) {
          titleHtml.push(col.titleHtml);
        } else {
          titleHtml.push(col.title);
        }
        titleHtml.push('</span><div class="mmg-sort"></div>');
        titleHtml.push('</div></th>');
      }

      return titleHtml.join('');
    },

    _initHead: function () {
      var that = this;
      var opts = this.opts;
      var $head = this.$head;

      if (opts.cols) {
        var theadHtmls = ['<thead>'];

        // 获取标题深度
        var titleDeep = that._titleDeep(opts.cols);
        for (var deep = 1; deep <= titleDeep; deep++) {
          var cols = that._colsWithTitleDeep(opts.cols, deep);
          theadHtmls.push('<tr>');
          for (var colIndex = 0; colIndex < cols.length; colIndex++) {
            var col = cols[colIndex];
            theadHtmls.push(this._titleHtml(col, titleDeep - deep + 1));
          }
          theadHtmls.push('</tr>');
        }
        theadHtmls.push('</thead>');
        $head.html(theadHtmls.join(''));
      }

      var $ths = this._expandThs();
      var expandCols = this._expandCols(opts.cols);
      $.each($ths, function (index) {
        if (!expandCols[index].width) {
          expandCols[index].width = 100;
        }
        $.data(this, 'col-width', expandCols[index].width);
        $.data(this, 'col', expandCols[index]);
      });

      var $mmGrid = this.$mmGrid;
      var $headWrapper = this.$headWrapper;
      var $bodyWrapper = this.$bodyWrapper;
      if (opts.height !== 'auto') {
        $bodyWrapper.height($mmGrid.height() - $headWrapper.outerHeight(true));
      }

      // 初始化排序状态
      if (opts.sortName) {
        for (var colIndex = 0; colIndex < expandCols.length; colIndex++) {
          var col = expandCols[colIndex];
          if (col.sortName === opts.sortName || col.name === opts.sortName) {
            var $th = $ths.eq(colIndex);
            $.data($th.find('.mmg-title')[0], 'sortStatus', opts.sortStatus);
            $th.find('.mmg-sort').addClass('mmg-' + opts.sortStatus);
          }
        }
      }
    },

    _initOptions: function () {
      var opts = this.opts;
      var $mmGrid = this.$mmGrid;
      var $headWrapper = this.$headWrapper;
      var $backboard = this.$backboard;
      $mmGrid.find('a.mmg-btnBackboardDn').css({
        top: $headWrapper.outerHeight(true)
      }).slideUp('fast');
      var cols = this._leafCols();
      if (cols) {
        var bbHtml = ['<h1>显示列</h1>'];
        var dchtml = '<div class="hidden-cols"><h1>显示列</h1>';
        var fchtml = '<div class="frozen-cols"><h1>冻结列</h1>';
        for (var colIndex = 0; colIndex < cols.length; colIndex++) {
          dchtml += '<label';
          fchtml += '<label';
          if (cols[colIndex].checkCol || cols[colIndex].indexCol) {
            dchtml += ' style="display:none;" ';
            fchtml += ' style="display:none;" ';
          }
          var col = cols[colIndex];
          dchtml += '><input type="checkbox"';
          fchtml += '><input type="checkbox"';
          if (!col.hidden) dchtml += ' checked="checked"';
          if (col.frozen) fchtml += ' checked="checked"';
          if (col.lockDisplay) dchtml += ' disabled="disabled"';
          dchtml += '/><span>';
          fchtml += '/><span>';
          if (col.title) {
            dchtml += col.title;
            fchtml += col.title;
          } else {
            dchtml += '未命名';
            fchtml += '未命名';
          }

          dchtml += '</span></label>';
          fchtml += '</span></label>';
        }
        $backboard.append(dchtml + '</div>');
        if (this.opts.freezable) $backboard.append(fchtml + '</div>');
      }
    },

    _initEvents: function () {
      var that = this;
      var opts = this.opts;
      var $mmGrid = this.$mmGrid;
      var $headWrapper = this.$headWrapper;
      var $head = this.$head;
      var $bodyWrapper = this.$bodyWrapper;
      var $body = this.$body;
      var $backboard = this.$backboard;
      var $ths = this._expandThs();
      var expandCols = this._expandCols(opts.cols);
      var leafCols = this._leafCols();

      // 调整浏览器
      if (opts.width === 'auto' || opts.height === 'auto' || (typeof opts.width === 'string' && opts.width.indexOf('%') === opts.width.length - 1) ||
        typeof opts.height === 'string' && opts.height.indexOf('%') === opts.height.length - 1) {
        $(window).on('resize', function () {
          that.resize();
        });
      }

      // 滚动条事件
      $bodyWrapper.on('scroll', function () {
        $head.css('left', -$(this).scrollLeft());
      });

      // 向下按钮
      var $btnBackboardDn = $mmGrid.find('a.mmg-btnBackboardDn').on('click', function () {
        var backboardHeight = $mmGrid.height() - $headWrapper.outerHeight(true);
        if (opts.height === 'auto' && opts.backboardMinHeight !== 'auto' && backboardHeight < opts.backboardMinHeight) {
          backboardHeight = opts.backboardMinHeight;
        }
        $backboard.height(backboardHeight);
        if (opts.height === 'auto') {
          $mmGrid.height($headWrapper.outerHeight(true) + $backboard.outerHeight(true));
        }
        $backboard.slideDown();
        $btnBackboardDn.slideUp('fast');

        that._hideMessage();
      });
      $body.on('mouseenter', function () {
        $btnBackboardDn.slideUp('fast');
      });
      $mmGrid.on('mouseleave', function () {
        $btnBackboardDn.slideUp('fast');
      });
      $headWrapper.on('mouseenter', function () {
        if ($backboard.is(':hidden') && opts.showBackboard) {
          $btnBackboardDn.slideDown('fast');
        }
      });

      // 向上按钮
      $mmGrid.find('a.mmg-btnBackboardUp').on('click', function () {
        $backboard.slideUp().queue(function (next) {
          if (!that.rowsLength() || (that.rowsLength() === 1 && $body.find('tr.emptyRow').length === 1)) {
            that._showNoData();
          }
          if (opts.height === 'auto') {
            $mmGrid.height('auto');
          }
          next();
        });
      });

      // 隐藏列
      $backboard.on('click', '.hidden-cols :checkbox', function () {
        var index = $backboard.find('.hidden-cols label').index($(this).parent());
        // 最后一个不隐藏
        var last = 1;
        if (opts.checkCol) {
          last = last + 1;
        }
        if (opts.indexCol) {
          last = last + 1;
        }
        if ($backboard.find('.hidden-cols label :checked').length < last) {
          this.checked = true;
          return;
        }

        var col = leafCols[index];
        if (this.checked) {
          col.hidden = false;
          $backboard.find('.frozen-cols label > :checkbox:eq(' + index + ')').prop('disabled', false);
        } else {
          col.hidden = true;
          col.frozen = false;
          $backboard.find('.frozen-cols label > :checkbox:eq(' + index + ')').prop('checked', false).prop('disabled', true);
        }

        var $ths = $head.find('th');
        for (var colIndex = $ths.length - 1; colIndex >= 0; colIndex--) {
          var $th = $ths.eq(colIndex);
          var iCol = $th.data('col');
          if (iCol.cols) {
            var hidden = true;
            var colspan = 0;
            $.each(iCol.cols, function (index, item) {
              if (!item.hidden) {
                hidden = false;
                colspan++;
              }
            });

            // IE bug
            if (colspan !== 0) {
              $th.prop('colspan', colspan);
            }
            iCol.hidden = hidden;
          }
        }
        that._setColsWidth();
        that._frozenColumns();
        $backboard.height($mmGrid.height() - $headWrapper.outerHeight(true));
        if (opts.height !== 'auto') {
          $bodyWrapper.height($mmGrid.height() - $headWrapper.outerHeight(true));
        }
        $mmGrid.find('a.mmg-btnBackboardDn').css({
          top: $headWrapper.outerHeight(true)
        })
      });

      // 冻结列
      $backboard.on('click', '.frozen-cols :checkbox', function () {
        var index = $backboard.find('.frozen-cols label').index($(this).parent());
        var col = leafCols[index];
        var width = col.width;
        if (this.checked) {
          col.hidden = true;
          col.frozen = true;
        } else {
          col.hidden = false;
          col.frozen = false;
        }
        var exceed = that._calcFrozenProps();
        if (exceed) return false;
        that._setColsWidth();
        $backboard.height($mmGrid.height() - $headWrapper.outerHeight(true));
        if (opts.height !== 'auto') {
          $bodyWrapper.height($mmGrid.height() - $headWrapper.outerHeight(true));
        }
        $mmGrid.find('a.mmg-btnBackboardDn').css({
          top: $headWrapper.outerHeight(true)
        })

        that._frozenColumns();
      });

      // 排序事件
      $head.on('click', '.mmg-title', function () {
        var $this = $(this);
        var $titles = $ths.find('.mmg-title');

        // 当前列不允许排序
        var col = $this.parent().parent().data('col');
        if (!col.sortable) {
          return;
        }
        // 取得当前列下一个排序状态
        var sortStatus = $.data(this, 'sortStatus') === 'asc' ? 'desc' : 'asc';
        // 清除排序状态
        $.each($titles, function () {
          $.removeData(this, 'sortStatus');
        });
        $ths.find('.mmg-sort').removeClass('mmg-asc').removeClass('mmg-desc');
        $ths.find('.mmg-sort i').removeClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
        $mmGrid.find('.mmg-frozen-head-th .glyphicon').removeClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down')

        // 设置当前列排序状态
        $.data(this, 'sortStatus', sortStatus);
        if (sortStatus === 'desc') {
          $this.siblings('.mmg-sort').find('i').addClass('glyphicon-chevron-up');
        }else {
          $this.siblings('.mmg-sort').find('i').addClass('glyphicon-chevron-down');
        }
        $this.siblings('.mmg-sort').addClass('mmg-' + sortStatus);

        if (opts.url && opts.remoteSort) {
          that.load()
        } else {
          that._nativeSorter($.inArray(col, leafCols), sortStatus);
          that._setStyle();
        }
      }).on('mousedown', '.mmg-colResize', function (e) {
        // 调整列宽
        var $resize = $(this);
        var start = e.pageX;
        var $colResizePointer = $mmGrid.find('.mmg-colResizePointer')
          .css('left', e.pageX - $headWrapper.offset().left).show();

        var scrollLeft = $head.position().left;
        var $colResizePointerBefore = $mmGrid.find('.mmg-colResizePointer-before')
          .css('left', $resize.parent().parent().position().left + scrollLeft).show();
        // 取消文字选择
        document.selection && document.selection.empty && (document.selection.empty(), 1) || window.getSelection && window.getSelection().removeAllRanges();
        document.body.onselectstart = function () {
          return false;
        };
        $headWrapper.css('-moz-user-select', 'none');

        $mmGrid.on('mousemove', function (e) {
          $colResizePointer.css('left', e.pageX - $headWrapper.offset().left);
        }).on('mouseup', function (e) {
          // 改变宽度
          var $th = $resize.parent().parent();
          var width = $th.width() + e.pageX - start;
          $.data($th[0], 'col-width', width);
          that._setColsWidth();
          $headWrapper.mouseleave();
        }).on('mouseleave', function () {
          $mmGrid.off('mouseup').off('mouseleave').off('mousemove');
          $colResizePointer.hide();
          $colResizePointerBefore.hide();
          document.body.onselectstart = function () {
            return true; // 开启文字选择
          };
          $headWrapper.css('-moz-user-select', 'text');
        });
      });

      // 选中事件
      var $body = this.$body;
      $body.on('click', 'td', function (e) {
        var $this = $(this);
        var event = jQuery.Event('cellSelected');
        event.target = e.target;
        that.$body.triggerHandler(event, [$.data($this.parent()[0], 'item'), $this.parent().index(), $this.index()]);

        if (event.isPropagationStopped()) {
          return;
        }
        if (!$this.parent().hasClass('selected')) {
          that.select($this.parent().index());
        } else {
          that.deselect($this.parent().index());
        }
      });

      $body.on('click', 'tr > td .mmg-check', function (e) {
        e.stopPropagation();
        var $this = $(this);
        if (this.checked) {
          that.select($($this.parents('tr')[0]).index());
        } else {
          that.deselect($($this.parents('tr')[0]).index());
        }
      });

      // checkbox列
      if (opts.checkCol) {
        $head.find('th .checkAll').on('click', function () {
          if (this.checked) {
            that.select('all');
          } else {
            that.deselect('all');
          }
        });
      }

      // IE6不支持hover
      if (browser.isIE6) {
        $body.on('mouseenter', 'tr', function () {
          $(this).toggleClass('hover');
        }).on('mouseleave', 'tr', function () {
          $(this).toggleClass('hover');
        });
      };

      $body.on('loadSuccess', function(e) {
        that._frozenColumns();
      })

     $body.on('cellSelected', function(e, item, rowIndex, colIndex) {
        var $trs = that.$mmGrid.find('.mmg-frozen .row-' + rowIndex)
        for (var i = 0; i < $trs.length; i++) {
          var $tr = $($trs[i])
          if (!that.opts.multiSelect) {
            var selected = $tr.hasClass('selected')
            $tr.parent().find('tr.selected').removeClass('selected')
            if (!selected)  {
              $tr.addClass('selected')
              $tr.find(':checkbox').prop('checked', true);
            }
          }else {
            if ($tr.hasClass('selected')) {
              $tr.removeClass('selected')
              $tr.find(':checkbox').prop('checked', false);
            } else {
              $tr.addClass('selected')
              $tr.find(':checkbox').prop('checked', true);
            }
          }
        }
      })
    },

    _rowHtml: function (item, rowIndex) {
      var opts = this.opts;
      var expandCols = this._expandCols(opts.cols);
      var leafCols = this._leafCols();


      if ($.isPlainObject(item)) {
        var trHtml = [];
        trHtml.push('<tr>');
        for (var colIndex = 0; colIndex < leafCols.length; colIndex++) {
          var col = leafCols[colIndex];
          trHtml.push('<td class="');
          var index = $.inArray(col, expandCols);
          trHtml.push(this._genColClass(index));
          if (opts.nowrap) {
            trHtml.push(' nowrap');
          }
          trHtml.push('"><span class="');
          if (opts.nowrap) {
            trHtml.push('nowrap');
          }
          trHtml.push('">');
          if (col.renderer) {
            trHtml.push(col.renderer(item[col.name], item, rowIndex));
          } else {
            trHtml.push(item[col.name]);
          }

          trHtml.push('</span></td>');
        };
        trHtml.push('</tr>');
        return trHtml.join('');
      }
    },

    _populate: function (items) {
      var opts = this.opts;
      var $body = this.$body;

      this._hideMessage();
      if (items && items.length !== 0 && opts.cols) {

        var tbodyHtmls = [];
        tbodyHtmls.push('<tbody>');
        for (var rowIndex = 0; rowIndex < items.length; rowIndex++) {
          var item = items[rowIndex];
          tbodyHtmls.push(this._rowHtml(item, rowIndex));
        }
        tbodyHtmls.push('</tbody>');
        $body.empty().html(tbodyHtmls.join(''));
        var $trs = $body.find('tr');
        for (var rowIndex = 0; rowIndex < items.length; rowIndex++) {
          $.data($trs.eq(rowIndex)[0], 'item', items[rowIndex]);
        }
      } else {
        this._insertEmptyRow();
        this._showNoData();
      }
      this._setStyle();

      if (opts.fullWidthRows && this._loadCount <= 1) {
        this._fullWidthRows();
      }
    },

    _insertEmptyRow: function () {
      var $body = this.$body;
      $body.empty().html('<tbody><tr class="emptyRow"><td  style="border: 0px;background: none;">&nbsp;</td></tr></tbody>');
    },
    _removeEmptyRow: function () {
      var $body = this.$body;
      $body.find('tr.emptyRow').remove();
    },

    /* 生成列类 */
    _genColClass: function (colIndex) {
      return 'mmg' + this._id + '-col' + colIndex;
    },

    _setStyle: function () {
      var $head = this.$head;
      var $ths = this._expandThs();
      var $body = this.$body;
      var leafCol = this._leafCols();

      // head
      $ths.eq(0).addClass('first');
      $ths.eq(-1).addClass('last');
      // body
      $body.find('tr,td').removeClass('even')
        .removeClass('colSelected').removeClass('colSelectedEven');

      $body.find('tr:odd').addClass('even');

      var sortIndex = $.inArray($head.find('.mmg-title').filter(function () {
        return $.data(this, 'sortStatus') === 'asc' || $(this).data('sortStatus') === 'desc';
      }).parent().parent().data('col'), leafCol);

      $body.find('tr > td:nth-child(' + (sortIndex + 1) + ')').addClass('colSelected')
        .filter(':odd').addClass('colSelectedEven');

      this._resizeHeight();

    },
    _setColsWidth: function () {
      this._calcFrozenProps()

      var opts = this.opts;
      var $style = this.$style;
      var $head = this.$head;

      var $bodyWrapper = this.$bodyWrapper;
      var $body = this.$body;
      var $ths = this._expandThs();
      var expandCols = this._expandCols(opts.cols);

      var scrollTop = $bodyWrapper.scrollTop();
      var scrollLeft = $head.position().left;

      $bodyWrapper.width(9999);
      $body.width('auto');
      var styleText = [];
      for (var colIndex = 0; colIndex < $ths.length; colIndex++) {
        var $th = $ths.eq(colIndex);
        styleText.push('.mmGrid .' + this._genColClass(colIndex) + ' {');
        var width = $.data($th[0], 'col-width');
        styleText.push('width: ' + width + 'px;');
        styleText.push('max-width: ' + width + 'px;');

        var col = expandCols[colIndex];
        if (col.align) {
          styleText.push('text-align: ' + col.align + ';');
        }
        if (col.hidden) {
          styleText.push('display: none; ');
        }
        styleText.push(' }');
      }

      $body.detach();
      try {
        $style.text(styleText.join(''));
      } catch (error) {
        $style[0].styleSheet.cssText = styleText.join(''); // IE fix
      }
      $body.width($head.width());
      $bodyWrapper.width('100%');
      $bodyWrapper.append($body);

      // 调整滚动条

      $bodyWrapper.scrollLeft(-scrollLeft);
      if ($bodyWrapper.scrollLeft() === 0) {
        $head.css('left', 0);
      }

      $bodyWrapper.scrollTop(scrollTop);
    },
    _fullWidthRows: function () {
      var opts = this.opts;
      var $bodyWrapper = this.$bodyWrapper;
      var $mmGrid = this.$mmGrid;
      var $head = this.$head;
      var scrollWidth = $bodyWrapper.width() - $bodyWrapper[0].clientWidth;

      if (scrollWidth && browser.isIE) {
        scrollWidth = scrollWidth + 1;
      }

      var fitWidth = $mmGrid.width() - $head.width() - scrollWidth;
      if (fitWidth < -20) {
        return;
      }

      var thsArr = [];
      var $ths = this._leafThs();
      var leafCol = this._leafCols();
      for (var i = 0; i < leafCol.length; i++) {
        var col = leafCol[i];
        var $th = $ths.eq(i);
        if (!col.lockWidth && $th.is(':visible')) {
          thsArr.push($th);
        }
      }

      var increaseWidth = Math.floor(fitWidth / thsArr.length);
      var maxColWidthIndex = 0;
      for (var i = 0; i < thsArr.length; i++) {
        var $th = thsArr[i];
        var colWidth = $.data($th[0], 'col-width') + increaseWidth;
        $.data($th[0], 'col-width', colWidth);

        var maxColWidth = $.data(thsArr[maxColWidthIndex][0], 'col-width');
        if (maxColWidth < colWidth) {
          maxColWidthIndex = i;
        }
      }

      var remainWidth = fitWidth - increaseWidth * thsArr.length;
      var maxColWidth = $.data(thsArr[maxColWidthIndex][0], 'col-width');
      $.data(thsArr[maxColWidthIndex][0], 'col-width', maxColWidth + remainWidth);
      this._setColsWidth();
    },

    _showLoading: function () {
      var $mmGrid = this.$mmGrid;
      $mmGrid.find('.mmg-mask').show();

      var $loading = $mmGrid.find('.mmg-loading');
      $loading.css({
        left: ($mmGrid.width() - $loading.width()) / 2,
        top: ($mmGrid.height() - $loading.height()) / 2
      }).show();
    },
    _hideLoading: function () {
      var $mmGrid = this.$mmGrid;
      $mmGrid.find('.mmg-mask').hide();
      $mmGrid.find('.mmg-loading').hide();
    },
    _showNoData: function () {
      this._showMessage(this.opts.noDataText);
    },

    _showLoadError: function () {
      this._showMessage(this.opts.loadErrorText);
    },

    _showMessage: function (msg) {
      var $mmGrid = this.$mmGrid;
      var $headWrapper = this.$headWrapper;
      var $message = $mmGrid.find('.mmg-message');
      $message.css({
        left: ($mmGrid.width() - $message.width()) / 2,
        top: ($mmGrid.height() + $headWrapper.height() - $message.height()) / 2
      }).text(msg).show();
    },

    _hideMessage: function () {
      var $mmGrid = this.$mmGrid;
      $mmGrid.find('.mmg-message').hide();
    },

    _nativeSorter: function (colIndex, sortStatus) {
      var leafCols = this._leafCols();
      var col = leafCols[colIndex];

      this.$body.find('tr > td:nth-child(' + (colIndex + 1) + ')')
        .sortElements(function (a, b) {
          var av = $.text($(a));
          var bv = $.text($(b));
          // 排序前转换
          if (col.type === 'number') {
            av = parseFloat(av);
            bv = parseFloat(bv);
          } else {
            // 各个浏览器localeCompare的结果不一致
            return sortStatus === 'desc' ? -av.localeCompare(bv) : av.localeCompare(bv);
          }
          return av > bv ? (sortStatus === 'desc' ? -1 : 1) : (sortStatus === 'desc' ? 1 : -1);
        }, function () {
          return this.parentNode;
        });
    },

    _refreshSortStatus: function () {
      var $ths = this.$head.find('th');
      var sortColIndex = -1;
      var sortStatus = '';
      $ths.find('.mmg-title').each(function (index, item) {
        var status = $.data(item, 'sortStatus');
        if (status) {
          sortColIndex = index;
          sortStatus = status;
        }
      });
      var sortStatus = sortStatus === 'desc' ? 'asc' : 'desc';
      if (sortColIndex >= 0) {
        $ths.eq(sortColIndex).find('.mmg-title').data('sortStatus', sortStatus).click();
      }
    },

    _loadAjax: function (args) {
      var that = this;
      var opts = this.opts;
      var params = {};
      // opt的params可以使函数，例如收集过滤的参数
      if ($.isFunction(opts.params)) {
        var p = opts.params();
        if (!p) {
          return;
        }
        params = $.extend(params, p);
      } else if ($.isPlainObject(opts.params)) {
        params = $.extend(params, opts.params);
      }

      if (opts.remoteSort) {
        var sortName = '';
        var sortStatus = '';
        var $titles = this.$head.find('.mmg-title');
        for (var colIndex = 0; colIndex < $titles.length; colIndex++) {
          var status = $.data($titles[colIndex], 'sortStatus');
          if (status) {
            var col = $titles.eq(colIndex).parent().parent().data('col');
            sortName = col.sortName ?
              col.sortName : col.name;
            sortStatus = status;
          }
        }
        if (sortName) {
          if (opts.sort) {
            params = opts.sort(params, sortName, sortStatus)
          } else {
            params.sort = sortName + '.' + sortStatus;
          }
        }
      }


      // 插件参数合并
      var pluginParams = {};
      for (var i = 0; i < this.opts.plugins.length; i++) {
        var plugin = this.opts.plugins[i];
        $.extend(pluginParams, plugin.params());
      }
      params = $.extend(params, pluginParams);

      // 合并load的参数
      params = $.extend(params, args);

      that._showLoading();
      $.ajax({
        type: opts.method,
        url: opts.url,
        data: params,
        dataType: 'json',
        cache: opts.cache
      }).done(function (data) {
        /* modifed by ljf
         * transform the data with option: root
         */
        if ($.isFunction(opts.transform)) {
          data = opts.transform(data);
        }

        try {
          // 获得root对象
          var items = data;
          if ($.isArray(data[opts.root])) {
            items = data[opts.root];
          }
          that._populate(items);
          that._hideLoading();
          if (!opts.remoteSort) {
            that._refreshSortStatus();
          }

          if (data && $.isArray(data[opts.root])) {
            data = $.extend(args, data);
          }
          that.$body.triggerHandler('loadSuccess', data);


        } catch (e) {
          that._hideLoading();
          that._showLoadError();
          throw e;
        }

      }).fail(function (data) {
        that._hideLoading();
        that._showLoadError();
        that.$body.triggerHandler('loadError', data);
      });
    },

    _loadNative: function (args) {
      this._populate(args);
      this._refreshSortStatus();
      this.$body.triggerHandler('loadSuccess', args);
    },

    load: function (args) {
      try {
        var opts = this.opts;
        this._hideMessage();
        this._loadCount = this._loadCount + 1;

        if ($.isArray(args)) {
          // 加载本地数据
          this._loadNative(args);
        } else if (opts.url) {
          this._loadAjax(args);
        } else if (opts.items) {
          this._loadNative(opts.items);
        } else {
          this._loadNative([]);
        }
      } catch (e) {
        this._showLoadError();
        throw e;
      }
    },

    // 重设尺寸
    resize: function () {
      var opts = this.opts;
      var $mmGrid = this.$mmGrid;
      var $headWrapper = this.$headWrapper;
      var $bodyWrapper = this.$bodyWrapper;

      // fix in ie6
      if (browser.isIE6 && (!opts.width || opts.width === 'auto')) {
        $mmGrid.width('100%');
        $mmGrid.width($mmGrid.width() - ($mmGrid.outerWidth(true) - $mmGrid.width()));
      } else {
        $mmGrid.width(opts.width);
      }

      if (opts.height !== 'auto') {
        if (browser.isIE6 && (!opts.height || opts.height === 'auto')) {
          $mmGrid.height('100%');
          $mmGrid.height($mmGrid.height() - ($mmGrid.outerHeight(true) - $mmGrid.height()));
        } else {
          $mmGrid.height(opts.height);
        }

        $bodyWrapper.height($mmGrid.height() - $headWrapper.outerHeight(true));
      }

      // 调整message
      var $message = $mmGrid.find('.mmg-message');
      if ($message.is(':visible')) {
        $message.css({
          left: ($mmGrid.width() - $message.width()) / 2,
          top: ($mmGrid.height() + $headWrapper.height() - $message.height()) / 2
        });
      }

      // 调整loading
      var $mask = $mmGrid.find('.mmg-mask');
      if ($mask.is(':visible')) {
        $mask.width($mmGrid.width()).height($mmGrid.height());
        var $loadingWrapper = $mmGrid.find('.mmg-loading');
        $loadingWrapper.css({
          left: ($mmGrid.width() - $loadingWrapper.width()) / 2,
          top: ($mmGrid.height() - $loadingWrapper.height()) / 2
        })
      }

      $bodyWrapper.trigger('scroll');

      this._resizeHeight();
    },

    _resizeHeight: function () {
      var opts = this.opts;
      var $bodyWrapper = this.$bodyWrapper;
      var $body = this.$body;
      if (opts.height === 'auto' && browser.isIE7) {
        $bodyWrapper.height('auto');
        if ($bodyWrapper.width() < $body.width()) {
          $bodyWrapper.height($bodyWrapper.height() + $bodyWrapper.height() - $bodyWrapper[0].clientHeight + 1);
        }
      }
    },

    // 选中
    select: function (args) {
        var opts = this.opts;
        var $body = this.$body;
        var $head = this.$head;

        if (typeof args === 'number') {
          var $tr = $body.find('tr').eq(args);
          if (!opts.multiSelect) {
            $body.find('tr.selected').removeClass('selected');
            if (opts.checkCol) {
              $body.find('tr > td').find('.mmg-check').prop('checked', '');
            }
          }
          if (!$tr.hasClass('selected')) {
            $tr.addClass('selected');
            if (opts.checkCol) {
              $tr.find('td .mmg-check').prop('checked', 'checked');
            }
          }
        } else if (typeof args === 'function') {
          $.each($body.find('tr'), function (index) {
            if (args($.data(this, 'item'), index)) {
              var $this = $(this);
              if (!$this.hasClass('selected')) {
                $this.addClass('selected');
                if (opts.checkCol) {
                  $this.find('td .mmg-check').prop('checked', 'checked');
                }
              }
            }
          });
        } else if (args === undefined || (typeof args === 'string' && args === 'all')) {
          $body.find('tr.selected').removeClass('selected');
          $body.find('tr').addClass('selected');
          $body.find('tr > td').find('.mmg-check').prop('checked', 'checked');
        } else {
          return;
        }

        if (opts.checkCol) {
          var $checks = $body.find('tr > td').find('.mmg-check');
          if ($checks.length === $checks.filter(':checked').length) {
            $head.find('th .checkAll').prop('checked', 'checked');
            this.$mmGrid.find('.mmg-frozen-check .checkAll').prop('checked', 'checked');
          }
        }
      },

    // 取消选中
    deselect: function (args) {
      var opts = this.opts;
      var $body = this.$body;
      var $head = this.$head;
      if (typeof args === 'number') {
        $body.find('tr').eq(args).removeClass('selected');
        if (opts.checkCol) {
          $body.find('tr').eq(args).find('td .mmg-check').prop('checked', '');
        }
      } else if (typeof args === 'function') {
        $.each($body.find('tr'), function (index) {
          if (args($.data(this, 'item'), index)) {
            $(this).removeClass('selected');
            if (opts.checkCol) {
              $(this).find('td .mmg-check').prop('checked', '');
            }
          }
        });
      } else if (args === undefined || (typeof args === 'string' && args === 'all')) {
        $body.find('tr.selected').removeClass('selected');
        if (opts.checkCol) {
          $body.find('tr > td').find('.mmg-check').prop('checked', '');
        }
      } else {
        return;
      }

      $head.find('th .checkAll').prop('checked', '');
      this.$mmGrid.find('.mmg-frozen-check .checkAll').prop('checked', '');
    },
    selectedRows: function () {
      var $body = this.$body;
      var selected = [];
      $.each($body.find('tr.selected'), function (index, item) {
        selected.push($.data(this, 'item'));
      });
      return selected;
    },

    selectedRowsIndex: function () {
      var $body = this.$body;
      var $trs = this.$body.find('tr')
      var selected = [];
      $.each($body.find('tr.selected'), function (index) {
        selected.push($trs.index(this));
      });
      return selected;
    },

    rows: function () {
      var $body = this.$body;
      var items = [];
      $.each($body.find('tr'), function () {
        items.push($.data(this, 'item'));
      });
      return items;
    },

    row: function (index) {
      var $body = this.$body;
      if (index !== undefined && index >= 0) {
        var $tr = $body.find('tr').eq(index);
        if ($tr.length !== 0) {
          return $.data($tr[0], 'item');
        }
      }
    },

    rowsLength: function () {
      var $body = this.$body;
      var length = $body.find('tr').length;
      if (length === 1 && $body.find('tr.emptyRow').length === 1) {
        return 0;
      }
      return length;
    },

    // 添加数据，第一个参数可以为数组
    addRow: function (item, index) {
        var $tbody = this.$body.find('tbody');

        if ($.isArray(item)) {
          for (var i = item.length - 1; i >= 0; i--) {
            this.addRow(item[i], index);
          }
          return;
        }

        if (!$.isPlainObject(item)) {
          return;
        }

        this._hideMessage();
        this._removeEmptyRow();

        var $tr;

        if (index === undefined || index < 0) {
          $tr = $(this._rowHtml(item, this.rowsLength()));
          $tbody.append($tr);
        } else {
          $tr = $(this._rowHtml(item, index));
          if (index === 0) {
            $tbody.prepend($tr);
          } else {
            var $before = $tbody.find('tr').eq(index - 1);
            // 找不到就插到最后
            if ($before.length === 0) {
              $tbody.append($tr);
            } else {
              $before.after($($tr));
            }
          }
        }
        $tr.data('item', item);
        this._setStyle();


        this.$body.triggerHandler('rowInserted', [item, index]);
      },

    // 更新行内容，两个参数都必填
    updateRow: function (item, index) {
      var opts = this.opts;
      var $tbody = this.$body.find('tbody');
      if (!$.isPlainObject(item)) {
        return;
      }
      var oldItem = this.row(index);

      var $tr = $tbody.find('tr').eq(index);
      var checked = $tr.find('td:first :checkbox').is(':checked');
      $tr.html(this._rowHtml(item, index).slice(4, -5));
      if (opts.checkCol) {
        $tr.find('td:first :checkbox').prop('checked', checked);
      }

      $tr.data('item', item);
      this._setStyle();

      this.$body.triggerHandler('rowUpdated', [oldItem, item, index]);
    },

    // 删除行，参数可以为索引数组
    removeRow: function (index) {
      var that = this;
      var $tbody = that.$body.find('tbody');

      if ($.isArray(index)) {
        for (var i = index.length - 1; i >= 0; i--) {
          that.removeRow(index[i]);
        }
        return;
      }

      if (index === undefined) {
        var $trs = $tbody.find('tr');
        for (var i = $trs.length - 1; i >= 0; i--) {
          that.removeRow(i);
        }
      } else {
        var item = that.row(index);
        $tbody.find('tr').eq(index).remove();
        this.$body.triggerHandler('rowRemoved', [item, index]);
      }
      this._setStyle();
      if (this.rowsLength() === 0) {
        this._showNoData();
        this._insertEmptyRow();
      }
    },

    _buildFrozenColumn: function(col, data) {
      var html = '<tbody>';
      for (var i = 0; i < data.length; i++) {
        html += '<tr class="row-' + i + (data[i].isSelected ? ' selected' : '') + '"><td class="col-' + col.index + '">'
        if (col.checkCol) {
          html += '<input type="checkbox" class="mmg-check"' + ((data[i].isSelected ? ' checked' : '')) + '>'
        } else if (col.indexCol) {
          html += '<label class="mmg-index">' + data[i].text + '</label>'
        } else {
          html += '<span>' + data[i].text + '</span>'
        }
        html += '</td></tr>';
      }
      html += '</tbody>';
      return html;
    },

    _calcFrozenProps: function() {
      var threshold = this.$body.parent().width() - 200;
      var exceed = false;
      var width = 0;

      var cols = this._leafCols()
      var hasFrozen = false
      for (var i = 0; i < cols.length; i++) {
        var col = cols[i]
        if (col.frozen && !col.indexCol && !col.checkCol) {
          if (threshold < width) {
            exceed = true
            col.hidden = false
            col.frozen = false
          } else {
            col.hidden = true
            hasFrozen = true
            width += col.width
          }
        } else if (col.indexCol || col.checkCol) {
          width += col.width
        }
      }
      if (hasFrozen) {
        if (this.opts.indexCol && this.opts.checkCol) {
          cols[0].hidden = true
          cols[0].frozen = true
          cols[1].hidden = true
          cols[1].frozen = true
        } else if (this.opts.indexCol || this.opts.checkCol) {
          cols[0].hidden = true
          cols[0].frozen = true
        }
      } else {
        if (this.opts.indexCol && this.opts.checkCol) {
          cols[0].hidden = false
          cols[0].frozen = false
          cols[1].hidden = false
          cols[1].frozen = false
        } else if (this.opts.indexCol || this.opts.checkCol) {
          cols[0].hidden = false
          cols[0].frozen = false
        }
      }
      return exceed;
    },

    _bindFrozenEvents: function($frozen, i) {
      var _this = this
      $frozen.find('.col-' + i).on('click', function(e) {
        $el = $(e.currentTarget)
        var colI = $el.attr('class').split('-')[1]
        var rowI = $el.parent().attr('class').split(' ')[0].split('-')[1]
        _this.$body.find('tr:eq(' + rowI + ') td:eq(' + colI + ')').trigger('click')
      })
    },

    // 冻结列
    _frozenColumns: function () {
      if (!this.opts.freezable) return
      var _this = this;
      var cols = this._leafCols()

      var width = 0;
      for (var i = 0; i < cols.length; i++) {
        var col = cols[i]
        col.index = i
        var name = col.name
        if (col.indexCol) name = 'index'
        if (col.checkCol) name = 'check'
        if (col.frozen) {
          var data = []
          var $bodyTr = _this.$body.find('tr')
          for (var j = 0; j < $bodyTr.length; j++) {
            var $td = $($bodyTr[j]).find('td:eq(' + i + ')');
            var isSelected = false
            if ($td.parent().hasClass('selected')) isSelected = true
            data.push({text: $td.text(), isSelected: isSelected});
          }
          var $frozen = _this.$mmGrid.find('.mmg-frozen-' + name)
          if ($frozen && $frozen.length > 0) {
            $frozen.find('.mmg-frozen-body').empty().append(_this._buildFrozenColumn(col, data))
            $frozen.css('marginLeft', width);
            width += col.width
            this._bindFrozenEvents($frozen, i);
          } else {
            $frozen = $(
              '<div class="mmg-frozen-' + name + ' mmg-frozen mmg-bodyWrapper" style="width: ' + (col.width + 1) + 'px;">' +
              '  <table class="mmg-frozen-head" style="width: ' + col.width + 'px;">' +
              '    <thead>' +
              '      <tr>' +
              '        <th class="mmg-frozen-head-th' + (col.sortable ? ' mmg-canSort' : '' ) + '"' + (col.checkCol ? ' style="padding: 8px 0;"' : '') +
              '          data-index="' + i + '">' + col.title + '<i class="glyphicon"></i></th>' +
              '      </tr>' +
              '    </thead>' +
              '  </table>' +
              '  <div class="mmg-frozen-bodyWrapper">' +
              '    <table class="mmg-frozen-body mmg-body table-responsive">' +
              '    </table>' +
              '  </div>' +
              '</div>');
            $frozen.find('.mmg-frozen-body').append(this._buildFrozenColumn(col, data))
            this.$backboard.before($frozen);
            $frozen.css('marginLeft', width);
            width += col.width

            this.$bodyWrapper.on('scroll.frozen.' + name, function (e) {
              _this.$mmGrid.find('.mmg-frozen-bodyWrapper').scrollTop($(e.target).scrollTop());
            })

            $frozen.find('.checkAll').on('click', function(e) {
              _this.$head.find('.checkAll').trigger('click')
              if (e.target.checked) {
                _this.$mmGrid.find('.mmg-frozen tr').addClass('selected')
                _this.$mmGrid.find('.mmg-frozen tr :checkbox').prop('checked', true)
              } else {
                _this.$mmGrid.find('.mmg-frozen tr').removeClass('selected')
                _this.$mmGrid.find('.mmg-frozen tr :checkbox').prop('checked', false)
              }
            })

            $frozen.find('.mmg-canSort').on('click', function(e) {
              var $el = $(e.currentTarget)
              var $title = _this.$head.find('.mmg-title:eq(' + $el.data('index') +')')
              $title.trigger('click')
              if ($title.data('sortStatus') == 'asc') {
                $el.find('.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down')
              } else if ($title.data('sortStatus') == 'desc') {
                $el.find('.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up')
              }
            })

            this._bindFrozenEvents($frozen, i)
          }
        } else {
          var $frozen = this.$mmGrid.find('.mmg-frozen-' + name)
          if ($frozen && $frozen.length > 0) {
            $frozen.remove()
          }
        }
      }

      this.$head.css('marginLeft', width);
      this.$body.css('marginLeft', width);

      var height = this.$body.parent().height()
      if (this.$body.parent().width() < (this.$body.width() + parseFloat(this.$body.css('marginLeft').replace('px', '')))) {
        height -= 16;
      }
      this.$mmGrid.find('.mmg-frozen-bodyWrapper').height(height);
    }
  };

  $.fn.table = function () {
    if (this.length === 0) return
    if (arguments.length === 0 || typeof arguments[0] === 'object') {
      var option = arguments[0]
      var data = this.data('mmGrid')
      var options = $.extend(true, {}, $.fn.table.defaults, option)
      if (!data) {
        data = new MMGrid(this, options);
        this.data('mmGrid', data);
      }
      return $.extend(true, this, data);
    }
    if (typeof arguments[0] === 'string') {
      var data = this.data('mmGrid');
      var fn = data[arguments[0]];
      if (fn) {
        var args = Array.prototype.slice.call(arguments);
        return fn.apply(data, args.slice(1));
      }
    }
  };

  $.fn.table.defaults = {
    width: 'auto',
    height: '280px',
    cols: [],
    url: false,
    params: {},
    method: 'POST',
    cache: false,
    root: 'items',
    items: [],
    autoLoad: true,
    remoteSort: false,
    sortName: '',
    sortStatus: 'asc',
    loadingText: getLoading(),
    noDataText: '没有数据',
    loadErrorText: '数据加载出现异常',
    multiSelect: false,
    checkCol: false,
    indexCol: false,
    indexColWidth: 30,
    fullWidthRows: false,
    nowrap: false,
    showBackboard: true,
    backboardMinHeight: 125,
    freezable: true,
    plugins: [] // 插件 插件必须实现 init($mmGrid)和params()方法，参考mmPaginator
  };
  //  event : loadSuccess(e,data), loadError(e, data), cellSelected(e, item, rowIndex, colIndex)
  //          rowInserted(e,item, rowIndex), rowUpdated(e, oldItem, newItem, rowIndex), rowRemoved(e,item, rowIndex)
  //


  $.fn.table.Constructor = MMGrid;


  // see: http://james.padolsey.com/javascript/sorting-elements-with-jquery/
  $.fn.sortElements = (function () {
    var sort = [].sort;
    return function (comparator, getSortable) {
      getSortable = getSortable || function () {
        return this; };
      var placements = this.map(function () {
        var sortElement = getSortable.call(this)
        var parentNode = sortElement.parentNode
        var nextSibling = parentNode.insertBefore(
          document.createTextNode(''),
          sortElement.nextSibling
        );
        return function () {
          if (parentNode === this) {
            throw new Error(
              'You can\'t sort elements if any one is a descendant of another.'
            );
          }
          parentNode.insertBefore(this, nextSibling);
          parentNode.removeChild(nextSibling);
        };
      });
      return sort.call(this, comparator).each(function (i) {
        placements[i].call(getSortable.call(this));
      });
    };
  })();

}(window.jQuery);

/* global define */

/* ================================================
 * Make use of Bootstrap's modal more monkey-friendly.
 *
 * For Bootstrap 3.
 *
 * javanoob@hotmail.com
 *
 * https://github.com/nakupanda/bootstrap3-dialog
 *
 * Licensed under The MIT License.
 * ================================================ */
+(function (root, factory) {

    "use strict";

    // CommonJS module is defined
    root.BootstrapDialog = factory(root.jQuery);

}(window, function ($) {

    "use strict";

    /* ================================================
     * Definition of BootstrapDialogModal.
     * Extend Bootstrap Modal and override some functions.
     * BootstrapDialogModal === Modified Modal.
     * ================================================ */
    var Modal = $.fn.modal.Constructor;
    var BootstrapDialogModal = function (element, options) {
        Modal.call(this, element, options);
    };
    BootstrapDialogModal.getModalVersion = function () {
        var version = null;
        if (typeof $.fn.modal.Constructor.VERSION === 'undefined') {
            version = 'v3.1';
        } else if (/3\.2\.\d+/.test($.fn.modal.Constructor.VERSION)) {
            version = 'v3.2';
        } else if (/3\.3\.[1,2]/.test($.fn.modal.Constructor.VERSION)) {
            version = 'v3.3';  // v3.3.1, v3.3.2
        } else {
            version = 'v3.3.4';
        }

        return version;
    };
    BootstrapDialogModal.ORIGINAL_BODY_PADDING = parseInt(($('body').css('padding-right') || 0), 10);
    BootstrapDialogModal.METHODS_TO_OVERRIDE = {};
    BootstrapDialogModal.METHODS_TO_OVERRIDE['v3.1'] = {};
    BootstrapDialogModal.METHODS_TO_OVERRIDE['v3.2'] = {
        hide: function (e) {
            if (e) {
                e.preventDefault();
            }
            e = $.Event('hide.bs.modal');

            this.$element.trigger(e);

            if (!this.isShown || e.isDefaultPrevented()) {
                return;
            }

            this.isShown = false;

            // Remove css class 'modal-open' when the last opened dialog is closing.
            var openedDialogs = this.getGlobalOpenedDialogs();
            if (openedDialogs.length === 0) {
                this.$body.removeClass('modal-open');
            }

            this.resetScrollbar();
            this.escape();

            $(document).off('focusin.bs.modal');

            this.$element
            .removeClass('in')
            .attr('aria-hidden', true)
            .off('click.dismiss.bs.modal');

            $.support.transition && this.$element.hasClass('fade') ?
            this.$element
            .one('bsTransitionEnd', $.proxy(this.hideModal, this))
            .emulateTransitionEnd(300) :
            this.hideModal();
        }
    };
    BootstrapDialogModal.METHODS_TO_OVERRIDE['v3.3'] = {
        /**
         * Overrided.
         *
         * @returns {undefined}
         */
        setScrollbar: function () {
            var bodyPad = BootstrapDialogModal.ORIGINAL_BODY_PADDING;
            if (this.bodyIsOverflowing) {
                this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
            }
        },
        /**
         * Overrided.
         *
         * @returns {undefined}
         */
        resetScrollbar: function () {
            var openedDialogs = this.getGlobalOpenedDialogs();
            if (openedDialogs.length === 0) {
                this.$body.css('padding-right', BootstrapDialogModal.ORIGINAL_BODY_PADDING);
            }
        },
        /**
         * Overrided.
         *
         * @returns {undefined}
         */
        hideModal: function () {
            this.$element.hide();
            this.backdrop($.proxy(function () {
                var openedDialogs = this.getGlobalOpenedDialogs();
                if (openedDialogs.length === 0) {
                    this.$body.removeClass('modal-open');
                }
                this.resetAdjustments();
                this.resetScrollbar();
                this.$element.trigger('hidden.bs.modal');
            }, this));
        }
    };
    BootstrapDialogModal.METHODS_TO_OVERRIDE['v3.3.4'] = $.extend({}, BootstrapDialogModal.METHODS_TO_OVERRIDE['v3.3']);
    BootstrapDialogModal.prototype = {
        constructor: BootstrapDialogModal,
        /**
         * New function, to get the dialogs that opened by BootstrapDialog.
         *
         * @returns {undefined}
         */
        getGlobalOpenedDialogs: function () {
            var openedDialogs = [];
            $.each(BootstrapDialog.dialogs, function (id, dialogInstance) {
                if (dialogInstance.isRealized() && dialogInstance.isOpened()) {
                    openedDialogs.push(dialogInstance);
                }
            });

            return openedDialogs;
        }
    };

    // Add compatible methods.
    BootstrapDialogModal.prototype = $.extend(BootstrapDialogModal.prototype, Modal.prototype, BootstrapDialogModal.METHODS_TO_OVERRIDE[BootstrapDialogModal.getModalVersion()]);

    /* ================================================
     * Definition of BootstrapDialog.
     * ================================================ */
    var BootstrapDialog = function (options) {
        this.defaultOptions = $.extend(true, {
            id: BootstrapDialog.newGuid(),
            buttons: [],
            data: {},
            onshow: null,
            onshown: null,
            onhide: null,
            onhidden: null
        }, BootstrapDialog.defaultOptions);
        this.indexedButtons = {};
        this.registeredButtonHotkeys = {};
        this.draggableData = {
            isMouseDown: false,
            mouseOffset: {}
        };
        this.realized = false;
        this.opened = false;
        this.initOptions(options);
        this.holdThisInstance();
    };

    BootstrapDialog.BootstrapDialogModal = BootstrapDialogModal;

    /**
     *  Some constants.
     */
    BootstrapDialog.NAMESPACE = 'bootstrap-dialog';
    BootstrapDialog.TYPE_DEFAULT = 'type-default';
    BootstrapDialog.TYPE_INFO = 'type-info';
    BootstrapDialog.TYPE_PRIMARY = 'type-primary';
    BootstrapDialog.TYPE_SUCCESS = 'type-success';
    BootstrapDialog.TYPE_WARNING = 'type-warning';
    BootstrapDialog.TYPE_DANGER = 'type-danger';
    BootstrapDialog.DEFAULT_TEXTS = {};
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DEFAULT] = '提示';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO] = '提示';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_PRIMARY] = '提示';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_SUCCESS] = '成功';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING] = '警告';
    BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DANGER] = '错误';
    BootstrapDialog.DEFAULT_TEXTS['OK'] = '确定';
    BootstrapDialog.DEFAULT_TEXTS['CANCEL'] = '取消';
    BootstrapDialog.DEFAULT_TEXTS['CONFIRM'] = '确认';
    BootstrapDialog.SIZE_NORMAL = 'size-normal';
    BootstrapDialog.SIZE_SMALL = 'size-small';
    BootstrapDialog.SIZE_WIDE = 'size-wide';    // size-wide is equal to modal-lg
    BootstrapDialog.SIZE_LARGE = 'size-large';
    BootstrapDialog.BUTTON_SIZES = {};
    BootstrapDialog.BUTTON_SIZES[BootstrapDialog.SIZE_NORMAL] = '';
    BootstrapDialog.BUTTON_SIZES[BootstrapDialog.SIZE_SMALL] = '';
    BootstrapDialog.BUTTON_SIZES[BootstrapDialog.SIZE_WIDE] = '';
    BootstrapDialog.BUTTON_SIZES[BootstrapDialog.SIZE_LARGE] = 'btn-lg';
    BootstrapDialog.ICON_SPINNER = 'glyphicon glyphicon-asterisk';

    /**
     * Default options.
     */
    BootstrapDialog.defaultOptions = {
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_NORMAL,
        cssClass: '',
        title: null,
        message: null,
        nl2br: true,
        closable: true,
        closeByBackdrop: true,
        closeByKeyboard: true,
        closeIcon: '&#215;',
        spinicon: BootstrapDialog.ICON_SPINNER,
        autodestroy: true,
        draggable: false,
        animate: true,
        description: '',
        tabindex: -1
    };

    /**
     * Config default options.
     */
    BootstrapDialog.configDefaultOptions = function (options) {
        BootstrapDialog.defaultOptions = $.extend(true, BootstrapDialog.defaultOptions, options);
    };

    /**
     * Open / Close all created dialogs all at once.
     */
    BootstrapDialog.dialogs = {};
    BootstrapDialog.openAll = function () {
        $.each(BootstrapDialog.dialogs, function (id, dialogInstance) {
            dialogInstance.open();
        });
    };
    BootstrapDialog.closeAll = function () {
        $.each(BootstrapDialog.dialogs, function (id, dialogInstance) {
            dialogInstance.close();
        });
    };

    /**
     * Get dialog instance by given id.
     *
     * @returns dialog instance
     */
    BootstrapDialog.getDialog = function (id) {
        var dialog = null;
        if (typeof BootstrapDialog.dialogs[id] !== 'undefined') {
            dialog = BootstrapDialog.dialogs[id];
        }

        return dialog;
    };

    /**
     * Set a dialog.
     *
     * @returns the dialog that has just been set.
     */
    BootstrapDialog.setDialog = function (dialog) {
        BootstrapDialog.dialogs[dialog.getId()] = dialog;

        return dialog;
    };

    /**
     * Alias of BootstrapDialog.setDialog(dialog)
     *
     * @param {type} dialog
     * @returns {unresolved}
     */
    BootstrapDialog.addDialog = function (dialog) {
        return BootstrapDialog.setDialog(dialog);
    };

    /**
     * Move focus to next visible dialog.
     */
    BootstrapDialog.moveFocus = function () {
        var lastDialogInstance = null;
        $.each(BootstrapDialog.dialogs, function (id, dialogInstance) {
            if (dialogInstance.isRealized() && dialogInstance.isOpened()) {
                lastDialogInstance = dialogInstance;
            }
        });
        if (lastDialogInstance !== null) {
            lastDialogInstance.getModal().focus();
        }
    };

    BootstrapDialog.METHODS_TO_OVERRIDE = {};
    BootstrapDialog.METHODS_TO_OVERRIDE['v3.1'] = {
        handleModalBackdropEvent: function () {
            this.getModal().on('click', {dialog: this}, function (event) {
                event.target === this && event.data.dialog.isClosable() && event.data.dialog.canCloseByBackdrop() && event.data.dialog.close();
            });

            return this;
        },
        /**
         * To make multiple opened dialogs look better.
         *
         * Will be removed in later version, after Bootstrap Modal >= 3.3.0, updating z-index is unnecessary.
         */
        updateZIndex: function () {
            if (this.isOpened()) {
                var zIndexBackdrop = 1040;
                var zIndexModal = 1050;
                var dialogCount = 0;
                $.each(BootstrapDialog.dialogs, function (dialogId, dialogInstance) {
                    if (dialogInstance.isRealized() && dialogInstance.isOpened()) {
                        dialogCount++;
                    }
                });
                var $modal = this.getModal();
                var $backdrop = $modal.data('bs.modal').$backdrop;
                $modal.css('z-index', zIndexModal + (dialogCount - 1) * 20);
                $backdrop.css('z-index', zIndexBackdrop + (dialogCount - 1) * 20);
            }
            if (this.options.backdrop === 'hidden') {
                var $modal = this.getModal();
                var $backdrop = $modal.data('bs.modal').$backdrop;
                $backdrop.hide();
            }

            return this;
        },
        open: function () {
            !this.isRealized() && this.realize();
            this.getModal().modal('show');
            this.updateZIndex();
            if (!this.options.closeByBackdrop) {
                this.$modal.css('pointer-events', 'none');
            }
            return this;
        }
    };
    BootstrapDialog.METHODS_TO_OVERRIDE['v3.2'] = {
        handleModalBackdropEvent: BootstrapDialog.METHODS_TO_OVERRIDE['v3.1']['handleModalBackdropEvent'],
        updateZIndex: BootstrapDialog.METHODS_TO_OVERRIDE['v3.1']['updateZIndex'],
        open: BootstrapDialog.METHODS_TO_OVERRIDE['v3.1']['open']
    };
    BootstrapDialog.METHODS_TO_OVERRIDE['v3.3'] = {};
    BootstrapDialog.METHODS_TO_OVERRIDE['v3.3.4'] = $.extend({}, BootstrapDialog.METHODS_TO_OVERRIDE['v3.1']);
    BootstrapDialog.prototype = {
        constructor: BootstrapDialog,
        initOptions: function (options) {
            this.options = $.extend(true, this.defaultOptions, options);

            return this;
        },
        holdThisInstance: function () {
            BootstrapDialog.addDialog(this);

            return this;
        },
        initModalStuff: function () {
            this.setModal(this.createModal())
            .setModalDialog(this.createModalDialog())
            .setModalContent(this.createModalContent())
            .setModalHeader(this.createModalHeader())
            .setModalBody(this.createModalBody())
            .setModalFooter(this.createModalFooter());

            this.getModal().append(this.getModalDialog());
            this.getModalDialog().append(this.getModalContent());
            this.getModalContent()
            .append(this.getModalHeader())
            .append(this.getModalBody())
            .append(this.getModalFooter());

            return this;
        },
        createModal: function () {
            var $modal = $('<div class="modal" role="dialog" aria-hidden="true"></div>');
            $modal.prop('id', this.getId());
            $modal.attr('aria-labelledby', this.getId() + '_title');

            return $modal;
        },
        getModal: function () {
            return this.$modal;
        },
        setModal: function ($modal) {
            this.$modal = $modal;

            return this;
        },
        createModalDialog: function () {
            return $('<div class="modal-dialog"></div>');
        },
        getModalDialog: function () {
            return this.$modalDialog;
        },
        setModalDialog: function ($modalDialog) {
            this.$modalDialog = $modalDialog;

            return this;
        },
        createModalContent: function () {
            return $('<div class="modal-content"></div>');
        },
        getModalContent: function () {
            return this.$modalContent;
        },
        setModalContent: function ($modalContent) {
            this.$modalContent = $modalContent;

            return this;
        },
        createModalHeader: function () {
            return $('<div class="modal-header"></div>');
        },
        getModalHeader: function () {
            return this.$modalHeader;
        },
        setModalHeader: function ($modalHeader) {
            this.$modalHeader = $modalHeader;

            return this;
        },
        createModalBody: function () {
            return $('<div class="modal-body"></div>');
        },
        getModalBody: function () {
            return this.$modalBody;
        },
        setModalBody: function ($modalBody) {
            this.$modalBody = $modalBody;

            return this;
        },
        createModalFooter: function () {
            return $('<div class="modal-footer"></div>');
        },
        getModalFooter: function () {
            return this.$modalFooter;
        },
        setModalFooter: function ($modalFooter) {
            this.$modalFooter = $modalFooter;

            return this;
        },
        createDynamicContent: function (rawContent) {
            var content = null;
            if (typeof rawContent === 'function') {
                content = rawContent.call(rawContent, this);
            } else {
                content = rawContent;
            }
            if (typeof content === 'string') {
                content = this.formatStringContent(content);
            }

            return content;
        },
        formatStringContent: function (content) {
            if (this.options.nl2br) {
                return content.replace(/\r\n/g, '<br />').replace(/[\r\n]/g, '<br />');
            }

            return content;
        },
        setData: function (key, value) {
            this.options.data[key] = value;

            return this;
        },
        getData: function (key) {
            return this.options.data[key];
        },
        setId: function (id) {
            this.options.id = id;

            return this;
        },
        getId: function () {
            return this.options.id;
        },
        getType: function () {
            return this.options.type;
        },
        setType: function (type) {
            this.options.type = type;
            this.updateType();

            return this;
        },
        updateType: function () {
            if (this.isRealized()) {
                var types = [BootstrapDialog.TYPE_DEFAULT,
                    BootstrapDialog.TYPE_INFO,
                    BootstrapDialog.TYPE_PRIMARY,
                    BootstrapDialog.TYPE_SUCCESS,
                    BootstrapDialog.TYPE_WARNING,
                    BootstrapDialog.TYPE_DANGER];

                this.getModal().removeClass(types.join(' ')).addClass(this.getType());
            }

            return this;
        },
        getSize: function () {
            return this.options.size;
        },
        setSize: function (size) {
            this.options.size = size;
            this.updateSize();

            return this;
        },
        updateSize: function () {
            if (this.isRealized()) {
                var dialog = this;

                // Dialog size
                this.getModal().removeClass(BootstrapDialog.SIZE_NORMAL)
                .removeClass(BootstrapDialog.SIZE_SMALL)
                .removeClass(BootstrapDialog.SIZE_WIDE)
                .removeClass(BootstrapDialog.SIZE_LARGE);
                this.getModal().addClass(this.getSize());

                // Smaller dialog.
                this.getModalDialog().removeClass('modal-sm');
                if (this.getSize() === BootstrapDialog.SIZE_SMALL) {
                    this.getModalDialog().addClass('modal-sm');
                }

                // Wider dialog.
                this.getModalDialog().removeClass('modal-lg');
                if (this.getSize() === BootstrapDialog.SIZE_WIDE) {
                    this.getModalDialog().addClass('modal-lg');
                }

                // Button size
                $.each(this.options.buttons, function (index, button) {
                    var $button = dialog.getButton(button.id);
                    var buttonSizes = ['btn-lg', 'btn-sm', 'btn-xs'];
                    var sizeClassSpecified = false;
                    if (typeof button['cssClass'] === 'string') {
                        var btnClasses = button['cssClass'].split(' ');
                        $.each(btnClasses, function (index, btnClass) {
                            if ($.inArray(btnClass, buttonSizes) !== -1) {
                                sizeClassSpecified = true;
                            }
                        });
                    }
                    if (!sizeClassSpecified) {
                        $button.removeClass(buttonSizes.join(' '));
                        $button.addClass(dialog.getButtonSize());
                    }
                });
            }

            return this;
        },
        getCssClass: function () {
            return this.options.cssClass;
        },
        setCssClass: function (cssClass) {
            this.options.cssClass = cssClass;

            return this;
        },
        getTitle: function () {
            return this.options.title;
        },
        setTitle: function (title) {
            this.options.title = title;
            this.updateTitle();

            return this;
        },
        updateTitle: function () {
            if (this.isRealized()) {
                var title = this.getTitle() !== null ? this.createDynamicContent(this.getTitle()) : this.getDefaultText();
                this.getModalHeader().find('.' + this.getNamespace('title')).html('').append(title).prop('id', this.getId() + '_title');
            }

            return this;
        },
        getMessage: function () {
            return this.options.message;
        },
        setMessage: function (message) {
            this.options.message = message;
            this.updateMessage();

            return this;
        },
        updateMessage: function () {
            if (this.isRealized()) {
                var message = this.createDynamicContent(this.getMessage());
                this.getModalBody().find('.' + this.getNamespace('message')).html('').append(message);
            }

            return this;
        },
        isClosable: function () {
            return this.options.closable;
        },
        setClosable: function (closable) {
            this.options.closable = closable;
            this.updateClosable();

            return this;
        },
        setCloseByBackdrop: function (closeByBackdrop) {
            this.options.closeByBackdrop = closeByBackdrop;

            return this;
        },
        canCloseByBackdrop: function () {
            return this.options.closeByBackdrop;
        },
        setCloseByKeyboard: function (closeByKeyboard) {
            this.options.closeByKeyboard = closeByKeyboard;

            return this;
        },
        canCloseByKeyboard: function () {
            return this.options.closeByKeyboard;
        },
        isAnimate: function () {
            return this.options.animate;
        },
        setAnimate: function (animate) {
            this.options.animate = animate;

            return this;
        },
        updateAnimate: function () {
            if (this.isRealized()) {
                this.getModal().toggleClass('fade', this.isAnimate());
            }

            return this;
        },
        getSpinicon: function () {
            return this.options.spinicon;
        },
        setSpinicon: function (spinicon) {
            this.options.spinicon = spinicon;

            return this;
        },
        addButton: function (button) {
            this.options.buttons.push(button);

            return this;
        },
        addButtons: function (buttons) {
            var that = this;
            $.each(buttons, function (index, button) {
                that.addButton(button);
            });

            return this;
        },
        getButtons: function () {
            return this.options.buttons;
        },
        setButtons: function (buttons) {
            this.options.buttons = buttons;
            this.updateButtons();

            return this;
        },
        /**
         * If there is id provided for a button option, it will be in dialog.indexedButtons list.
         *
         * In that case you can use dialog.getButton(id) to find the button.
         *
         * @param {type} id
         * @returns {undefined}
         */
        getButton: function (id) {
            if (typeof this.indexedButtons[id] !== 'undefined') {
                return this.indexedButtons[id];
            }

            return null;
        },
        getButtonSize: function () {
            if (typeof BootstrapDialog.BUTTON_SIZES[this.getSize()] !== 'undefined') {
                return BootstrapDialog.BUTTON_SIZES[this.getSize()];
            }

            return '';
        },
        updateButtons: function () {
            if (this.isRealized()) {
                if (this.getButtons().length === 0) {
                    this.getModalFooter().hide();
                } else {
                    this.getModalFooter().show().find('.' + this.getNamespace('footer')).html('').append(this.createFooterButtons());
                }
            }

            return this;
        },
        isAutodestroy: function () {
            return this.options.autodestroy;
        },
        setAutodestroy: function (autodestroy) {
            this.options.autodestroy = autodestroy;
        },
        getDescription: function () {
            return this.options.description;
        },
        setDescription: function (description) {
            this.options.description = description;

            return this;
        },
        setTabindex: function (tabindex) {
            this.options.tabindex = tabindex;

            return this;
        },
        getTabindex: function () {
            return this.options.tabindex;
        },
        updateTabindex: function () {
            if (this.isRealized()) {
                this.getModal().attr('tabindex', this.getTabindex());
            }

            return this;
        },
        getDefaultText: function () {
            return BootstrapDialog.DEFAULT_TEXTS[this.getType()];
        },
        getNamespace: function (name) {
            return BootstrapDialog.NAMESPACE + '-' + name;
        },
        createHeaderContent: function () {
            var $container = $('<div></div>');
            $container.addClass(this.getNamespace('header'));

            // title
            $container.append(this.createTitleContent());

            // Close button
            $container.prepend(this.createCloseButton());

            return $container;
        },
        createTitleContent: function () {
            var $title = $('<div></div>');
            $title.addClass(this.getNamespace('title'));

            return $title;
        },
        createCloseButton: function () {
            var $container = $('<div></div>');
            $container.addClass(this.getNamespace('close-button'));
            var $icon = $('<button class="close"></button>');
            $icon.append(this.options.closeIcon);
            $container.append($icon);
            $container.on('click', {dialog: this}, function (event) {
                event.data.dialog.close();
            });

            return $container;
        },
        createBodyContent: function () {
            var $container = $('<div></div>');
            $container.addClass(this.getNamespace('body'));

            // Message
            $container.append(this.createMessageContent());

            return $container;
        },
        createMessageContent: function () {
            var $message = $('<div></div>');
            $message.addClass(this.getNamespace('message'));

            return $message;
        },
        createFooterContent: function () {
            var $container = $('<div></div>');
            $container.addClass(this.getNamespace('footer'));

            return $container;
        },
        createFooterButtons: function () {
            var that = this;
            var $container = $('<div></div>');
            $container.addClass(this.getNamespace('footer-buttons'));
            this.indexedButtons = {};
            $.each(this.options.buttons, function (index, button) {
                if (!button.id) {
                    button.id = BootstrapDialog.newGuid();
                }
                var $button = that.createButton(button);
                that.indexedButtons[button.id] = $button;
                $container.append($button);
            });

            return $container;
        },
        createButton: function (button) {
            var $button = $('<button class="btn"></button>');
            $button.prop('id', button.id);
            $button.data('button', button);

            // Icon
            if (typeof button.icon !== 'undefined' && $.trim(button.icon) !== '') {
                $button.append(this.createButtonIcon(button.icon));
            }

            // Label
            if (typeof button.label !== 'undefined') {
                $button.append(button.label);
            }

            // Css class
            if (typeof button.cssClass !== 'undefined' && $.trim(button.cssClass) !== '') {
                $button.addClass(button.cssClass);
            } else {
                $button.addClass('btn-default');
            }

            // Hotkey
            if (typeof button.hotkey !== 'undefined') {
                this.registeredButtonHotkeys[button.hotkey] = $button;
            }

            // Button on click
            $button.on('click', {dialog: this, $button: $button, button: button}, function (event) {
                var dialog = event.data.dialog;
                var $button = event.data.$button;
                var button = $button.data('button');
                if (button.autospin) {
                    $button.toggleSpin(true);
                }
                if (typeof button.action === 'function') {
                    return button.action.call($button, dialog, event);
                }
            });

            // Dynamically add extra functions to $button
            this.enhanceButton($button);

            //Initialize enabled or not
            if (typeof button.enabled !== 'undefined') {
                $button.toggleEnable(button.enabled);
            }

            return $button;
        },
        /**
         * Dynamically add extra functions to $button
         *
         * Using '$this' to reference 'this' is just for better readability.
         *
         * @param {type} $button
         * @returns {_L13.BootstrapDialog.prototype}
         */
        enhanceButton: function ($button) {
            $button.dialog = this;

            // Enable / Disable
            $button.toggleEnable = function (enable) {
                var $this = this;
                if (typeof enable !== 'undefined') {
                    $this.prop("disabled", !enable).toggleClass('disabled', !enable);
                } else {
                    $this.prop("disabled", !$this.prop("disabled"));
                }

                return $this;
            };
            $button.enable = function () {
                var $this = this;
                $this.toggleEnable(true);

                return $this;
            };
            $button.disable = function () {
                var $this = this;
                $this.toggleEnable(false);

                return $this;
            };

            // Icon spinning, helpful for indicating ajax loading status.
            $button.toggleSpin = function (spin) {
                var $this = this;
                var dialog = $this.dialog;
                var $icon = $this.find('.' + dialog.getNamespace('button-icon'));
                if (typeof spin === 'undefined') {
                    spin = !($button.find('.icon-spin').length > 0);
                }
                if (spin) {
                    $icon.hide();
                    $button.prepend(dialog.createButtonIcon(dialog.getSpinicon()).addClass('icon-spin'));
                } else {
                    $icon.show();
                    $button.find('.icon-spin').remove();
                }

                return $this;
            };
            $button.spin = function () {
                var $this = this;
                $this.toggleSpin(true);

                return $this;
            };
            $button.stopSpin = function () {
                var $this = this;
                $this.toggleSpin(false);

                return $this;
            };

            return this;
        },
        createButtonIcon: function (icon) {
            var $icon = $('<span></span>');
            $icon.addClass(this.getNamespace('button-icon')).addClass(icon);

            return $icon;
        },
        /**
         * Invoke this only after the dialog is realized.
         *
         * @param {type} enable
         * @returns {undefined}
         */
        enableButtons: function (enable) {
            $.each(this.indexedButtons, function (id, $button) {
                $button.toggleEnable(enable);
            });

            return this;
        },
        /**
         * Invoke this only after the dialog is realized.
         *
         * @returns {undefined}
         */
        updateClosable: function () {
            if (this.isRealized()) {
                // Close button
                this.getModalHeader().find('.' + this.getNamespace('close-button')).toggle(this.isClosable());
            }

            return this;
        },
        /**
         * Set handler for modal event 'show.bs.modal'.
         * This is a setter!
         */
        onShow: function (onshow) {
            this.options.onshow = onshow;

            return this;
        },
        /**
         * Set handler for modal event 'shown.bs.modal'.
         * This is a setter!
         */
        onShown: function (onshown) {
            this.options.onshown = onshown;

            return this;
        },
        /**
         * Set handler for modal event 'hide.bs.modal'.
         * This is a setter!
         */
        onHide: function (onhide) {
            this.options.onhide = onhide;

            return this;
        },
        /**
         * Set handler for modal event 'hidden.bs.modal'.
         * This is a setter!
         */
        onHidden: function (onhidden) {
            this.options.onhidden = onhidden;

            return this;
        },
        isRealized: function () {
            return this.realized;
        },
        setRealized: function (realized) {
            this.realized = realized;

            return this;
        },
        isOpened: function () {
            return this.opened;
        },
        setOpened: function (opened) {
            this.opened = opened;

            return this;
        },
        handleModalEvents: function () {
            this.getModal().on('show.bs.modal', {dialog: this}, function (event) {
                var dialog = event.data.dialog;
                dialog.setOpened(true);
                if (dialog.isModalEvent(event) && typeof dialog.options.onshow === 'function') {
                    var openIt = dialog.options.onshow(dialog);
                    if (openIt === false) {
                        dialog.setOpened(false);
                    }

                    return openIt;
                }
            });
            this.getModal().on('shown.bs.modal', {dialog: this}, function (event) {
                var dialog = event.data.dialog;
                dialog.isModalEvent(event) && typeof dialog.options.onshown === 'function' && dialog.options.onshown(dialog);
            });
            this.getModal().on('hide.bs.modal', {dialog: this}, function (event) {
                var dialog = event.data.dialog;
                dialog.setOpened(false);
                if (dialog.isModalEvent(event) && typeof dialog.options.onhide === 'function') {
                    var hideIt = dialog.options.onhide(dialog);
                    if (hideIt === false) {
                        dialog.setOpened(true);
                    }

                    return hideIt;
                }
            });
            this.getModal().on('hidden.bs.modal', {dialog: this}, function (event) {
                var dialog = event.data.dialog;
                dialog.isModalEvent(event) && typeof dialog.options.onhidden === 'function' && dialog.options.onhidden(dialog);
                if (dialog.isAutodestroy()) {
                    dialog.setRealized(false);
                    delete BootstrapDialog.dialogs[dialog.getId()];
                    $(this).remove();
                }
                BootstrapDialog.moveFocus();
            });

            // Backdrop, I did't find a way to change bs3 backdrop option after the dialog is popped up, so here's a new wheel.
            this.handleModalBackdropEvent();

            // ESC key support
            this.getModal().on('keyup', {dialog: this}, function (event) {
                event.which === 27 && event.data.dialog.isClosable() && event.data.dialog.canCloseByKeyboard() && event.data.dialog.close();
            });

            // Button hotkey
            this.getModal().on('keyup', {dialog: this}, function (event) {
                var dialog = event.data.dialog;
                if (typeof dialog.registeredButtonHotkeys[event.which] !== 'undefined') {
                    var $button = $(dialog.registeredButtonHotkeys[event.which]);
                    !$button.prop('disabled') && $button.focus().trigger('click');
                }
            });

            return this;
        },
        handleModalBackdropEvent: function () {
            this.getModal().on('click', {dialog: this}, function (event) {
                $(event.target).hasClass('modal-backdrop') && event.data.dialog.isClosable() && event.data.dialog.canCloseByBackdrop() && event.data.dialog.close();
            });

            return this;
        },
        isModalEvent: function (event) {
            return typeof event.namespace !== 'undefined' && event.namespace === 'bs.modal';
        },
        makeModalDraggable: function () {
            if (this.options.draggable) {
                this.getModalHeader().addClass(this.getNamespace('draggable')).on('mousedown', {dialog: this}, function (event) {
                    var dialog = event.data.dialog;
                    dialog.draggableData.isMouseDown = true;
                    var dialogOffset = dialog.getModalDialog().offset();
                    dialog.draggableData.mouseOffset = {
                        top: event.clientY - dialogOffset.top,
                        left: event.clientX - dialogOffset.left
                    };
                });
                this.getModal().on('mouseup mouseleave', {dialog: this}, function (event) {
                    event.data.dialog.draggableData.isMouseDown = false;
                });
                $('body').on('mousemove', {dialog: this}, function (event) {
                    var dialog = event.data.dialog;
                    if (!dialog.draggableData.isMouseDown) {
                        return;
                    }
                    dialog.getModalDialog().offset({
                        top: event.clientY - dialog.draggableData.mouseOffset.top,
                        left: event.clientX - dialog.draggableData.mouseOffset.left
                    });
                });
            }

            return this;
        },
        realize: function () {
            this.initModalStuff();
            this.getModal().addClass(BootstrapDialog.NAMESPACE)
            .addClass(this.getCssClass());
            this.updateSize();
            if (this.getDescription()) {
                this.getModal().attr('aria-describedby', this.getDescription());
            }
            this.getModalFooter().append(this.createFooterContent());
            this.getModalHeader().append(this.createHeaderContent());
            this.getModalBody().append(this.createBodyContent());
            this.getModal().data('bs.modal', new BootstrapDialogModal(this.getModal(), {
                backdrop: 'static',
                keyboard: false,
                show: false
            }));
            this.makeModalDraggable();
            this.handleModalEvents();
            this.setRealized(true);
            this.updateButtons();
            this.updateType();
            this.updateTitle();
            this.updateMessage();
            this.updateClosable();
            this.updateAnimate();
            this.updateSize();
            this.updateTabindex();

            return this;
        },
        open: function () {
            !this.isRealized() && this.realize();
            this.getModal().modal('show');

            return this;
        },
        close: function () {
            !this.isRealized() && this.realize();
            this.getModal().modal('hide');

            return this;
        }
    };

    // Add compatible methods.
    BootstrapDialog.prototype = $.extend(BootstrapDialog.prototype, BootstrapDialog.METHODS_TO_OVERRIDE[BootstrapDialogModal.getModalVersion()]);

    /**
     * RFC4122 version 4 compliant unique id creator.
     *
     * Added by https://github.com/tufanbarisyildirim/
     *
     *  @returns {String}
     */
    BootstrapDialog.newGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    /* ================================================
     * For lazy people
     * ================================================ */

    /**
     * Shortcut function: show
     *
     * @param {type} options
     * @returns the created dialog instance
     */
    BootstrapDialog.show = function (options) {
        return new BootstrapDialog(options).open();
    };

    /**
     * Alert window
     *
     * @returns the created dialog instance
     */
    BootstrapDialog.alert = function () {
        var alertOptions = {};
        var defaultAlertOptions = {
            type: BootstrapDialog.TYPE_DEFAULT,
            title: null,
            message: null,
            closable: false,
            draggable: false,
            buttonLabel: BootstrapDialog.DEFAULT_TEXTS.OK,
            callback: null
        };

        if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
            alertOptions = $.extend(true, defaultAlertOptions, arguments[0]);
        } else {
            alertOptions = $.extend(true, defaultAlertOptions, {
                message: arguments[0],
                callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
            });
        }

        var dialog = new BootstrapDialog(alertOptions);
        dialog.setData('callback', alertOptions.callback);
        dialog.addButton({
            label: alertOptions.buttonLabel,
            action: function (dialog) {
                if (typeof dialog.getData('callback') === 'function' && dialog.getData('callback').call(this, true) === false) {
                    return false;
                }
                dialog.setData('btnClicked', true);

                return dialog.close();
            }
        });
        if (typeof dialog.options.onhide === 'function') {
            dialog.onHide(function (dialog) {
                var hideIt = true;
                if (!dialog.getData('btnClicked') && dialog.isClosable() && typeof dialog.getData('callback') === 'function') {
                    hideIt = dialog.getData('callback')(false);
                }
                if (hideIt === false) {
                    return false;
                }
                hideIt = this.onhide(dialog);

                return hideIt;
            }.bind({
                onhide: dialog.options.onhide
            }));
        } else {
            dialog.onHide(function (dialog) {
                var hideIt = true;
                if (!dialog.getData('btnClicked') && dialog.isClosable() && typeof dialog.getData('callback') === 'function') {
                    hideIt = dialog.getData('callback')(false);
                }

                return hideIt;
            });
        }

        return dialog.open();
    };

    /**
     * Confirm window
     *
     * @returns the created dialog instance
     */
    BootstrapDialog.confirm = function () {
        var confirmOptions = {};
        var defaultConfirmOptions = {
            type: BootstrapDialog.TYPE_DEFAULT,
            title: '警告',
            message: null,
            closable: true,
            draggable: false,
            btnCancelLabel: BootstrapDialog.DEFAULT_TEXTS.CANCEL,
            btnCancelClass: null,
            btnOKLabel: BootstrapDialog.DEFAULT_TEXTS.OK,
            btnOKClass: 'btn-primary',
            callback: null,
            icon: 'warning'
        };
        if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
            confirmOptions = $.extend(true, defaultConfirmOptions, arguments[0]);
        } else {
            confirmOptions = $.extend(true, defaultConfirmOptions, {
                message: arguments[0],
                callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
            });
        }
        if (confirmOptions.btnOKClass === null) {
            confirmOptions.btnOKClass = ['btn', confirmOptions.type.split('-')[1]].join('-');
        }
        if (confirmOptions.icon === 'question') {
            confirmOptions.message = '<i class="icon glyphicon glyphicon-question-sign"></i><p class="iconp">' + confirmOptions.message + '</p>';
        } else {
            confirmOptions.message = '<i class="icon glyphicon glyphicon-warning-sign"></i><p class="iconp">' + confirmOptions.message + '</p>';
        }
        var dialog = new BootstrapDialog(confirmOptions);
        dialog.setData('callback', confirmOptions.callback);
        dialog.addButton({
            label: confirmOptions.btnCancelLabel,
            cssClass: confirmOptions.btnCancelClass,
            action: function (dialog) {
                if (typeof dialog.getData('callback') === 'function' && dialog.getData('callback').call(this, false) === false) {
                    return false;
                }

                return dialog.close();
            }
        });
        dialog.addButton({
            label: confirmOptions.btnOKLabel,
            cssClass: confirmOptions.btnOKClass,
            action: function (dialog) {
                if (typeof dialog.getData('callback') === 'function' && dialog.getData('callback').call(this, true) === false) {
                    return false;
                }

                return dialog.close();
            }
        });

        return dialog.open();

    };

    /**
     * Warning window
     *
     * @param {type} message
     * @returns the created dialog instance
     */
    BootstrapDialog.warning = function (message, callback) {
        var infoOptions = {};
        var defaultInfoOptions = {
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_SMALL,
            title: '警告',
            message: null,
            closable: true,
            draggable: false,
            callback: null,
            delay: 2000,
            closeByBackdrop: false,
            backdrop: 'hidden'
        };
        if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
            infoOptions = $.extend(true, defaultInfoOptions, arguments[0]);
        } else {
            infoOptions = $.extend(true, defaultInfoOptions, {
                message: arguments[0],
                callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
            });
        }
        infoOptions.message = '<i class="icon glyphicon glyphicon-warning-sign"></i><p class="iconp">' + infoOptions.message + '</p>';
        var dialog = new BootstrapDialog(infoOptions);
        if (infoOptions.delay !== 0) {
            setTimeout(function() {
                dialog.close()
            }, infoOptions.delay);
        }
        return dialog.open();
    };

    /**
     * Danger window
     *
     * @param {type} message
     * @returns the created dialog instance
     */
    BootstrapDialog.danger = function (message, callback) {
        var infoOptions = {};
        var defaultInfoOptions = {
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_SMALL,
            title: '错误',
            message: null,
            closable: true,
            draggable: false,
            callback: null,
            delay: 2000,
            closeByBackdrop: false,
            backdrop: 'hidden'
        };
        if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
            infoOptions = $.extend(true, defaultInfoOptions, arguments[0]);
        } else {
            infoOptions = $.extend(true, defaultInfoOptions, {
                message: arguments[0],
                callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
            });
        }
        infoOptions.message = '<i class="icon glyphicon glyphicon-remove-sign"></i><p class="iconp">' + infoOptions.message + '</p>';
        var dialog = new BootstrapDialog(infoOptions);
        if (infoOptions.delay !== 0) {
            setTimeout(function() {
                dialog.close()
            }, infoOptions.delay);
        }
        return dialog.open();
    };

    /**
     * Success window
     *
     * @param {type} message
     * @returns the created dialog instance
     */
    BootstrapDialog.success = function (message, callback) {
        var infoOptions = {};
        var defaultInfoOptions = {
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_SMALL,
            title: '成功',
            message: null,
            closable: true,
            draggable: false,
            callback: null,
            delay: 2000,
            closeByBackdrop: false,
            backdrop: 'hidden'
        };
        if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
            infoOptions = $.extend(true, defaultInfoOptions, arguments[0]);
        } else {
            infoOptions = $.extend(true, defaultInfoOptions, {
                message: arguments[0],
                callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
            });
        }
        infoOptions.message = '<i class="icon glyphicon glyphicon-ok-sign"></i><p class="iconp">' + infoOptions.message + '</p>';
        var dialog = new BootstrapDialog(infoOptions);
        if (infoOptions.delay !== 0) {
            setTimeout(function() {
                dialog.close()
            }, infoOptions.delay);
        }
        return dialog.open();
    };


    BootstrapDialog.info = function () {
        var infoOptions = {};
        var defaultInfoOptions = {
            type: BootstrapDialog.TYPE_DEFAULT,
            size: BootstrapDialog.SIZE_SMALL,
            title: '提示',
            message: null,
            closable: true,
            draggable: false,
            callback: null,
            delay: 2000,
            closeByBackdrop: false,
            backdrop: 'hidden'
        };
        if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
            infoOptions = $.extend(true, defaultInfoOptions, arguments[0]);
        } else {
            infoOptions = $.extend(true, defaultInfoOptions, {
                message: arguments[0],
                callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
            });
        }
        infoOptions.message = '<i class="icon glyphicon glyphicon-info-sign"></i><p class="iconp">' + infoOptions.message + '</p>';
        var dialog = new BootstrapDialog(infoOptions);
        if (infoOptions.delay !== 0) {
            setTimeout(function() {
                dialog.close()
            }, infoOptions.delay);
        }
        return dialog.open();
    }

    return BootstrapDialog;

}));
+(function(root, $) {
  /*
  身份证15位编码规则：dddddd yymmdd xx p
  dddddd：地区码
  yymmdd: 出生年月日
  xx: 顺序类编码，无法确定
  p: 性别，奇数为男，偶数为女
  <p />
  身份证18位编码规则：dddddd yyyymmdd xxx y
  dddddd：地区码
  yyyymmdd: 出生年月日
  xxx:顺序类编码，无法确定，奇数为男，偶数为女
  y: 校验码，该位数值可通过前17位计算获得
  <p />
  18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
  验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
  校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
  i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置
   */
  var slice = [].slice;

  var idCardValidate = function(idCard) {
    var a_idCard;
    idCard = trim(idCard.replace(RegExp(' ', 'g'), ''));
    if (idCard.length === 18) {
      a_idCard = idCard.split('');
      if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  /*
  判断身份证号码为18位时最后的验证位是否正确
  @param a_idCard 身份证号码数组
  @return
   */

  var isTrueValidateCodeBy18IdCard = function(a_idCard) {
    var i, sum, valCodePosition;
    sum = 0;
    if (a_idCard[17].toLowerCase() === 'x') {
      a_idCard[17] = 10;
    }

    i = 0;
    while (i < 17) {
      sum += Wi[i] * a_idCard[i];
      i++;
    }

    valCodePosition = sum % 11;
    if (parseInt(a_idCard[17], 10) === ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
    }
  };

  /*
  通过身份证判断是男是女
  @param idCard 15/18位身份证号码
  @return 'female'-女、'male'-男
   */

  var maleOrFemalByIdCard = function(idCard) {
    idCard = trim(idCard.replace(RegExp(' ', 'g'), ''));
    if (idCard.length === 15) {
      if (idCard.substring(14, 15) % 2 === 0) {
        return 'female';
      } else {
        return 'male';
      }
    } else if (idCard.length === 18) {
      if (idCard.substring(14, 17) % 2 === 0) {
        return 'female';
      } else {
        return 'male';
      }
    } else {
      return null;
    }
  };

  /*
  验证18位数身份证号码中的生日是否是有效生日
  @param idCard 18位书身份证字符串
  @return
   */

  var isValidityBrithBy18IdCard = function(idCard18) {
    var day, month, temp_date, year;
    year = idCard18.substring(6, 10);
    month = idCard18.substring(10, 12);
    day = idCard18.substring(12, 14);
    temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (temp_date.getFullYear() !== parseFloat(year) || temp_date.getMonth() !== parseFloat(month) - 1 || temp_date.getDate() !== parseFloat(day)) {
      return false;
    } else {
      return true;
    }
  };

  /*
  验证15位数身份证号码中的生日是否是有效生日
  @param idCard15 15位书身份证字符串
  @return
   */

  var isValidityBrithBy15IdCard = function(idCard15) {
    var day, month, temp_date, year;
    year = idCard15.substring(6, 8);
    month = idCard15.substring(8, 10);
    day = idCard15.substring(10, 12);
    temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (temp_date.getYear() !== parseFloat(year) || temp_date.getMonth() !== parseFloat(month) - 1 || temp_date.getDate() !== parseFloat(day)) {
      return false;
    } else {
      return true;
    }
  };

  var trim = function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  };

  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];

  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

  var validate = {}

  function getMessage (rule) {
    var messages = {
      required: '不能为空',
      number: '只能填数字',
      digitalSpace: '只能填数字',
      digits: '只能填整数',
      tenMultiple: '只能填10的倍数',
      alphanumeric: '字母数字混合',
      length: '长度应该为: ' + rule.param,
      minlength : '最小长度为: ' + rule.param,
      removeSpaceMin: '最小长度为: ' + rule.param,
      removeSpaceMax: '最大长度为: ' + rule.param,
      maxlength: '最大长度为: ' + rule.param,
      max: '最大值为: ' + rule.param,
      min: '最小值为: ' + rule.param,
      equalTo: '不一致',
      notEqual: '与之前的一致',
      phone: '格式不正确',
      email: '邮箱格式不正确',
      regexp: '格式不正确',
      idCard: '身份证格式不正确',
      realName: '格式不正确',
      illegal: '中含有非法字符',
      dot1: '只能为一位小数的数字',
      dot2: '只能为两位小数的数字'
    }
    if (rule.message) return rule.message
    return messages[rule.rule]
  }

  validate.required = function (value) {
    return value && value.trim().length > 0
  }

  validate.number = function (value) {
    return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value.trim())
  }

  validate.digitalSpace = function (value) {
    return /^[\d\s]+$/.test(value.trim())
  }

  validate.digits = function (value) {
    if (value.trim() === '') return true
    return /^\d+$/.test(value)
  }

  validate.tenMultiple = function (value) {
    if (value.trim() > 0 && value.trim() % 10 == 0) return true
    return false
  }

  validate.alphanumeric = function (value) {
    if (value.trim() === '') return true
    return /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i.test(value)
  }

  validate.length = function (value, len) {
    return value.trim().length === Number(len)
  }

  validate.minlength = function(value, min) {
    return value.trim().length >= Number(min)
  }

  validate.removeSpaceMin = function(value, min) {
    var valueStr = []
    var arr = value.split('')
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(' ') == -1) {
        valueStr.push(arr[i])
      }
    }

    return valueStr.join('').length >= Number(min)
  }

  validate.removeSpaceMax = function(value, max) {
    var valueStr = []
    var arr = value.split('')
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(' ') == -1) {
        valueStr.push(arr[i])
      }
    }

    return valueStr.join('').length <= Number(max)
  }

  validate.maxlength = function(value, max) {
    return value.trim().length <= Number(max)
  }

  validate.max = function(value, max) {
    return Number(value) <= max
  }

  validate.min = function(value, min) {
    return Number(value) >= Number(min)
  }

  validate.equalTo = function(value, target) {
    return value === target
  }

  validate.notEqual = function(value, target) {
    return value !== target
  }

  validate.phone = function(value) {
    if (value.trim() === '') return true
    return /^(13|14|15|17|18)[0-9]{9}$/.test(value)
  }

  validate.email = function (value) {
    if (value.trim() === '') return true

    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)
  }

  validate.regexp = function(value, regexp) {
    if (value.trim() === '') return true
    return regexp.test(value)
  }

  validate.idCard = function(value) {
    if (value.trim() === '') return true
    return idCardValidate(value)
  }

  validate.realName = function(value) {
    if (value.trim() === '') return true
    return /^[\u4e00-\u9fa5]{2,16}$/.test(value)
  }

  validate.illegal = function(value) {
    if (value.trim() === '') return true
    return !(/[`~!@#$^&*()=|{}\[\].<>\/?~！@#￥……&*（）|{}【】‘”“'？]/.test(value))
  }

  validate.dot1 = function(value) {
    if (value.trim() === '') return true
    return /^[0-9]+(\.[0-9]{1})?$/.test(value)
  }

  validate.dot2 = function(value) {
    if (value.trim() === '') return true
    return /^[0-9]+(\.[0-9]{1,2})?$/.test(value)
  }

  function Validation(items) {
    this.items = items
    this._init()
  }

  Validation.prototype._init = function () {
    var _this = this
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i]
      _this._bindEvent(item)
    }
  }

  Validation.prototype._bindEvent = function (item) {
    var _this = this
    if (item.event) {
      $(item.el).on(item.event, function() {
        var $el = $(this)
        var r = _this.validateItem(item, $el)
        if (r) {
          _this._destroyError($el)
        } else {
          _this._initError(item, $el)
        }
      })
    } else {
      $(item.el).off('focus.bs.validate').on('focus.bs.validate', function () {
        var $el = $(this)
        if (item.rules.length > 1) {
          _this._initError(item, $el)
          _this._showError($el)
          $el.data('blured', '0')
        } else if (!_this.validateItem(item, $el)) {
          _this._initError(item, $el)
        }
        if (item.magnifier) {
          addMagnifier($el, item.magnifier)
          magnifier($el, item.magnifier)
        }
      }).off('blur.bs.validate').on('blur.bs.validate', function () {
        var $el = $(this)
        var r = _this.validateItem(item, $el)
        if (r) {
          _this._destroyError($el )
        } else {
          _this._hideError($el )
        }
        if (item.magnifier && $el.prev().hasClass('magnifier')) $el.prev().hide()
        $el.data('blured', '1')
      }).off('keyup.bs.validate').on('keyup.bs.validate', function() {
        var $el = $(this)
        _this._initError(item, $el)
        _this.validateItem(item, $el)
        if (item.magnifier) magnifier($el, item.magnifier)
      })
    }
  }

  Validation.prototype.reset = function () {
    for (var i = 0; i < this.items.length; i++) {
      this._removeError(this.items[i].el)
    }
  }

  Validation.prototype.validateItem = function (item, $el) {
    var result = true
    for (var i = 0; i < item.rules.length; i++) {
      var rule = item.rules[i]
      if ($.isFunction(rule.rule)) {
        result = rule.rule(item.el)
      } else {
        if (!validate[rule.rule]) throw '不支持' + rule.rule + '这个验证规则'
        result = validate[rule.rule]($el.val(), rule.param)
      }
      if (rule.callback) {
        var cr = rule.callback(result, $el)
        if (cr) {
          if ($.isFunction(rule.rule)) continue
          $('.popover-content .item-' + rule.rule).hide()
          if (!result) {
            $el.addClass('validate-border')
            $('.popover-content .item-error.item-' + rule.rule).show()
            break;
          }
          var node = $('.popover-content .item-success.item-' + rule.rule)
          if (node.length > 0) {
            node.show()
          } else {
            this._destroyError($el)
          }
        }
      } else {
        if ($.isFunction(rule.rule)) continue
        $('.popover-content .item-' + rule.rule).hide()
        if (!result) {
          $el.addClass('validate-border')
          $('.popover-content .item-error.item-' + rule.rule).show()
          break;
        }
        var node = $('.popover-content .item-success.item-' + rule.rule)
        if (node.length > 0) {
          node.show()
        } else {
          this._destroyError($el)
        }
      }
    }
    return result
  }


  Validation.prototype.addRule = function(opts) {
    this.items.push(opts)
    this._bindEvent(opts)
  }

  Validation.prototype.validate = function (opts) {
    opts = opts || {}
    var scroller = opts.scroller || 'html, body'
    var scrollOffset = opts.scrollOffset || 50
    var result = true
    var scrolled = false
    var _this = this
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i]
      var nodes = $(item.el)
      if(!nodes.length){
        continue
      }
      var $el = null
      if (nodes.length > 1) {
        $.each(nodes, function(i, m) {
          $el = $(m)
          _this._initError(item, $el)
          $el.data('blured', '1')
          var r = _this.validateItem(item, $el)
          if (!r) {
            result = false
            if (!scrolled) {
              $(scroller).animate({
                scrollTop: $el.offset().top - scrollOffset + 'px'
              })
              scrolled = true
            }
          } else {
            _this._destroyError($el)
          }
        })
      } else {
        $el = nodes
        _this._initError(item, $el)
        $(item.el).data('blured', '1')
        var r = this.validateItem(item, $el)
        if (!r) {
          result = false
          if (!scrolled) {
            $(scroller).animate({
              scrollTop: $el.offset().top - scrollOffset + 'px'
            })
            scrolled = true
          }
        } else {
          this._destroyError($el)
        }
      }
    }
    return result
  }

  Validation.prototype._initError = function (item, $el) {
    if ($el.data('bs.popover')) return
    var _this = this
    var content = buildContent(item)
    $el.popover({ content: content, html: true, placement: (item.placement || 'bottom'), trigger: 'hover', template: '<div class="popover validate-popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'})
    $el.on('shown.bs.popover', function () {
      if ($(this).data('blured') == '1' || $(this).val()) _this.validateItem(item, $(this))
    })
  }

  Validation.prototype._destroyError = function ($el) {
    $el.removeClass('validate-border')
    $el.popover('destroy')
  }

  Validation.prototype._showError = function ($el) {
    $el.popover('show')
  }

  Validation.prototype._hideError = function ($el) {
    $el.popover('hide')
  }

  function buildContent (item) {
    if (item.rules.length === 1) return getMessage(item.rules[0])
    var content = ''
    for (var i = 0; i < item.rules.length; i++) {
      content += '<div class="item-normal clearfix item-' + item.rules[i].rule + '"><span class="icon">' + (i + 1) + '</span>' + getMessage(item.rules[i]) + '</div>'
      content += '<div class="item-success clearfix item-' + item.rules[i].rule + '"><span class="icon glyphicon glyphicon-ok"></span>' + getMessage(item.rules[i]) + '</div>'
      content += '<div class="item-error clearfix item-' + item.rules[i].rule + '"><span class="icon glyphicon glyphicon-remove"></span>' + getMessage(item.rules[i]) + '</div>'
    }
    return content
  }

  function addMagnifier ($el, pattern) {
    if ($el.prev().hasClass('magnifier')) return
    $el.prop('maxlength', pattern.replace(/[^x]/g, '').length)
    setTimeout(function() {
      var pos = $el.position()
      $el.before('<div class="magnifier popover top" style="top:' + (pos.top - 45) + 'px; left: ' + pos.left + 'px;">' +
        '<div class="arrow"></div>' +
        '<div class="popover-content">' +
        '<p></p>' +
        '</div>' +
      '</div>')
    }, 1000)
  }

  function magnifier ($el, pattern) {
    if ($.isFunction(pattern)) pattern = pattern(el)
    var str = $el.val()
    if (!validate.required(str)) {
      if ($el.prev().hasClass('magnifier')) $el.prev().hide()
      return
    }
    var sarr = str.split('')
    var parr = pattern.split('')

    var newstr = ''
    var j = 0
    for (var i = 0; i < parr.length; i++) {
      if (parr[i] === 'x') {
        if (sarr[j]) {
          newstr += sarr[j]
          j++
        }
      } else {
        if (!sarr[j]) break
        newstr += parr[i]
      }
    }
    if (j < sarr.length) newstr += str.substr(j, sarr.length - 1)
    $el.prev().show().find('.popover-content p').text(newstr)
  }

  root.Validation = Validation
})(window, jQuery)

/**
 * datepicker
 * https://github.com/t1m0n/air-datepicker
 * =========================================================
 * timepicker
 * https://github.com/Sogl/air-datepicker/tree/develop
 * =========================================================
 */

var Datepicker;

(function (window, $, undefined) {
    var pluginName = 'datepicker',
        autoInitSelector = '.datepicker-here',
        $body, $datepickersContainer,
        containerBuilt = false,
        baseTemplate = '' +
            '<div class="datepicker">' +
            '<i class="datepicker--pointer"></i>' +
            '<nav class="datepicker--nav"></nav>' +
            '<div class="datepicker--content"></div>' +
            '</div>',
        defaults = {
            classes: '',
            inline: false,
            language: 'zh',
            startDate: new Date(),
            firstDay: '',
            weekends: [6, 0],
            dateFormat: '',
            altField: '',
            altFieldDateFormat: '@',
            toggleSelected: true,
            keyboardNav: true,

            position: 'bottom left',
            offset: 12,

            view: 'days',
            minView: 'days',

            showOtherMonths: true,
            selectOtherMonths: true,
            moveToOtherMonthsOnSelect: true,

            showOtherYears: true,
            selectOtherYears: true,
            moveToOtherYearsOnSelect: true,

            minDate: '',
            maxDate: '',
            disableNavWhenOutOfRange: true,

            multipleDates: false, // Boolean or Number
            multipleDatesSeparator: ',',
            range: false,

            todayButton: false,
            clearButton: false,

            showEvent: 'focus',
            autoClose: false,

            // navigation
            monthsFiled: 'monthsShort',
            prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
            nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
            navTitles: {
                days: 'MM, <i>yyyy</i>',
                months: 'yyyy',
                years: 'yyyy1 - yyyy2'
            },

            // timepicker
            timepicker: false,
            timeFormat: 'hh:ii',

            // events
            onSelect: '',
            onChangeMonth: '',
            onChangeYear: '',
            onChangeDecade: '',
            onChangeView: '',
            onRenderCell: '',
            onShow: ''
        },
        hotKeys = {
            'ctrlRight': [17, 39],
            'ctrlUp': [17, 38],
            'ctrlLeft': [17, 37],
            'ctrlDown': [17, 40],
            'shiftRight': [16, 39],
            'shiftUp': [16, 38],
            'shiftLeft': [16, 37],
            'shiftDown': [16, 40],
            'altUp': [18, 38],
            'altRight': [18, 39],
            'altLeft': [18, 37],
            'altDown': [18, 40],
            'ctrlShiftUp': [16, 17, 38]
        },
        datepicker;

    Datepicker  = function (el, options) {
        this.el = el;
        this.$el = $(el);

        // code by cheft.
        if (options && options.timepicker) {
            defaults.autoClose = false;
            defaults.dateFormat ='yyyy-mm-dd hh:ii';
        } else {
            defaults.autoClose = true;
        }
        // end code

        this.opts = $.extend(true, {}, defaults, options, this.$el.data());

        if ($body == undefined) {
            $body = $('body');
        }

        if (!this.opts.startDate) {
            this.opts.startDate = new Date();
        }

        if (this.el.nodeName == 'INPUT') {
            this.elIsInput = true;
        }

        if (this.opts.altField) {
            this.$altField = typeof this.opts.altField == 'string' ? $(this.opts.altField) : this.opts.altField;
        }

        this.inited = false;
        this.visible = false;
        this.silent = false; // Need to prevent unnecessary rendering

        this.currentDate = this.opts.startDate;
        this.currentView = this.opts.view;
        this._createShortCuts();
        this.selectedDates = [];
        this.views = {};
        this.keys = [];
        this.minRange = '';
        this.maxRange = '';
        this.init()
    };

    datepicker = Datepicker;

    datepicker.prototype = {
        viewIndexes: ['days', 'months', 'years'],

        init: function () {
            if (!containerBuilt && !this.opts.inline && this.elIsInput) {
                this._buildDatepickersContainer();
            }
            this._buildBaseHtml();
            this._defineLocale(this.opts.language);
            this._syncWithMinMaxDates();

            if (this.elIsInput) {
                if (!this.opts.inline) {
                    // Set extra classes for proper transitions
                    this._setPositionClasses(this.opts.position);
                    this._bindEvents()
                }
                if (this.opts.keyboardNav) {
                    this._bindKeyboardEvents();
                }
                this.$datepicker.on('mousedown', this._onMouseDownDatepicker.bind(this));
                this.$datepicker.on('mouseup', this._onMouseUpDatepicker.bind(this));
            }

            if (this.opts.classes) {
                this.$datepicker.addClass(this.opts.classes)
            }

            this.views[this.currentView] = new Datepicker.Body(this, this.currentView, this.opts);
            this.views[this.currentView].show();
            this.nav = new Datepicker.Navigation(this, this.opts);
            this.view = this.currentView;

            if (this.opts.timepicker) {
                this.timepicker = new Datepicker.Timepicker(this, this.opts);
                this._bindTimepickerEvents();
            }

            this.$datepicker.on('mouseenter', '.datepicker--cell', this._onMouseEnterCell.bind(this));
            this.$datepicker.on('mouseleave', '.datepicker--cell', this._onMouseLeaveCell.bind(this));

            this.inited = true;
        },

        _createShortCuts: function () {
            this.minDate = this.opts.minDate ? this.opts.minDate : new Date(-8639999913600000);
            this.maxDate = this.opts.maxDate ? this.opts.maxDate : new Date(8639999913600000);
        },

        _bindEvents : function () {
            this.$el.on(this.opts.showEvent + '.adp', this._onShowEvent.bind(this));
            this.$el.on('mouseup.adp', this._onMouseUpEl.bind(this));
            this.$el.on('blur.adp', this._onBlur.bind(this));
            this.$el.on('input.adp', this._onInput.bind(this));
            $(window).on('resize.adp', this._onResize.bind(this));
            $('body').on('mouseup.adp', this._onMouseUpBody.bind(this));
        },

        _bindKeyboardEvents: function () {
            this.$el.on('keydown.adp', this._onKeyDown.bind(this));
            this.$el.on('keyup.adp', this._onKeyUp.bind(this));
            this.$el.on('hotKey.adp', this._onHotKey.bind(this));
        },

        _bindTimepickerEvents: function () {
            this.$el.on('timeChange.adp', this._onTimeChange.bind(this));
        },

        isWeekend: function (day) {
            return this.opts.weekends.indexOf(day) !== -1;
        },

        _defineLocale: function (lang) {
            if (typeof lang == 'string') {
                this.loc = Datepicker.language[lang];
                if (!this.loc) {
                    console.warn('Can\'t find language "' + lang + '" in Datepicker.language, will use "ru" instead');
                    this.loc = $.extend(true, {}, Datepicker.language.ru)
                }

                this.loc = $.extend(true, {}, Datepicker.language.ru, Datepicker.language[lang])
            } else {
                this.loc = $.extend(true, {}, Datepicker.language.ru, lang)
            }

            if (this.opts.dateFormat) {
                this.loc.dateFormat = this.opts.dateFormat
            }

            if (this.opts.firstDay !== '') {
                this.loc.firstDay = this.opts.firstDay
            }
        },

        _buildDatepickersContainer: function () {
            containerBuilt = true;
            $body.append('<div class="datepickers-container" id="datepickers-container"></div>');
            $datepickersContainer = $('#datepickers-container');
        },

        _buildBaseHtml: function () {
            var $appendTarget,
                $inline = $('<div class="datepicker-inline">');

            if(this.el.nodeName == 'INPUT') {
                if (!this.opts.inline) {
                    $appendTarget = $datepickersContainer;
                } else {
                    $appendTarget = $inline.insertAfter(this.$el)
                }
            } else {
                $appendTarget = $inline.appendTo(this.$el)
            }

            this.$datepicker = $(baseTemplate).appendTo($appendTarget);
            this.$content = $('.datepicker--content', this.$datepicker);
            this.$nav = $('.datepicker--nav', this.$datepicker);
        },

        _triggerOnChange: function () {
            if (!this.selectedDates.length) {
                return this.opts.onSelect('', '', this);
            }

            var selectedDates = this.selectedDates,
                parsedSelected = datepicker.getParsedDate(selectedDates[0]),
                formattedDates,
                _this = this,
                dates = new Date(parsedSelected.year, parsedSelected.month, parsedSelected.date);

                formattedDates = selectedDates.map(function (date) {
                    return _this.formatDate(_this.loc.dateFormat, date)
                }).join(this.opts.multipleDatesSeparator);

            // Create new dates array, to separate it from original selectedDates
            if (this.opts.multipleDates || this.opts.range) {
                dates = selectedDates.map(function(date) {
                    var parsedDate = datepicker.getParsedDate(date);
                    return new Date(parsedDate.year, parsedDate.month, parsedDate.date)
                })
            }

            if (this.opts.onSelect) this.opts.onSelect(formattedDates, dates, this);
        },

        next: function () {
            var d = this.parsedDate,
                o = this.opts;
            switch (this.view) {
                case 'days':
                    this.date = new Date(d.year, d.month + 1, 1);
                    if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                    break;
                case 'months':
                    this.date = new Date(d.year + 1, d.month, 1);
                    if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
                    break;
                case 'years':
                    this.date = new Date(d.year + 10, 0, 1);
                    if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
                    break;
            }
        },

        prev: function () {
            var d = this.parsedDate,
                o = this.opts;
            switch (this.view) {
                case 'days':
                    this.date = new Date(d.year, d.month - 1, 1);
                    if (o.onChangeMonth) o.onChangeMonth(this.parsedDate.month, this.parsedDate.year);
                    break;
                case 'months':
                    this.date = new Date(d.year - 1, d.month, 1);
                    if (o.onChangeYear) o.onChangeYear(this.parsedDate.year);
                    break;
                case 'years':
                    this.date = new Date(d.year - 10, 0, 1);
                    if (o.onChangeDecade) o.onChangeDecade(this.curDecade);
                    break;
            }
        },

        formatDate: function (string, date) {
            date = date || this.date;
            var result = string,
                locale = this.loc,
                decade = datepicker.getDecade(date),
                d = datepicker.getParsedDate(date);

            switch (true) {
                case /@/.test(result):
                    result = result.replace(/@/, date.getTime());
                case /dd/.test(result):
                    result = result.replace(/\bdd\b/, d.fullDate);
                case /d/.test(result):
                    result = result.replace(/\bd\b/, d.date);
                case /DD/.test(result):
                    result = result.replace(/\bDD\b/, locale.days[d.day]);
                case /D/.test(result):
                    result = result.replace(/\bD\b/, locale.daysShort[d.day]);
                case /mm/.test(result):
                    result = result.replace(/\bmm\b/, d.fullMonth);
                case /m/.test(result):
                    result = result.replace(/\bm\b/, d.month + 1);
                case /MM/.test(result):
                    result = result.replace(/\bMM\b/, this.loc.months[d.month]);
                case /M/.test(result):
                    result = result.replace(/\bM\b/, locale.monthsShort[d.month]);
                case /ii/.test(result):
                    result = result.replace(/\bii\b/, d.fullMinutes);
                case /i/.test(result):
                    result = result.replace(/\bi(?!>)\b/, d.minutes);
                case /hh/.test(result):
                    result = result.replace(/\bhh\b/, d.fullHours);
                case /h/.test(result):
                    result = result.replace(/\bh\b/, d.hours);
                case /yyyy/.test(result):
                    result = result.replace(/\byyyy\b/, d.year);
                case /yyyy1/.test(result):
                    result = result.replace(/\byyyy1\b/, decade[0]);
                case /yyyy2/.test(result):
                    result = result.replace(/\byyyy2\b/, decade[1]);
                case /yy/.test(result):
                    result = result.replace(/\byy\b/, d.year.toString().slice(-2));
            }

            return result;
        },

        selectDate: function (date) {
            var _this = this,
                opts = _this.opts,
                d = _this.parsedDate,
                selectedDates = _this.selectedDates,
                len = selectedDates.length,
                newDate = '';

            if (!(date instanceof Date)) return;

            if (this.timepicker) {
                date.setHours(this.timepicker.hours);
                date.setMinutes(this.timepicker.minutes);
            }

            if (_this.view == 'days') {
                if (date.getMonth() != d.month && opts.moveToOtherMonthsOnSelect) {
                    newDate = new Date(date.getFullYear(), date.getMonth(), 1);
                }
            }

            if (_this.view == 'years') {
                if (date.getFullYear() != d.year && opts.moveToOtherYearsOnSelect) {
                    newDate = new Date(date.getFullYear(), 0, 1);
                }
            }

            if (newDate) {
                _this.silent = true;
                _this.date = newDate;
                _this.silent = false;
                _this.nav._render()
            }

            if (opts.multipleDates && !opts.range) { // Set priority to range functionality
                if (len === opts.multipleDates) return;
                if (!_this._isSelected(date)) {
                    _this.selectedDates.push(date);
                }
            } else if (opts.range) {
                if (len == 2) {
                    _this.selectedDates = [date];
                    _this.minRange = date;
                    _this.maxRange = '';
                } else if (len == 1) {
                    _this.selectedDates.push(date);
                    if (!_this.maxRange){
                        _this.maxRange = date;
                    } else {
                        _this.minRange = date;
                    }
                    _this.selectedDates = [_this.minRange, _this.maxRange]

                } else {
                    _this.selectedDates = [date];
                    _this.minRange = date;
                }
            } else {
                _this.selectedDates = [date];
            }

            _this._setInputValue();

            if (opts.onSelect) {
                _this._triggerOnChange();
            }

            if (opts.autoClose) {
                if (!opts.multipleDates && !opts.range) {
                    _this.hide();
                } else if (opts.range && _this.selectedDates.length == 2) {
                    _this.hide();
                }
            }

            _this.views[this.currentView]._render()
        },

        removeDate: function (date) {
            var selected = this.selectedDates,
                _this = this;

            if (!(date instanceof Date)) return;

            return selected.some(function (curDate, i) {
                if (datepicker.isSame(curDate, date)) {
                    selected.splice(i, 1);

                    if (!_this.selectedDates.length) {
                        _this.minRange = '';
                        _this.maxRange = '';
                    }

                    _this.views[_this.currentView]._render();
                    _this._setInputValue();

                    if (_this.opts.onSelect) {
                        _this._triggerOnChange();
                    }

                    return true
                }
            })
        },

        today: function () {
            this.silent = true;
            this.view = this.opts.minView;
            this.silent = false;
            this.date = new Date();
        },

        clear: function () {
            this.selectedDates = [];
            this.minRange = '';
            this.maxRange = '';
            this.views[this.currentView]._render();
            this._setInputValue();
            if (this.opts.onSelect) {
                this._triggerOnChange()
            }
        },

        /**
         * Updates datepicker options
         * @param {String|Object} param - parameter's name to update. If object then it will extend current options
         * @param {String|Number|Object} [value] - new param value
         */
        update: function (param, value) {
            var len = arguments.length;
            if (len == 2) {
                this.opts[param] = value;
            } else if (len == 1 && typeof param == 'object') {
                this.opts = $.extend(true, this.opts, param)
            }

            this._createShortCuts();
            this._syncWithMinMaxDates();
            this._defineLocale(this.opts.language);
            this.nav._addButtonsIfNeed();
            this.nav._render();
            this.views[this.currentView]._render();

            if (this.elIsInput && !this.opts.inline) {
                this._setPositionClasses(this.opts.position);
                if (this.visible) {
                    this.setPosition(this.opts.position)
                }
            }

            if (this.opts.classes) {
                this.$datepicker.addClass(this.opts.classes)
            }

            return this;
        },

        _syncWithMinMaxDates: function () {
            var curTime = this.date.getTime();
            this.silent = true;
            if (this.minTime > curTime) {
                this.date = this.minDate;
            }

            if (this.maxTime < curTime) {
                this.date = this.maxDate;
            }
            this.silent = false;
        },

        _isSelected: function (checkDate, cellType) {
            return this.selectedDates.some(function (date) {
                return datepicker.isSame(date, checkDate, cellType)
            })
        },

        _setInputValue: function () {
            var _this = this,
                opts = _this.opts,
                format = _this.loc.dateFormat,
                altFormat = opts.altFieldDateFormat,
                value = _this.selectedDates.map(function (date) {
                    return _this.formatDate(format, date)
                }),
                altValues;

            if (opts.altField && _this.$altField.length) {
                altValues = this.selectedDates.map(function (date) {
                    return _this.formatDate(altFormat, date)
                });
                altValues = altValues.join(this.opts.multipleDatesSeparator);
                this.$altField.val(altValues);
            }

            value = value.join(this.opts.multipleDatesSeparator);

            this.$el.val(value)
        },

        /**
         * Check if date is between minDate and maxDate
         * @param date {object} - date object
         * @param type {string} - cell type
         * @returns {boolean}
         * @private
         */
        _isInRange: function (date, type) {
            var time = date.getTime(),
                d = datepicker.getParsedDate(date),
                min = datepicker.getParsedDate(this.minDate),
                max = datepicker.getParsedDate(this.maxDate),
                dMinTime = new Date(d.year, d.month, min.date).getTime(),
                dMaxTime = new Date(d.year, d.month, max.date).getTime(),
                types = {
                    day: time >= this.minTime && time <= this.maxTime,
                    month: dMinTime >= this.minTime && dMaxTime <= this.maxTime,
                    year: d.year >= min.year && d.year <= max.year
                };
            return type ? types[type] : types.day
        },

        _getDimensions: function ($el) {
            var offset = $el.offset();

            return {
                width: $el.outerWidth(),
                height: $el.outerHeight(),
                left: offset.left,
                top: offset.top
            }
        },

        _getDateFromCell: function (cell) {
            var curDate = this.parsedDate,
                year = cell.data('year') || curDate.year,
                month = cell.data('month') == undefined ? curDate.month : cell.data('month'),
                date = cell.data('date') || 1;

            return new Date(year, month, date);
        },

        _setPositionClasses: function (pos) {
            pos = pos.split(' ');
            var main = pos[0],
                sec = pos[1],
                classes = 'datepicker -' + main + '-' + sec + '- -from-' + main + '-';

            if (this.visible) classes += ' active';

            this.$datepicker
                .removeAttr('class')
                .addClass(classes);
        },

        setPosition: function (position) {
            position = position || this.opts.position;

            var dims = this._getDimensions(this.$el),
                selfDims = this._getDimensions(this.$datepicker),
                pos = position.split(' '),
                top, left,
                offset = this.opts.offset,
                main = pos[0],
                secondary = pos[1];

            switch (main) {
                case 'top':
                    top = dims.top - selfDims.height - offset;
                    break;
                case 'right':
                    left = dims.left + dims.width + offset;
                    break;
                case 'bottom':
                    top = dims.top + dims.height + offset;
                    break;
                case 'left':
                    left = dims.left - selfDims.width - offset;
                    break;
            }

            switch(secondary) {
                case 'top':
                    top = dims.top;
                    break;
                case 'right':
                    left = dims.left + dims.width - selfDims.width;
                    break;
                case 'bottom':
                    top = dims.top + dims.height - selfDims.height;
                    break;
                case 'left':
                    left = dims.left;
                    break;
                case 'center':
                    if (/left|right/.test(main)) {
                        top = dims.top + dims.height/2 - selfDims.height/2;
                    } else {
                        left = dims.left + dims.width/2 - selfDims.width/2;
                    }
            }

            this.$datepicker
                .css({
                    left: left,
                    top: top
                })
        },

        show: function () {
            this.setPosition(this.opts.position);
            this.$datepicker.addClass('active');
            this.visible = true;
        },

        hide: function () {
            this.$datepicker
                .removeClass('active')
                .css({
                    left: '-100000px'
                });

            this.focused = '';
            this.keys = [];

            this.inFocus = false;
            this.visible = false;
            this.$el.blur();
        },

        down: function (date) {
            this._changeView(date, 'down');
        },

        up: function (date) {
            this._changeView(date, 'up');
        },

        _changeView: function (date, dir) {
            date = date || this.focused || this.date;

            var nextView = dir == 'up' ? this.viewIndex + 1 : this.viewIndex - 1;
            if (nextView > 2) nextView = 2;
            if (nextView < 0) nextView = 0;

            this.silent = true;
            this.date = new Date(date.getFullYear(), date.getMonth(), 1);
            this.silent = false;
            this.view = this.viewIndexes[nextView];

        },

        _handleHotKey: function (key) {
            var date = datepicker.getParsedDate(this._getFocusedDate()),
                focusedParsed,
                o = this.opts,
                newDate,
                totalDaysInNextMonth,
                monthChanged = false,
                yearChanged = false,
                decadeChanged = false,
                y = date.year,
                m = date.month,
                d = date.date;

            switch (key) {
                case 'ctrlRight':
                case 'ctrlUp':
                    m += 1;
                    monthChanged = true;
                    break;
                case 'ctrlLeft':
                case 'ctrlDown':
                    m -= 1;
                    monthChanged = true;
                    break;
                case 'shiftRight':
                case 'shiftUp':
                    yearChanged = true;
                    y += 1;
                    break;
                case 'shiftLeft':
                case 'shiftDown':
                    yearChanged = true;
                    y -= 1;
                    break;
                case 'altRight':
                case 'altUp':
                    decadeChanged = true;
                    y += 10;
                    break;
                case 'altLeft':
                case 'altDown':
                    decadeChanged = true;
                    y -= 10;
                    break;
                case 'ctrlShiftUp':
                    this.up();
                    break;
            }

            totalDaysInNextMonth = datepicker.getDaysCount(new Date(y,m));
            newDate = new Date(y,m,d);

            // If next month has less days than current, set date to total days in that month
            if (totalDaysInNextMonth < d) d = totalDaysInNextMonth;

            // Check if newDate is in valid range
            if (newDate.getTime() < this.minTime) {
                newDate = this.minDate;
            } else if (newDate.getTime() > this.maxTime) {
                newDate = this.maxDate;
            }

            this.focused = newDate;

            focusedParsed = datepicker.getParsedDate(newDate);
            if (monthChanged && o.onChangeMonth) {
                o.onChangeMonth(focusedParsed.month, focusedParsed.year)
            }
            if (yearChanged && o.onChangeYear) {
                o.onChangeYear(focusedParsed.year)
            }
            if (decadeChanged && o.onChangeDecade) {
                o.onChangeDecade(this.curDecade)
            }
        },

        _registerKey: function (key) {
            var exists = this.keys.some(function (curKey) {
                return curKey == key;
            });

            if (!exists) {
                this.keys.push(key)
            }
        },

        _unRegisterKey: function (key) {
            var index = this.keys.indexOf(key);

            this.keys.splice(index, 1);
        },

        _isHotKeyPressed: function () {
            var currentHotKey,
                found = false,
                _this = this,
                pressedKeys = this.keys.sort();

            for (var hotKey in hotKeys) {
                currentHotKey = hotKeys[hotKey];
                if (pressedKeys.length != currentHotKey.length) continue;

                if (currentHotKey.every(function (key, i) { return key == pressedKeys[i]})) {
                    _this._trigger('hotKey', hotKey);
                    found = true;
                }
            }

            return found;
        },

        _trigger: function (event, args) {
            this.$el.trigger(event, args)
        },

        _focusNextCell: function (keyCode, type) {
            type = type || this.cellType;

            var date = datepicker.getParsedDate(this._getFocusedDate()),
                y = date.year,
                m = date.month,
                d = date.date;

            if (this._isHotKeyPressed()){
                return;
            }

            switch(keyCode) {
                case 37: // left
                    type == 'day' ? (d -= 1) : '';
                    type == 'month' ? (m -= 1) : '';
                    type == 'year' ? (y -= 1) : '';
                    break;
                case 38: // up
                    type == 'day' ? (d -= 7) : '';
                    type == 'month' ? (m -= 3) : '';
                    type == 'year' ? (y -= 4) : '';
                    break;
                case 39: // right
                    type == 'day' ? (d += 1) : '';
                    type == 'month' ? (m += 1) : '';
                    type == 'year' ? (y += 1) : '';
                    break;
                case 40: // down
                    type == 'day' ? (d += 7) : '';
                    type == 'month' ? (m += 3) : '';
                    type == 'year' ? (y += 4) : '';
                    break;
            }

            var nd = new Date(y,m,d);
            if (nd.getTime() < this.minTime) {
                nd = this.minDate;
            } else if (nd.getTime() > this.maxTime) {
                nd = this.maxDate;
            }

            this.focused = nd;

        },

        _getFocusedDate: function () {
            var focused  = this.focused || this.selectedDates[this.selectedDates.length - 1],
                d = this.parsedDate;

            if (!focused) {
                switch (this.view) {
                    case 'days':
                        focused = new Date(d.year, d.month, new Date().getDate());
                        break;
                    case 'months':
                        focused = new Date(d.year, d.month, 1);
                        break;
                    case 'years':
                        focused = new Date(d.year, 0, 1);
                        break;
                }
            }

            return focused;
        },

        _getCell: function (date, type) {
            type = type || this.cellType;

            var d = datepicker.getParsedDate(date),
                selector = '.datepicker--cell[data-year="' + d.year + '"]',
                $cell;

            switch (type) {
                case 'month':
                    selector = '[data-month="' + d.month + '"]';
                    break;
                case 'day':
                    selector += '[data-month="' + d.month + '"][data-date="' + d.date + '"]';
                    break;
            }
            $cell = this.views[this.currentView].$el.find(selector);

            return $cell.length ? $cell : '';
        },

        destroy: function () {
            var _this = this;
            _this.$el
                .off('.adp')
                .data('datepicker', '');

            _this.selectedDates = [];
            _this.focused = '';
            _this.views = {};
            _this.keys = [];
            _this.minRange = '';
            _this.maxRange = '';

            if (_this.opts.inline || !_this.elIsInput) {
                _this.$datepicker.closest('.datepicker-inline').remove();
            } else {
                _this.$datepicker.remove();
            }
        },

        _onShowEvent: function () {
            var opts = this.opts;
            if (opts.onShow) {
                var result = opts.onShow();
                if (result === false) return;
            }

            if (!this.visible) {
                this.show();
            }
        },

        _onBlur: function () {
            if (!this.inFocus && this.visible) {
                this.hide();
            }
        },

        _onMouseDownDatepicker: function (e) {
            this.inFocus = true;
        },

        _onMouseUpDatepicker: function (e) {
            this.inFocus = false;
            e.originalEvent.inFocus = true;
            if (!e.originalEvent.timepickerFocus) this.$el.focus();
        },

        _onInput: function () {
            var val = this.$el.val();

            if (!val) {
                this.clear();
            }
        },

        _onResize: function () {
            if (this.visible) {
                this.setPosition();
            }
        },

        _onMouseUpBody: function (e) {
            if (e.originalEvent.inFocus) return;

            if (this.visible && !this.inFocus) {
                this.hide();
            }
        },

        _onMouseUpEl: function (e) {
            e.originalEvent.inFocus = true;
        },

        _onKeyDown: function (e) {
            var code = e.which;
            this._registerKey(code);

            // Arrows
            if (code >= 37 && code <= 40) {
                e.preventDefault();
                this._focusNextCell(code);
            }

            // Enter
            if (code == 13) {
                if (this.focused) {
                    if (this._getCell(this.focused).hasClass('-disabled-')) return;
                    if (this.view != this.opts.minView) {
                        this.down()
                    } else {
                        var alreadySelected = this._isSelected(this.focused, this.cellType);

                        if (!alreadySelected) {
                            this.selectDate(this.focused);
                        } else if (alreadySelected && this.opts.toggleSelected){
                            this.removeDate(this.focused);
                        }
                    }
                }
            }

            // Esc
            if (code == 27) {
                this.hide();
            }
        },

        _onKeyUp: function (e) {
            var code = e.which;
            this._unRegisterKey(code);
        },

        _onHotKey: function (e, hotKey) {
            this._handleHotKey(hotKey);
        },

        _onMouseEnterCell: function (e) {
            var $cell = $(e.target).closest('.datepicker--cell'),
                date = this._getDateFromCell($cell);

            // Prevent from unnecessary rendering and setting new currentDate
            this.silent = true;

            if (this.focused) {
                this.focused = ''
            }

            $cell.addClass('-focus-');

            this.focused = date;
            this.silent = false;

            if (this.opts.range && this.selectedDates.length == 1) {
                this.minRange = this.selectedDates[0];
                this.maxRange = '';
                if (datepicker.less(this.minRange, this.focused)) {
                    this.maxRange = this.minRange;
                    this.minRange = '';
                }
                this.views[this.currentView]._update();
            }
        },

        _onMouseLeaveCell: function (e) {
            var $cell = $(e.target).closest('.datepicker--cell');

            $cell.removeClass('-focus-');

            this.silent = true;
            this.focused = '';
            this.silent = false;
        },

        _onTimeChange: function (e, h, m) {
            var date = new Date(),
                selectedDates = this.selectedDates,
                selected = false;

            if (selectedDates.length) {
                selected = true;
                date = this.selectedDates[this.selectedDates.length - 1]
            }

            date.setHours(h);
            date.setMinutes(m);

            if (!selected) {
                this.selectDate(date);
            } else {
                this.selectedDates[selectedDates.length - 1] = date;
                this._setInputValue();
                this._triggerOnChange();
            }
        },

        set focused(val) {
            if (!val && this.focused) {
                var $cell = this._getCell(this.focused);

                if ($cell.length) {
                    $cell.removeClass('-focus-')
                }
            }
            this._focused = val;
            if (this.opts.range && this.selectedDates.length == 1) {
                this.minRange = this.selectedDates[0];
                this.maxRange = '';
                if (datepicker.less(this.minRange, this._focused)) {
                    this.maxRange = this.minRange;
                    this.minRange = '';
                }
            }
            if (this.silent) return;
            this.date = val;
        },

        get focused() {
            return this._focused;
        },

        get parsedDate() {
            return datepicker.getParsedDate(this.date);
        },

        set date (val) {
            if (!(val instanceof Date)) return;

            this.currentDate = val;

            if (this.inited && !this.silent) {
                this.views[this.view]._render();
                this.nav._render();
                if (this.visible && this.elIsInput) {
                    this.setPosition();
                }
            }
            return val;
        },

        get date () {
            return this.currentDate
        },

        set view (val) {
            this.viewIndex = this.viewIndexes.indexOf(val);

            if (this.viewIndex < 0) {
                return;
            }

            this.prevView = this.currentView;
            this.currentView = val;

            if (this.inited) {
                if (!this.views[val]) {
                    this.views[val] = new Datepicker.Body(this, val, this.opts)
                } else {
                    this.views[val]._render();
                }

                this.views[this.prevView].hide();
                this.views[val].show();
                this.nav._render();

                if (this.opts.onChangeView) {
                    this.opts.onChangeView(val)
                }
                if (this.elIsInput && this.visible) this.setPosition();
            }

            return val
        },

        get view() {
            return this.currentView;
        },

        get cellType() {
            return this.view.substring(0, this.view.length - 1)
        },

        get minTime() {
            var min = datepicker.getParsedDate(this.minDate);
            return new Date(min.year, min.month, min.date).getTime()
        },

        get maxTime() {
            var max = datepicker.getParsedDate(this.maxDate);
            return new Date(max.year, max.month, max.date).getTime()
        },

        get curDecade() {
            return datepicker.getDecade(this.date)
        }
    };

    //  Utils
    // -------------------------------------------------

    datepicker.getDaysCount = function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    datepicker.getParsedDate = function (date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            fullMonth: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1, // One based
            date: date.getDate(),
            fullDate: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            day: date.getDay(),
            hours: date.getHours(),
            fullHours:  date.getHours() < 10 ? '0' + date.getHours() :  date.getHours() ,
            minutes: date.getMinutes(),
            fullMinutes:  date.getMinutes() < 10 ? '0' + date.getMinutes() :  date.getMinutes()
        }
    };

    datepicker.getDecade = function (date) {
        var firstYear = Math.floor(date.getFullYear() / 10) * 10;

        return [firstYear, firstYear + 9];
    };

    datepicker.template = function (str, data) {
        return str.replace(/#\{([\w]+)\}/g, function (source, match) {
            if (data[match] || data[match] === 0) {
                return data[match]
            }
        });
    };

    datepicker.isSame = function (date1, date2, type) {
        if (!date1 || !date2) return false;
        var d1 = datepicker.getParsedDate(date1),
            d2 = datepicker.getParsedDate(date2),
            _type = type ? type : 'day',

            conditions = {
                day: d1.date == d2.date && d1.month == d2.month && d1.year == d2.year,
                month: d1.month == d2.month && d1.year == d2.year,
                year: d1.year == d2.year
            };

        return conditions[_type];
    };

    datepicker.less = function (dateCompareTo, date, type) {
        if (!dateCompareTo || !date) return false;
        return date.getTime() < dateCompareTo.getTime();
    };

    datepicker.bigger = function (dateCompareTo, date, type) {
        if (!dateCompareTo || !date) return false;
        return date.getTime() > dateCompareTo.getTime();
    };

    Datepicker.language = {
        zh: {
            days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            daysShort: ['日', '一', '二', '三', '四', '五', '六'],
            daysMin: ['日', '一', '二', '三', '四', '五', '六'],
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            today: '今天',
            clear: '清除',
            dateFormat: 'yyyy-mm-dd',
            firstDay: 1
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this,  pluginName,
                    new Datepicker( this, options ));
            } else {
                var _this = $.data(this, pluginName);

                _this.opts = $.extend(true, _this.opts, options);
                _this.update();
            }
        });
    };

    $(function () {
        $(autoInitSelector).datepicker();
    })


})(window, jQuery);
;(function () {
    var templates = {
        days:'' +
        '<div class="datepicker--days datepicker--body">' +
        '<div class="datepicker--days-names"></div>' +
        '<div class="datepicker--cells datepicker--cells-days"></div>' +
        '</div>',
        months: '' +
        '<div class="datepicker--months datepicker--body">' +
        '<div class="datepicker--cells datepicker--cells-months"></div>' +
        '</div>',
        years: '' +
        '<div class="datepicker--years datepicker--body">' +
        '<div class="datepicker--cells datepicker--cells-years"></div>' +
        '</div>'
        },
        D = Datepicker;

    D.Body = function (d, type, opts) {
        this.d = d;
        this.type = type;
        this.opts = opts;

        this.init();
    };

    D.Body.prototype = {
        init: function () {
            this._buildBaseHtml();
            this._render();

            this._bindEvents();
        },

        _bindEvents: function () {
            this.$el.on('click', '.datepicker--cell', $.proxy(this._onClickCell, this));
        },

        _buildBaseHtml: function () {
            this.$el = $(templates[this.type]).appendTo(this.d.$content);
            this.$names = $('.datepicker--days-names', this.$el);
            this.$cells = $('.datepicker--cells', this.$el);
        },

        _getDayNamesHtml: function (firstDay, curDay, html, i) {
            curDay = curDay != undefined ? curDay : firstDay;
            html = html ? html : '';
            i = i != undefined ? i : 0;

            if (i > 7) return html;
            if (curDay == 7) return this._getDayNamesHtml(firstDay, 0, html, ++i);

            html += '<div class="datepicker--day-name' + (this.d.isWeekend(curDay) ? " -weekend-" : "") + '">' + this.d.loc.daysMin[curDay] + '</div>';

            return this._getDayNamesHtml(firstDay, ++curDay, html, ++i);
        },

        _getCellContents: function (date, type) {
            var classes = "datepicker--cell datepicker--cell-" + type,
                currentDate = new Date(),
                parent = this.d,
                opts = parent.opts,
                d = D.getParsedDate(date),
                render = {},
                html = d.date;

            if (opts.onRenderCell) {
                render = opts.onRenderCell(date, type) || {};
                html = render.html ? render.html : html;
                classes += render.classes ? ' ' + render.classes : '';
            }

            switch (type) {
                case 'day':
                    if (parent.isWeekend(d.day)) classes += " -weekend-";
                    if (d.month != this.d.parsedDate.month) {
                        classes += " -other-month-";
                        if (!opts.selectOtherMonths) {
                            classes += " -disabled-";
                        }
                        if (!opts.showOtherMonths) html = '';
                    }
                    break;
                case 'month':
                    html = parent.loc[parent.opts.monthsFiled][d.month];
                    break;
                case 'year':
                    var decade = parent.curDecade;
                    html = d.year;
                    if (d.year < decade[0] || d.year > decade[1]) {
                        classes += ' -other-decade-';
                        if (!opts.selectOtherYears) {
                            classes += " -disabled-";
                        }
                        if (!opts.showOtherYears) html = '';
                    }
                    break;
            }

            if (opts.onRenderCell) {
                render = opts.onRenderCell(date, type) || {};
                html = render.html ? render.html : html;
                classes += render.classes ? ' ' + render.classes : '';
            }

            if (opts.range) {
                if (D.isSame(parent.minRange, date, type)) classes += ' -range-from-';
                if (D.isSame(parent.maxRange, date, type)) classes += ' -range-to-';

                if (parent.selectedDates.length == 1 && parent.focused) {
                    if (
                        (D.bigger(parent.minRange, date) && D.less(parent.focused, date)) ||
                        (D.less(parent.maxRange, date) && D.bigger(parent.focused, date)))
                    {
                        classes += ' -in-range-'
                    }

                    if (D.less(parent.maxRange, date) && D.isSame(parent.focused, date)) {
                        classes += ' -range-from-'
                    }
                    if (D.bigger(parent.minRange, date) && D.isSame(parent.focused, date)) {
                        classes += ' -range-to-'
                    }

                } else if (parent.selectedDates.length == 2) {
                    if (D.bigger(parent.minRange, date) && D.less(parent.maxRange, date)) {
                        classes += ' -in-range-'
                    }
                }
            }


            if (D.isSame(currentDate, date, type)) classes += ' -current-';
            if (parent.focused && D.isSame(date, parent.focused, type)) classes += ' -focus-';
            if (parent._isSelected(date, type)) classes += ' -selected-';
            if (!parent._isInRange(date, type) || render.disabled) classes += ' -disabled-';

            return {
                html: html,
                classes: classes
            }
        },

        /**
         * Calculates days number to render. Generates days html and returns it.
         * @param {object} date - Date object
         * @returns {string}
         * @private
         */
        _getDaysHtml: function (date) {
            var totalMonthDays = D.getDaysCount(date),
                firstMonthDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
                lastMonthDay = new Date(date.getFullYear(), date.getMonth(), totalMonthDays).getDay(),
                daysFromPevMonth = firstMonthDay - this.d.loc.firstDay,
                daysFromNextMonth = 6 - lastMonthDay + this.d.loc.firstDay;

            daysFromPevMonth = daysFromPevMonth < 0 ? daysFromPevMonth + 7 : daysFromPevMonth;
            daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;

            var startDayIndex = -daysFromPevMonth + 1,
                m, y,
                html = '';

            for (var i = startDayIndex, max = totalMonthDays + daysFromNextMonth; i <= max; i++) {
                y = date.getFullYear();
                m = date.getMonth();

                html += this._getDayHtml(new Date(y, m, i))
            }

            return html;
        },

        _getDayHtml: function (date) {
           var content = this._getCellContents(date, 'day');

            return '<div class="' + content.classes + '" ' +
                'data-date="' + date.getDate() + '" ' +
                'data-month="' + date.getMonth() + '" ' +
                'data-year="' + date.getFullYear() + '">' + content.html + '</div>';
        },

        /**
         * Generates months html
         * @param {object} date - date instance
         * @returns {string}
         * @private
         */
        _getMonthsHtml: function (date) {
            var html = '',
                d = D.getParsedDate(date),
                i = 0;

            while(i < 12) {
                html += this._getMonthHtml(new Date(d.year, i));
                i++
            }

            return html;
        },

        _getMonthHtml: function (date) {
            var content = this._getCellContents(date, 'month');

            return '<div class="' + content.classes + '" data-month="' + date.getMonth() + '">' + content.html + '</div>'
        },

        _getYearsHtml: function (date) {
            var d = D.getParsedDate(date),
                decade = D.getDecade(date),
                firstYear = decade[0] - 1,
                html = '',
                i = firstYear;

            for (i; i <= decade[1] + 1; i++) {
                html += this._getYearHtml(new Date(i , 0));
            }

            return html;
        },

        _getYearHtml: function (date) {
            var content = this._getCellContents(date, 'year');

            return '<div class="' + content.classes + '" data-year="' + date.getFullYear() + '">' + content.html + '</div>'
        },

        _renderTypes: {
            days: function () {
                var dayNames = this._getDayNamesHtml(this.d.loc.firstDay),
                    days = this._getDaysHtml(this.d.currentDate);

                this.$cells.html(days);
                this.$names.html(dayNames)
            },
            months: function () {
                var html = this._getMonthsHtml(this.d.currentDate);

                this.$cells.html(html)
            },
            years: function () {
                var html = this._getYearsHtml(this.d.currentDate);

                this.$cells.html(html)
            }
        },

        _render: function () {
            this._renderTypes[this.type].bind(this)();
        },

        _update: function () {
            var $cells = $('.datepicker--cell', this.$cells),
                _this = this,
                classes,
                $cell,
                date;
            $cells.each(function (cell, i) {
                $cell = $(this);
                date = _this.d._getDateFromCell($(this));
                classes = _this._getCellContents(date, _this.d.cellType);
                $cell.attr('class',classes.classes)
            });
        },

        show: function () {
            this.$el.addClass('active');
            this.acitve = true;
        },

        hide: function () {
            this.$el.removeClass('active');
            this.active = false;
        },

        //  Events
        // -------------------------------------------------

        _handleClick: function (el) {
            var date = el.data('date') || 1,
                month = el.data('month') || 0,
                year = el.data('year') || this.d.parsedDate.year;
            // Change view if min view does not reach yet
            if (this.d.view != this.opts.minView) {
                this.d.down(new Date(year, month, date));
                return;
            }
            // Select date if min view is reached
            var selectedDate = new Date(year, month, date),
                alreadySelected = this.d._isSelected(selectedDate, this.d.cellType);

            if (!alreadySelected) {
                this.d.selectDate(selectedDate);
            } else if (alreadySelected && this.opts.toggleSelected){
                this.d.removeDate(selectedDate);
            }

        },

        _onClickCell: function (e) {
            var $el = $(e.target).closest('.datepicker--cell');

            if ($el.hasClass('-disabled-')) return;

            this._handleClick.bind(this)($el);
        }
    };
})();

;(function () {
    var template = '' +
        '<div class="datepicker--nav-action" data-action="prev">#{prevHtml}</div>' +
        '<div class="datepicker--nav-title">#{title}</div>' +
        '<div class="datepicker--nav-action" data-action="next">#{nextHtml}</div>',
        buttonsContainerTemplate = '<div class="datepicker--buttons"></div>',
        button = '<span class="datepicker--button" data-action="#{action}">#{label}</span>';

    Datepicker.Navigation = function (d, opts) {
        this.d = d;
        this.opts = opts;

        this.$buttonsContainer = '';

        this.init();
    };

    Datepicker.Navigation.prototype = {
        init: function () {
            this._buildBaseHtml();
            this._bindEvents();
        },

        _bindEvents: function () {
            this.d.$nav.on('click', '.datepicker--nav-action', $.proxy(this._onClickNavButton, this));
            this.d.$nav.on('click', '.datepicker--nav-title', $.proxy(this._onClickNavTitle, this));
            this.d.$datepicker.on('click', '.datepicker--button', $.proxy(this._onClickNavButton, this));
        },

        _buildBaseHtml: function () {
            this._render();
            this._addButtonsIfNeed();
        },

        _addButtonsIfNeed: function () {
            if (this.opts.todayButton) {
                this._addButton('today')
            }
            if (this.opts.clearButton) {
                this._addButton('clear')
            }
        },

        _render: function () {
            var title = this._getTitle(this.d.currentDate),
                html = Datepicker.template(template, $.extend({title: title}, this.opts));
            this.d.$nav.html(html);
            if (this.d.view == 'years') {
                $('.datepicker--nav-title', this.d.$nav).addClass('-disabled-');
            }
            this.setNavStatus();
        },

        _getTitle: function (date) {
            return this.d.formatDate(this.opts.navTitles[this.d.view], date)
        },

        _addButton: function (type) {
            if (!this.$buttonsContainer.length) {
                this._addButtonsContainer();
            }

            var data = {
                    action: type,
                    label: this.d.loc[type]
                },
                html = Datepicker.template(button, data);

            if ($('[data-action=' + type + ']', this.$buttonsContainer).length) return;
            this.$buttonsContainer.append(html);
        },

        _addButtonsContainer: function () {
            this.d.$datepicker.append(buttonsContainerTemplate);
            this.$buttonsContainer = $('.datepicker--buttons', this.d.$datepicker);
        },

        setNavStatus: function () {
            if (!(this.opts.minDate || this.opts.maxDate) || !this.opts.disableNavWhenOutOfRange) return;

            var date = this.d.parsedDate,
                m = date.month,
                y = date.year,
                d = date.date;

            switch (this.d.view) {
                case 'days':
                    if (!this.d._isInRange(new Date(y, m-1, d), 'month')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(y, m+1, d), 'month')) {
                        this._disableNav('next')
                    }
                    break;
                case 'months':
                    if (!this.d._isInRange(new Date(y-1, m, d), 'year')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(y+1, m, d), 'year')) {
                        this._disableNav('next')
                    }
                    break;
                case 'years':
                    if (!this.d._isInRange(new Date(y-10, m, d), 'year')) {
                        this._disableNav('prev')
                    }
                    if (!this.d._isInRange(new Date(y+10, m, d), 'year')) {
                        this._disableNav('next')
                    }
                    break;
            }
        },

        _disableNav: function (nav) {
            $('[data-action="' + nav + '"]', this.d.$nav).addClass('-disabled-')
        },

        _activateNav: function (nav) {
            $('[data-action="' + nav + '"]', this.d.$nav).removeClass('-disabled-')
        },

        _onClickNavButton: function (e) {
            var $el = $(e.target).closest('[data-action]'),
                action = $el.data('action');

            this.d[action]();
        },

        _onClickNavTitle: function (e) {
            if ($(e.target).hasClass('-disabled-')) return;

            if (this.d.view == 'days') {
                return this.d.view = 'months'
            }

            this.d.view = 'years';
        }
    }

})();

(function (window, $, datepicker) {
    var template = '<div class="datepicker--time">' +
        '<div class="datepicker--time-sliders">' +
        '   <label class="datepicker--time-label">#{hourLabel}</label>' +
        '   <div class="datepicker--time-row">' +
        '      <input type="range" name="hours" value="#{hourValue}" min="#{hourMin}" max="#{hourMax}" step="#{hourStep}"/>' +
        '   </div>' +
        '   <label class="datepicker--time-label">#{minLabel}</label>' +
        '   <div class="datepicker--time-row">' +
        '      <input type="range" name="minutes" value="#{minValue}" min="#{minMin}" max="#{minMax}" step="#{minStep}"/>' +
        '   </div>' +
        '</div>' +
        '<div class="datepicker--time-current">' +
        '   <input type="text" value="#{hourValue}" placeholder="#{hourValue}" data-field="hours" name="hours-current" maxlength="2" data-max="#{hourMax}" data-action="next"/>' +
        '   <span>:</span>' +
        '   <input type="text" value="#{minValue}" placeholder="#{minValue}" data-field="minutes" name="minutes-current" maxlength="2" data-max="59" data-action="prev"/></div>' +
        '</div>',
        inputTimeout = 10;

    datepicker.Timepicker = function (inst, opts) {
        this.d = inst;
        this.opts = opts;

        var date = this.d.parsedDate;
        this.minutes = date.minutes;
        this.hours = date.hours;
        this._minutes = date.minutes;
        this._hours = date.hours;

        this.init();
    };

    datepicker.Timepicker.prototype = {
        init: function () {
            var input = 'input';
            this._buildHTML();

            if (navigator.userAgent.match(/trident/gi)) {
                input = 'change';
            }

            this.$ranges.on(input, this._onChangeRange.bind(this));
            this.$currentInputs.on('mouseup', this._onMouseUpInput.bind(this));
            this.$currentInputs.on('keydown', this._onKeyPressInput.bind(this));
            this.$currentInputs.on('input', this._onInputInput.bind(this));
            this.$currentInputs.on('blur', this._onBlurInput.bind(this));
            this.$currentInputs.on('paste', this._onPasteInput.bind(this));
        },

        _buildHTML: function () {
            var date = this.d.parsedDate,
                data = {
                    hourMin: '00',
                    hourMax: '23',
                    hourStep: '1',
                    hourValue: date.fullHours,
                    hourLabel: 'Часы',
                    minMin: '00',
                    minMax: '59',
                    minStep: '1',
                    minValue: date.fullMinutes,
                    minLabel: 'Минуты'
                },
                _template = datepicker.template(template, data);

            this.$timepicker = $(_template).appendTo(this.d.$datepicker);
            this.$ranges = $('[type="range"]', this.$timepicker);
            this.$currentTime = $('.datepicker--time-current', this.$timepicker);
            this.$currentInputs = $('input[type="text"]', this.$timepicker);
            this.$hoursText = $('[name="hours-current"]', this.$timepicker);
            this.$minutesText = $('[name="minutes-current"]', this.$timepicker);
        },

        _render: function () {

        },

        _updateTime: function () {
            var h = this.hours < 10 ? '0'+this.hours : this.hours,
                m = this.minutes < 10 ? '0' + this.minutes : this.minutes,
                html =  h + ':' + m;

            this.$hoursText.val(h);
            this.$minutesText.val(m)
        },

        _onChangeRange: function (e) {
            var $target = $(e.target),
                value = $target.val(),
                name = $target.attr('name');

            this[name] = value;
            this._updateTime();
            this.d._trigger('timeChange', [this.hours, this.minutes])
        },

        _onMouseUpInput: function (e) {
            e.originalEvent.inFocus = true;
            e.originalEvent.timepickerFocus = true;
        },

        _onKeyPressInput: function (e) {
            var $el = $(e.target),
                field = $el.data('field'),
                max = $el.data('max'),
                _this = this,
                charCode = e.which,
                action = $el.data('action'),
                parsedVal,
                initialValue = $el.val(),
                val = $el.val();

            setTimeout(function () {
                val = $el.val();
                parsedVal = parseInt(val);

                if (parsedVal > max) {
                    $el.val(initialValue);
                    return;
                }

                if (val.length == 2) {
                    if (action == 'next' && charCode >= 48 && charCode <= 57) {
                        _this.$minutesText.focus().select();
                    }
                }

                if (!val.length) {
                    if (action == 'prev' && charCode == 8) {
                        _this.$hoursText.focus();

                        _this.$hoursText[0].selectionStart = 2;
                        _this.$hoursText[0].selectionEnd = 2;
                    }
                }


            }, inputTimeout);

            return charCode >= 48 && charCode <= 57
            || (charCode >= 37 && charCode <= 40)
            || (charCode >= 96 && charCode <= 105)
            || charCode == 17
            || charCode == 13
            || charCode == 46
            || charCode == 8
            || charCode == 9;
        },

        _onInputInput: function (e) {
            var $el = $(e.target),
                _this = this,
                field = $el.data('field'),
                max = $el.data('max'),
                val = parseInt($el.val());

            setTimeout(function () {
                val = parseInt($el.val());

                if (val > max) {
                    val = max;
                    $el.val(val);
                } else if (!val) {
                    val = _this['_' + field]
                }

                _this[field] = val;
                $('[name="' + field + '"]').val(val);
                _this.d._trigger('timeChange',[_this.hours, _this.minutes])
            }, inputTimeout)
        },

        _onBlurInput: function (e) {
            var $el = $(e.target),
                val = $el.val();

            if (val.length == 1) {
                val = '0' + val;
                $el.val(val);
            }
        },

        _onPasteInput: function (e) {
            var $el = $(e.target),
                val = $el.val(),
                _this = this;

            setTimeout(function () {
                val = $el.val().replace(/\D/gi, '');
                $el.val(val);
            }, inputTimeout)
        }
    };
})(window, jQuery, Datepicker);
!function($){
  var MMPaginator = function(element, options){
    this.$el = $(element);
    this.opts = options;
  };

  MMPaginator.prototype = {
    _initLayout: function(){
      var that = this;
      var $el = this.$el;
      var opts = this.opts;

      $el.addClass('mmPaginator').addClass(opts.style);
      var pgHtmls = [];

      if (opts.showTotalCount) pgHtmls.push('<div class="totalCountLabel"></div>')
      if (opts.showLimitList) pgHtmls.push('<div class="limit"><select></select></div>')
      pgHtmls.push('<ul class="pageList"></ul>')
      if (opts.showJumpBox) pgHtmls.push('<div class="jump-box">转到第 <input type="number" min="1" onkeyup="this.value=this.value.replace(/\D/, \'\');"> 页</div>')

      $el.append($(pgHtmls.join('')));

      this.$totalCountLabel = $el.find('.totalCountLabel');
      this.$pageList = $el.find('.pageList');
      this.$limitList = $el.find('.limit select');
      this.$jumpbox = $el.find('.jump-box input');

       var $limitList = this.$limitList
      $.each(opts.limitList, function(){
        var $option = $('<option></option>')
          .prop('value',this)
          .text(that.formatString(opts.limitLabel,[this]));
        $limitList.append($option);
      });

      $limitList.on('change', function(e) {
        $el.data('page', 1);
        $el.trigger('limit.change', +e.target.value)
        if (that.$mmGrid) that.$mmGrid.load();
      });

      this.$jumpbox.on('keydown', function(e) {
        if (!e.target.value) return
        if (e.keyCode === 13) {
          var page = +e.target.value
          $el.data('page', page);
          that.load();
          if (that.$mmGrid) that.$mmGrid.load();
          e.target.value = ''
          var totalCount = $el.data('totalCount')
          var limit = $el.data('limit')
          var totalPage = totalCount % limit === 0 ? parseInt(totalCount/limit) : parseInt(totalCount/limit) + 1;
          totalPage = totalPage ? totalPage : 0;
          if(page > totalPage) page = totalPage;
          $el.trigger('page.change', page)
        }
      })
    }

    , _plain: function(page, totalCount, limit){
      var that = this;
      var $el = this.$el;
      var $pageList = this.$pageList;
      var opts = this.opts

      var totalPage = totalCount % limit === 0 ? parseInt(totalCount/limit) : parseInt(totalCount/limit) + 1;
      totalPage = totalPage ? totalPage : 0;
      if(totalPage === 0){
        page = 1;
      }else if(page > totalPage){
        page = totalPage;
      }else if(page < 1 && totalPage != 0){
        page = 1;
      }
      //
      var $prev = $('<li class="prev"><a>' + opts.prev + '</a></li>');
      if(page<=1){
        $prev.addClass('disable');
      }else{
        $prev.on('click', function(){
          $el.data('page', page-1);
          if (that.$mmGrid) that.$mmGrid.load();
          $el.trigger('page.change', page-1)
        });
      }
      $pageList.append($prev);
      /////
      var list = [1];
      if(page > 4 ){
        list.push('...');
      }
      for(var i= 0; i < 5; i++){
        var no = page - 2 + i;
        if(no > 1 && no <= totalPage-1){
          list.push(no);
        }
      }
      if(page+1 < totalPage-1){
        list.push('...');
      }
      if(totalPage>1){
        list.push(totalPage);
      }
      $.each(list, function(index, item){
        var $li = $('<li><a></a></li>');
        if(item === '...'){
          $li.addClass('').html('...');
        }else if(item === page){
          $li.addClass('active').find('a').text(item);
        }else{
          $li.text(item).prop('title','第' + item + '页').on('click', function(e){
            $el.data('page', item);
            if (that.$mmGrid) that.$mmGrid.load();
            $el.trigger('page.change', item)
          });
        }
        $pageList.append($li);
      });
      //
      var $next = $('<li class="next"><a title="下一页">' + opts.next + '</a></li>');
      if(page>=totalPage) {
        $next.addClass('disable');
      }else {
        $next.on('click', function(){
          $el.data('page', page + 1);
          if (that.$mmGrid) that.$mmGrid.load();
          $el.trigger('page.change', page + 1)
        });
      }
      $pageList.append($next);
    }

    , _search: function(page, totalCount, limit){

    }

    , load: function(params){
      var $el = this.$el;
      var $limitList = this.$limitList;
      var opts = this.opts;

      if(!params){
        params = {};
      }

      var page = params[opts.pageParamName];
      if(page === undefined || page === null){
        page = $el.data('page');
      }
      $el.data('page', page);

      var totalCount = params[opts.totalCountName] || opts[opts.totalCountName];
      if(totalCount === undefined){
        totalCount = 0;
      }
      $el.data('totalCount', totalCount);


      var limit = params[opts.limitParamName];
      if(!limit){
        limit = $limitList.val() || 10;
      }
      this.$limitList.val(limit);

      this.$totalCountLabel.html(this.formatString(opts.totalCountLabel,[totalCount]));
      this.$pageList.empty();
      $el.data('limit', limit);

      this._plain(page, totalCount, limit);
      return this
    }

    , formatString: function(text, args){
      return text.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
          ;
      });
    }

    , params: function(){
      var opts = this.opts;
      var $el = this.$el;
      var $limitList = this.$limitList;

      var params = {};
      if (opts.params) {
        params = opts.params({page: $el.data('page'), limit: $limitList.val()})
      } else {
        params[opts.pageParamName] = $el.data('page');
        params[opts.limitParamName] = $limitList.val();
      }
      return params;
    }

    , init: function($grid){
      var that = this;
      var opts = that.opts;
      this.$mmGrid = $grid;
      this._initLayout();
      if ($grid) {
        this.$mmGrid.on('loadSuccess', function(e, data){
          that.load(data);
        });
      }

      var params = {};
      params[opts.totalCountName] = 0;
      params[opts.pageParamName] = opts.page;
      params[opts.limitParamName] = opts.limit;
      this.load(params);

      if($grid && $grid.opts.indexCol){
        var indexCol = $grid.opts.cols[0];
        indexCol.renderer = function(val,item,rowIndex){
          var params = that.params();
          return '<label class="mmg-index">' +
            (rowIndex + 1 + ((params[opts.pageParamName]-1) * params[opts.limitParamName])) +
            '</label>';
        };
      }
      return this
    }
  };

  $.fn.paginator = function(){

    if(arguments.length === 0 || typeof arguments[0] === 'object'){
      var option = arguments[0]
        , data = this.data('mmPaginator')
        , options = $.extend(false, {}, $.fn.paginator.defaults, option);
      if (!data) {
        data = new MMPaginator(this[0], options);
        if (options.role !== 'grid') data.init().load({totalCount: options[options.totalCountName]})
        this.data('mmPaginator', data);
      }
      return $.extend(true, this, data);
    }
    if(typeof arguments[0] === 'string'){
      var data = this.data('mmPaginator');
      var fn =  data[arguments[0]];
      if(fn){
        var args = Array.prototype.slice.call(arguments);
        return fn.apply(data,args.slice(1));
      }
    }
  };

  $.fn.paginator.defaults = {
     style: 'plain'
    , totalCountName: 'totalCount'
    , page: 1
    , totalCount: 0
    , pageParamName: 'page'
    , limitParamName: 'limit'
    , limitLabel: '每页 {0} 条'
    , totalCountLabel: '共 <span>{0}</span> 条记录'
    , showTotalCount: true
    , showLimitList: true
    , showJumpBox: true
    , prev: '上一页'
    , next: '下一页'
    , limit: 10
    , limitList: [10, 20, 30, 40, 50]
  };

  $.fn.paginator.Constructor = MMPaginator;

}(window.jQuery);