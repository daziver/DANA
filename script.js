document.addEventListener('DOMContentLoaded', () => {
    // --- Seleksi Elemen Halaman ---
    const pages = document.querySelectorAll('.page');
    const appPage = document.getElementById('app-page');

    // --- Seleksi Elemen Form ---
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const depositForm = document.getElementById('deposit-form');
    const withdrawForm = document.getElementById('withdraw-form');

    // --- Seleksi Elemen Navigasi & Interaktif ---
    const gotoLoginLink = document.getElementById('goto-login');
    const gotoRegisterLink = document.getElementById('goto-register');
    const logoutButton = document.getElementById('logout-button');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('overlay');
    
    // --- Seleksi Tampilan Aplikasi ---
    const userDisplay = document.getElementById('user-display');
    const balanceDisplay = document.getElementById('balance-display');
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    const gameTabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // --- Variabel Penyimpanan ---
    let loggedInUser = localStorage.getItem('simulatedUser');

    // --- Fungsi Bantuan ---

    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.toggle('active', page.id === pageId);
        });
    }

    function showAppContent(contentId) {
        contentSections.forEach(section => {
            section.classList.toggle('active', section.id === contentId);
        });
        navButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.target === contentId);
        });
    }

    function login(username) {
        loggedInUser = username;
        localStorage.setItem('simulatedUser', username);
        // userDisplay.textContent = username; // Username tidak lagi ditampilkan di header
        balanceDisplay.textContent = '38,12'; // Set saldo default
        showPage('app-page');
        showAppContent('games-content');
    }

    // --- Logika Halaman Awal ---
    if (loggedInUser) {
        login(loggedInUser);
    } else {
        showPage('register-page');
    }

    // --- Event Listener ---

    // 1. Pendaftaran
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;
        alert('Pendaftaran berhasil! Anda akan otomatis login.');
        login(username);
    });

    // 2. Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        alert('Login berhasil!');
        login(username);
    });

    // 3. Logout
    logoutButton.addEventListener('click', () => {
        loggedInUser = null;
        localStorage.removeItem('simulatedUser');
        alert('Anda telah logout.');
        showPage('login-page');
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

    // 5. Navigasi di dalam Aplikasi (Tab Utama Bawah)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
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

    // --- FUNGSI BARU: Logika Sidebar ---
    function toggleSidebar() {
        sidebarMenu.classList.toggle('open');
        overlay.classList.toggle('active');
    }
    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // --- FUNGSI BARU: Logika Tab Game (Populer/Terbaru) ---
    gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Hapus kelas aktif dari semua tab
            gameTabs.forEach(t => t.classList.remove('active'));
            // Tambahkan kelas aktif ke tab yang diklik
            tab.classList.add('active');

            const targetContentId = tab.dataset.tab;

            // Sembunyikan semua konten tab
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            // Tampilkan konten yang sesuai
            document.getElementById(targetContentId).classList.add('active');
        });
    });
});
