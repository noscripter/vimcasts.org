$(document).foundation({
  accordion: {
    multi_expand: true
  }
});

$(document).ready(function() {
  if (matchMedia(Foundation.media_queries['medium']).matches) {
    $('#shownotes').addClass('active')
          .parent().addClass('active');
  }

  // Load Disqus comments on demand
  $('.show-comments').one('click', function(){
    var disqus_shortname = 'vimcasts';
    $.ajax({
      type: "GET",
      url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      dataType: "script",
      cache: true
    });
    $(this).removeClass('show-comments');
  });

  // set up autocomplete
  $(".swiftype-search-input").swiftype({
    engineKey: "93GMPZWuwEM3vHyUwNGX"
  });

  // set up search
  $(".swiftype-search-input").swiftypeSearch({
    engineKey: "93GMPZWuwEM3vHyUwNGX",
    resultContainingElement: "#st-results-container",
    renderFunction: swiftypeRenderFunction
  });

  $(".swiftype-search-form").submit(function(event) {
    event.preventDefault();
    var query = $(".swiftype-search-input", this).val();
    window.location = "/results/#stq=" + query;
  });

  $(".search-results .swiftype-search-input").val(extractSearchQuery);

  if (location.pathname == "/results") {
    $(window).hashchange(function() {
      $(".search-results .swiftype-search-input").val(extractSearchQuery);
    });
  }

});

function extractSearchQuery() {
  // Example location:
  //   /results#stq=vim&stp=2
  return location.hash.split('&')[0].split('=')[1];
};
