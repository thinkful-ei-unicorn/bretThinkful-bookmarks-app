'use strict';

$(function() {
  bookmarkList.bindEventListeners();
  bookmarkList.render();

  api.getItems(items => {
    items.forEach(item => {
      store.addItem(item);
    });
    bookmarkList.render();
  });
});