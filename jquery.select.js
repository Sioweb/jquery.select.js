(function($,window){

  "use strict";

  var pluginName = 'select',

  /**
   * @author Sascha Weidner
   * @brief Replace input dropdown with list 
   */
  PluginClass = function() {

    var selfObj = this,
        img = null;
    this.item = false;
    
    this.init = function(elem) {
      selfObj = this;

      if(!this.container)
        this.container = window;
      this.elem = elem;
      this.item = $(elem);
      this.container = $(this.container);

      this.loaded();
    };

    this.disable = function() {
      clearTimeout(selfObj.scrollTimeOut);
      selfObj.enabled = false;
    };

    this.enable = function() {
      selfObj.enabled = true;
    };

    this.loaded = function() {
      var $label = null,
          $ul = null,
          selectHeight = 0,
          containerHeight = selfObj.container.offset().top+selfObj.container.height();
      if(!selfObj.enabled)
        return;

      if(!selfObj.template) {
        selfObj.template = '<div class="ui-select">';
        selfObj.template += '<span class="label">'+selfObj.item.find('option').eq(0).html()+'</span>';
        selfObj.template += '<ul>';
          $.each(selfObj.item.find('option'),function(key, option) {
            var $option = $(option);
            selfObj.template += '<li data-value="'+$option.prop('value')+'">'+$option.html()+'</li>';
          });

        selfObj.template += '</ul></div>';
      }

      selfObj.item.hide();
      selfObj.template = $(selfObj.template).insertAfter(selfObj.item);
      $ul = selfObj.template.find('ul').eq(0);
      $ul.css('max-height','none');
      selectHeight = $ul.height();
      $ul.css({'max-height':false});

      if($ul.offset().top + selectHeight > containerHeight) {
        $ul.css('top',(containerHeight-$ul.offset().top)-selectHeight);
      }


      $label = selfObj.template.find('.label').eq(0);
      selfObj.template.click(function(e) {
        e.stopPropagation();
        $(this).toggleClass('open');
      });

      $('body').click(function(){
        selfObj.template.removeClass('open');
      });
      
      selfObj.template.find('li').click(function() {
        var $el = $(this);
        $label.html($el.html());

        selfObj.item.find('option').prop('selected',false);
        selfObj.item.find('option[value="'+$el.data('value')+'"]').prop('selected',true);
      });     
     };

  };

  $[pluginName] = $.fn[pluginName] = function(settings) {
    var element = typeof this === 'function'?$('html'):this,
        newData = arguments[1]||{},
        returnElement = [];
    returnElement[0] = element.each(function(k,i) {
      var pluginClass = $.data(this, pluginName),
          standardOptions = {
            template: null,
            debug: false,
            enabled: true,
            container: null,
            item: null,
            updated: function(){},
          },
          args = Array.prototype.slice.call(arguments);

      if(!settings || typeof settings === 'object' || settings === 'init') {
        if(!pluginClass) {
          if(settings === 'init')
            settings = args[1] || {};
          pluginClass = new PluginClass();
          if(settings)
            standardOptions = $.extend(true,{},standardOptions,settings);

          pluginClass = $.extend(standardOptions,pluginClass);
          /** Initialisieren. */
          pluginClass.init(this);
          $.data(this, pluginName, pluginClass);
        } else {
          return;
        }
      } else if(!pluginClass) {
        return;
      } else if(pluginClass[settings]) {
        var method = settings;
        returnElement[1] = pluginClass[method](newData);
      } else {
        return;
      }
    });

    if(returnElement[1] !== undefined) return returnElement[1];
    return returnElement[0];

  };
  
})(jQuery,window);
