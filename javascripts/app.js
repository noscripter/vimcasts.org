$(document).foundation();

$(document).ready(function() {
  if (matchMedia(Foundation.media_queries['medium']).matches) {
    $('#shownotes').addClass('active');
  }

  // set up autocomplete
  $(".swiftype-search-input").swiftype({
    engineKey: "Wdx4LxrBJv86q28yDA8A"
  });

  // set up search
  $(".swiftype-search-input").swiftypeSearch({
    engineKey: "Wdx4LxrBJv86q28yDA8A",
    resultContainingElement: "#st-results-container",
    renderFunction: swiftypeRenderFunction
  });

  $(".swiftype-search-form").submit(function(event) {
    event.preventDefault();
    var query = $(".swiftype-search-input", this).val();
    window.location = "/results#stq=" + query;
  });
});
