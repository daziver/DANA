document.addEventListener('DOMContentLoaded', () => {
    // --- Seleksi Elemen Global ---
    const pages = document.querySelectorAll('.page');
    const registerPage = document.getElementById('register-page');
    const loginPage = document.getElementById('login-page');
    const appPage = document.getElementById('app-page');
    
    // --- Form ---
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // --- Tombol & Link Navigasi ---
    const gotoLoginLink = document.getElementById('goto-login');
    const gotoRegisterLink = document.getElementById('goto-register');
    const logoutButton = document.getElementById('logout-button');
    const menuToggle = document.getElementById('menu-toggle');
    const navButtons = document.querySelectorAll('.nav-button');

    // --- Tampilan Aplikasi ---
    const balanceDisplay = document.getElementById('balance-display');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const overlay = document.getElementById('overlay');

    // --- Elemen Form Pendaftaran BARU ---
    const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
    const bankSelect = document.getElementById('bank-select');
    const ewalletSelect = document.getElementById('ewallet-select');

    // --- Fungsi Bantuan ---
    const showPage = (pageId) => {
        pages.forEach(page => page.classList.toggle('active', page.id === pageId));
    };

    const showAppContent = (contentId) => {
        contentSections.forEach(section => section.classList.toggle('active', section.id === contentId));
        navButtons.forEach(button => button.classList.toggle('active', button.dataset.target === contentId));
    };

    // --- FUNGSI LOGIN UTAMA ---
    const login = (username) => {
        localStorage.setItem('currentUser', username);
        const userData = JSON.parse(localStorage.getItem(username));
        
        // Mengatur saldo. Jika baru daftar, saldo adalah 0.
        const balance = userData ? userData.balance : 0;
        balanceDisplay.textContent = `Rp ${balance}`;

        showPage('app-page');
        showAppContent('games-content');
    };

    // --- EVENT LISTENER ---

    // 1. Pendaftaran
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('reg-username').value;

        if (localStorage.getItem(username)) {
            alert('Username sudah terdaftar. Silakan gunakan username lain.');
            return;
        }
        
        const selectedAccountType = document.querySelector('input[name="accountType"]:checked').value;
        
        // Simpan semua data pendaftaran ke dalam satu objek
        const userData = {
            username: username,
            password: document.getElementById('reg-password').value, // Di aplikasi nyata, ini harus di-hash!
            phone: document.querySelector('input[placeholder="Nomor HP"]').value,
            whatsapp: document.querySelector('input[placeholder="Nomor WhatsApp"]').value,
            accountType: selectedAccountType,
            bankOrEwallet: selectedAccountType === 'bank' ? bankSelect.value : ewalletSelect.value,
            accountNumber: document.querySelector('input[placeholder="Nomor Rekening / E-wallet"]').value,
            accountName: document.querySelector('input[placeholder="Nama Rekening / E-wallet"]').value,
            balance: 0 // SALDO AWAL OTOMATIS NOL
        };

        // Simpan data user ke localStorage menggunakan username sebagai key
        localStorage.setItem(username, JSON.stringify(userData));

        alert('Pendaftaran berhasil! Anda akan otomatis login.');
        login(username); // Langsung login setelah daftar
    });
    
    // 2. Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const userData = JSON.parse(localStorage.getItem(username));

        if (userData && userData.password === password) {
            alert('Login berhasil!');
            login(username);
        } else {
            alert('Username atau password salah!');
        }
    });

    // 3. Logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        alert('Anda telah logout.');
        showPage('login-page');
    });

    // 4. Pindah antara halaman Login & Daftar
    gotoLoginLink.addEventListener('click', (e) => { e.preventDefault(); showPage('login-page'); });
    gotoRegisterLink.addEventListener('click', (e) => { e.preventDefault(); showPage('register-page'); });

    // 5. Navigasi Konten Aplikasi (Tombol Bawah)
    navButtons.forEach(button => {
        button.addEventListener('click', () => showAppContent(button.dataset.target));
    });

    // 6. Logika untuk Menu Samping (Sidebar)
    const toggleSidebar = () => {
        sidebarMenu.classList.toggle('open');
        overlay.classList.toggle('active');
    };
    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // 7. LOGIKA: Mengontrol pilihan Bank/E-wallet
    accountTypeRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selectedValue = event.target.value;
            const isBank = selectedValue === 'bank';

            bankSelect.classList.toggle('active', isBank);
            bankSelect.disabled = !isBank;

            ewalletSelect.classList.toggle('active', !isBank);
            ewalletSelect.disabled = isBank;
        });
    });
    // Set keadaan awal saat halaman dimuat, panggil 'change' secara manual
    document.querySelector('input[name="accountType"][value="bank"]').dispatchEvent(new Event('change'));

    // --- Logika Halaman Awal ---
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        login(currentUser);
    } else {
        showPage('register-page');
    }
});
