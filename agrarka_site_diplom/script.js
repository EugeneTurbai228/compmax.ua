// copy menu for mobile
function copyMenu() {
    //copy inside .dpt-cat to .departments
    var dptCategory = document.querySelector('.dpt-cat')
    var dptPlace = document.querySelector('.departments')
    dptPlace.innerHTML = dptCategory.innerHTML;

//copy inside nav to nav
var mainNav = document.querySelector('.header-nav nav')
var navPlace = document.querySelector('.off-canvas nav')
navPlace.innerHTML = mainNav.innerHTML;

// copy .header-top .wrapper to .thetop-nav
var topNav = document.querySelector('.header-top .wrapper')
var topPlace = document.querySelector('.off-canvas .thetop-nav')
topPlace.innerHTML = topNav.innerHTML;
}
copyMenu();


//
const menuButton = document.querySelector('.trigger'),
closeButton = document.querySelector('.t-close'),
addclass = document.querySelector('.site');
menuButton.addEventListener('click', function(){
    addclass.classList.toggle('showmenu')
})
closeButton.addEventListener('click', function() {
addclass.classList.remove('showmenu')
})

//show sub menu on mobile
const submenu = document.querySelectorAll('.has-child .icon-small');
submenu.forEach((menu) => menu.addEventListener('click', toggle));

function toggle(e) {
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null);
    if (this.closest('.has-child').classList != 'expand');
    this.closest('.has-child').classList.toggle('expand');
}

//slider
const swiper = new Swiper('.swiper', {
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
  });


  //show search
  const searchButton = document.querySelector('.t-search'),
     tClose = document.querySelector('.search-close'),
     showClass = document.querySelector('.site');
searchButton.addEventListener('click', function() {
    showClass.classList.toggle('showsearch')
})
tClose.addEventListener('click', function() {
    showClass.classList.remove('showsearch')
})


/* show dpt menu */
const dptButton = document.querySelector('.dpt-cat .dpt-trigger'),
      dptClass = document.querySelector('.site');
dptButton.addEventListener('click', function() {
      dptClass.classList.toggle('showdpt')
})

//product image slider
var productThumb = new Swiper ('.small-image', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        481: {
            spaceBetween: 32,
        }
    }
});
var productBig = new Swiper ('.big-image', {
    loop: true,
    autoHeight: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: productThumb,
    }
})

//stock product bar
var stocks = document.querySelectorAll('.products .stock');
for (let x = 0; x < stocks.length; x++) {
    let stock = stocks[x].dataset.stock,
    available = stocks[x].querySelector('.qty-available').innerHTML,
    sold = stocks[x].querySelector('.qty-sold').innerHTML,
    percent = sold*100/stock;

    stocks[x].querySelector('.available').style.width = percent + '%';
}

//show cart on click
const divtoShow = '.mini-cart';
const divPopup = document.querySelector(divtoShow);
const divTrigger = document.querySelector('.cart-trigger');

divTrigger.addEventListener('click', () => {
    setTimeout(() => {
        if(!divPopup.classList.contains('show')) {
            divPopup.classList.add('show');
        }
    }, 250 )
})



/* //close by click outside
document.addEventListener('click', (e) => {
    const isClosest = e.target.closest(divtoShow);
    if(!isClosest && divPopup.classList.contains('show')){
        divPopup.classList.remove('show')
    }
}) */






//cart

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};


//cart working
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else {
  ready();
}

//making function
function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons)
    for (var i = 0; i < removeCartButtons.length; i++){

    var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem );
    
    }

    //quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //add to cart
var addCart = document.getElementsByClassName('add-cart')
for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
   }
}






//remove items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}


//quantity Changed

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
} 



//add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    console.log(title);
}



//update total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("₴", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);


        total = Math.round(total * 100) / 100;


        document.getElementsByClassName('total-price')[0].innerText = "₴" + total;
    }
}