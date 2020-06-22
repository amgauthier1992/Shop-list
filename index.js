'use strict';

const STORE = [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}
];


function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item) => generateItemElement(item));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function handleNewItemSubmit() {
  $('#js-shopping-list-form').on('submit', function(event){
    event.preventDefault(); 
    //disables default behavior of form which is to refresh
    //the page.

    const item = $('.js-shopping-list-entry').val()
    console.log(item);
    //grab new item from 'add an item' input

    const store = {
      id: cuid(),
      name: item,
      checked: false
    };

    STORE.push(store)
    //add item to store. STORE is an array of objects. How do we add an item
    //to the end of an array? (.push method)

    renderShoppingList();
    //render
  })
  console.log('`handleNewItemSubmit` ran');
}

// this function will be responsible for when users click the "check" button on
// a shopping list item.
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, function(event) {
    console.log('`handleItemCheckClicked` ran');
    const id = $(event.currentTarget).closest('li').find('.js-shopping-item').toggleClass('shopping-item__checked')
  });
}
//dont need to render if you arent adding or deleting elements

// this function will be responsible for when users want to delete a shopping list
// item. selects the parent element (ul) of class .js-shopping-list. On click, we look
// for an element with the class .js-item-delete (this is the <li> that is generated).
function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, function(event) {
    console.log('`handleDeleteItemClicked` ran');
    //stores cuid of the current list item
    const id = $(event.currentTarget).closest('li').data('item-id')
    //stores index of the current list item in the store array
    const index= STORE.findIndex(id => STORE.id === id);
    //removes the li that is closest to the delete button clicked 
    this.closest('li').remove();
    //remove the item from the store
    STORE.splice(index,1);
  });
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
