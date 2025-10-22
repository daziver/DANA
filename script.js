document.addEventListener('DOMContentLoaded', () => {
    // --- Seleksi Elemen Global ---
    const pages = document.querySelectorAll('.page');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    // --- Seleksi Elemen Penarikan BARU ---
    const wdBankName = document.getElementById('wd-bank-name');
    const wdAccountNumber = document.getElementById('wd-account-number');
    const wdAccountName = document.getElementById('wd-account-name');
    
    // --- Fungsi Bantuan ---
    const showPage = (pageId) => {
        pages.forEach(page => page.classList.toggle('active', page.id === pageId));
    };

    // --- FUNGSI BARU: Mengisi Info Penarikan ---
    const populateWithdrawalInfo = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) return; // Keluar jika tidak ada user login

        const userData = JSON.parse(localStorage.getItem(currentUser));
        if (!userData) return; // Keluar jika data user tidak ditemukan

        // Mengisi elemen HTML dengan data yang tersimpan
        if(wdBankName) wdBankName.textContent = userData.bankOrEwallet.toUpperCase();
        if(wdAccountNumber) wdAccountNumber.textContent = userData.accountNumber;
        if(wdAccountName) wdAccountName.textContent = userData.accountName;
    };
    
    const showAppContent = (contentId) => {
        contentSections.forEach(section => section.classList.toggle('active', section.id === contentId));
        navButtons.forEach(button => button.classList.toggle('active', button.dataset.target === contentId));
        
        // **LOGIKA BARU DITAMBAHKAN DI SINI**
        // Jika tab penarikan yang dibuka, panggil fungsi untuk mengisi data
        if (contentId === 'withdraw-content') {
            populateWithdrawalInfo();
        }
    };

    const login = (username) => {
        localStorage.setItem('currentUser', username);
        const userData = JSON.parse(localStorage.getItem(username));
        
        const balanceDisplay = document.getElementById('balance-display');
        balanceDisplay.textContent = `Rp ${userData ? userData.balance : 0}`;

        showPage('app-page');
        showAppContent('games-content'); // Default ke halaman game
    };

    // --- EVENT LISTENER ---
    if(registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('reg-username').value;

            if (localStorage.getItem(username)) {
                alert('Username sudah terdaftar.');
                return;
            }
            
            const selectedAccountType = document.querySelector('input[name="accountType"]:checked').value;
            
            // Mengambil data dari form pendaftaran
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
            alert('Pendaftaran berhasil! Anda akan otomatis login.');
            login(username);
        });
    }

    if(loginForm) {
        // ... Logika login tetap sama ...
    }
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => showAppContent(button.dataset.target));
    });

    // ... sisa event listener (logout, sidebar, dll) tetap sama ...

    // --- Logika Halaman Awal ---
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        login(currentUser);
    } else {
        showPage('register-page');
    }
    
    // Inisialisasi logika radio button bank/ewallet
    const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
    const bankSelect = document.getElementById('bank-select');
    const ewalletSelect = document.getElementById('ewallet-select');
    
    const handleAccountTypeChange = (event) => {
        const isBank = event.target.value === 'bank';
        bankSelect.classList.toggle('active', isBank);
        bankSelect.disabled = !isBank;
        ewalletSelect.classList.toggle('active', !isBank);
        ewalletSelect.disabled = isBank;
    };
    
    accountTypeRadios.forEach(radio => radio.addEventListener('change', handleAccountTypeChange));
    
    // Inisialisasi keadaan awal
    const initialRadio = document.querySelector('input[name="accountType"]:checked');
    if(initialRadio) handleAccountTypeChange({ target: initialRadio });

});
