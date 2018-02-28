'use strict';
(function($){
  var app = {
      init: function(){
       // app.generateItemElement();
       // app.generateShoppingItemsString();
        app.renderShoppingList();
        app.addItemToShoppingList();
        app.searchItemFromShoppingList();
        app.editItemFromShoppingList();
        app.handleNewItemSubmit();
       // app.toggleCheckedForListItem();
        app.getItemIndexFromElement();
        app.handleSwitchClicked();
        app.handleCheckClicked();
        app.deleteListItem();
        app.handleDeleteItemClicked();
        },
        STORE: {
        items: [
          { name: 'apples', checked: false },
          { name: 'oranges', checked: false },
          { name: 'milk', checked: false },
          { name: 'bread', checked: false } ],
        hidecompleted: false
        },
        addItemToShoppingList: function(itemName) {
          console.log(`Adding "${itemName}" to shopping list`);
          app.STORE.items.push({ name: itemName, checked: false });
          app.renderShoppingList();
        },
        deleteListItem: function(item, itemIndex) {
          console.log(`Deleting item at index  ${itemIndex} from shopping list`);
          const shopItem = $(item).closest('li');
          shopItem.remove();
          app.STORE.items.splice(itemIndex, 1);
        },
        editItemFromShoppingList: function(itemName) {
          console.log(`Editing "${itemName}" from shopping list`);
        },
        generateItemElement: function( item, itemIndex, template) {
          return `
            <li class="js-item-index-element" data-item-index="${itemIndex}">
              <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
              <div class="shopping-item-controls">
        
                 <button class="shopping-item-toggle js-item-toggle">
                    <span class="button-label">check</span>
                </button>
        
                <button class="shopping-item-delete js-item-delete">
                    <span class="button-label">delete</span>
                </button>
        
              </div>
            </li>`;
        },
        generateShoppingItemsString: function( shoppingList ) {
          console.log('Generating shopping list element');
          let items = [];
          shoppingList.forEach(function (item, index) {
            if (!app.STORE.items.hidecompleted || (app.STORE.items.hidecompleted && !item.checked)) {
              items.push(app.generateItemElement(item, index));
            }
          });
          items = shoppingList.map((item, index) => {
            return !item.checked ? app.generateItemElement(item, index): ''
            console.log('aaaaa', index, item);
          });
          return items.join('');
        },
        getItemIndexFromElement: function(item) {
          const itemIndexString = $(item)
            .closest('.js-item-index-element')
            .attr('data-item-index');
          return parseInt(itemIndexString, 10);
        },
        handleCheckClicked: function() {
          $('.js-shopping-list').on('click', '.js-item-toggle', event => {
            console.log('`handleCheckClicked` ran');
            const itemIndex = app.getItemIndexFromElement(event.currentTarget);
            app.toggleCheckedForListItem(event.currentTarget ,itemIndex);
          });
        },
        handleDeleteItemClicked: function () {
          // like in `handleItemCheckClicked`, we use event delegation
            $('.js-shopping-list').on('click', '.js-item-delete', event => {
              // get the index of the item in STORE
              const itemIndex = app.getItemIndexFromElement(event.currentTarget);
              // delete the item
              app.deleteListItem(event.currentTarget, itemIndex);
              // render the updated shopping list
              app.renderShoppingList();
            });
          },
        handleNewItemSubmit: function() {
            $('#js-shopping-list-form').submit(function (event) {
              event.preventDefault();
              console.log('`handleNewItemSubmit` ran');
              const newItemName = $('.js-shopping-list-entry').val();
              $('.js-shopping-list-entry').val('');
              app.addItemToShoppingList(newItemName);
              app.renderShoppingList();
            });
          },
        handleSwitchClicked: function() {
            $('.switchInput').on('click', event => {
              console.log('`handleSwitchClicked` ran');
              app.STORE.items.hidecompleted = $('.switchInput').prop('checked');
              app.renderShoppingList();
            });
          },
        renderShoppingList: function() {
            console.log("`renderShoppingList` ran");
            const shoppingListItemsString = app.generateShoppingItemsString(app.STORE.items);
            $('.js-shopping-list').html(shoppingListItemsString);
          },
        searchItemFromShoppingList: function(itemName) {
            console.log(`Searching "${itemName}" from shopping list`);
          },
        toggleCheckedForListItem: function(item, itemIndex) {
            console.log("Toggling checked property for item at index " + itemIndex);
            const shopItem = $(item).closest('li').find('.shopping-item');
            shopItem.toggleClass('shopping-item__checked');
            app.STORE.items[itemIndex].checked = !app.STORE.items[itemIndex].checked;
          }
  };
  $(document).ready(function(){
    app.init();
  });
})(window.jQuery);

// const STORE = {
//   items: [
//     { name: 'apples', checked: false },
//     { name: 'oranges', checked: false },
//     { name: 'milk', checked: false },
//     { name: 'bread', checked: false } ],
//   hidecompleted: false
// };


// function generateItemElement( item, itemIndex, template) {
//   return `
//     <li class="js-item-index-element" data-item-index="${itemIndex}">
//       <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
//       <div class="shopping-item-controls">

//          <button class="shopping-item-toggle js-item-toggle">
//             <span class="button-label">check</span>
//         </button>

//         <button class="shopping-item-delete js-item-delete">
//             <span class="button-label">delete</span>
//         </button>

//       </div>
//     </li>`;
// }
// function generateShoppingItemsString( shoppingList ) {
//   console.log('Generating shopping list element');
//   let items = [];
//   shoppingList.forEach(function (item, index) {
//     if (!STORE.items.hidecompleted || (STORE.items.hidecompleted && !item.checked)) {
//       items.push(generateItemElement(item, index));
//     }
//   });
//   //const items = shoppingList.map((item, index) => !item.checked ? generateItemElement(item, index): '');
//   return items.join('');
// }

// function renderShoppingList() {
//   console.log("`renderShoppingList` ran");
//   const shoppingListItemsString = generateShoppingItemsString(STORE.items);
//   $('.js-shopping-list').html(shoppingListItemsString);
// }

// function addItemToShoppingList(itemName) {
//   console.log(`Adding "${itemName}" to shopping list`);
//   STORE.push({ name: itemName, checked: false });
//   renderShoppingList();
// }

// function searchItemFromShoppingList(itemName) {
//   console.log(`Searching "${itemName}" from shopping list`);
// }

// function editItemFromShoppingList(itemName) {
//   console.log(`Editing "${itemName}" from shopping list`);
// }

// function handleNewItemSubmit() {
//   $('#js-shopping-list-form').submit(function (event) {
//     event.preventDefault();
//     console.log('`handleNewItemSubmit` ran');
//     const newItemName = $('.js-shopping-list-entry').val();
//     $('.js-shopping-list-entry').val('');
//     addItemToShoppingList(newItemName);
//     renderShoppingList();
//   });
// }
// function toggleCheckedForListItem(item, itemIndex) {
//   console.log("Toggling checked property for item at index " + itemIndex);
//   const shopItem = $(item).closest('li').find('.shopping-item');
//   shopItem.toggleClass('shopping-item__checked');
//   STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
// }


// function getItemIndexFromElement(item) {
//   const itemIndexString = $(item)
//     .closest('.js-item-index-element')
//     .attr('data-item-index');
//   return parseInt(itemIndexString, 10);
// }
// function handleSwitchClicked() {
//   $('.switchInput').on('click', event => {
//     console.log('`handleSwitchClicked` ran');
//     STORE.items.hidecompleted = $('.switchInput').prop('checked');
//     renderShoppingList();
//   });
// }

// function handleCheckClicked() {
//   $('.js-shopping-list').on('click', '.js-item-toggle', event => {
//     console.log('`handleCheckClicked` ran');
//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     toggleCheckedForListItem(event.currentTarget ,itemIndex);
//     renderShoppingList();
//   });
// }

        
// function deleteListItem(item, itemIndex) {
//   console.log(`Deleting item at index  ${itemIndex} from shopping list`);
//   const shopItem = $(item).closest('li');
//   shopItem.remove();
//   STORE.items.splice(itemIndex, 1);
// }


// function handleDeleteItemClicked() {
// // like in `handleItemCheckClicked`, we use event delegation
//   $('.js-shopping-list').on('click', '.js-item-delete', event => {
//     // get the index of the item in STORE
//     const itemIndex = getItemIndexFromElement(event.currentTarget);
//     // delete the item
//     deleteListItem(event.currentTarget, itemIndex);
//     // render the updated shopping list
//     renderShoppingList();
//   });
// }


// function handleShoppingList() {
//   renderShoppingList();
//   handleNewItemSubmit();
//   handleDeleteItemClicked();
//   handleCheckClicked();
// }

// handleSwitchClicked();


// $(handleShoppingList);