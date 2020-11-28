'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _store = _interopRequireDefault(require("./store.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = 'https://thinkful-list-api.herokuapp.com/bret/bookmarks';
/**
 * @param {string} url 
 * @param {object} options 
 * @returns {Promise} 
 */

var listApiFetch = function listApiFetch() {
  return fetch.apply(void 0, arguments).then(function (res) {
    if (!res.ok) {
      _store["default"].error = {
        code: res.status
      };

      if (!res.headers.get('content-type').includes('json')) {
        _store["default"].error.message = res.statusText;
        return Promise.reject(_store["default"].error);
      }
    }

    return res.json();
  }).then(function (data) {
    if (_store["default"].error) {
      _store["default"].error.message = data.message;
      return Promise.reject(_store["default"].error);
    }

    return data;
  });
};

function getBookmarks() {
  return listApiFetch("".concat(BASE_URL));
}

function createBookmark(arg) {
  console.log(arg);
  var newItem = arg;
  return listApiFetch("".concat(BASE_URL), {
    "method": "POST",
    body: newItem,
    headers: {
      'content-type': 'application/json'
    }
  });
}

function deleteBookmark(id) {
  return listApiFetch(BASE_URL + '/' + id, {
    method: 'DELETE'
  });
}

;
var _default = {
  getBookmarks: getBookmarks,
  createBookmark: createBookmark,
  deleteBookmark: deleteBookmark
};
exports["default"] = _default;