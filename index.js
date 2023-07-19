import { menuArray  } from "./data.js";

let paymentDiv = document.getElementById('payment-form-div')
let preCheckOut = document.getElementById('order')
let form = document.getElementById('payment-form')

let orderArray = []

document.addEventListener('click', function(e){
    if(e.target.dataset.buy){
        handleBuyClick(e.target.dataset.buy)
    }
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    if(e.target.dataset.complete){
        handleCompleteOrderClick(e.target.dataset.complete)
    }
    if(e.target.dataset.close) {
        handleCloseClick(e.target.dataset.close)
    }
    if(e.target.dataset.return) {
        handleReturnClick(e.target.dataset.return)
    }
})

form.addEventListener('submit', function(e){
    e.preventDefault()

    const paymentFormData = new FormData(form)
    const fullName = paymentFormData.get('name')

    paymentDiv.innerHTML = `
        <img src="images/dribbble-gif.gif" class="process-pay">` 

    setTimeout(function(){
        paymentDiv.innerHTML = `
        <div class="final-confirmation-div">
            <p class="thank-you-msg">Thank you <span class="full-name">${fullName}</span>, 
            <br>your order is on the way!</p>
            <img src="images/french-flag.gif" class="french-flag">
            <button class="return-btn" data-return="homepage">Return</button>
        </div>`
    }, 2000)
})


function handleCloseClick(){
    paymentDiv.classList.add('hidden')
}


function handleCompleteOrderClick(e) {
    paymentDiv.classList.remove('hidden')
}

function handleBuyClick(menuId) {
    const targetMenuObj = menuArray.filter(function(food){
    return food.id === parseInt(menuId)
    })[0]
    orderArray.push(targetMenuObj)
    render()
}

function handleRemoveClick(orderId){
    const targetRemoveObj = orderArray.filter(function(item){
    return item.id === parseInt(orderId)
    })[0]
    orderArray.splice(targetRemoveObj, 1)
    render()
}

function handleReturnClick(){
    window.location.reload()
}

function getOrderItemHtml(order){

    return `
        <div class="order-window">
                <div class="order-layout">
                    <div class="checkout-order-name-div">
                        <p class="checkout-order-name">${order.name}</p>
                    </div>
                  <p class="checkout-order-price">${order.price}€</p>
                  <div class="remove-btn-div">
                    <button class="remove-btn" data-remove="${order.id}">Remove</button>
                  </div>
        </div>`
}

function getCheckOutHtml(){
    
    let totalPrice = 0
    let orderHtml = ``

    orderArray.forEach(function(order){
        totalPrice += order.price;
        orderHtml += getOrderItemHtml(order)
    })

    return `
        <div class="liner"></div>
        <p class="your-order-title">Your order</p>
        <p>${orderHtml}</p>
        <div class="liner second"></div>
        <p class="total-price">Total: ${totalPrice}€</p>
        <button id="complete-btn" class="complete-btn" data-complete="go-to-pay">Complete order</button>
    `

}


function getMenu() {

    let menuHtml = `` 

    menuArray.forEach(function(food){
        
        menuHtml += `
        <div class="menu">
            <div class="inner-menu">
                <img class="food-icon" src="${food.icon}">
                    <div class="purchase">
                        <div>
                            <p class="name">${food.name}</p>
                            <p class="description">${food.description}</p>
                        </div>
                        <div class="buy-info" data-buy="${food.id}">
                            <i class="fa-light fa-plus fa-xl"></i>
                            ${food.price}€
                        </div>
                    </div>
            </div>
        </div>
        `
    })
    return menuHtml
}

function render() {
    document.getElementById('menufeed').innerHTML = getMenu()

    if (orderArray.length > 0) {
        preCheckOut.innerHTML = getCheckOutHtml()
        preCheckOut.classList.remove('hidden')
    } else if (orderArray.length < 1) {
        preCheckOut.classList.add('hidden')
    }
}

render()    