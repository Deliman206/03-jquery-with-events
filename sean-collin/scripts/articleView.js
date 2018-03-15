'use strict';

// REVIEW: Configure an object to hold all of our functions for dynamic updates and article-related event handlers.
let articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    // REVIEW: We can declare several variables at once and assign their values later when using let. Keep in mind that we cannot do this with const.
    let authorName, category, optionTag;

    if (!$(this).hasClass('template')) {
      authorName = $(this).attr('data-author');

      optionTag = `<option value="${authorName}">${authorName}</option>`;

      if ($(`#author-filter option[value="${authorName}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }
     
      category = $(this).attr('data-category');

      // DONE: Refactor this concatenation using a template literal.
      optionTag = `<option value="${category}">${category}</option>`;

      if ($(`#category-filter option[value="${category}"]`).length === 0){
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we are defining. "$(this)" is using jQuery to select that element (analogous to event.target that we have seen before), so we can chain jQuery methods onto it.
    if ($(this).val()) {
      console.log($(this).val())
     
      let $selection = $(this).val();
      console.log($selection)

      $('article').hide();

      $(`article[data-author='${$selection}']`).show();
      
    } else {

      $('article').show();
      $('.template').hide();

    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    // REVIEW: Inside this function, "this" is the element that triggered the event handler function we are defining. "$(this)" is using jQuery to select that element (analogous to event.target that we have seen before), so we can chain jQuery methods onto it.
    if ($(this).val()) {
      
      let $selection = $(this).val();
     
      $('article').hide();

      $(`article[data-category='${$selection}']`).show();
      
    } else {

      $('article').show();
      $('.template').hide();

    }
    $('#author-filter').val('');
  });

};

articleView.handleMainNav = function() {
  // DONE: Add an event handler to .main-nav elements that will power the Tabs feature.
  // Clicking any .tab element should hide all the .tab-content sections, and then reveal the single .tab-content section that is associated with the clicked .tab element.
  // So: You need to dynamically build a selector string with the correct ID, based on the data available to you on the .tab element that was clicked.$

  $('.icon-home').on('click', function(){
    $('.tab-content').hide();
    $('#articles').show();
  })

  $('.icon-address-book').on('click', function(){
    $('.tab-content').hide();
    $('#about').show();
  })

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // REVIEW: Hide elements beyond the first 2 in any article body.
  $('.article-body *:nth-of-type(n+2)').hide();

  $('#articles').on('click', '.read-on', function(event) {
    event.preventDefault();
    let $selection = $(this).prev().find('*:nth-of-type(n+2)');
    $(this).hide();

    $selection.show();

  })
}
  // DONE: Add an event handler to reveal all the hidden elements, when the .read-on link is clicked. You can go ahead and hide the "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  // Ideally, we'd attach this as just one event handler on the #articles section, and let it process (in other words... delegate) any .read-on clicks that happen within child nodes

// DONE: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.setTeasers();
  articleView.handleMainNav();
})
