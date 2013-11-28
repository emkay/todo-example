var domready = require('domready');
var Queue = require('dom-queue');

var Checkbox = function () {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    return checkbox;
};

var Item = function (content) {
    var item = document.createElement('div');
    var itemCheckbox = Checkbox();
    var label = document.createElement('label');
    var text = document.createElement('span');
    text.innerHTML = content;
    label.appendChild(itemCheckbox);
    label.appendChild(text);
    item.appendChild(label);
    return item.innerHTML;
};

domready(function () {
    var parent = document.querySelector('#list');
    var list = new Queue({
        container: 'todo-list',
        parent: parent
    });
 
    var addItemButton = document.querySelector('#add-item-form button');

    addItemButton.addEventListener('click', function (e) {
        var input = document.querySelector('#todo-input');
        var value = input.value;

        list.push(Item(value));
        input.value = '';
    });
});
