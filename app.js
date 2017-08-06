var state = {
  items: [],
};

var addItem = function(state, item) {
  pushItem = {
    name: item,
    checked: false,
  };
  state.items.push(pushItem);
};

var toggleChecked = function(state, itemindex){
  thisItem = state.items[itemindex];
  thisItem.checked = !thisItem.checked;
};

var deleteItem = function(state, itemindex) {
  state.items.splice(itemindex, 1);
};

var renderList = function(state, element){
  var itemsHTML = state.items.map(function(item){
    var li = $('<li><span class="shopping-item">' + item.name +
      '</span><div class="shopping-item-controls"><button class="shopping-item-toggle">'+
      '<span class="button-label">check</span>'+
      '</button><button class="shopping-item-delete">'+
      '<span class="button-label">delete</span></button></div></li>');
    if(item.checked){
      li.addClass('shopping-item__checked');
    }
    return li;
  });
  element.html(itemsHTML);
};

function handleToggles()  {
$('.shopping-list').on('click','.shopping-item-toggle',function(event){toggleItem($(this));});
}

function handleDelets() {
$('.shopping-list').on('click','.shopping-item-delete',function(event){deleteCurrent($(this));});
}

function handleAdds(){
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    addItem(state,$('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
    $('#shopping-list-entry').val('');
  });
}

function toggleItem(button){
  var item = button.closest("li").index();
  toggleChecked(state, item);
  renderList(state, $('.shopping-list'));
}

function deleteCurrent(button){
  var item = button.closest("li").index();
  deleteItem(state, item);
  renderList(state, $('.shopping-list'));
}

$(function(){
  handleDelets();
  handleToggles();
  handleAdds();
});
