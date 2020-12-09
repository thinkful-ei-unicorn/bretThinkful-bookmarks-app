'use strict';
const store =(function(){
  const addBookmarkItem = function(item) {
    this.items.push(item);
    this.allitems.push( item );
  };
  const findItemById = function(id) {
    return this.allitems.find(item => item.id === id);
  };
  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.allitems = this.allitems.filter(item => item.id !== id);
  };
  function filterByRating(val) {
    this.items = this.allitems.filter(item => {
      return item.rating >= val;
    });
  }
  const setItemEditing = function (id, isEditing) {
    const item = this.findById(id);
    item.isEditing = !item.isEditing;
  };
  return {
    items: [],
    allitems : [],
    adding: false,
    error: null,
    addItem: addBookmarkItem,
    findById: findItemById,
    findAndDelete, 
    filterByRating,
    setItemEditing
  };
})();