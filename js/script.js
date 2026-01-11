// NAVIGATION MANAGER
const navLinks = document.querySelectorAll('.nav-link');
const views = document.querySelectorAll('.view-section');

// Initialize views on page load
document.addEventListener('DOMContentLoaded', () => {
    views.forEach(v => {
        if (!v.classList.contains('active')) {
            v.style.display = 'none';
        }
    });
    
    // Initialize all button handlers
    initializeButtons();
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-view');

        // Active UI
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Toggle Views
        views.forEach(v => {
            v.classList.remove('active');
            v.style.display = 'none';
        });

        const targetView = document.getElementById(`view-${target}`);
        if(targetView) {
            targetView.style.display = 'block';
            setTimeout(() => targetView.classList.add('active'), 10);
            
            // Re-render data when switching views to ensure data is displayed
            setTimeout(() => {
                if (typeof renderProducts === 'function' && target === 'products') {
                    renderProducts();
                }
                if (typeof renderSuppliers === 'function' && target === 'suppliers') {
                    renderSuppliers();
                }
                if (typeof renderWarehouses === 'function' && target === 'warehouses') {
                    renderWarehouses();
                }
                if (typeof renderCategories === 'function' && target === 'categories') {
                    renderCategories();
                }
                if (typeof renderPurchaseOrders === 'function' && target === 'purchase-orders') {
                    renderPurchaseOrders();
                }
            }, 50);
        }
    });
});

// DATE DISPLAY
const updateDate = () => {
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        const now = new Date();
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        dateEl.textContent = "Situation au " + now.toLocaleDateString('fr-FR', options);
    }
};

// BUTTON HANDLERS - Use event delegation (only add once)
let buttonsInitialized = false;

function initializeButtons() {
    if (buttonsInitialized) return; // Prevent multiple listeners
    buttonsInitialized = true;
    
    // Use event delegation for all buttons to handle dynamic content
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Handle primary action buttons (Nouvelle Vente, Ajouter, etc.)
        // Check if clicked element is inside a btn-primary or is the button itself
        const btnPrimary = target.closest('.btn-primary') || (target.classList.contains('btn-primary') ? target : null);
        if (btnPrimary) {
            const btn = btnPrimary;
            const btnText = btn.textContent.trim();
            
            if (btnText.includes('Nouvelle Vente')) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof openSaleModal === 'function') {
                    openSaleModal();
                } else {
                    alert('Chargement du formulaire de vente...');
                }
                return;
            }
            
            if (btnText.includes('Ajouter un article')) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof openProductModal === 'function') {
                    openProductModal();
                }
                return;
            }
            
            if (btnText.includes('Nouveau Fournisseur')) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof openSupplierModal === 'function') {
                    openSupplierModal();
                }
                return;
            }
            
            if (btnText.includes('Nouvel Entrepôt')) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof openWarehouseModal === 'function') {
                    openWarehouseModal();
                }
                return;
            }
            
            if (btnText.includes('Nouvelle Commande')) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof openPurchaseOrderModal === 'function') {
                    openPurchaseOrderModal();
                } else {
                    alert('Chargement du formulaire de commande d\'achat...');
                }
                return;
            }
            
            if (btnText.includes('Nouvelle Catégorie')) {
                e.preventDefault();
                e.stopPropagation();
                if (typeof openCategoryModal === 'function') {
                    openCategoryModal();
                }
                return;
            }
            
            if (btnText.includes('Enregistrer les modifications')) {
                e.preventDefault();
                e.stopPropagation();
                alert('Paramètres enregistrés avec succès !\n\nToutes vos modifications ont été sauvegardées.');
                return;
            }
            
            if (btnText.includes('Exporter les données')) {
                e.preventDefault();
                e.stopPropagation();
                alert('Export des données\n\nTéléchargement des données en cours...');
                return;
            }
            
            if (btnText.includes('Importer des données')) {
                e.preventDefault();
                e.stopPropagation();
                alert('Import des données\n\nSélectionnez le fichier à importer.');
                return;
            }
        }
        
        // Handle secondary buttons
        if (target.classList.contains('btn-secondary') || target.closest('.btn-secondary')) {
            const btn = target.classList.contains('btn-secondary') ? target : target.closest('.btn-secondary');
            const btnText = btn.textContent.trim();
            
            if (btnText === 'Annuler') {
                e.preventDefault();
                e.stopPropagation();
                alert('Modifications annulées.\n\nLes changements non sauvegardés ont été annulés.');
                return;
            }
            
            if (btnText === 'Modifier') {
                e.preventDefault();
                e.stopPropagation();
                alert('Modification du mot de passe\n\nOuvrir le formulaire de changement de mot de passe.');
                return;
            }
        }
        
        // Handle "Contacter" button in sidebar
        if (target.classList.contains('btn-contact') || (target.tagName === 'BUTTON' && target.textContent.trim() === 'Contacter')) {
            e.preventDefault();
            e.stopPropagation();
            if (typeof openContactModal === 'function') {
                openContactModal();
            } else {
                alert('Support Premium - Contact\n\nEmail: support@quantummaghrib.ma\nTéléphone: +212 XXX XXX XXX\n\nVotre conseiller dédié vous contactera sous 24h.');
            }
            return;
        }
        
        // Handle action buttons in tables (Modifier, Voir, Détails)
        if (target.tagName === 'BUTTON') {
            const btnText = target.textContent.trim();
            const row = target.closest('tr');
            
            if (btnText === 'Modifier' && row) {
                e.preventDefault();
                e.stopPropagation();
                // Get the view section to determine which modal to open
                const viewSection = row.closest('.view-section');
                if (viewSection) {
                    const viewId = viewSection.id;
                    const button = target;
                    const onclick = button.getAttribute('onclick');
                    if (onclick) {
                        // Execute the onclick handler if it exists
                        eval(onclick);
                    }
                }
                return;
            }
            
            if (btnText === 'Voir' && row) {
                e.preventDefault();
                e.stopPropagation();
                const firstCell = row.querySelector('td:first-child strong');
                const itemName = firstCell ? firstCell.textContent : 'cet élément';
                alert(`Détails de : ${itemName}\n\nAfficher la vue détaillée.`);
                return;
            }
            
            if (btnText === 'Détails' && row) {
                e.preventDefault();
                e.stopPropagation();
                const firstCell = row.querySelector('td:first-child strong');
                const itemName = firstCell ? firstCell.textContent : 'cet élément';
                alert(`Détails de : ${itemName}\n\nAfficher la vue détaillée.`);
                return;
            }
        }
    });
}

// Initialize date on load
updateDate();

// SEARCH FUNCTIONALITY
let searchTimeout;
let originalData = {
    products: null,
    suppliers: null,
    warehouses: null,
    categories: null,
    purchaseOrders: null
};

function performSearch(query) {
    clearTimeout(searchTimeout);
    
    // Debounce search for better performance
    searchTimeout = setTimeout(() => {
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            // If search is empty, restore original data
            restoreOriginalData();
            return;
        }

        // Store original data if not already stored
        if (!originalData.products) {
            originalData.products = storage.get('products');
            originalData.suppliers = storage.get('suppliers');
            originalData.warehouses = storage.get('warehouses');
            originalData.categories = storage.get('categories');
            originalData.purchaseOrders = storage.get('purchaseOrders') || [];
        }

        // Filter and render Products
        const filteredProducts = originalData.products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.reference.toLowerCase().includes(searchTerm) ||
            (p.description && p.description.toLowerCase().includes(searchTerm)) ||
            p.price.toString().includes(searchTerm) ||
            p.stock.toString().includes(searchTerm)
        );
        if (typeof renderProductsWithData === 'function') {
            renderProductsWithData(filteredProducts);
        } else {
            filterTableRows('view-products', searchTerm);
        }

        // Filter and render Suppliers
        const filteredSuppliers = originalData.suppliers.filter(s => 
            s.name.toLowerCase().includes(searchTerm) ||
            s.contact.toLowerCase().includes(searchTerm) ||
            s.email.toLowerCase().includes(searchTerm) ||
            s.phone.toLowerCase().includes(searchTerm) ||
            s.city.toLowerCase().includes(searchTerm)
        );
        if (typeof renderSuppliersWithData === 'function') {
            renderSuppliersWithData(filteredSuppliers);
        } else {
            filterTableRows('view-suppliers', searchTerm);
        }

        // Filter and render Warehouses
        const filteredWarehouses = originalData.warehouses.filter(w => 
            w.name.toLowerCase().includes(searchTerm) ||
            w.address.toLowerCase().includes(searchTerm) ||
            w.city.toLowerCase().includes(searchTerm) ||
            w.capacity.toString().includes(searchTerm)
        );
        if (typeof renderWarehousesWithData === 'function') {
            renderWarehousesWithData(filteredWarehouses);
        } else {
            filterTableRows('view-warehouses', searchTerm);
        }

        // Filter and render Categories
        const filteredCategories = originalData.categories.filter(c => 
            c.name.toLowerCase().includes(searchTerm) ||
            (c.description && c.description.toLowerCase().includes(searchTerm))
        );
        if (typeof renderCategoriesWithData === 'function') {
            renderCategoriesWithData(filteredCategories);
        } else {
            filterTableRows('view-categories', searchTerm);
        }

        // Filter and render Purchase Orders
        const filteredPOs = originalData.purchaseOrders.filter(po => 
            po.reference.toLowerCase().includes(searchTerm) ||
            po.supplierName.toLowerCase().includes(searchTerm) ||
            po.date.includes(searchTerm) ||
            po.deliveryDate.includes(searchTerm) ||
            po.total.toString().includes(searchTerm)
        );
        if (typeof renderPurchaseOrdersWithData === 'function') {
            renderPurchaseOrdersWithData(filteredPOs);
        } else {
            filterTableRows('view-purchase-orders', searchTerm);
        }
    }, 300); // 300ms debounce
}

function filterTableRows(viewId, searchTerm) {
    const view = document.getElementById(viewId);
    if (!view) return;

    const tbody = view.querySelector('tbody');
    if (!tbody) return;

    const rows = Array.from(tbody.querySelectorAll('tr'));
    let hasResults = false;

    rows.forEach(row => {
        // Skip no-results message row
        if (row.classList.contains('no-results-message')) {
            row.style.display = 'none';
            return;
        }

        const rowText = row.textContent.toLowerCase();
        if (rowText.includes(searchTerm)) {
            row.style.display = '';
            hasResults = true;
        } else {
            row.style.display = 'none';
        }
    });

    // Show "no results" message if needed
    let noResultsRow = tbody.querySelector('.no-results-message');
    if (!hasResults && rows.length > 0) {
        if (!noResultsRow) {
            noResultsRow = document.createElement('tr');
            noResultsRow.className = 'no-results-message';
            const colCount = tbody.querySelector('tr:not(.no-results-message)')?.querySelectorAll('td').length || 5;
            noResultsRow.innerHTML = `<td colspan="${colCount}" style="text-align: center; padding: 2rem; color: var(--text-muted);">Aucun résultat trouvé pour "${searchTerm}"</td>`;
            tbody.appendChild(noResultsRow);
        }
        noResultsRow.style.display = '';
    } else if (noResultsRow) {
        noResultsRow.style.display = 'none';
    }
}

function restoreOriginalData() {
    // Restore all original data
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof renderSuppliers === 'function') renderSuppliers();
    if (typeof renderWarehouses === 'function') renderWarehouses();
    if (typeof renderCategories === 'function') renderCategories();
    if (typeof renderPurchaseOrders === 'function') renderPurchaseOrders();
    
    // Remove no-results messages
    document.querySelectorAll('.no-results-message').forEach(msg => {
        msg.style.display = 'none';
    });
}

// Make search function global
window.performSearch = performSearch;

function showSearchInfo() {
    const info = document.getElementById('search-info');
    if (info) {
        setTimeout(() => info.classList.add('show'), 100);
    }
}

function hideSearchInfo() {
    const info = document.getElementById('search-info');
    if (info) {
        setTimeout(() => info.classList.remove('show'), 200);
    }
}

window.showSearchInfo = showSearchInfo;
window.hideSearchInfo = hideSearchInfo;

// Add search storage reference (will use storage from crud.js if available)
if (typeof storage === 'undefined') {
    window.storage = {
        get: (key) => {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        },
        set: (key, data) => {
            localStorage.setItem(key, JSON.stringify(data));
        }
    };
} else {
    // Use existing storage from crud.js
    window.storage = storage;
}

// AUTHENTICATION CHECK
function checkAuth() {
    const session = localStorage.getItem('session') || sessionStorage.getItem('session');
    if (!session) {
        window.location.href = 'index.html';
        return;
    }
    
    try {
        const userData = JSON.parse(session);
        // Update user info in UI
        const userNameEl = document.getElementById('user-name');
        const userRoleEl = document.getElementById('user-role');
        const userAvatarEl = document.getElementById('user-avatar');
        
        if (userNameEl) userNameEl.textContent = userData.name;
        if (userRoleEl) userRoleEl.textContent = userData.role;
        if (userAvatarEl) {
            userAvatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=064e3b&color=fff`;
        }
    } catch (e) {
        console.error('Error parsing session:', e);
        window.location.href = 'index.html';
    }
}

// LOGOUT FUNCTION (global)
window.logout = function() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        localStorage.removeItem('session');
        sessionStorage.removeItem('session');
        window.location.href = 'index.html';
    }
};

// USER MENU DROPDOWN
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    const userMenu = document.getElementById('user-menu');
    const userAvatar = document.getElementById('user-avatar');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userAvatar && userDropdown) {
        userAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
    
    // Initialize notifications
    initializeNotifications();
    loadNotifications();
});

// NOTIFICATIONS SYSTEM
function initializeNotifications() {
    // Create sample notifications if none exist
    if (!localStorage.getItem('notifications')) {
        const sampleNotifications = [
            {
                id: 1,
                type: 'warning',
                title: 'Stock faible',
                message: 'Huile d\'Argan Cosmétique: seulement 45 unités en stock',
                time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                read: false,
                link: 'products'
            },
            {
                id: 2,
                type: 'info',
                title: 'Nouvelle commande',
                message: 'Commande #CMD-ACH-2026-001 en attente de validation',
                time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                read: false,
                link: 'purchase-orders'
            },
            {
                id: 3,
                type: 'success',
                title: 'Livraison effectuée',
                message: 'Commande #CMD-ACH-2026-002 livrée avec succès',
                time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                read: false,
                link: 'purchase-orders'
            },
            {
                id: 4,
                type: 'info',
                title: 'Rapport mensuel',
                message: 'Votre rapport de ventes du mois est disponible',
                time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                read: true,
                link: 'dashboard'
            }
        ];
        localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
    }
}

function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const unreadCount = notifications.filter(n => !n.read).length;
    updateNotificationBadge(unreadCount);
    renderNotifications(notifications);
}

function updateNotificationBadge(count) {
    const badge = document.getElementById('notification-badge');
    if (badge) {
        if (count > 0) {
            badge.classList.remove('hidden');
            badge.textContent = count > 9 ? '9+' : count.toString();
        } else {
            badge.classList.add('hidden');
            badge.textContent = '';
        }
    }
}

function renderNotifications(notifications) {
    const list = document.getElementById('notification-list');
    if (!list) return;

    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="notification-empty">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <p>Aucune notification</p>
            </div>
        `;
        return;
    }

    // Sort by time (newest first)
    const sortedNotifications = [...notifications].sort((a, b) => 
        new Date(b.time) - new Date(a.time)
    );

    list.innerHTML = sortedNotifications.map(notif => {
        const timeAgo = getTimeAgo(new Date(notif.time));
        const iconClass = notif.type || 'info';
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        
        return `
            <div class="notification-item ${!notif.read ? 'unread' : ''}" onclick="openNotification('${notif.link}', ${notif.id})">
                <div class="notification-icon ${iconClass}">${icons[iconClass] || icons.info}</div>
                <div class="notification-content">
                    <div class="notification-title">${notif.title}</div>
                    <div class="notification-message">${notif.message}</div>
                    <div class="notification-time">${timeAgo}</div>
                </div>
            </div>
        `;
    }).join('');
}

function getTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours} h`;
    if (days < 7) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function toggleNotifications() {
    const panel = document.getElementById('notification-panel');
    if (panel) {
        panel.classList.toggle('show');
        if (panel.classList.contains('show')) {
            loadNotifications();
        }
    }
}

function openNotification(link, notificationId) {
    // Mark as read
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
        notification.read = true;
        localStorage.setItem('notifications', JSON.stringify(notifications));
        loadNotifications();
    }

    // Navigate to the link
    if (link) {
        const navLink = document.querySelector(`[data-view="${link}"]`);
        if (navLink) {
            navLink.click();
        }
    }

    // Close panel
    toggleNotifications();
}

function markAllAsRead() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.forEach(n => n.read = true);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    loadNotifications();
}

// Make functions global
window.toggleNotifications = toggleNotifications;
window.openNotification = openNotification;
window.markAllAsRead = markAllAsRead;

// Close notification panel when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('notification-panel');
    const btn = document.getElementById('notification-btn');
    if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
        panel.classList.remove('show');
    }
});

