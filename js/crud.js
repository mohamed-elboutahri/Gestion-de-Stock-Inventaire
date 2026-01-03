// CRUD Management System
// Data storage (using localStorage for persistence)
const storage = {
    get: (key) => {
        const data = localStorage.getItem(key);
        if (!data) return [];
        try {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error('Error parsing localStorage data for', key, e);
            return [];
        }
    },
    set: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage for', key, e);
        }
    },
    clear: (key) => {
        localStorage.removeItem(key);
    }
};

// Force reset data (for development/testing)
function resetAllData() {
    if (confirm('Voulez-vous réinitialiser toutes les données ? Cette action supprimera toutes les données existantes.')) {
        storage.clear('products');
        storage.clear('suppliers');
        storage.clear('warehouses');
        storage.clear('categories');
        storage.clear('purchaseOrders');
        storage.clear('sales');
        
        // Force re-initialization
        initializeData();
        
        // Re-render after a short delay
        setTimeout(() => {
            renderProducts();
            renderSuppliers();
            renderWarehouses();
            renderCategories();
            renderPurchaseOrders();
            alert('Données réinitialisées avec succès ! Rechargez la page pour voir les changements.');
        }, 100);
    }
}

// Make reset function global
window.resetAllData = resetAllData;

// Initialize data if empty
function initializeData() {
    // Check if products exist and have data
    const products = storage.get('products');
    if (!products || products.length === 0) {
        storage.set('products', [
            { id: 1, name: "Huile d'Argan Cosmétique", reference: "#ARG-2024-001", price: 180.00, stock: 45, category: "cosmetiques", description: "Huile d'argan pure 100% bio, 50ml" },
            { id: 2, name: "Tapis Beni Ouarain (2x3m)", reference: "#TAP-BO-99", price: 4500.00, stock: 3, category: "artisanat", description: "Tapis berbère authentique en laine naturelle" },
            { id: 3, name: "Thé Royal Sultan Special", reference: "#THE-SLT-22", price: 45.00, stock: 120, category: "thes", description: "Thé vert à la menthe, 250g" },
            { id: 4, name: "Savon Noir Traditionnel", reference: "#SAV-NOIR-01", price: 25.00, stock: 80, category: "cosmetiques", description: "Savon noir marocain pour le hammam, 200g" },
            { id: 5, name: "Pot de Céramique Safi", reference: "#CER-SAFI-15", price: 120.00, stock: 25, category: "artisanat", description: "Pot en céramique bleue de Safi, décoration" },
            { id: 6, name: "Ras El Hanout Premium", reference: "#EPI-RH-50", price: 35.00, stock: 60, category: "epices", description: "Mélange d'épices traditionnel, 100g" },
            { id: 7, name: "Thé à la Menthe Nana", reference: "#THE-NANA-30", price: 28.00, stock: 150, category: "thes", description: "Thé vert Gunpowder avec menthe fraîche, 200g" },
            { id: 8, name: "Sac en Cuir Marocain", reference: "#CUI-SAC-88", price: 350.00, stock: 12, category: "artisanat", description: "Sac à main en cuir véritable, fait main" },
            { id: 9, name: "Huile d'Argan Alimentaire", reference: "#ARG-ALIM-02", price: 95.00, stock: 30, category: "cosmetiques", description: "Huile d'argan comestible, 250ml" },
            { id: 10, name: "Carreaux Zellige Bleu", reference: "#ZEL-BLEU-10", price: 85.00, stock: 200, category: "artisanat", description: "Carreaux zellige bleu, 15x15cm, lot de 10" },
            { id: 11, name: "Cumin en Poudre", reference: "#EPI-CUM-25", price: 18.00, stock: 90, category: "epices", description: "Cumin moulu, 100g" },
            { id: 12, name: "Couscous Premium", reference: "#COU-PREM-40", price: 22.00, stock: 75, category: "epices", description: "Couscous fin de qualité supérieure, 500g" },
            { id: 13, name: "Infusion Verveine", reference: "#INF-VER-18", price: 15.00, stock: 110, category: "thes", description: "Infusion de verveine, 20 sachets" },
            { id: 14, name: "Crème Hydratante Argan", reference: "#CRE-ARG-05", price: 65.00, stock: 40, category: "cosmetiques", description: "Crème hydratante à l'huile d'argan, 100ml" },
            { id: 15, name: "Plateau en Bois de Cèdre", reference: "#BOI-PLA-33", price: 180.00, stock: 18, category: "artisanat", description: "Plateau sculpté en bois de cèdre, 40x30cm" }
        ]);
    }
    const suppliers = storage.get('suppliers');
    if (!suppliers || suppliers.length === 0) {
        storage.set('suppliers', [
            { id: 1, name: "Argania Premium", contact: "Ahmed Benali", email: "contact@argania.ma", phone: "+212 661 234 567", city: "Essaouira", address: "Zone Industrielle, Essaouira" },
            { id: 2, name: "Atelier Tapis Berbères", contact: "Fatima Ait", email: "info@tapis-berberes.ma", phone: "+212 662 345 678", city: "Azrou", address: "Centre Artisanal, Azrou" },
            { id: 3, name: "Thé Sultan Royal", contact: "Mohamed Alaoui", email: "ventes@thesultan.ma", phone: "+212 663 456 789", city: "Fès", address: "Médina, Fès" },
            { id: 4, name: "Céramiques du Maroc", contact: "Hassan El Fassi", email: "contact@ceramiques.ma", phone: "+212 664 567 890", city: "Safi", address: "Route de Casablanca, Safi" },
            { id: 5, name: "Épices Orientales", contact: "Aicha Benjelloun", email: "info@epices-orientales.ma", phone: "+212 665 678 901", city: "Marrakech", address: "Souk Semmarine, Marrakech" },
            { id: 6, name: "Cuir Marocain Premium", contact: "Omar Tazi", email: "ventes@cuir-premium.ma", phone: "+212 666 789 012", city: "Fès", address: "Tannerie Chouara, Fès" },
            { id: 7, name: "Zellige Artisanal", contact: "Khadija Alami", email: "contact@zellige-art.ma", phone: "+212 667 890 123", city: "Meknès", address: "Place El Hedim, Meknès" },
            { id: 8, name: "Huiles Essentielles Bio", contact: "Youssef Idrissi", email: "info@huiles-bio.ma", phone: "+212 668 901 234", city: "Agadir", address: "Zone Industrielle, Agadir" },
            { id: 9, name: "Textiles Traditionnels", contact: "Laila Bensaid", email: "contact@textiles-trad.ma", phone: "+212 669 012 345", city: "Rabat", address: "Avenue Mohammed V, Rabat" },
            { id: 10, name: "Bijoux Berbères", contact: "Rachid Amrani", email: "info@bijoux-berberes.ma", phone: "+212 670 123 456", city: "Tiznit", address: "Souk des Bijoutiers, Tiznit" }
        ]);
    }
    const warehouses = storage.get('warehouses');
    if (!warehouses || warehouses.length === 0) {
        storage.set('warehouses', [
            { id: 1, name: "Entrepôt Central Casablanca", address: "Zone Industrielle Sidi Bernoussi", city: "Casablanca", capacity: 10000, status: "active" },
            { id: 2, name: "Entrepôt Régional Rabat", address: "Route de Témara", city: "Rabat", capacity: 5000, status: "active" },
            { id: 3, name: "Dépôt Marrakech", address: "Zone Industrielle Sidi Ghanem", city: "Marrakech", capacity: 3500, status: "active" },
            { id: 4, name: "Entrepôt Tanger", address: "Zone Franche Tanger Med", city: "Tanger", capacity: 8000, status: "active" },
            { id: 5, name: "Dépôt Fès", address: "Route de Meknès", city: "Fès", capacity: 4000, status: "active" },
            { id: 6, name: "Entrepôt Agadir", address: "Zone Industrielle Anza", city: "Agadir", capacity: 6000, status: "active" },
            { id: 7, name: "Dépôt Oujda", address: "Zone Industrielle", city: "Oujda", capacity: 3000, status: "active" },
            { id: 8, name: "Entrepôt Tétouan", address: "Route de Sebta", city: "Tétouan", capacity: 2500, status: "maintenance" },
            { id: 9, name: "Dépôt Meknès", address: "Zone Industrielle", city: "Meknès", capacity: 2800, status: "active" },
            { id: 10, name: "Entrepôt Salé", address: "Boulevard Zerktouni", city: "Salé", capacity: 3200, status: "active" }
        ]);
    }
    const categories = storage.get('categories');
    if (!categories || categories.length === 0) {
        storage.set('categories', [
            { id: 1, name: "Cosmétiques Naturels", description: "Produits de beauté à base d'ingrédients naturels", status: "active", productCount: 24 },
            { id: 2, name: "Artisanat", description: "Tapis, poteries et objets artisanaux marocains", status: "active", productCount: 18 },
            { id: 3, name: "Thés & Infusions", description: "Thés traditionnels et infusions marocaines", status: "active", productCount: 32 },
            { id: 4, name: "Épices & Condiments", description: "Épices du Maroc et condiments traditionnels", status: "active", productCount: 15 },
            { id: 5, name: "Céramiques & Poteries", description: "Céramiques artisanales et poteries traditionnelles", status: "active", productCount: 12 },
            { id: 6, name: "Cuir & Maroquinerie", description: "Articles en cuir et maroquinerie marocaine", status: "active", productCount: 20 },
            { id: 7, name: "Zellige & Mosaïques", description: "Carreaux zellige et mosaïques artisanales", status: "active", productCount: 8 },
            { id: 8, name: "Huiles Essentielles", description: "Huiles essentielles et produits aromatiques", status: "active", productCount: 16 },
            { id: 9, name: "Textiles & Vêtements", description: "Textiles traditionnels et vêtements marocains", status: "active", productCount: 14 },
            { id: 10, name: "Bijoux & Accessoires", description: "Bijoux berbères et accessoires traditionnels", status: "active", productCount: 22 }
        ]);
    }
    
    // Initialize purchase orders with sample data
    if (!storage.get('purchaseOrders') || storage.get('purchaseOrders').length === 0) {
        const suppliers = storage.get('suppliers');
        const warehouses = storage.get('warehouses');
        const products = storage.get('products');
        
        if (suppliers.length > 0 && warehouses.length > 0 && products.length > 0) {
            const today = new Date();
            const deliveryDate1 = new Date(today);
            deliveryDate1.setDate(deliveryDate1.getDate() + 7);
            const deliveryDate2 = new Date(today);
            deliveryDate2.setDate(deliveryDate2.getDate() + 10);
            const deliveryDate3 = new Date(today);
            deliveryDate3.setDate(deliveryDate3.getDate() + 14);
            const deliveryDate4 = new Date(today);
            deliveryDate4.setDate(deliveryDate4.getDate() + 5);
            const deliveryDate5 = new Date(today);
            deliveryDate5.setDate(deliveryDate5.getDate() + 21);
            
            storage.set('purchaseOrders', [
                {
                    id: 1,
                    reference: '#CMD-ACH-2026-001',
                    supplierId: suppliers[0].id,
                    supplierName: suppliers[0].name,
                    warehouseId: warehouses[0].id,
                    warehouseName: warehouses[0].name,
                    date: new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    deliveryDate: deliveryDate1.toISOString().split('T')[0],
                    paymentTerms: '30days',
                    status: 'pending',
                    notes: '',
                    products: [
                        { productId: products[0].id, productName: products[0].name, productReference: products[0].reference, quantity: 50, unitPrice: products[0].price, total: 50 * products[0].price }
                    ],
                    subtotal: 50 * products[0].price,
                    discount: 0,
                    discountType: 'percent',
                    shipping: 500,
                    total: 50 * products[0].price + 500
                },
                {
                    id: 2,
                    reference: '#CMD-ACH-2026-002',
                    supplierId: suppliers[1].id,
                    supplierName: suppliers[1].name,
                    warehouseId: warehouses[1].id,
                    warehouseName: warehouses[1].name,
                    date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    deliveryDate: deliveryDate2.toISOString().split('T')[0],
                    paymentTerms: '60days',
                    status: 'delivered',
                    notes: 'Livraison effectuée avec succès',
                    products: [
                        { productId: products[1].id, productName: products[1].name, productReference: products[1].reference, quantity: 2, unitPrice: products[1].price, total: 2 * products[1].price }
                    ],
                    subtotal: 2 * products[1].price,
                    discount: 5,
                    discountType: 'percent',
                    shipping: 200,
                    total: (2 * products[1].price) * 0.95 + 200
                },
                {
                    id: 3,
                    reference: '#CMD-ACH-2026-003',
                    supplierId: suppliers[2].id,
                    supplierName: suppliers[2].name,
                    warehouseId: warehouses[2].id,
                    warehouseName: warehouses[2].name,
                    date: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    deliveryDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    paymentTerms: '30days',
                    status: 'in-transit',
                    notes: 'En cours de transport',
                    products: [
                        { productId: products[2].id, productName: products[2].name, productReference: products[2].reference, quantity: 100, unitPrice: products[2].price, total: 100 * products[2].price }
                    ],
                    subtotal: 100 * products[2].price,
                    discount: 3,
                    discountType: 'percent',
                    shipping: 300,
                    total: (100 * products[2].price) * 0.97 + 300
                },
                {
                    id: 4,
                    reference: '#CMD-ACH-2026-004',
                    supplierId: suppliers[3]?.id || suppliers[0].id,
                    supplierName: suppliers[3]?.name || suppliers[0].name,
                    warehouseId: warehouses[0].id,
                    warehouseName: warehouses[0].name,
                    date: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    deliveryDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    paymentTerms: 'on-delivery',
                    status: 'confirmed',
                    notes: 'Commande confirmée, paiement à la livraison',
                    products: [
                        { productId: products[0].id, productName: products[0].name, productReference: products[0].reference, quantity: 30, unitPrice: products[0].price, total: 30 * products[0].price }
                    ],
                    subtotal: 30 * products[0].price,
                    discount: 0,
                    discountType: 'percent',
                    shipping: 250,
                    total: 30 * products[0].price + 250
                },
                {
                    id: 5,
                    reference: '#CMD-ACH-2026-005',
                    supplierId: suppliers[4]?.id || suppliers[1].id,
                    supplierName: suppliers[4]?.name || suppliers[1].name,
                    warehouseId: warehouses[3]?.id || warehouses[0].id,
                    warehouseName: warehouses[3]?.name || warehouses[0].name,
                    date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    deliveryDate: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    paymentTerms: '90days',
                    status: 'ordered',
                    notes: 'Commande passée, en attente de préparation',
                    products: [
                        { productId: products[1].id, productName: products[1].name, productReference: products[1].reference, quantity: 5, unitPrice: products[1].price, total: 5 * products[1].price }
                    ],
                    subtotal: 5 * products[1].price,
                    discount: 10,
                    discountType: 'percent',
                    shipping: 500,
                    total: (5 * products[1].price) * 0.90 + 500
                },
                {
                    id: 6,
                    reference: '#CMD-ACH-2026-006',
                    supplierId: suppliers[5]?.id || suppliers[0].id,
                    supplierName: suppliers[5]?.name || suppliers[0].name,
                    warehouseId: warehouses[4]?.id || warehouses[1].id,
                    warehouseName: warehouses[4]?.name || warehouses[1].name,
                    date: new Date(today.getTime() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    deliveryDate: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    paymentTerms: '30days',
                    status: 'delivered',
                    notes: 'Livraison complète, tous les articles conformes',
                    products: [
                        { productId: products[2].id, productName: products[2].name, productReference: products[2].reference, quantity: 200, unitPrice: products[2].price, total: 200 * products[2].price }
                    ],
                    subtotal: 200 * products[2].price,
                    discount: 0,
                    discountType: 'percent',
                    shipping: 400,
                    total: 200 * products[2].price + 400
                },
                {
                    id: 7,
                    reference: '#CMD-ACH-2026-007',
                    supplierId: suppliers[6]?.id || suppliers[1].id,
                    supplierName: suppliers[6]?.name || suppliers[1].name,
                    warehouseId: warehouses[5]?.id || warehouses[2].id,
                    warehouseName: warehouses[5]?.name || warehouses[2].name,
                    date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    deliveryDate: deliveryDate1.toISOString().split('T')[0],
                    paymentTerms: '60days',
                    status: 'pending',
                    notes: 'En attente de confirmation fournisseur',
                    products: [
                        { productId: products[0].id, productName: products[0].name, productReference: products[0].reference, quantity: 25, unitPrice: products[0].price, total: 25 * products[0].price }
                    ],
                    subtotal: 25 * products[0].price,
                    discount: 0,
                    discountType: 'percent',
                    shipping: 150,
                    total: 25 * products[0].price + 150
                },
                {
                    id: 8,
                    reference: '#CMD-ACH-2026-008',
                    supplierId: suppliers[7]?.id || suppliers[2].id,
                    supplierName: suppliers[7]?.name || suppliers[2].name,
                    warehouseId: warehouses[6]?.id || warehouses[0].id,
                    warehouseName: warehouses[6]?.name || warehouses[0].name,
                    date: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    deliveryDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    paymentTerms: 'cash',
                    status: 'confirmed',
                    notes: 'Commande confirmée, paiement comptant',
                    products: [
                        { productId: products[1].id, productName: products[1].name, productReference: products[1].reference, quantity: 1, unitPrice: products[1].price, total: 1 * products[1].price },
                        { productId: products[2].id, productName: products[2].name, productReference: products[2].reference, quantity: 50, unitPrice: products[2].price, total: 50 * products[2].price }
                    ],
                    subtotal: (1 * products[1].price) + (50 * products[2].price),
                    discount: 5,
                    discountType: 'percent',
                    shipping: 600,
                    total: ((1 * products[1].price) + (50 * products[2].price)) * 0.95 + 600
                }
            ]);
        }
    }
}

// Modal functions (global)
window.openModal = function(modalId, title = null) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        if (title) {
            const titleElement = document.getElementById(modalId + '-title');
            if (titleElement) titleElement.textContent = title;
        }
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Reset form
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
};

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// PRODUCTS CRUD
let currentEditId = null;
let currentDeleteType = null;
let currentDeleteId = null;

function openProductModal(productId = null) {
    currentEditId = productId;
    if (productId) {
        const products = storage.get('products');
        const product = products.find(p => p.id === productId);
        if (product) {
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-reference').value = product.reference;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-stock').value = product.stock;
            document.getElementById('product-category').value = product.category || '';
            document.getElementById('product-description').value = product.description || '';
            openModal('modal-product', 'Modifier le produit');
        }
    } else {
        openModal('modal-product', 'Ajouter un produit');
    }
}

function saveProduct() {
    const form = document.getElementById('form-product');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const products = storage.get('products');
    const productData = {
        id: currentEditId || Date.now(),
        name: document.getElementById('product-name').value,
        reference: document.getElementById('product-reference').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        category: document.getElementById('product-category').value,
        description: document.getElementById('product-description').value
    };

    if (currentEditId) {
        const index = products.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            products[index] = productData;
        }
    } else {
        products.push(productData);
    }

    storage.set('products', products);
    closeModal('modal-product');
    renderProducts();
    currentEditId = null;
}

function deleteProduct(productId) {
    currentDeleteType = 'product';
    currentDeleteId = productId;
    const products = storage.get('products');
    const product = products.find(p => p.id === productId);
    document.getElementById('delete-message').textContent = 
        `Êtes-vous sûr de vouloir supprimer le produit "${product.name}" ? Cette action est irréversible.`;
    openModal('modal-delete');
}

function renderProducts() {
    const products = storage.get('products');
    const tbody = document.querySelector('#view-products tbody');
    if (!tbody) return;

    tbody.innerHTML = products.map(product => `
        <tr>
            <td class="item-cell">
                <div class="item-img">${getProductIcon(product.category)}</div>
                <strong>${product.name}</strong>
            </td>
            <td>${product.reference}</td>
            <td>${product.price.toFixed(2)} MAD</td>
            <td><strong>${product.stock}</strong></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" onclick="openProductModal(${product.id})">Modifier</button>
                    <button class="action-btn delete" onclick="deleteProduct(${product.id})">Supprimer</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getProductIcon(category) {
    const icons = {
        'cosmetiques': '🍯',
        'artisanat': '🧶',
        'thes': '🍵',
        'epices': '🌶️'
    };
    return icons[category] || '📦';
}

// SUPPLIERS CRUD
function openSupplierModal(supplierId = null) {
    currentEditId = supplierId;
    if (supplierId) {
        const suppliers = storage.get('suppliers');
        const supplier = suppliers.find(s => s.id === supplierId);
        if (supplier) {
            document.getElementById('supplier-id').value = supplier.id;
            document.getElementById('supplier-name').value = supplier.name;
            document.getElementById('supplier-contact').value = supplier.contact;
            document.getElementById('supplier-email').value = supplier.email;
            document.getElementById('supplier-phone').value = supplier.phone;
            document.getElementById('supplier-city').value = supplier.city;
            document.getElementById('supplier-address').value = supplier.address || '';
            openModal('modal-supplier', 'Modifier le fournisseur');
        }
    } else {
        openModal('modal-supplier', 'Ajouter un fournisseur');
    }
}

function saveSupplier() {
    const form = document.getElementById('form-supplier');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const suppliers = storage.get('suppliers');
    const supplierData = {
        id: currentEditId || Date.now(),
        name: document.getElementById('supplier-name').value,
        contact: document.getElementById('supplier-contact').value,
        email: document.getElementById('supplier-email').value,
        phone: document.getElementById('supplier-phone').value,
        city: document.getElementById('supplier-city').value,
        address: document.getElementById('supplier-address').value
    };

    if (currentEditId) {
        const index = suppliers.findIndex(s => s.id === currentEditId);
        if (index !== -1) {
            suppliers[index] = supplierData;
        }
    } else {
        suppliers.push(supplierData);
    }

    storage.set('suppliers', suppliers);
    closeModal('modal-supplier');
    renderSuppliers();
    currentEditId = null;
}

function deleteSupplier(supplierId) {
    currentDeleteType = 'supplier';
    currentDeleteId = supplierId;
    const suppliers = storage.get('suppliers');
    const supplier = suppliers.find(s => s.id === supplierId);
    document.getElementById('delete-message').textContent = 
        `Êtes-vous sûr de vouloir supprimer le fournisseur "${supplier.name}" ? Cette action est irréversible.`;
    openModal('modal-delete');
}

function renderSuppliers() {
    const suppliers = storage.get('suppliers');
    const tbody = document.querySelector('#view-suppliers tbody');
    if (!tbody) {
        console.warn('Suppliers tbody not found');
        return;
    }

    if (!suppliers || suppliers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">Aucun fournisseur enregistré. Cliquez sur "Nouveau Fournisseur" pour commencer.</td></tr>';
        return;
    }

    tbody.innerHTML = suppliers.map(supplier => `
        <tr>
            <td><strong>${supplier.name}</strong></td>
            <td>${supplier.contact}</td>
            <td>${supplier.email}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.city}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" onclick="openSupplierModal(${supplier.id})">Modifier</button>
                    <button class="action-btn delete" onclick="deleteSupplier(${supplier.id})">Supprimer</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// WAREHOUSES CRUD
function openWarehouseModal(warehouseId = null) {
    currentEditId = warehouseId;
    if (warehouseId) {
        const warehouses = storage.get('warehouses');
        const warehouse = warehouses.find(w => w.id === warehouseId);
        if (warehouse) {
            document.getElementById('warehouse-id').value = warehouse.id;
            document.getElementById('warehouse-name').value = warehouse.name;
            document.getElementById('warehouse-address').value = warehouse.address;
            document.getElementById('warehouse-city').value = warehouse.city;
            document.getElementById('warehouse-capacity').value = warehouse.capacity;
            document.getElementById('warehouse-status').value = warehouse.status;
            openModal('modal-warehouse', 'Modifier l\'entrepôt');
        }
    } else {
        openModal('modal-warehouse', 'Ajouter un entrepôt');
    }
}

function saveWarehouse() {
    const form = document.getElementById('form-warehouse');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const warehouses = storage.get('warehouses');
    const warehouseData = {
        id: currentEditId || Date.now(),
        name: document.getElementById('warehouse-name').value,
        address: document.getElementById('warehouse-address').value,
        city: document.getElementById('warehouse-city').value,
        capacity: parseInt(document.getElementById('warehouse-capacity').value),
        status: document.getElementById('warehouse-status').value
    };

    if (currentEditId) {
        const index = warehouses.findIndex(w => w.id === currentEditId);
        if (index !== -1) {
            warehouses[index] = warehouseData;
        }
    } else {
        warehouses.push(warehouseData);
    }

    storage.set('warehouses', warehouses);
    closeModal('modal-warehouse');
    renderWarehouses();
    currentEditId = null;
}

function deleteWarehouse(warehouseId) {
    currentDeleteType = 'warehouse';
    currentDeleteId = warehouseId;
    const warehouses = storage.get('warehouses');
    const warehouse = warehouses.find(w => w.id === warehouseId);
    document.getElementById('delete-message').textContent = 
        `Êtes-vous sûr de vouloir supprimer l'entrepôt "${warehouse.name}" ? Cette action est irréversible.`;
    openModal('modal-delete');
}

function renderWarehouses() {
    const warehouses = storage.get('warehouses');
    const tbody = document.querySelector('#view-warehouses tbody');
    if (!tbody) {
        console.warn('Warehouses tbody not found');
        return;
    }

    if (!warehouses || warehouses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">Aucun entrepôt enregistré. Cliquez sur "Nouvel Entrepôt" pour commencer.</td></tr>';
        return;
    }

    tbody.innerHTML = warehouses.map(warehouse => {
        const statusBadge = warehouse.status === 'active' 
            ? '<span class="badge badge-success">Actif</span>'
            : warehouse.status === 'maintenance'
            ? '<span class="badge badge-warning">Maintenance</span>'
            : '<span class="badge badge-warning">Inactif</span>';
        
        return `
            <tr>
                <td><strong>${warehouse.name}</strong></td>
                <td>${warehouse.address}</td>
                <td>${warehouse.city}</td>
                <td>${warehouse.capacity.toLocaleString()} m²</td>
                <td><strong>${Math.floor(warehouse.capacity * 0.7).toLocaleString()} m²</strong></td>
                <td>${statusBadge}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="openWarehouseModal(${warehouse.id})">Modifier</button>
                        <button class="action-btn delete" onclick="deleteWarehouse(${warehouse.id})">Supprimer</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// CATEGORIES CRUD
function openCategoryModal(categoryId = null) {
    currentEditId = categoryId;
    if (categoryId) {
        const categories = storage.get('categories');
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            document.getElementById('category-id').value = category.id;
            document.getElementById('category-name').value = category.name;
            document.getElementById('category-description').value = category.description || '';
            document.getElementById('category-status').value = category.status;
            openModal('modal-category', 'Modifier la catégorie');
        }
    } else {
        openModal('modal-category', 'Ajouter une catégorie');
    }
}

function saveCategory() {
    const form = document.getElementById('form-category');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const categories = storage.get('categories');
    const categoryData = {
        id: currentEditId || Date.now(),
        name: document.getElementById('category-name').value,
        description: document.getElementById('category-description').value,
        status: document.getElementById('category-status').value,
        productCount: 0
    };

    if (currentEditId) {
        const index = categories.findIndex(c => c.id === currentEditId);
        if (index !== -1) {
            categoryData.productCount = categories[index].productCount;
            categories[index] = categoryData;
        }
    } else {
        categories.push(categoryData);
    }

    storage.set('categories', categories);
    closeModal('modal-category');
    renderCategories();
    currentEditId = null;
}

function deleteCategory(categoryId) {
    currentDeleteType = 'category';
    currentDeleteId = categoryId;
    const categories = storage.get('categories');
    const category = categories.find(c => c.id === categoryId);
    document.getElementById('delete-message').textContent = 
        `Êtes-vous sûr de vouloir supprimer la catégorie "${category.name}" ? Cette action est irréversible.`;
    openModal('modal-delete');
}

function renderCategories() {
    const categories = storage.get('categories');
    const tbody = document.querySelector('#view-categories tbody');
    if (!tbody) {
        console.warn('Categories tbody not found');
        return;
    }

    if (!categories || categories.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">Aucune catégorie enregistrée. Cliquez sur "Nouvelle Catégorie" pour commencer.</td></tr>';
        return;
    }

    tbody.innerHTML = categories.map(category => {
        const statusBadge = category.status === 'active'
            ? '<span class="badge badge-success">Active</span>'
            : '<span class="badge badge-warning">En révision</span>';
        
        return `
            <tr>
                <td><strong>${category.name}</strong></td>
                <td>${category.description}</td>
                <td><strong>${category.productCount || 0}</strong> produits</td>
                <td>${statusBadge}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="openCategoryModal(${category.id})">Modifier</button>
                        <button class="action-btn delete" onclick="deleteCategory(${category.id})">Supprimer</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

// DELETE CONFIRMATION
function confirmDelete() {
    if (currentDeleteType === 'product') {
        const products = storage.get('products');
        storage.set('products', products.filter(p => p.id !== currentDeleteId));
        renderProducts();
    } else if (currentDeleteType === 'supplier') {
        const suppliers = storage.get('suppliers');
        storage.set('suppliers', suppliers.filter(s => s.id !== currentDeleteId));
        renderSuppliers();
    } else if (currentDeleteType === 'warehouse') {
        const warehouses = storage.get('warehouses');
        storage.set('warehouses', warehouses.filter(w => w.id !== currentDeleteId));
        renderWarehouses();
    } else if (currentDeleteType === 'category') {
        const categories = storage.get('categories');
        storage.set('categories', categories.filter(c => c.id !== currentDeleteId));
        renderCategories();
    }
    
    closeModal('modal-delete');
    currentDeleteType = null;
    currentDeleteId = null;
}

// SALE MANAGEMENT
let saleProducts = [];

function openSaleModal() {
    // Reset form
    saleProducts = [];
    document.getElementById('form-sale').reset();
    document.getElementById('sale-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('sale-products-list').innerHTML = '';
    updateSaleTotal();
    openModal('modal-sale', 'Nouvelle Vente');
}

function addProductToSale() {
    const products = storage.get('products');
    if (products.length === 0) {
        alert('Aucun produit disponible. Veuillez d\'abord ajouter des produits.');
        return;
    }

    const productId = Date.now();
    saleProducts.push({
        id: productId,
        productId: products[0].id,
        quantity: 1,
        price: products[0].price
    });

    renderSaleProducts();
    updateSaleTotal();
}

function removeProductFromSale(productId) {
    saleProducts = saleProducts.filter(p => p.id !== productId);
    renderSaleProducts();
    updateSaleTotal();
}

function renderSaleProducts() {
    const products = storage.get('products');
    const list = document.getElementById('sale-products-list');
    
    if (saleProducts.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">Aucun produit ajouté</p>';
        return;
    }

    list.innerHTML = saleProducts.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        const productOptions = products.map(p => 
            `<option value="${p.id}" ${p.id === item.productId ? 'selected' : ''}>${p.name} - ${p.price.toFixed(2)} MAD</option>`
        ).join('');

        return `
            <div class="product-item" data-id="${item.id}">
                <select onchange="updateSaleProduct(${item.id}, 'productId', this.value)">
                    ${productOptions}
                </select>
                <input type="number" value="${item.quantity}" min="1" onchange="updateSaleProduct(${item.id}, 'quantity', this.value)" placeholder="Qté">
                <input type="number" value="${item.price.toFixed(2)}" step="0.01" min="0" onchange="updateSaleProduct(${item.id}, 'price', this.value)" placeholder="Prix">
                <span class="product-total">${(item.quantity * item.price).toFixed(2)} MAD</span>
                <button type="button" class="remove-product" onclick="removeProductFromSale(${item.id})">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
}

function updateSaleProduct(itemId, field, value) {
    const item = saleProducts.find(p => p.id === itemId);
    if (!item) return;

    if (field === 'productId') {
        const products = storage.get('products');
        const product = products.find(p => p.id === parseInt(value));
        if (product) {
            item.productId = product.id;
            item.price = product.price;
        }
    } else if (field === 'quantity') {
        item.quantity = parseInt(value) || 1;
    } else if (field === 'price') {
        item.price = parseFloat(value) || 0;
    }

    renderSaleProducts();
    updateSaleTotal();
}

function updateSaleTotal() {
    const subtotal = saleProducts.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    document.getElementById('sale-subtotal').textContent = subtotal.toFixed(2) + ' MAD';

    const discountInput = document.getElementById('sale-discount');
    const discountType = document.getElementById('sale-discount-type').value;
    const discount = parseFloat(discountInput.value) || 0;

    let discountAmount = 0;
    if (discountType === 'percent') {
        discountAmount = (subtotal * discount) / 100;
    } else {
        discountAmount = discount;
    }

    const total = Math.max(0, subtotal - discountAmount);
    document.getElementById('sale-total').textContent = total.toFixed(2) + ' MAD';
}

// Make functions global
window.addProductToSale = addProductToSale;
window.removeProductFromSale = removeProductFromSale;
window.updateSaleProduct = updateSaleProduct;
window.openSaleModal = openSaleModal;

function saveSale() {
    const form = document.getElementById('form-sale');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (saleProducts.length === 0) {
        alert('Veuillez ajouter au moins un produit à la vente.');
        return;
    }

    const sales = storage.get('sales') || [];
    const products = storage.get('products');
    
    const saleData = {
        id: Date.now(),
        reference: '#VTE-' + Date.now(),
        client: document.getElementById('sale-client').value,
        email: document.getElementById('sale-email').value,
        phone: document.getElementById('sale-phone').value,
        address: document.getElementById('sale-address').value,
        city: document.getElementById('sale-city').value,
        date: document.getElementById('sale-date').value,
        payment: document.getElementById('sale-payment').value,
        status: document.getElementById('sale-status').value,
        notes: document.getElementById('sale-notes').value,
        products: saleProducts.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                productId: item.productId,
                productName: product ? product.name : '',
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price
            };
        }),
        subtotal: saleProducts.reduce((sum, item) => sum + (item.quantity * item.price), 0),
        discount: parseFloat(document.getElementById('sale-discount').value) || 0,
        discountType: document.getElementById('sale-discount-type').value,
        total: parseFloat(document.getElementById('sale-total').textContent.replace(' MAD', ''))
    };

    sales.push(saleData);
    storage.set('sales', sales);

    // Update product stock
    saleProducts.forEach(item => {
        const productIndex = products.findIndex(p => p.id === item.productId);
        if (productIndex !== -1) {
            products[productIndex].stock -= item.quantity;
            if (products[productIndex].stock < 0) products[productIndex].stock = 0;
        }
    });
    storage.set('products', products);

    alert('Vente enregistrée avec succès !\n\nRéférence: ' + saleData.reference);
    closeModal('modal-sale');
    renderProducts();
    
    // Refresh dashboard if visible
    if (document.getElementById('view-dashboard').classList.contains('active')) {
        location.reload(); // Simple refresh, could be improved with dynamic update
    }
}

window.saveSale = saveSale;

// PURCHASE ORDER MANAGEMENT
let purchaseOrderProducts = [];

function openPurchaseOrderModal() {
    // Reset form
    purchaseOrderProducts = [];
    document.getElementById('form-purchase-order').reset();
    const today = new Date();
    document.getElementById('po-date').value = today.toISOString().split('T')[0];
    
    // Set delivery date to 7 days from now
    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    document.getElementById('po-delivery-date').value = deliveryDate.toISOString().split('T')[0];
    
    document.getElementById('po-products-list').innerHTML = '';
    
    // Populate suppliers dropdown
    const suppliers = storage.get('suppliers');
    const supplierSelect = document.getElementById('po-supplier');
    supplierSelect.innerHTML = '<option value="">Sélectionner un fournisseur...</option>' +
        suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    
    // Populate warehouses dropdown
    const warehouses = storage.get('warehouses');
    const warehouseSelect = document.getElementById('po-warehouse');
    warehouseSelect.innerHTML = '<option value="">Sélectionner un entrepôt...</option>' +
        warehouses.map(w => `<option value="${w.id}">${w.name} - ${w.city}</option>`).join('');
    
    updatePurchaseOrderTotal();
    openModal('modal-purchase-order', 'Nouvelle Commande d\'Achat');
}

function addProductToPurchaseOrder() {
    const products = storage.get('products');
    if (products.length === 0) {
        alert('Aucun produit disponible. Veuillez d\'abord ajouter des produits.');
        return;
    }

    const productId = Date.now();
    purchaseOrderProducts.push({
        id: productId,
        productId: products[0].id,
        quantity: 1,
        unitPrice: products[0].price
    });

    renderPurchaseOrderProducts();
    updatePurchaseOrderTotal();
}

function removeProductFromPurchaseOrder(productId) {
    purchaseOrderProducts = purchaseOrderProducts.filter(p => p.id !== productId);
    renderPurchaseOrderProducts();
    updatePurchaseOrderTotal();
}

function renderPurchaseOrderProducts() {
    const products = storage.get('products');
    const list = document.getElementById('po-products-list');
    
    if (purchaseOrderProducts.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 1rem;">Aucun produit ajouté</p>';
        return;
    }

    list.innerHTML = purchaseOrderProducts.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        const productOptions = products.map(p => 
            `<option value="${p.id}" ${p.id === item.productId ? 'selected' : ''}>${p.name} - ${p.reference}</option>`
        ).join('');

        return `
            <div class="product-item" data-id="${item.id}">
                <select onchange="updatePurchaseOrderProduct(${item.id}, 'productId', this.value)">
                    ${productOptions}
                </select>
                <input type="number" value="${item.quantity}" min="1" onchange="updatePurchaseOrderProduct(${item.id}, 'quantity', this.value)" placeholder="Qté">
                <input type="number" value="${item.unitPrice.toFixed(2)}" step="0.01" min="0" onchange="updatePurchaseOrderProduct(${item.id}, 'unitPrice', this.value)" placeholder="Prix unit.">
                <span class="product-total">${(item.quantity * item.unitPrice).toFixed(2)} MAD</span>
                <button type="button" class="remove-product" onclick="removeProductFromPurchaseOrder(${item.id})">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
    }).join('');
}

function updatePurchaseOrderProduct(itemId, field, value) {
    const item = purchaseOrderProducts.find(p => p.id === itemId);
    if (!item) return;

    if (field === 'productId') {
        const products = storage.get('products');
        const product = products.find(p => p.id === parseInt(value));
        if (product) {
            item.productId = product.id;
            item.unitPrice = product.price;
        }
    } else if (field === 'quantity') {
        item.quantity = parseInt(value) || 1;
    } else if (field === 'unitPrice') {
        item.unitPrice = parseFloat(value) || 0;
    }

    renderPurchaseOrderProducts();
    updatePurchaseOrderTotal();
}

function updatePurchaseOrderTotal() {
    const subtotal = purchaseOrderProducts.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    document.getElementById('po-subtotal').textContent = subtotal.toFixed(2) + ' MAD';

    const discountInput = document.getElementById('po-discount');
    const discountType = document.getElementById('po-discount-type').value;
    const discount = parseFloat(discountInput.value) || 0;

    let discountAmount = 0;
    if (discountType === 'percent') {
        discountAmount = (subtotal * discount) / 100;
    } else {
        discountAmount = discount;
    }

    const shipping = parseFloat(document.getElementById('po-shipping').value) || 0;
    const total = Math.max(0, subtotal - discountAmount + shipping);
    document.getElementById('po-total').textContent = total.toFixed(2) + ' MAD';
}

// Make functions global
window.addProductToPurchaseOrder = addProductToPurchaseOrder;
window.removeProductFromPurchaseOrder = removeProductFromPurchaseOrder;
window.updatePurchaseOrderProduct = updatePurchaseOrderProduct;
window.openPurchaseOrderModal = openPurchaseOrderModal;

function savePurchaseOrder() {
    const form = document.getElementById('form-purchase-order');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (purchaseOrderProducts.length === 0) {
        alert('Veuillez ajouter au moins un produit à la commande.');
        return;
    }

    const purchaseOrders = storage.get('purchaseOrders') || [];
    const products = storage.get('products');
    const suppliers = storage.get('suppliers');
    const warehouses = storage.get('warehouses');
    
    const supplier = suppliers.find(s => s.id === parseInt(document.getElementById('po-supplier').value));
    const warehouse = warehouses.find(w => w.id === parseInt(document.getElementById('po-warehouse').value));
    
    const poData = {
        id: Date.now(),
        reference: '#CMD-ACH-' + Date.now(),
        supplierId: parseInt(document.getElementById('po-supplier').value),
        supplierName: supplier ? supplier.name : '',
        warehouseId: parseInt(document.getElementById('po-warehouse').value),
        warehouseName: warehouse ? warehouse.name : '',
        date: document.getElementById('po-date').value,
        deliveryDate: document.getElementById('po-delivery-date').value,
        paymentTerms: document.getElementById('po-payment-terms').value,
        status: document.getElementById('po-status').value,
        notes: document.getElementById('po-notes').value,
        products: purchaseOrderProducts.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                productId: item.productId,
                productName: product ? product.name : '',
                productReference: product ? product.reference : '',
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                total: item.quantity * item.unitPrice
            };
        }),
        subtotal: purchaseOrderProducts.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0),
        discount: parseFloat(document.getElementById('po-discount').value) || 0,
        discountType: document.getElementById('po-discount-type').value,
        shipping: parseFloat(document.getElementById('po-shipping').value) || 0,
        total: parseFloat(document.getElementById('po-total').textContent.replace(' MAD', ''))
    };

    purchaseOrders.push(poData);
    storage.set('purchaseOrders', purchaseOrders);

    alert('Commande d\'achat enregistrée avec succès !\n\nRéférence: ' + poData.reference);
    closeModal('modal-purchase-order');
    
    // Refresh purchase orders view if visible
    if (document.getElementById('view-purchase-orders').classList.contains('active')) {
        renderPurchaseOrders();
    }
}

function renderPurchaseOrders() {
    const purchaseOrders = storage.get('purchaseOrders') || [];
    const tbody = document.querySelector('#view-purchase-orders tbody');
    if (!tbody) return;

    if (purchaseOrders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">Aucune commande d\'achat enregistrée</td></tr>';
        return;
    }

    tbody.innerHTML = purchaseOrders.map(po => {
        const statusBadge = po.status === 'delivered' 
            ? '<span class="badge badge-success">Livré</span>'
            : po.status === 'in-transit'
            ? '<span class="badge badge-warning">En transit</span>'
            : po.status === 'confirmed' || po.status === 'ordered'
            ? '<span class="badge badge-success">Confirmée</span>'
            : '<span class="badge badge-warning">En attente</span>';
        
        const date = new Date(po.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
        const deliveryDate = new Date(po.deliveryDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
        
        return `
            <tr>
                <td><strong>${po.reference}</strong></td>
                <td>${po.supplierName}</td>
                <td>${date}</td>
                <td>${deliveryDate}</td>
                <td>${po.total.toFixed(2)} MAD</td>
                <td>${statusBadge}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="viewPurchaseOrderDetails(${po.id})">Détails</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function viewPurchaseOrderDetails(poId) {
    const purchaseOrders = storage.get('purchaseOrders') || [];
    const po = purchaseOrders.find(p => p.id === poId);
    if (!po) return;

    const productsList = po.products.map(p => 
        `- ${p.productName} (${p.productReference}): ${p.quantity} x ${p.unitPrice.toFixed(2)} MAD = ${p.total.toFixed(2)} MAD`
    ).join('\n');

    alert(`Détails de la commande ${po.reference}\n\n` +
        `Fournisseur: ${po.supplierName}\n` +
        `Date commande: ${new Date(po.date).toLocaleDateString('fr-FR')}\n` +
        `Date livraison: ${new Date(po.deliveryDate).toLocaleDateString('fr-FR')}\n` +
        `Entrepôt: ${po.warehouseName}\n` +
        `Statut: ${po.status}\n` +
        `Conditions paiement: ${po.paymentTerms}\n\n` +
        `Produits:\n${productsList}\n\n` +
        `Sous-total: ${po.subtotal.toFixed(2)} MAD\n` +
        `Remise: ${po.discount.toFixed(2)} ${po.discountType === 'percent' ? '%' : 'MAD'}\n` +
        `Frais transport: ${po.shipping.toFixed(2)} MAD\n` +
        `Total: ${po.total.toFixed(2)} MAD\n\n` +
        (po.notes ? `Notes: ${po.notes}` : ''));
}

window.savePurchaseOrder = savePurchaseOrder;
window.viewPurchaseOrderDetails = viewPurchaseOrderDetails;

// CONTACT FORM MANAGEMENT
function openContactModal() {
    // Reset form
    document.getElementById('form-contact').reset();
    document.getElementById('contact-success').style.display = 'none';
    
    // Pre-fill user info if available
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    if (session) {
        try {
            const userData = JSON.parse(session);
            document.getElementById('contact-name').value = userData.name || '';
            document.getElementById('contact-email').value = userData.email || '';
        } catch (e) {
            console.error('Error parsing session:', e);
        }
    }
    
    openModal('modal-contact', 'Contactez votre conseiller');
}

function sendContactMessage() {
    const form = document.getElementById('form-contact');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const contactData = {
        id: Date.now(),
        date: new Date().toISOString(),
        subject: document.getElementById('contact-subject').value,
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        priority: document.getElementById('contact-priority').value,
        message: document.getElementById('contact-message').value,
        sendCopy: document.getElementById('contact-copy').checked,
        status: 'pending'
    };

    // Save contact message
    const contacts = storage.get('contacts') || [];
    contacts.push(contactData);
    storage.set('contacts', contacts);

    // Show success message
    document.getElementById('contact-success').style.display = 'flex';
    
    // Scroll to success message
    document.getElementById('contact-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Reset form after 2 seconds
    setTimeout(() => {
        form.reset();
        document.getElementById('contact-success').style.display = 'none';
        
        // If send copy is checked, simulate email (in production, this would send a real email)
        if (contactData.sendCopy) {
            console.log('Email copy would be sent to:', contactData.email);
        }
        
        // Close modal after 3 seconds
        setTimeout(() => {
            closeModal('modal-contact');
        }, 1000);
    }, 3000);
}

window.openContactModal = openContactModal;
window.sendContactMessage = sendContactMessage;

// Load data from JSON file (optional function)
async function loadDataFromJSON() {
    try {
        const response = await fetch('data/sample-data.json');
        if (!response.ok) {
            console.log('JSON file not found, using default initialization');
            return false;
        }
        const jsonData = await response.json();
        
        // Check if data exists and is empty
        const currentProducts = storage.get('products');
        const currentSuppliers = storage.get('suppliers');
        const currentWarehouses = storage.get('warehouses');
        const currentCategories = storage.get('categories');
        
        // Only load if localStorage is empty or has no meaningful data
        if ((!currentProducts || currentProducts.length === 0) && jsonData.products && jsonData.products.length > 0) {
            console.log('Loading products from JSON:', jsonData.products.length);
            storage.set('products', jsonData.products);
        }
        if ((!currentSuppliers || currentSuppliers.length === 0) && jsonData.suppliers && jsonData.suppliers.length > 0) {
            console.log('Loading suppliers from JSON:', jsonData.suppliers.length);
            storage.set('suppliers', jsonData.suppliers);
        }
        if ((!currentWarehouses || currentWarehouses.length === 0) && jsonData.warehouses && jsonData.warehouses.length > 0) {
            console.log('Loading warehouses from JSON:', jsonData.warehouses.length);
            storage.set('warehouses', jsonData.warehouses);
        }
        if ((!currentCategories || currentCategories.length === 0) && jsonData.categories && jsonData.categories.length > 0) {
            console.log('Loading categories from JSON:', jsonData.categories.length);
            storage.set('categories', jsonData.categories);
        }
        
        return true;
    } catch (error) {
        console.log('Error loading JSON data:', error);
        return false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize data first (will only add if empty)
    initializeData();
    
    // Try to load from JSON (will only load if data is empty)
    const loadedFromJSON = await loadDataFromJSON();
    
    // Render all data after DOM is ready
    setTimeout(() => {
        console.log('Initializing and rendering data...');
        const products = storage.get('products');
        const suppliers = storage.get('suppliers');
        const warehouses = storage.get('warehouses');
        const categories = storage.get('categories');
        
        console.log('Products count:', products.length);
        console.log('Suppliers count:', suppliers.length);
        console.log('Warehouses count:', warehouses.length);
        console.log('Categories count:', categories.length);
        
        // Render all sections
        renderProducts();
        renderSuppliers();
        renderWarehouses();
        renderCategories();
        renderPurchaseOrders();
    }, 200);
    
    // Initialize sale discount listener
    const discountInput = document.getElementById('sale-discount');
    const discountType = document.getElementById('sale-discount-type');
    if (discountInput && discountType) {
        discountInput.addEventListener('input', updateSaleTotal);
        discountType.addEventListener('change', updateSaleTotal);
    }
    
    // Initialize purchase order listeners
    const poDiscountInput = document.getElementById('po-discount');
    const poDiscountType = document.getElementById('po-discount-type');
    const poShipping = document.getElementById('po-shipping');
    if (poDiscountInput && poDiscountType && poShipping) {
        poDiscountInput.addEventListener('input', updatePurchaseOrderTotal);
        poDiscountType.addEventListener('change', updatePurchaseOrderTotal);
        poShipping.addEventListener('input', updatePurchaseOrderTotal);
    }
});

