// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            
            // Animate hamburger icon
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '';
                });
            }
        });
        // Close nav when link clicked (mobile UX)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 900) {
                    navList.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }
    
    // Get the span element by its ID
    const currentDateSpan = document.getElementById('current-date');

    // Create a new Date object
    const today = new Date();

    // Define options for formatting the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Format the date and update the span's text content
    if (currentDateSpan) {
        currentDateSpan.textContent = today.toLocaleDateString('en-US', options);
    }
    
    // Close banner
    const closeBanner = document.querySelector('.close-banner');
    if (closeBanner) {
        closeBanner.addEventListener('click', function() {
            const infoBanner = this.closest('.info-banner');
            if (infoBanner) {
                infoBanner.style.display = 'none';
            }
        });
    }
    
    // Handle tab switching
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show selected tab pane
            const target = this.getAttribute('data-target');
            if (target) {
                const pane = document.getElementById(target);
                if (pane) {
                    pane.classList.add('active');
                }
            }
            
            // Smooth scroll to section
            const sectionId = this.getAttribute('href');
            if (sectionId) {
                const section = document.querySelector(sectionId);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- Info Banner Close Button ---
    const infoBanner = document.querySelector('.info-banner');
    const closeBannerBtn = document.querySelector('.close-banner');

    if (infoBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            infoBanner.style.display = 'none';
        });
    }

    // --- Profil Section Tabs (Curved Tabs) ---
    const navTabs = document.querySelectorAll('.internal-nav-tabs .nav-tab');
    const tabPanes = document.querySelectorAll('.tab-content-wrapper .tab-pane');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault(); // Mencegah default anchor link behavior (walaupun masih scroll)

            // Remove active class from all tabs and panes
            navTabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Show corresponding pane
            const targetId = this.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Set default active tab on load
    if (navTabs.length > 0) {
        navTabs[0].click(); // Simulate click on the first tab
    }

    // --- Kotak Saran Form 
    const radioAnonim = document.getElementById('anonim');
    const radioDenganNama = document.getElementById('dengan-nama');
    const namaKontakFields = document.getElementById('nama-kontak-fields');

    function toggleNamaKontakFields() {
        if (radioDenganNama.checked) {
            namaKontakFields.style.display = 'block';
        } else {
            namaKontakFields.style.display = 'none';
        }
    }

    if (radioAnonim && radioDenganNama && namaKontakFields) {
        radioAnonim.addEventListener('change', toggleNamaKontakFields);
        radioDenganNama.addEventListener('change', toggleNamaKontakFields);
        toggleNamaKontakFields(); // Set initial state
    }

    // --- Filter Prestasi 
    const filterButtons = document.querySelectorAll('.prestasi-filter .filter-btn');
    const filterTahunSelect = document.querySelector('.prestasi-filter .filter-tahun');
    const prestasiItems = document.querySelectorAll('.prestasi-grid .prestasi-item');

    function filterPrestasi() {
        const activeCategory = document.querySelector('.prestasi-filter .filter-btn.active')?.dataset.filter || 'all';
        const selectedTahun = filterTahunSelect ? filterTahunSelect.value : 'all';

        prestasiItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemTahun = item.dataset.tahun;

            const categoryMatch = (activeCategory === 'all' || itemCategory === activeCategory);
            const tahunMatch = (selectedTahun === 'all' || itemTahun === selectedTahun);

            if (categoryMatch && tahunMatch) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterPrestasi();
        });
    });

    if (filterTahunSelect) {
        filterTahunSelect.addEventListener('change', filterPrestasi);
    }
    filterPrestasi(); // Initial filter on load

    // --- Ingatkan Event Terdekat via WA (Contoh Sederhana) ---
    const remindWaBtn = document.getElementById('remind-wa-btn');

    if (remindWaBtn) {
        remindWaBtn.addEventListener('click', function() {
            const eventName = "Misa Sekolah Besok"; // Ganti dengan event dinamis
            const eventDate = "2 Juni 2025";
            const whatsappText = encodeURIComponent(`Halo, jangan lupa besok ada ${eventName} pada tanggal ${eventDate} di SMA Strada Bhakti Wiyata. Jangan sampai terlewat!`);
            window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
        });
    }

    // Running text (marquee effect)
    const newsTickers = document.getElementById('akademinews');
    if (newsTickers) {
        let idx = 0;
        const items = Array.from(newsTickers.children);
        if (items.length > 1) {
            setInterval(() => {
                items[idx].style.display = 'none';
                idx = (idx + 1) % items.length;
                items[idx].style.display = 'inline';
            }, 4000);
            // Init: show only first
            items.forEach((el, i) => el.style.display = i === 0 ? 'inline' : 'none');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Navigation anchor logic
    function showSection(sectionId) {
        document.querySelectorAll('main > section').forEach(sec => {
            sec.style.display = (sec.id === sectionId) ? 'block' : 'none';
        });
    }
    // Default: show profil
    showSection('profil-sekolah');

    document.getElementById('nav-profil').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('profil-sekolah');
        if (navList.classList.contains('active')) navList.classList.remove('active');
    });
    document.getElementById('nav-prestasi').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('prestasi');
        if (navList.classList.contains('active')) navList.classList.remove('active');
    });
    // Tambahkan event listener untuk menu lain jika ada sectionnya

    // Highlight active nav
    document.querySelectorAll('.nav-list .nav-item a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-list .nav-item a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

 // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });