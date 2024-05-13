let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

setInterval(autoSlide, 5000);
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");

    const targetElement = document.querySelector(targetId);

    targetElement.scrollIntoView({
      behavior: "smooth",
    });
  });
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

var items = [];

function addToCart(button) {
  var productCard = button.parentElement.parentElement;
  var productName = productCard.querySelector("h3").innerText;
  var productPrice = parseFloat(
    productCard.querySelector("p").innerText.replace("$", "")
  );
  var productImage = productCard.querySelector("img").getAttribute("src");

  addItem(productName, productPrice, productImage);
  updateCartDisplay();

  var quantityElement = productCard.querySelector(".quantity");
  quantityElement.innerText = parseInt(quantityElement.innerText) + 1;

  var cartMessage = document.getElementById("cartMessage");
  cartMessage.innerText = "Товар добавлен в корзину";
  cartMessage.style.display = "block";

  setTimeout(function () {
    cartMessage.style.display = "none";
  }, 1000);
}

function removeFromCart(button) {
  var productCard = button.parentElement.parentElement;
  var productName = productCard.querySelector("h3").innerText;

  removeItemByName(productName);
  updateCartDisplay();

  var quantityElement = productCard.querySelector(".quantity");
  var quantity = parseInt(quantityElement.innerText);
  if (quantity > 0) {
    quantityElement.innerText = quantity - 1;
  }
}

function addItem(name, price, image) {
  var existingItem = items.find(function (item) {
    return item.name === name;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({ name: name, price: price, image: image, quantity: 1 });
  }

  saveItems();
}

function removeItemByName(name) {
  var indexToRemove = -1;
  items.forEach(function (item, index) {
    if (item.name === name) {
      item.quantity -= item.quantity > 0 ? 1 : 0;
      if (item.quantity === 0) {
        indexToRemove = index;
      }
    }
  });
  if (indexToRemove !== -1) {
    items.splice(indexToRemove, 1);
  }

  saveItems();
}

function openCart() {
  var modal = document.getElementById("cart-modal");
  modal.style.display = "block";
  updateCartDisplay();
}

function closeCart() {
  var modal = document.getElementById("cart-modal");
  modal.style.display = "none";
}

function updateCartDisplay() {
  var cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  items.forEach(function (item, index) {
    if (item.quantity > 0) {
      var listItem = document.createElement("li");
      listItem.classList.add("cart-item");

      var itemImage = document.createElement("img");
      itemImage.src = item.image;

      var itemInfo = document.createElement("span");
      itemInfo.innerText =
        item.name +
        " - $" +
        (item.price * item.quantity).toFixed(2) +
        " (" +
        item.quantity +
        " шт.)";

      var removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.innerText = "Удалить";
      removeButton.addEventListener("click", function () {
        removeItemByName(item.name);
        updateCartDisplay();
      });

      listItem.appendChild(itemImage);
      listItem.appendChild(itemInfo);
      listItem.appendChild(removeButton);

      cartItems.appendChild(listItem);
    }
  });
}

function saveItems() {
  var cartData = JSON.stringify(items);
  localStorage.setItem("cartItems", cartData);
}

function loadItems() {
  var cartData = localStorage.getItem("cartItems");
  if (cartData) {
    items = JSON.parse(cartData);
    updateCartDisplay();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadItems();
});

function openPaymentModal() {
  var paymentModal = document.getElementById("payment-modal");
  paymentModal.style.display = "block";

  var paymentItems = document.getElementById("payment-items");
  paymentItems.innerHTML = "";

  items.forEach(function (item, index) {
    if (item.quantity > 0) {
      var paymentItem = document.createElement("div");
      paymentItem.className = "payment-item";

      var itemImage = document.createElement("img");
      itemImage.src = item.image;

      var itemName = document.createElement("span");
      itemName.innerText = item.name;

      var itemQuantity = document.createElement("span");
      itemQuantity.innerText = " x " + item.quantity;

      paymentItem.appendChild(itemImage);
      paymentItem.appendChild(itemName);
      paymentItem.appendChild(itemQuantity);

      paymentItems.appendChild(paymentItem);
    }
  });
}

function closePaymentModal() {
  var paymentModal = document.getElementById("payment-modal");
  paymentModal.style.display = "none";
}

function processPayment() {
  var nameInput = document.getElementById("name-input");
  var addressInput = document.getElementById("address-input");

  var name = nameInput.value;
  var address = addressInput.value;

  if (name.trim() === "" || address.trim() === "") {
    alert("Please enter your name and address.");
    return;
  }

  alert("Payment processed successfully. Thank you!");

  items = [];
  saveItems();
  closePaymentModal();
  updateCartDisplay();
}
function openNewWindow(url) {
  window.open(url, '_blank');
}