'use strict';

var store = function () {
  var addBookmarkItem = function addBookmarkItem(item) {
    this.items.push(item);
  };

  var findItemById = function findItemById(id) {
    return this.items.find(function (item) {
      return item.id === id;
    });
  };

  var findAndDelete = function findAndDelete(id) {
    this.items = this.items.filter(function (item) {
      return item.id !== id;
    });
  };

  function filterByRating(val) {
    this.items = this.items.filter(function (item) {
      return item.rating >= val;
    });
  }

  var setItemEditing = function setItemEditing(id, isEditing) {
    var item = this.findById(id);
    item.isEditing = !item.isEditing;
  };

  return {
    items: [],
    adding: false,
    error: null,
    addItem: addBookmarkItem,
    findById: findItemById,
    findAndDelete: findAndDelete,
    filterByRating: filterByRating,
    setItemEditing: setItemEditing
  };
}();