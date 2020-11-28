'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _store = _interopRequireDefault(require("./store.js"));

var _api = _interopRequireDefault(require("./api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// html generation functions
function generateView(func) {
  var view = "<h1>My Bookmark App</h1>\n      <form>\n        <input type=\"submit\" name=\"New\" value=\"New\" id=\"js-add-item\"/>\n        <select id=\"filter-select\" aria-label=\"Star Rating\">\n          <option value=\"1\">\u2B50 Star</option>\n          <option value=\"2\">\u2B50\u2B50 Stars</option>\n          <option value=\"3\">\u2B50\u2B50\u2B50 Stars</option>\n          <option value=\"4\">\u2B50\u2B50\u2B50\u2B50 Stars</option>\n          <option value=\"5\">\u2B50\u2B50\u2B50\u2B50\u2B50 Stars</option>\n        </select>\n        <input type=\"button\" name=\"filter-submit\" value=\"Filter\" id= \"filter-submit\">\n      </form>\n        <ul class=\"bookmark-list\">\n        ".concat(func(), "\n        </ul>");
  return view;
}

function handleFilterChange() {
  $('main').on('click', '#filter-submit', function (event) {
    event.preventDefault();
    var filterValue = $('#filter-select').val();
    _store["default"].filter = parseInt(filterValue);
    render();
    console.log(_store["default"].filter);
  });
}

function generateBookmarkString() {
  var items = _store["default"].bookmarks.filter(function (item) {
    return item.rating >= _store["default"].filter;
  });

  items = items.map(function (item) {
    return generateBookmark(item);
  });
  return items.join('');
}

var generateBookmark = function generateBookmark(item) {
  var itemTitle = '';

  if (item.expanded === true) {
    itemTitle = "<li class=\"bookmark-expanded js-bookmark\" item-id=\"".concat(item.id, "\">\n            ").concat(item.title, "<div type=\"button\" id=\"delete-button\" item-id=").concat(item.id, "><i class=\"fas fa-trash\"></i></div> \n        \n        <div class=\"expanded-header\">\n          <input type=\"button\" value=\"visit site\" id=\"visit-button\" onclick=\"location.href = '").concat(item.url, "';\"> \n          <div class=\"expanded-stars\" aria-label=\"").concat(item.rating, " star rating\">").concat(generateUserRating(item.rating), "</div>\n        </div>\n        <p>").concat(item.desc, "</p></li> ");
  } else {
    itemTitle = "<li class=\"bookmark-title js-bookmark\" item-id=\"".concat(item.id, "\">\n      ").concat(item.title, "<div class=\"rating\" >").concat(generateUserRating(item.rating), "</div ></li >");
  }

  return itemTitle;
};

function generateUserRating(rating) {
  var stars = '';

  for (var i = 0; i < 5; i++) {
    if (i < rating) {
      stars += "<i class=\"fas fa-star\"></i>";
    } else {
      stars += "<i class=\"far fa-star\"></i>";
    }
  }

  return stars;
}

function generateAddBookmark() {
  var view = "<h1>My Bookmarks</h1>\n          <form id=\"add-bookmark-form\">\n            <h3>Add New Bookmark </h3>\n              <input name=\"url\" type=\"text\" placeholder=\"http://www.example.com\" id=\"add-bookmark-address\" aria-label=\"Bookmark URL\" required>\n            <div>\n              <input name=\"title\" type=\"text\" placeholder=\"title here\" id=\"add-bookmark-name\" required>\n              <select name=\"rating\" id=\"cars\">\n                <option value=\"1 stars\">\u2B50 star</option>\n                <option value=\"2 stars\">\u2B50\u2B50 stars</option>\n                <option value=\"3 stars\">\u2B50\u2B50\u2B50 stars</option>\n                <option value=\"4 stars\">\u2B50\u2B50\u2B50\u2B50 stars</option>\n                <option value=\"5 stars\">\u2B50\u2B50\u2B50\u2B50\u2B50 stars</option>\n        </select>\n            </div>\n            <input name=\"desc\" type=\"text\" placeholder=\"add a description here (optional)\" id=\"add-bookmark-description\">\n            <input type=\"submit\" id=\"add-item-submit\">\n            <div class=\"error-container\"></div>\n          </form>";
  return view;
}

function generateErrorScreen() {
  var html = "".concat(generateAddBookmark(), "<div id=\"error-message\">").concat(_store["default"].error, "</div>");
  return html;
} // Handle Event Listeners


function handleExpanded() {
  $('main').on('click', '.js-bookmark', function (event) {
    var id = getItemIdFromElement(event.currentTarget);

    var bookmark = _store["default"].findById(id);

    _store["default"].toggleExpand(bookmark);

    render();
  });
}

function handleAddingToggle() {
  $('main').on('click', '#js-add-item', function (event) {
    event.preventDefault();
    _store["default"].adding = true;
    render();
  });
}

function handleNewItemSubmit() {
  $('main').on('submit', '#add-bookmark-form', function (event) {
    event.preventDefault();
    var data = serializeJson(event.target);
    console.log(data);

    _api["default"].createBookmark(data).then(function (newItem) {
      console.log(newItem);

      _store["default"].addItem(newItem);

      _store["default"].adding = false;
      _store["default"].filter = 0;
      render();
    })["catch"](function (error) {
      _store["default"].setError(error.message);

      renderError();
    });
  });
}

function handleDeleteItem() {
  $('main').on('click', '#delete-button', function (event) {
    var id = getItemIdFromElement(event.target);

    _api["default"].deleteBookmark(id).then(function () {
      _store["default"].findAndDelete(id);

      render();
    })["catch"](function (error) {
      _store["default"].setError(error.message);

      renderError();
    });
  });
} // error functions


var generateError = function generateError(message) {
  return "\n      <section class=\"error-content\">\n        <button id=\"cancel-error\">X</button>\n        <p>".concat(error, "</p>\n      </section>\n    ");
};

var renderError = function renderError() {
  if (_store["default"].error) {
    var el = generateError(_store["default"].error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
};

var handleCloseError = function handleCloseError() {
  $('.error-container').on('click', '#cancel-error', function () {
    _store["default"].setError(null);

    renderError();
  });
}; // render


function render() {
  renderError();
  var html = '';

  if (_store["default"].adding === true) {
    html = generateAddBookmark();
  } else if (_store["default"].error != null) {
    html = generateErrorScreen();
  } else {
    html = generateView(generateBookmarkString);
  }

  $('main').html(html);
  _store["default"].filter = 0;
}

var getItemIdFromElement = function getItemIdFromElement(item) {
  return $(item).closest('.js-bookmark').attr('item-id');
};

function serializeJson(form) {
  var formData = new FormData(form);
  ;
  var o = {};
  formData.forEach(function (val, name) {
    return o[name] = val;
  });
  return JSON.stringify(o);
}

var _default = {
  handleNewItemSubmit: handleNewItemSubmit,
  handleAddingToggle: handleAddingToggle,
  render: render,
  handleExpand: handleExpanded,
  handleDeleteItem: handleDeleteItem,
  handleCloseError: handleCloseError,
  handleFilterChange: handleFilterChange
};
exports["default"] = _default;