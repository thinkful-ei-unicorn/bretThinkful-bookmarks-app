'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var findById = function findById(id) {
  return this.bookmarks.find(function (currentItem) {
    return currentItem.id === id;
  });
};

var bookmarks = [];
var adding = false;
var error = null;
var filter = 0;

function toggleExpand(bookmark) {
  bookmark.expanded = !bookmark.expanded;
}

function addItem(item) {
  bookmarks.push(item);
}

var setError = function setError(error) {
  this.error = error;
};

var findAndDelete = function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(function (currentItem) {
    return currentItem.id !== id;
  });
};

var _default = {
  setError: setError,
  addItem: addItem,
  findById: findById,
  bookmarks: bookmarks,
  adding: adding,
  error: error,
  filter: filter,
  toggleExpand: toggleExpand,
  findAndDelete: findAndDelete
};
exports["default"] = _default;