document.addEventListener('DOMContentLoaded', () => {
    // --- Seleksi Elemen Global ---
    const pages = document.querySelectorAll('.page');
    const contentSections = document.querySelectorAll('.content-section');
    
    // --- Form ---
    const registerForm = document.getElementById('register-form');
    
    // --- Tombol & Link Utama ---
    const gotoLoginLink = document.getElementById('goto-login');
    const logoutButton = document.getElementById('logout-button');
    const menuToggle = document.getElementById('menu-toggle');
    const navButtons = document.querySelectorAll('.nav-button');

    // --- Tampilan Aplikasi & Sidebar ---
    const sidebarMenu = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('overlay');
    
    // --- Elemen Penarikan ---
    const wdBankName = document.getElementById('wd-bank-name');
    const wdAccountNumber = document.getElementById('wd-account-number');
    const wdAccountName = document.getElementById('wd-account-name');

    // --- Fungsi Bantuan ---
    const showPage = (pageId) => {
        pages.forEach(page => page.classList.toggle('active', page.id === pageId));
    };

    const populateWithdrawalInfo = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) return;
        const userData = JSON.parse(localStorage.getItem(currentUser));
        if (!userData) return;

        if(wdBankName) wdBankName.textContent = userData.bankOrEwallet.toUpperCase();
        if(wdAccountNumber) wdAccountNumber.textContent = userData.accountNumber;
        if(wdAccountName) wdAccountName.textContent = userData.accountName;
    };
    
    const showAppContent = (contentId) => {
        contentSections.forEach(section => section.classList.toggle('active', section.id === contentId));
        navButtons.forEach(button => button.classList.toggle('active', button.dataset.target === contentId));
        
        if (contentId === 'withdraw-content') {
            populateWithdrawalInfo();
        }
    };
    
    const login = (username) => {
        localStorage.setItem('currentUser', username);
        const userData = JSON.parse(localStorage.getItem(username));
        const balanceDisplay = document.getElementById('balance-display');
        if(balanceDisplay) balanceDisplay.textContent = `Rp ${userData ? userData.balance : 0}`;
        showPage('app-page');
        showAppContent('games-content');
    };

    // --- EVENT LISTENERS YANG DIPERBAIKI ---

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
        button.addEventListener('click', () => showAppContent(button.dataset.target));
    });

    // 3. Form Pendaftaran
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;
            if (localStorage.getItem(username)) {
                alert('Username sudah ada.');
                return;
            }
            const selectedAccountType = document.querySelector('input[name="accountType"]:checked').value;
            const userData = {
                username: username,
                password: document.getElementById('reg-password').value,
                accountType: selectedAccountType,
                bankOrEwallet: selectedAccountType === 'bank' ? document.getElementById('bank-select').value : document.getElementById('ewallet-select').value,
                accountNumber: document.getElementById('reg-account-number').value,
                accountName: document.getElementById('reg-account-name').value,
                balance: 0 
            };
            localStorage.setItem(username, JSON.stringify(userData));
            alert('Pendaftaran berhasil!');
            login(username);
        });
    }

    // 4. Tombol Logout
    if (logoutButton) logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        alert('Anda telah logout.');
        showPage('login-page');
    });
    
    // 5. Link Pindah Halaman
    if (gotoLoginLink) gotoLoginLink.addEventListener('click', (e) => { e.preventDefault(); showPage('login-page'); });
    
    // Logika Pilihan Bank/E-wallet
    const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
    accountTypeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const bankSelect = document.getElementById('bank-select');
            const ewalletSelect = document.getElementById('ewallet-select');
            if(!bankSelect || !ewalletSelect) return;
            
            const isBank = event.target.value === 'bank';
            bankSelect.classList.toggle('active', isBank);
            bankSelect.disabled = !isBank;
            ewalletSelect.classList.toggle('active', !isBank);
            ewalletSelect.disabled = isBank;
        });
    });
    const initialRadio = document.querySelector('input[name="accountType"]:checked');
    if (initialRadio) initialRadio.dispatchEvent(new Event('change'));

    // --- Logika Halaman Awal ---
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        login(currentUser);
    } else {
        showPage('register-page');
    }
});
