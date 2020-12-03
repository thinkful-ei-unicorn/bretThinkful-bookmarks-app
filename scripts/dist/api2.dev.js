"use strict";

var api = function api() {
  var BASE_URL = 'https://thinkful-list-api.herokuapp.com/bret';

  var getItems = function getItems(callback) {
    $.getJson("".concat(BASE_URL, "/bookmarks"), callback);
  };

  var createItem = function createItem(title, url, desc, rating, callback, onError) {
    var newItem = JSON.stringify({
      id: cuid(),
      title: title,
      url: url,
      desc: desc,
      rating: rating
    });
    $.ajax({
      url: "".concat(BASE_URL, "/bookmarks"),
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: callback,
      error: onError
    });
  };

  var updateItem = function updateItem(id, updateData, callback) {
    $.ajax({
      url: "".concat(BASE_URL, "/bookmarks/").concat(id),
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback
    });
  };
};