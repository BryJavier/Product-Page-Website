if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    document.getElementById('buyer-mode-of-payment').addEventListener('change', ()=>{
        if(document.getElementById('buyer-mode-of-payment').value == 'credit-card'){
            displayCreditForm()
        }else if(document.getElementById('buyer-mode-of-payment').value == 'gcash'){
            displayGCashForm()
        }else{
            var creditCardForm = document.getElementById('form').innerHTML = ''
        }
    })
}

function purchaseClicked() {
    alert('Transaction Success! Thank you for your purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
    location.replace('checkout-page.html')
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].id
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}


function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">X</button>
        </div>
        `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total + ' PHP'

    var notification = document.querySelector('.badge')
    if(cartRows.length == 0){
        notification.textContent = ''
    }else{
        notification.textContent = cartRows.length
    }
}

function logout(){
    location.replace('../index.html')
}



function displayCreditForm(){
    var creditCardForm = document.getElementById('form')

    var creditCardFormInput = `<label for="buyer-credit-card" class="col-form-label"><b>Credit Card Number:</b></label>
                                <input type="text" class="form-control" id="buyer-credit-card">`
    creditCardForm.innerHTML = creditCardFormInput
}

function displayGCashForm(){
    var GCashForm = document.getElementById('form')

    var GCashFormInput = `<label for="buyer-credit-card" class="col-form-label"><b>Mobile Number:</b></label>
                                <input type="text" class="form-control" id="buyer-credit-card">`
    GCashForm.innerHTML = GCashFormInput
}





// var addToCart = document.querySelectorAll('.addToCart');
// var cart = [];
// var notification = document.querySelector('.badge');


// let items = [{
//     item: 'Swiss Watch',
//     tag: 'swiss-watch',
//     price: 2000,
//     quantity: 0,
//     isAdded: false
// },{
//     item: 'Submariner',
//     tag: 'submariner-watch',
//     price: 8000,
//     quantity: 0,
//     isAdded: false
// },{
//     item: 'Rose Gold Watch',
//     tag: 'rosegold-watch',
//     price: 10000,
//     quantity: 0,
//     isAdded: false
// }]

// // Add to cart buttons for men's watches
// function addToCartSwissWatch(){
//     if(items[0].isAdded){
//         var index = cart.indexOf(items[0]);
//         ++cart[index].quantity;
//     }else{
//         ++items[0].quantity;
//         cart.push(items[0]);
//         items[0].isAdded = true;
//     }
//     notification.textContent = cart.length;
// }

// function addToCartSubmarinerWatch(){
//     if(items[1].isAdded){
//         var index = cart.indexOf(items[1]);
//         ++cart[index].quantity;
//     }else{
//         ++items[1].quantity;
//         cart.push(items[1]);
//         items[1].isAdded = true;
//     }
//     notification.textContent = cart.length;
// }

// function addToCartRoseGoldWatch(){
//     if(items[2].isAdded){
//         var index = cart.indexOf(items[2]);
//         ++cart[index].quantity;
//     }else{
//         ++items[2].quantity;
//         cart.push(items[2]);
//         items[2].isAdded = true;
//     }
//     notification.textContent = cart.length;
// }


// var cartTotal = document.querySelector(".cart-total-price");

// function updateCart(){
//     var totalPrice = 0;
//     var cartTable = document.querySelector('.cart-table');
//     cartTable.innerHTML = `<tr>
//                             <th>ITEM</th>
//                             <th>PRICE</th>
//                             <th>QUANTITY</th>
//                             </tr>`;

//     for(let i = 0; i < cart.length; ++i){
         

//         cartTable.innerHTML += `
//                 <tr>
//                      <td style="margin-top:5px; width: 40px;">${cart[i].item}</td>
//                      <td style="margin-top:5px; width: 40px;">${cart[i].price}</td>
//                      <td style="margin-top:5px; width: 40px;">
//                      <span>
//                      <button id="minus" style="margin-right: 10px; padding:2px;"><i class="fas fa-minus" style="font-size: 10px;"></i></button>
//                      ${cart[i].quantity}
//                      <button id="plus" style="margin-left: 10px; padding:2px;"><i class="fas fa-plus" style="font-size: 14px;"> </i></button>
//                      </span>
//                      </td>
                     
//                  </tr>
//                  `
//         totalPrice += cart[i].price * cart[i].quantity;  
        
//         var quantityAdd = document.querySelectorAll('#plus');
        
//         quantityAdd[i].addEventListener('click', ()=>{
//             ++cart[i].quantity;
//             updateCart();
//         });
        
//         var quantityMinus = document.querySelectorAll('#minus');   
//         quantityMinus[i].addEventListener('click', ()=>{
//             cart[i].quantity = cart[i].quantity - 1;
//             updateCart();
//         });     
//     }
//     cartTotal.textContent = Number(totalPrice);

// }





