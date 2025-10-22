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
    const balanceDisplay = document.getElementById('balance-display'); // <-- BARU
    const navButtons = document.querySelectorAll('.nav-button'); // Navigasi utama (Games, Deposit, Withdraw)
    const contentSections = document.querySelectorAll('.content-section');
    const headerNavButtons = document.querySelectorAll('.header-nav-button'); // Tombol baru di header

    // --- Variabel Penyimpanan Sederhana ---
    // Kita gunakan localStorage untuk mensimulasikan sesi login
    let loggedInUser = localStorage.getItem('simulatedUser');

    // --- Fungsi Bantuan ---

    // Fungsi untuk menampilkan halaman tertentu dan menyembunyikan yang lain
    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    }

    // Fungsi untuk menampilkan konten di dalam aplikasi (game, deposit, dll)
    function showAppContent(contentId) {
        // Konten
        contentSections.forEach(section => {
            section.classList.toggle('active', section.id === contentId);
        });
        // Tombol Navigasi Utama
        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.target === contentId);
        });
    }

    

    // --- Logika Halaman Awal ---
    if (loggedInUser) {
        // Jika pengguna sudah "login" (ada data di localStorage), langsung ke aplikasi
        login(loggedInUser);
    } else {
        // Jika tidak, tampilkan halaman registrasi
        showPage('register-page');
    }

    // --- Event Listener ---

    // 1. Pendaftaran
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah form mengirim data (refresh)
        const username = document.getElementById('reg-username').value;
        
        // Sesuai permintaan: Setelah daftar, langsung login
        alert('Pendaftaran berhasil! Anda akan otomatis login.');
        login(username);
    });

    // 2. // Fungsi untuk "Login"
    function login(username) {
        loggedInUser = username;
        localStorage.setItem('simulatedUser', username); // Simpan "sesi"
        userDisplay.textContent = username; // Tampilkan nama di header
        balanceDisplay.textContent = 'Rp 0'; // <-- BARIS BARU: Set saldo ke nol
        showPage('app-page'); // Tampilkan halaman aplikasi
        showAppContent('games-content'); // Tampilkan konten game sebagai default
    }Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        alert('Login berhasil!');
        login(username);
    });

    // 3. Logout
    logoutButton.addEventListener('click', () => {
        loggedInUser = null;
        localStorage.removeItem('simulatedUser'); // Hapus "sesi"
        alert('Anda telah logout.');
        showPage('login-page'); // Kembali ke halaman login
    });

    // 4. Link Pindah Halaman
    gotoLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login-page');
    });

    gotoRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('register-page');
    });

    // 5. Navigasi di dalam Aplikasi (Tab Utama)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            showAppContent(targetId);
        });
    });

    // 5b. Navigasi dari Tombol Header (permintaan baru)
    headerNavButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            // Kita panggil fungsi yang sama dengan navigasi utama
            showAppContent(targetId);
        });
    });

    // 6. Simulasi Form Deposit & Penarikan
    depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('deposit-amount').value;
        alert(`Simulasi: Permintaan deposit sebesar ${amount} telah dikirim.`);
        depositForm.reset();
    });

    withdrawForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = document.getElementById('withdraw-amount').value;
        alert(`Simulasi: Permintaan penarikan sebesar ${amount} telah dikirim.`);
        withdrawForm.reset();
    });

});
