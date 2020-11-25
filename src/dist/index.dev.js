'use strict';

var _bookmark = _interopRequireDefault(require("./bookmark.js"));

var _api = _interopRequireDefault(require("./api.js"));

var _store = _interopRequireDefault(require("./store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function main() {
  _api["default"].getBookmarks().then(function (items) {
    items.forEach(function (item) {
      return _store["default"].addItem(item);
    });

    _bookmark["default"].render();
  });

  _bookmark["default"].handleNewItemSubmit();

  _bookmark["default"].handleAddingToggle();

  _bookmark["default"].render();

  _bookmark["default"].handleExpand();

  _bookmark["default"].handleDeleteItem();

  _bookmark["default"].handleFilterChange();
}

main();