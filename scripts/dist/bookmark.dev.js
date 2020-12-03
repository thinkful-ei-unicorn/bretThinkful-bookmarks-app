'use strict';

var bookmarkList = function () {
  function generateBookmarkElement(item) {
    return "\n    <li class=\"bookmark-list-items js-bookmark-list-items\" data-item-id=\"".concat(item.id, "\">\n      <h3 class=\"list-title js-list-title\">").concat(item.title, "</h3>\n      <section class=\"star-rating js-star-rating\">\n        <p class=\"star-number js-star-number\">").concat(item.rating, " Stars</p>\n      </section>\n    </li>");
  }

  function generateBookmarkString(bookmarkList) {
    var items = bookmarkList.map(function (item) {
      return generateBookmarkElement(item);
    });
    return items.join('');
  }

  function generateExpandedView(item) {
    return "\n      <li class=\"expand-bookmark-view js-expand-bookmark-view\" data-item-id=\"".concat(item.id, "\">\n        <h2>").concat(item.title, "</h2>\n        <form id=\"js-close-expanded\" class=\"header-right js-header-right\">\n        <p class=\"expanded-stars js-expanded-stars\">").concat(item.rating, " Stars</p>\n          <button class=\"close-button js-close-button\" type=\"submit\">Close</button>\n        </form>\n        <p class=\"long-desc js-long-desc\">").concat(item.desc, "</p>\n        <a class=\"bookmark-link js-bookmark-link\" href=\"").concat(item.url, "\" target=\"_blank\">").concat(item.url, "</a>\n        <div> \n            <a class=\"bookmark-link js-bookmark-link\" href=\"").concat(item.url, "\" target=\"_blank\">\n            <button class=\"visit-site-button js-visit-site-button\">Visit</button></a>\n        </div>\n        <form id=\"js-delete-bookmark\">\n          <button class=\"delete-bookmark-button js-delete-bookmark-button\" type=\"submit\">Delete</button>\n        </form>\n    \n        <form id=\"js-edit-bookmark\">\n          <button class=\"edit-bookmark-button js-edit-bookmark-button\" type=\"submit\">Edit</button>\n        </form>\n      </li>");
  }

  function generateCreateBookmarkView() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return "\n    <li class=\"create-bookmark-view js-create-bookmark-view\">\n      <h2>Create New Bookmark</h2>\n        <form for=\"close-button\" id=\"js-close-expanded\" class=\"close-header-right js-header-right\" id=\"close-button\">\n          <button class=\"create-close-button js-close-button\" type=\"submit\">Close</button>\n        </form>\n        <form id=\"js-add-bookmark\">\n          <label for=\"add-bookmark-title\"></label>\n          <input value =\"".concat(item.title || '', "\" class=\"add-bookmark add-bookmark-title js-add-bookmark-title\" id=\"add-bookmark-title\" name=\"title\" type=\"text\" placeholder=\"Title\" required>\n          <label for=\"add-bookmark-link\"></label>\n          <input class=\"add-bookmark add-bookmark-link js-add-bookmark-link\" id=\"add-bookmark-link\" name=\"url\" type=\"url\" value=\"http://\" placeholder=\"http://url-address.com\" required>\n          <label for=\"add-bookmark-desc\"></label>\n          <input class=\"add-bookmark add-bookmark-desc js-add-bookmark-desc\" id=\"add-bookmark-desc\" name=\"desc\" type=\"text\" placeholder=\"Add Description\" align=\"top\">\n          <div id=\"add-star-rating js-add-star-rating\">\n            <div class=\"add-bookmark rating-button js-rating-buttons\">\n              <fieldset>\n                <Legend required>Stars</Legend>\n                <label for=\"5-stars\">5</label>\n                <input type=\"radio\" id=\"5-stars\"\n                  name=\"rate\" value=\"5\" required>\n                <label for=\"4-stars\">4</label>\n                <input type=\"radio\" id=\"4-stars\"\n                  name=\"rate\" value=\"4\">\n                <label for=\"3-stars\">3</label>\n                <input type=\"radio\" id=\"3-stars\"\n                  name=\"rate\" value=\"3\">\n                <label for=\"2-stars\">2</label>\n                <input type=\"radio\" id=\"2-stars\"\n                  name=\"rate\" value=\"2\">\n                <label for=\"1-stars\">1\n                <input type=\"radio\" id=\"1-star\"\n                  name=\"rate\" value=\"1\">\n              </fieldset>\n            </div>\n          </div>\n          <div>\n            <button class=\"add-button-submit js-add-button-submit\" type=\"submit\" >Add</button>\n          </div>\n        </form>\n      </li>");
  }

  function handleCreateBookmarkClicked() {
    $('#js-create-bookmark-form').on('submit', function (event) {
      event.preventDefault();
      store.adding = true;
      render();
    });
  }

  function handleCloseBookmarkClicked() {
    $('#js-close-expanded').on('click', '.js-bookmark-list-button', function (event) {
      event.preventDefault();
      var id = getItemIdFromElement(event.currentTarget);
      var item = store.findById(id);
      store.closing = true;

      if (store.closing && item.id === id) {
        render();
        store.closing = false;
      }
    });
  }

  function handleAddBookmarkClicked() {
    $('#js-add-bookmark').on('submit', function (event) {
      event.preventDefault();
      var title = event.currentTarget.title.value;
      var url = event.currentTarget.url.value;
      var desc = event.currentTarget.desc.value;
      var rate = event.currentTarget.rate.value;
      console.log("add bookmark");
      api.createItem(title, url, desc, rate, function (response) {
        store.addItem(response);
        store.adding = false;
        render();
      });
    });
  }

  function handleExpandViewClicked() {
    $('.js-bookmark-list').on('click', '.js-bookmark-list-items', function (event) {
      var id = getItemIdFromElement(event.currentTarget);
      var item = store.findById(id);
      $(event.currentTarget).remove();

      if (item.id === id) {
        var expandView = generateExpandedView(item);
        $('.js-bookmark-list').prepend(expandView);
        store.expanded = true;
      }
    });
  }

  function handleDeleteBookmarkClicked() {
    $('.js-bookmark-list').on('click', '.js-delete-bookmark-button', function (event) {
      var id = $(event.currentTarget.parentElement.parentElement).data('item-id');
      event.preventDefault();
      api.deleteItem(id, function () {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleEditBookmarkSubmit() {
    $('.js-bookmark-list').on('submit', '.edit');
  }

  function handleEditBookmarkClicked() {
    $('.js-bookmark-list').on('click', '.js-edit-bookmark-button', function (event) {
      var id = getItemIdFromElement(event.currentTarget);
      var item = store.findById(id);
      console.log(id);
      $(event.currentTarget).remove();

      if (item.id === id) {
        var expandView = generateExpandedView(item);
        $('.js-bookmark-list').prepend(expandView);
        store.expanded = true;
      }
    });
  }

  function handleFilterByRatingClicked() {
    $('.js-header-select').on('change', function (event) {
      event.preventDefault();
      var val = $(event.currentTarget).val();
      store.filterByRating(val);
      render();
    });
  }

  function getItemIdFromElement(item) {
    return $(item).closest('.js-bookmark-list-items').data('item-id');
  }

  function render() {
    $('.js-bookmark-list').empty();

    if (store.adding) {
      var bookmarkForm = generateCreateBookmarkView();
      $('.js-bookmark-list').prepend(bookmarkForm);
    }

    handleAddBookmarkClicked();
    var items = store.items;
    console.log('render form');
    var bookmarkString = generateBookmarkString(items);
    $('.js-bookmark-list').append(bookmarkString);
  }

  function bindEventListeners() {
    handleExpandViewClicked();
    handleCreateBookmarkClicked();
    handleFilterByRatingClicked();
    handleCloseBookmarkClicked();
    handleAddBookmarkClicked();
    handleDeleteBookmarkClicked();
    handleEditBookmarkClicked(); //handleEditBookmarkSubmit();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners
  };
}();