// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen yang dibutuhkan
    const openButton = document.getElementById('open-sidebar-btn'); 
    const sidebar = document.getElementById('sidebar-menu');
    const closeButton = document.querySelector('.sidebar-menu .close-btn');
    const overlay = document.getElementById('sidebar-overlay');

    // 1. Fungsi untuk MEMBUKA Sidebar saat tombol Tiktik 3 diklik
    if (openButton) {
        openButton.onclick = function() {
            sidebar.classList.add('open');
            overlay.style.display = 'block';
            // Menonaktifkan scroll di body saat menu terbuka
            document.body.style.overflow = 'hidden'; 
        };
    }

    // 2. Fungsi untuk MENUTUP Sidebar (Tombol X dan Overlay)
    const closeSidebar = () => {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Mengaktifkan kembali scroll
    }

    if (closeButton) {
        closeButton.onclick = closeSidebar;
    }

    if (overlay) {
        overlay.onclick = closeSidebar;
    }
});
