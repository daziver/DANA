// Menunggu sampai semua elemen HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- Seleksi Elemen Halaman ---
    const registerPage = document.getElementById('register-page');
    const loginPage = document.getElementById('login-page');
    const appPage = document.getElementById('app-page');
    const pages = [registerPage, loginPage, appPage];

    // --- Seleksi Elemen Form ---
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const depositForm = document.getElementById('deposit-form');
    const withdrawForm = document.getElementById('withdraw-form');

    // --- Seleksi Elemen Navigasi ---
    const gotoLoginLink = document.getElementById('goto-login');
    const gotoRegisterLink = document.getElementById('goto-register');
    const logoutButton = document.getElementById('logout-button');
    
    // --- Seleksi Tampilan Aplikasi ---
    const userDisplay = document.getElementById('user-display');
    const balanceDisplay = document.getElementById('balance-display');
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    const headerNavButtons = document.querySelectorAll('.header-nav-button');
    const loginUsernameInput = document.getElementById('login-username');

    // --- Seleksi Elemen Info Penarikan ---
    const wdBank = document.getElementById('wd-bank');
    const wdAccountNumber = document.getElementById('wd-account-number');
    const wdAccountName = document.getElementById('wd-account-name');

    // --- Fungsi Bantuan ---

    // Fungsi untuk menampilkan halaman tertentu dan menyembunyikan yang lain
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });
    }

    // Fungsi untuk menampilkan konten di dalam aplikasi (game, deposit, dll)
    function showAppContent(contentId) {
        contentSections.forEach(section => {
            section.classList.toggle('active', section.id === contentId);
        });
        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.target === contentId);
        });
    }
    
    // Fungsi untuk "Login"
    function login(userData) {
        // Simpan seluruh data pengguna sebagai string JSON di localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData)); 

        // Tampilkan data di UI
        userDisplay.textContent = userData.username;
        balanceDisplay.textContent = 'Rp 0'; // Set saldo awal
        
        // Tampilkan info rekening di halaman penarikan
        wdBank.textContent = userData.bank;
        wdAccountNumber.textContent = userData.accountNumber;
        wdAccountName.textContent = userData.accountName;

        showPage('app-page');
        showAppContent('games-content');
    }

    // --- Logika Halaman Awal ---
    
    // Cek apakah ada user yang sudah login sebelumnya
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (loggedInUser) {
        // Jika ada, langsung login
        login(loggedInUser);
    } else {
        // Jika tidak, tampilkan halaman registrasi
        showPage('register-page');
        // PERMINTAAN 3: Cek apakah ada username terakhir yang disimpan
        const lastUsername = localStorage.getItem('lastUsername');
        if (lastUsername) {
            loginUsernameInput.value = lastUsername; // Isi otomatis form login
        }
    }

    // --- Event Listener ---

    // 1. Pendaftaran
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ambil semua data dari form pendaftaran
        const username = document.getElementById('reg-username').value;
        const selectedBank = document.querySelector('input[name="bank"]:checked');
        
        if (!selectedBank) {
            alert('Silakan pilih bank atau e-wallet terlebih dahulu!');
            return;
        }

        // Buat objek untuk menyimpan semua data user
        const newUser = {
            username: username,
            password: "...", // Dalam aplikasi nyata, password harus di-hash
            phone: document.getElementById('reg-phone').value,
            whatsapp: document.getElementById('reg-whatsapp').value,
            bank: selectedBank.value,
            accountNumber: document.getElementById('reg-account-number').value,
            accountName: document.getElementById('reg-account-name').value,
        };
        
        // Simpan data user ke database simulasi (localStorage)
        // Kita gunakan username sebagai key agar mudah dicari
        localStorage.setItem(username, JSON.stringify(newUser));
        // PERMINTAAN 3: Simpan username terakhir untuk auto-fill
        localStorage.setItem('lastUsername', username);

        alert('Pendaftaran berhasil! Anda akan otomatis login.');
        login(newUser); // Langsung login dengan data yang baru dibuat
    });

    // 2. Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginUsernameInput.value;
        
        // Cari data user di localStorage berdasarkan username
        const userDataString = localStorage.getItem(username);

        if (userDataString) {
            const userData = JSON.parse(userDataString);
            alert('Login berhasil!');
            login(userData);
        } else {
            alert('Username tidak ditemukan. Silakan daftar terlebih dahulu.');
        }
    });

    // 3. Logout
    logoutButton.addEventListener('click', () => {
        const lastUsername = JSON.parse(localStorage.getItem('currentUser')).username;
        // PERMINTAAN 3: Simpan username yang baru logout untuk auto-fill nanti
        localStorage.setItem('lastUsername', lastUsername);
        
        localStorage.removeItem('currentUser'); // Hapus sesi login
        
        alert('Anda telah logout.');
        loginUsernameInput.value = lastUsername; // Isi field login dengan username terakhir
        showPage('login-page');
    });

    // 4. Link Pindah Halaman
    gotoLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login-page');
        // Isi username jika ada
        const lastUsername = localStorage.getItem('lastUsername');
        if (lastUsername) {
            loginUsernameInput.value = lastUsername;
        }
    });

    gotoRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('register-page');
    });

    // 5. Navigasi di dalam Aplikasi
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            showAppContent(targetId);
        });
    });

    headerNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            showAppContent(targetId);
        });
    });

    // 6. Simulasi Form Deposit & Penarikan
    depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('deposit-amount').value;
        alert(`Simulasi: Permintaan deposit sebesar Rp ${amount} telah dikirim.`);
        depositForm.reset();
    });

    withdrawForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('withdraw-amount').value;
        alert(`Simulasi: Permintaan penarikan sebesar Rp ${amount} telah dikirim.`);
        withdrawForm.reset();
    });

});
