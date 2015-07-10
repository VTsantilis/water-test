jQuery(document).ready(function() {
	jQuery('ul.booktree > li.booktree').click(function(e) {
  	e.preventDefault();
    var $this = jQuery(this);
    if ($this.next('li.container').hasClass('show')) {
        $this.next('li.container').removeClass('show');
        $this.next('li.container').slideUp(350);
    } else {
        $this.parent().find('li.container').removeClass('show');
        $this.parent().find('li.container').slideUp(350);
        $this.next('li.container').toggleClass('show');
        $this.next('li.container').slideToggle(350);
    }
	});
	jQuery('ul.booktree > li.booktree a').click(function(e) {
		e.stopPropagation();
	});
});