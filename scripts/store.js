'use strict';

const store =(function(){

  const addBookmarkItem = function(item) {
    this.items.push(item);
  };
    
  
  const findItemById = function(id) {
    return this.items.find(item => item.id === id);
  };
    

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };
    
    
  function filterByRating(val) {
    this.items = this.items.filter(item => {
      return item.rating >= val;
    });
  }

  

  const setItemEditing = function (id, isEditing) {
    const item = this.findById(id);
    item.isEditing = !item.isEditing;
  };


  return {
    items: [],
    adding: false,
    error: null,
    
    addItem: addBookmarkItem,
    findById: findItemById,
    findAndDelete, 
    filterByRating,
    setItemEditing
  };
})();