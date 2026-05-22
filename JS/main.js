// COMMIT 6

document.addEventListener('DOMContentLoaded', function() {

    // LES ÉLÉMENTS HTML
    var boutonMode = document.getElementById('btnMode');
    var boutonRetour = document.getElementById('btnRetour');
    var maNavbar = document.querySelector('.navbar');

   
    // GESTION DU MODE SOMBRE
    
    
    var choixUtilisateur = localStorage.getItem('monTheme');

    
    if (choixUtilisateur === 'sombre') {
        document.body.classList.add('dark');
        boutonMode.textContent = "Mode Clair"; 
    }

    // Quand on clique sur le bouton Mode
    boutonMode.addEventListener('click', function() {
        
        document.body.classList.toggle('dark');
        
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('monTheme', 'sombre');
            boutonMode.textContent = "Mode Clair"; // 
        } else {
            localStorage.setItem('monTheme', 'clair');
            boutonMode.textContent = "Mode Sombre"; // 
        }
    });


   
    // GESTION DU SCROLL (NAVBAR & BOUTON)


    window.addEventListener('scroll', function() {
        
        var positionDefilement = window.scrollY;

        if (positionDefilement > 50) {
            maNavbar.classList.add('navbar-custom-scroll');
            boutonRetour.style.display = 'block'; 
        } else {
            maNavbar.classList.remove('navbar-custom-scroll');
            boutonRetour.style.display = 'none'; 
        }
    });

    // Quand on clique sur le bouton retour en haut
    boutonRetour.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });

});