    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    /* ===== SAVE ===== */
    function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    }

    /* ===== ADD ===== */
    function addToCart(id, title, price) {
    const item = cart.find(i => i.id === id);

    if (item) {
        item.qty++;
    } else {let cart = JSON.parse(localStorage.getItem("cart")) || [];

        /* ===== SAVE ===== */
        function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        }
        
        /* ===== ADD ===== */
        function addToCart(id, title, price) {
        const item = cart.find(i => i.id === id);
        
        if (item) {
            item.qty++;
        } else {
            cart.push({ id, title, price, qty: 1 });
        }
        
        saveCart();
        renderCart();
        }
        
        /* ===== REMOVE ===== */
        function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
        }
        
        /* ===== RENDER ===== */
        function renderCart() {
        const itemsEl = document.getElementById("cartItems");
        const countEl = document.getElementById("cartCount");
        const totalEl = document.getElementById("cartTotal");
        
        itemsEl.innerHTML = "";
        
        let total = 0;
        let count = 0;
        
        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;
        
            itemsEl.innerHTML += `
            <div class="cart-item">
                <div>
                <strong>${item.title}</strong><br>
                <small>${item.qty} x Rp ${item.price.toLocaleString()}</small>
                </div>
                <button class="cart-remove" data-id="${item.id}">✕</button>
            </div>
            `;
        });
        
        countEl.textContent = count;
        totalEl.textContent = "Rp " + total.toLocaleString();
        }
        
        /* ===== EVENTS ===== */
        document.addEventListener("click", e => {
        if (e.target.classList.contains("add-cart")) {
            addToCart(
            e.target.dataset.id,
            e.target.dataset.title,
            parseInt(e.target.dataset.price)
            );
        }
        
        if (e.target.classList.contains("cart-remove")) {
            removeFromCart(e.target.dataset.id);
        }
        
        if (e.target.id === "openCart") {
            document.getElementById("cartModal").classList.add("active");
        }
        
        if (
            e.target.classList.contains("cart-overlay") ||
            e.target.classList.contains("cart-close")
        ) {
            document.getElementById("cartModal").classList.remove("active");
        }
        });
        
        /* ===== INIT ===== */
        document.addEventListener("DOMContentLoaded", renderCart);
        
        cart.push({ id, title, price, qty: 1 });
    }

    saveCart();
    renderCart();
    }

    /* ===== REMOVE ===== */
    function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    }

    /* ===== RENDER ===== */
    function renderCart() {
    const itemsEl = document.getElementById("cartItems");
    const countEl = document.getElementById("cartCount");
    const totalEl = document.getElementById("cartTotal");

    if (!itemsEl) return;

    itemsEl.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;

        itemsEl.innerHTML += `
        <div class="cart-item">
            <div>
            <h4>${item.title}</h4>
            <small>${item.qty} x Rp ${item.price.toLocaleString()}</small>
            </div>
            <button class="cart-remove" data-id="${item.id}">✕</button>
        </div>
        `;
    });

    countEl.textContent = count;
    totalEl.textContent = "Rp " + total.toLocaleString();
    }

    /* ===== EVENTS ===== */
    document.addEventListener("click", e => {
    /* add cart */
    const addBtn = e.target.closest(".add-cart");
    if (addBtn) {
        addToCart(
        addBtn.dataset.id,
        addBtn.dataset.title,
        parseInt(addBtn.dataset.price)
        );
        return;
    }

    /* remove */
    if (e.target.classList.contains("cart-remove")) {
        removeFromCart(e.target.dataset.id);
    }

    /* open */
    if (e.target.id === "openCart") {
        document.getElementById("cartModal").classList.add("active");
    }

    /* close */
    if (
        e.target.classList.contains("cart-overlay") ||
        e.target.classList.contains("cart-close")
    ) {
        document.getElementById("cartModal").classList.remove("active");
    }
    });

    /* ===== INIT ===== */
    document.addEventListener("DOMContentLoaded", renderCart);
