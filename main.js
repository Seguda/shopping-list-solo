'use strict';

const STORE = {
    items: [
        { name: "apples" },
        { name: "oranges" },
        { name: "milk" },
        { name: "bread" }],
    hidecompleted: false,
};



function generateItemElement(item, itemIndex, template) {
    return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">

        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">Switch</span>
        </button>

        // <button class="shopping-item-delete js-item-delete">
        //     <span class="button-label">delete</span>
        // </button>
      </div>
    </li>`,

        function generateShoppingItemsString(shoppingList) {
            console.log("Generating shopping list element");

            const items = shoppingList.map((item, index) => generateItemElement(item, index));

            return items.join("");
        }

    function renderShoppingList() {
        console.log('`renderShoppingList` ran');
        const shoppingListItemsString = generateShoppingItemsString(STORE);
        $('.js-shopping-list').html(shoppingListItemsString);
    }

    function searchItemFromShoppingList(itemName) {
        console.log(`Searching "${itemName}" from shopping list`);
        STORE.push({ name: itemName, hidecompleted: false });
    }

    function handleNewItemSubmit() {
        $('#js-shopping-list-form').submit(function (event) {
            event.preventDefault();
            console.log('`handleNewItemSubmit` ran');
            const newItemName = $('.js-shopping-list-entry').val();
            $('.js-shopping-list-entry').val('');
            addItemToShoppingList(newItemName);
            renderShoppingList();
        });
    }
    function toggleCheckedForListItem(itemIndex) {
        console.log("Toggling checked property for item at index " + itemIndex);
        STORE[itemIndex].checked = !STORE[itemIndex].checked;
    }


    function getItemIndexFromElement(item) {
        const itemIndexString = $(item)
            .closest('.js-item-index-element')
            .attr('data-item-index');
        return parseInt(itemIndexString, 10);


        // function handleItemCheckClicked() {
        //   $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
        //     console.log('`handleItemCheckClicked` ran');
        //     const itemIndex = getItemIndexFromElement(event.currentTarget);
        //     toggleCheckedForListItem(itemIndex);
        //     renderShoppingList();
        //   });
        // }


        // function deleteListItem(itemIndex) {
        //   console.log(`Deleting item at index  ${itemIndex} from shopping list`);
        //   STORE.splice(itemIndex, 1);
        // }


        // function handleDeleteItemClicked() {

        //   $('.js-shopping-list').on('click', '.js-item-delete', event => {

        //     const itemIndex = getItemIndexFromElement(event.currentTarget);

        //     deleteListItem(itemIndex);

        //     renderShoppingList();
        //   });
        // }

        function handleShoppingList() {
            renderShoppingList();
            handleNewItemSubmit();
            handleItemCheckClicked();
            handleDeleteItemClicked();
        }

        $(handleShoppingList);
    }
    // $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    //     console.log('`handleItemCheckClicked` ran');
    //     const itemIndex = getItemIndexFromElement(event.currentTarget);
    //     toggleCheckedForListItem(itemIndex);
    //     renderShoppingList();
    //  checkbox
    // $(document).ready(function () {
    //     $('.js-shopping-list').click(function () {
    //         var checkBoxes = $("input[name=recipients\\[\\]]");
    //         checkBoxes.prop("checked", !checkBoxes.prop("checked"));
    //     });
    // });


    // search box
    // var txt = $('#search-criteria').val();
    // $('.contact-name').each(function () {
    //     if ($(this).text().toUpperCase().indexOf(txt.toUpperCase()) != -1) {
    //         $(this).show();
    //     }
}