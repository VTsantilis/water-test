oWaterJQuery(document).ready(function() {
    
    // simple select transform
    oWaterJQuery("select.simple").each(function( index ) {
        var curSimple = oWaterJQuery(this), curWrap = curSimple.wrap("<div class='simpleselect'></div>").parent();
        curSimple.css("display","none");
        curWrap
            .css("marginTop",curSimple.css("marginTop"))
            .css("marginRight",curSimple.css("marginRight"))
            .css("marginBottom",curSimple.css("marginBottom"))
            .css("marginLeft",curSimple.css("marginLeft"))
        ;
        
        var curSimpleInfo = curSimple.find("option:selected");
        curWrap.append("<a href='#' class='curvalue' data-id='"+curSimpleInfo.val()+"'>"+curSimpleInfo.text()+"</a>");
        
        var optionValues = [];
        curSimple.find("option").each(function() {
            optionValues.push('<a href="#" data-id="'+oWaterJQuery(this).val()+'">'+oWaterJQuery(this).text()+'</a>');
        });
        curWrap.append("<div class='optionswrapper'>"+optionValues.join("")+"</div>");
        
    });
    oWaterJQuery(".simpleselect").on( "click", "a.curvalue", function(e) {
        e.preventDefault();
        var $this = oWaterJQuery(this);
        $this.toggleClass("active").next().toggleClass("show");
    });
    oWaterJQuery(".optionswrapper").on( "click", "a", function(e) {
        e.preventDefault();
        var newId = oWaterJQuery(this).data("id"), newName = oWaterJQuery(this).text(), curvalue = oWaterJQuery(this).parent().prev(), curSelect = curvalue.prev();
        if (!curvalue.hasClass("active")) return;
        oWaterJQuery(this).parent().toggleClass("show").prev().toggleClass("active");
        curvalue.text(newName).data("id",newId);
        // change value on select
        curSelect.val(newId).change();
        curSelect.parents("form").submit();
    });
    
    oWaterJQuery(".hassub").on("click", "a.subtrigger", function(e) {
        e.preventDefault();
        oWaterJQuery(this).parent().toggleClass("opened");
    });
    
    var inP = 0, inC = 0;
    oWaterJQuery(".hassub").on("mouseenter", "a.subtrigger", function(){
        inP = 1;
        if(inC==0) oWaterJQuery(this).parent().addClass("opened");
    }).on("mouseleave", "a.subtrigger", function(){
        var $this = oWaterJQuery(this);
        inP=0;
        setTimeout(function() {
            if (inC==0) { 
                $this.parent().removeClass("opened");
            }
        }, 500);
    });
    oWaterJQuery(".hassub").on("mouseenter", "ul", function(){
        inC = 1;
    }).on("mouseleave", "ul", function(){
        var $this = oWaterJQuery(this);
        inC = 0;
        setTimeout(function() {   //calls click event after a certain time
            if (inC==0 && inP==0) { 
                $this.parent().removeClass("opened");
                inP=0;
            }
        }, 500);
    });
    
    oWaterJQuery('#slides').slick({
        arrows: false,
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000
    });
    
    oWaterJQuery("article").on("click", "a.slidetoggle", function(e) {
        e.preventDefault();
        var article = oWaterJQuery(this).parent();
        article.find(".toslide").slideToggle( "slow", function() {
            article.toggleClass("isopened");
        });
    });
    
    oWaterJQuery('#twitterslides').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    
    oWaterJQuery('#tabs-slider').slick({
        arrows: false,
        dots: false,
        draggable: false,
        swipe: false,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    
    oWaterJQuery('.tabs-wrapper').find('nav a').each(function(index) {
        var $this = oWaterJQuery(this);
        $this.on( "click", function(event) {
            event.preventDefault();
            oWaterJQuery('.tabs-wrapper').find('nav a').removeClass('active');
            $this.addClass('active');
            oWaterJQuery('#tabs-slider').slickGoTo(parseFloat($this.data('sid')));
        });
    });
    
});