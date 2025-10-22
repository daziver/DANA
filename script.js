document.addEventListener('DOMContentLoaded', () => {
    // --- Seleksi Elemen Global ---
    const pages = document.querySelectorAll('.page');
    const contentSections = document.querySelectorAll('.content-section');
    
    // --- Tombol & Link Utama ---
    const gotoLoginLink = document.getElementById('goto-login');
    const gotoRegisterLink = document.getElementById('goto-register');
    const logoutButton = document.getElementById('logout-button');
    const menuToggle = document.getElementById('menu-toggle'); // Tombol menu hamburger
    const navButtons = document.querySelectorAll('.nav-button'); // Tombol navigasi bawah

    // --- Form ---
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    // --- Tampilan Aplikasi & Sidebar ---
    const balanceDisplay = document.getElementById('balance-display');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('overlay');

    // --- Fungsi Bantuan ---
    const showPage = (pageId) => {
        pages.forEach(page => page.classList.toggle('active', page.id === pageId));
    };

    const showAppContent = (contentId) => {
        contentSections.forEach(section => section.classList.toggle('active', section.id === contentId));
        navButtons.forEach(button => button.classList.toggle('active', button.dataset.target === contentId));
        
        if (contentId === 'withdraw-content') {
            // Jika ada fungsi untuk mengisi info penarikan, panggil di sini
            // populateWithdrawalInfo();
        }
    };
    
    const login = (username) => {
        localStorage.setItem('currentUser', username);
        const userData = JSON.parse(localStorage.getItem(username));
        if(balanceDisplay) {
            balanceDisplay.textContent = `Rp ${userData ? userData.balance : 0}`;
        }
        showPage('app-page');
        showAppContent('games-content');
    };

    // --- EVENT LISTENERS (BAGIAN PENTING) ---

    // 1. Tombol Menu Pojok Kiri Atas (Sidebar)
    const toggleSidebar = () => {
        if (sidebarMenu && overlay) {
            sidebarMenu.classList.toggle('open');
            overlay.classList.toggle('active');
        }
    };
    if (menuToggle) menuToggle.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);

    // 2. Tombol Navigasi Bawah
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            showAppContent(targetId);
        });
    });

    // 3. Tombol Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            alert('Anda telah logout.');
            showPage('login-page');
        });
    }

    // 4. Link Pindah Daftar/Login
    if (gotoLoginLink) gotoLoginLink.addEventListener('click', (e) => { e.preventDefault(); showPage('login-page'); });
    if (gotoRegisterLink) gotoRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showPage('register-page'); });

    // 5. Form Pendaftaran & Login
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;
            if (localStorage.getItem(username)) {
                alert('Username sudah ada.');
                return;
            }
            const userData = { /* ... data user ... */ balance: 0 };
            localStorage.setItem(username, JSON.stringify(userData));
            alert('Pendaftaran berhasil!');
            login(username);
        });
    }
    // ... (sisa logika form) ...
    
    // --- Logika Pilihan Bank/E-wallet di Form Pendaftaran ---
    const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
    const bankSelect = document.getElementById('bank-select');
    const ewalletSelect = document.getElementById('ewallet-select');

    const handleAccountTypeChange = (event) => {
        if (!bankSelect || !ewalletSelect) return;
        const isBank = event.target.value === 'bank';
        bankSelect.classList.toggle('active', isBank);
        bankSelect.disabled = !isBank;
        ewalletSelect.classList.toggle('active', !isBank);
        ewalletSelect.disabled = isBank;
    };
    accountTypeRadios.forEach(radio => radio.addEventListener('change', handleAccountTypeChange));
    const initialRadio = document.querySelector('input[name="accountType"]:checked');
    if (initialRadio) handleAccountTypeChange({ target: initialRadio });

    // --- Logika Halaman Awal ---
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        login(currentUser);
    } else {
        showPage('register-page');
    }
});
