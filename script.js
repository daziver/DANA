// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen yang dibutuhkan
    const openButton = document.getElementById('open-sidebar-btn'); // Tombol Tiktik 3
    const sidebar = document.getElementById('sidebar-menu');
    const closeButton = document.querySelector('.sidebar-menu .close-btn');
    const overlay = document.getElementById('sidebar-overlay');

    // 1. Fungsi untuk MEMBUKA Sidebar saat tombol Tiktik 3 diklik
    if (openButton) {
        openButton.onclick = function() {
            sidebar.classList.add('open');
            overlay.style.display = 'block';
        };
    }

    // 2. Fungsi untuk MENUTUP Sidebar (Tombol X)
    if (closeButton) {
        closeButton.onclick = function() {
            sidebar.classList.remove('open');
            overlay.style.display = 'none';
        };
    }

    // 3. Fungsi untuk MENUTUP Sidebar (Klik di luar menu/overlay)
    if (overlay) {
        overlay.onclick = function() {
            sidebar.classList.remove('open');
            overlay.style.display = 'none';
        };
    }
});
