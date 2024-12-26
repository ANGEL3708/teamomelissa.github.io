// app.js

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const addProductSection = document.getElementById("add-product");
    const addProductBtn = document.getElementById("add-product-btn");
    const addProductForm = document.getElementById("add-product-form");
    const cancelBtn = document.getElementById("cancel-btn");

    let products = [];

    // Function to render products
    function renderProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td><button class="delete-btn" data-index="${index}">Eliminar</button></td>
            `;
            productList.appendChild(row);
        });

        // Add delete functionality
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", deleteProduct);
        });
    }

    // Function to add a product
    function addProduct(event) {
        event.preventDefault();

        const name = document.getElementById("product-name").value;
        const quantity = parseInt(document.getElementById("product-quantity").value);
        const price = parseFloat(document.getElementById("product-price").value);

        products.push({ name, quantity, price });
        renderProducts();

        addProductForm.reset();
        toggleAddProductSection(false);
    }

    // Function to delete a product
    function deleteProduct(event) {
        const index = event.target.dataset.index;
        products.splice(index, 1);
        renderProducts();
    }

    // Function to toggle add product section
    function toggleAddProductSection(show) {
        addProductSection.style.display = show ? "block" : "none";
    }

    // Event listeners
    addProductBtn.addEventListener("click", () => toggleAddProductSection(true));
    cancelBtn.addEventListener("click", () => toggleAddProductSection(false));
    addProductForm.addEventListener("submit", addProduct);

    // Initial render
    renderProducts();
});

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA6j-b1S27eeLfdJURho_JBYV2hNQOvCFU",
    authDomain: "supermercado-d745c.firebaseapp.com",
    databaseURL: "https://supermercado-d745c-default-rtdb.firebaseio.com",
    projectId: "supermercado-d745c",
    storageBucket: "supermercado-d745c.firebasestorage.app",
    messagingSenderId: "862278724322",
    appId: "1:862278724322:web:b16a5e0f2830af2c644cbb",
    measurementId: "G-0LNQYQQSB3"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const addProductForm = document.getElementById("add-product-form");

    // Función para cargar productos desde Firebase
    function loadProducts() {
        db.collection("products").get()
            .then(snapshot => {
                const products = snapshot.docs.map(doc => doc.data());
                productList.innerHTML = products.map(product => `
                    <tr>
                        <td>${product.name}</td>
                        <td>${product.quantity}</td>
                        <td>${product.price}</td>
                    </tr>
                `).join("");
            });
    }

    // Función para agregar productos a Firebase
    addProductForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = document.getElementById("product-name").value;
        const quantity = parseInt(document.getElementById("product-quantity").value);
        const price = parseFloat(document.getElementById("product-price").value);

        db.collection("products").add({ name, quantity, price })
            .then(() => {
                loadProducts();
                addProductForm.reset();
            });
    });

    // Cargar productos al iniciar
    loadProducts();
});
