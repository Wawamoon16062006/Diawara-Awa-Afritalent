// COMMIT 6

document.addEventListener('DOMContentLoaded', function() {

    // LES ÉLÉMENTS HTML
    var boutonMode = document.getElementById('btnMode');
    var boutonRetour = document.getElementById('btnRetour');
    var maNavbar = document.querySelector('.navbar');
    
    // NOUVEAUX ÉLÉMENTS
    var toutesLesSections = document.querySelectorAll('.section-cachee');
    var tousLesCompteurs = document.querySelectorAll('.compteur');

   
    //  GESTION DU MODE SOMBRE
   
    var choixUtilisateur = localStorage.getItem('monTheme');

    if (choixUtilisateur === 'sombre') {
        document.body.classList.add('dark');
        if (boutonMode) boutonMode.textContent = "Mode Clair"; 
    }

    if (boutonMode) {
        boutonMode.addEventListener('click', function() {
            document.body.classList.toggle('dark');
            if (document.body.classList.contains('dark')) {
                localStorage.setItem('monTheme', 'sombre');
                boutonMode.textContent = "Mode Clair"; 
            } else {
                localStorage.setItem('monTheme', 'clair');
                boutonMode.textContent = "Mode Sombre"; 
            }
        });
    }

    //GESTION DU SCROLL 
    window.addEventListener('scroll', function() {
        var positionDefilement = window.scrollY;

        if (positionDefilement > 50) {
            if (maNavbar) maNavbar.classList.add('navbar-custom-scroll');
            if (boutonRetour) boutonRetour.style.display = 'block'; 
        } else {
            if (maNavbar) maNavbar.classList.remove('navbar-custom-scroll');
            if (boutonRetour) boutonRetour.style.display = 'none'; 
        }
    });

    if (boutonRetour) {
        boutonRetour.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' 
            });
        });
    }

    // FADE IN 
    var observateurSections = new IntersectionObserver(function(elements) {
        elements.forEach(function(element) {
            
            if (element.isIntersecting) {
                element.target.classList.add('section-visible');
                observateurSections.unobserve(element.target); 
            }
        });
    }, { threshold: 0.05 });
    toutesLesSections.forEach(function(section) {
        observateurSections.observe(section);
    });

    //  COMPTEURS DE STATISTIQUES 
    var observateurCompteurs = new IntersectionObserver(function(elements) {
        elements.forEach(function(element) {
            if (element.isIntersecting) {
                var compteur = element.target;
                var valeurCible = parseInt(compteur.getAttribute('data-valeur'));
                var suffixe = compteur.getAttribute('data-suffixe') || "";
                var valeurActuelle = 0;
                
                var chrono = setInterval(function() {
                    valeurActuelle += Math.ceil(valeurCible / 30); 
                    
                    if (valeurActuelle >= valeurCible) {
                        compteur.textContent = valeurCible + suffixe;
                        clearInterval(chrono);
                    } else {
                        compteur.textContent = valeurActuelle + suffixe;
                    }
                }, 25);
                
                observateurCompteurs.unobserve(compteur); 
            }
        });
    }, { threshold: 0.1 });

    tousLesCompteurs.forEach(function(compteur) {
        observateurCompteurs.observe(compteur);
    });

});