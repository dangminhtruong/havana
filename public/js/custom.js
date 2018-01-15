
$(window).load(function() {
	$('#brandcarousal').carouFredSel({
							width: '100%',
						scroll: 1,
							auto: false,
						prev: '#prev',
						next: '#next',
					    mousewheel: true,
						
						swipe: {
							onMouse: true,
							onTouch: true
						}
					});
					});
// Dropdown on Mouseover					
$('document').ready(function(){
	

	 $('.tooltip-test').tooltip()
    $('.popover-test').popover()

	var $acdata = $('.accrodian-data'),
		$acclick = $('.accrodian-trigger');

	$acdata.hide();
	$acclick.first().addClass('active').next().show();	
	
	$acclick.on('click', function(e) {
		if( $(this).next().is(':hidden') ) {
			$acclick.removeClass('active').next().slideUp(300);
			$(this).toggleClass('active').next().slideDown(300);
		}
		e.preventDefault();
	});
		

	$('.togglehandle').click(function()
	{
		$(this).toggleClass('active')
		$(this).next('.toggledata').slideToggle()
	});
	
	
	// Dropdowns
	$('.dropdown').hover(
		function(){$(this).addClass('open')			
		},
		function(){			
			$(this).removeClass('open')
		}
		);
		
	// Product thumbnails
	$('.thumbnail').each(function()
	{
		
		$(this).hover(
		function(){
			//$(this).children('a').children('img').fadeOut()
			$(this).children('.shortlinks').fadeIn()
		},
		function(){	
			//$(this).children('a').children('img').fadeIn()		
			$(this).children('.shortlinks').fadeOut()
		}
		);
		
	});
	
	// Checkout steps
	$('.checkoutsteptitle').addClass('down').next('.checkoutstep').fadeIn()
	$('.checkoutsteptitle').live('click', function()
	{		
	$("select, input:checkbox, input:radio, input:file").css('display', 'blcok');	
		$(this).toggleClass('down').next('.checkoutstep').slideToggle()
	});
		
	// Category Menu mobile
	 $("<select />").appendTo("nav.subnav");
      
      // Create default option "Go to..."
      $("<option />", {
         "selected": "selected",
         "value"   : "",
         "text"    : "Go to..."
      }).appendTo("nav.subnav select");
      
      // Populate dropdown with menu items
      $("nav.subnav a[href]").each(function() { 
       var el = $(this);
       $("<option />", {
           "value"   : el.attr("href"),
           "text"    : el.text()
       }).appendTo("nav.subnav select");
      });
      
	   // To make dropdown actually work
	   // To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
      $("nav.subnav select").change(function() {
        window.location = $(this).find("option:selected").val();
      });
	  
	// Product Thumb
	$('.mainimage li #wrap').hide()
	$('.mainimage li #wrap').eq(0).fadeIn()
	$('ul.mainimage li.producthtumb').click(function(){
		var thumbindex = $(this).index()		
		$('.mainimage li #wrap').fadeOut(0)
		$('.mainimage li #wrap').eq(thumbindex).fadeIn()
		 $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();
	})
			
	// List & Grid View
	$('#list').click(function()
	{	$(this).addClass ('btn-orange').children('i').addClass('icon-white')
		$('.grid').fadeOut()
		$('.list').fadeIn()
		$('#grid').removeClass ('btn-orange').children('i').removeClass('icon-white')
	});
	$('#grid').click(function()
	{	$(this).addClass ('btn-orange').children('i').addClass('icon-white')
		$('.list').fadeOut()
		$('.grid').fadeIn()
		$('#list').removeClass ('btn-orange').children('i').removeClass('icon-white')
	});
	
	// Prdouctpagetab 
	$('#myTab a:first').tab('show')
		$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
	
	// alert close 
	$('.clostalert').click(function()
	{
	$(this).parent('.alert').fadeOut ()
	});	
	 

	$("#mainslider2").carouFredSel({
		responsive: true,
	items		: 1,
	scroll		: {
		fx			: "crossfade"
	},
	auto: false,
	mousewheel: true,	
	swipe: {
		onMouse: true,
		onTouch: true
	},
	
	pagination	: {
		container		: "#mainslider2_pag",
		anchorBuilder	: function( nr ) {
			var src = $("img", this).attr( "src" );
				//src = src.replace( "/large/", "/small/");
			return '<img src="' + src + '" style="width:100px" />';
			}
		}
	});



	$(function() {
				$('#mainslider3').carouFredSel({
					responsive: true,
					auto: true,
				//	width: 1170,
					height: '100%',
					direction: 'left',
					items: 1,
					swipe: {
							onMouse: true,
							onTouch: true
						},
					scroll: {
						duration: 1000,
						onBefore: function( data ) {
							data.items.visible.children().css( 'opacity', 0 ).delay( 200 ).fadeTo( 400, 1 );
							data.items.old.children().fadeTo( 400, 0 );
						}
					}
				});
			});



	$(window).load(function() {
              // The slider being synced must be initialized first
              $('#carouseindex4').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 226,
                //itemMargin: 15,
                asNavFor: '#sliderindex4'
              });
              
              $('#sliderindex4').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: "#carouseindex4"
              });
            });
			
			function prevTimers() {
				return allTimers().slice( 0, $('.sliderindex5pager a.selected').index() );
			}
			function allTimers() {
				return $('.sliderindex5pager a span');
			}

			$(function() {
				$('#sliderindex5').carouFredSel({
					items: 1,
					responsive : true,
					auto: {
						pauseOnHover: 'resume',
						progress: {
							bar: '.sliderindex5pager a:first span'
						}
					},
					scroll: {
						fx: 'crossfade',
						duration: 300,
						timeoutDuration: 2000,
						onAfter: function() {
							allTimers().stop().width( 0 );
						//	prevTimers().width(  );
							$(this).trigger('configuration', [ 'auto.progress.bar', '.sliderindex5pager a.selected span' ]);
						}
					},
					pagination: {
						container: '.sliderindex5pager',
						anchorBuilder: false
					}
				});
			});
			
	
	$(function() {
				$('#mainslider6').carouFredSel({
					//width: 900,
					//height: '100%',
					direction: 'up',
					items: 1,
					prev: '#prevmainslider6',
					next: '#nextmainslider6',
					pagination: "#pagermainslider6",
					mousewheel: true,
					swipe: {
						onMouse: true,
						onTouch: true
					}
					
					
				});
				
			});

})
// Flexsliders	  
$(window).load(function(){	
	
	// Fancyboxpopup
	$("a.fancyboxpopup").fancybox().each(function() {		
		$(this).append('<span class="viewfancypopup">&nbsp;</span>'); 
	});
	
	// Flexslider index banner
	$('#mainslider').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
        }
   });
   // Flexslider side banner
	$('#mainsliderside').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
        }
   });
	// Flexslider Category banner  
	$('#catergoryslider').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
        }
    });
	 
	 // Flexslider Brand    
	$('#advertise').flexslider({
        animation: "fade",		
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
	  
	// Flexslider Blog   
	$('#blogslider').flexslider({
        animation: "fade",		
        start: function(slider){
          $('body').removeClass('loading');
    }
      });
	  
	  // Flexslider  Musthave    
	$('#musthave').flexslider({
        animation: "fade",		
        start: function(slider){
          $('body').removeClass('loading');
    }
      });
	  
	  $('#testimonialsidebar').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
    }
      });
	    $('#portfolioslider').flexslider({
        animation: "slide",		
        start: function(slider){
          $('body').removeClass('loading');
    }
      });
	  
	  
	  
	  
});
	  
$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#gotop').fadeIn(500);
		} else {
			$('#gotop').fadeOut(500);
		}
	});	
	

$(window).load(function() {	
			

  $.Isotope.prototype._getCenteredMasonryColumns = function() {
    this.width = this.element.width();
    
    var parentWidth = this.element.parent().width();
    
                  // i.e. options.masonry && options.masonry.columnWidth
    var colW = this.options.masonry && this.options.masonry.columnWidth ||
                  // or use the size of the first item
                  this.$filteredAtoms.outerWidth(true) ||
                  // if there's no items, use size of container
                  parentWidth;
    
    var cols = Math.floor( parentWidth / colW );
    cols = Math.max( cols, 1 );

    // i.e. this.masonry.cols = ....
    this.masonry.cols = cols;
    // i.e. this.masonry.columnWidth = ...
    this.masonry.columnWidth = colW;
  };
  
  $.Isotope.prototype._masonryReset = function() {
    // layout-specific props
    this.masonry = {};
    // FIXME shouldn't have to call this again
    this._getCenteredMasonryColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
      this.masonry.colYs.push( 0 );
    }
  };

  $.Isotope.prototype._masonryResizeChanged = function() {
    var prevColCount = this.masonry.cols;
    // get updated colCount
    this._getCenteredMasonryColumns();
    return ( this.masonry.cols !== prevColCount );
  };
  
  $.Isotope.prototype._masonryGetContainerSize = function() {
    var unusedCols = 0,
        i = this.masonry.cols;
    // count unused columns
    while ( --i ) {
      if ( this.masonry.colYs[i] !== 0 ) {
        break;
      }
      unusedCols++;
    }
    
    return {
          height : Math.max.apply( Math, this.masonry.colYs ),
          // fit container to columns that have been used;
          width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
        };
  };


  $(function(){
    
    var $container = $('#portfoliocontainer');
    
    
      // add randomish size classes
      $container.find('.element').each(function(){
        var $this = $(this),
            number = parseInt( $this.find('.number').text(), 10 );
        if ( number % 7 % 2 === 1 ) {
          $this.addClass('width2');
        }
        if ( number % 3 === 0 ) {
          $this.addClass('height2');
        }
      });
    
    $container.isotope({
      itemSelector : '.element',
      masonry : {
   columnWidth :10
      },
      getSortData : {
        symbol : function( $elem ) {
          return $elem.attr('data-symbol');
        },
        category : function( $elem ) {
          return $elem.attr('data-category');
        },
        number : function( $elem ) {
          return parseInt( $elem.find('.number').text(), 10 );
        },
        weight : function( $elem ) {
          return parseFloat( $elem.find('.weight').text().replace( /[\(\)]/g, '') );
        },
        name : function ( $elem ) {
          return $elem.find('.name').text();
        }
      }
    });
      
    
      var $optionSets = $('#options .option-set'),
          $optionLinks = $optionSets.find('a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
  
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }
        
        return false;
      });

  });					
    });					

		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

/*
* Author : Dang Minh Truong
* Email : mr.dangminhtruong
*/
