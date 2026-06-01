// COMMIT 6

document.addEventListener('DOMContentLoaded', function () {

    // LES ÉLÉMENTS HTML
    var boutonMode = document.getElementById('btnMode');// BOUTON MODE SOMBRE
    var boutonRetour = document.getElementById('btnRetour');// BOUTON RETOUR EN HAUT DE PAGE
    var maNavbar = document.querySelector('.navbar');// LA NAVBAR

    // NOUVEAUX ÉLÉMENTS
    var toutesLesSections = document.querySelectorAll('.section-cachee'); // LES SECTIONS À FADE IN
    var tousLesCompteurs = document.querySelectorAll('.compteur');// LES COMPTEURS DE STATISTIQUES
    // LES NOUVEAUX ELEMENTS
    var boutonsFiltres = document.querySelectorAll('.btn-filtre');// LES BOUTONS DE FILTRAGE DES FREELANCES
    var cartesFreelances = document.querySelectorAll('.card-freelance');// LES CARTES DES FREELANCES



    //  GESTION DU MODE SOMBRE

    var choixUtilisateur = localStorage.getItem('monTheme');// RÉCUPÉRATION DU CHOIX DE L'UTILISATEUR DANS LE LOCAL STORAGE

    if (choixUtilisateur === 'sombre') {// SI L'UTILISATEUR A CHOISI LE MODE SOMBRE
        document.body.classList.add('dark');// AJOUT DE LA CLASSE "dark" AU BODY
        if (boutonMode) boutonMode.textContent = "Mode Clair";// CHANGEMENT DU TEXTE DU BOUTON
    }// SI L'UTILISATEUR A CHOISI LE MODE CLAIR

    if (boutonMode) {// SI LE BOUTON DE CHANGEMENT DE MODE EXISTE
        boutonMode.addEventListener('click', function () {// AJOUT D'UN ÉCOUTEUR D'ÉVÉNEMENT SUR LE BOUTON
            document.body.classList.toggle('dark');// TOGGLE DE LA CLASSE "dark" AU BODY
            if (document.body.classList.contains('dark')) {// SI LE BODY CONTIENT LA CLASSE "dark"
                localStorage.setItem('monTheme', 'sombre');// ENREGISTREMENT DU CHOIX DE L'UTILISATEUR DANS LE LOCAL STORAGE
                boutonMode.textContent = "Mode Clair";// CHANGEMENT DU TEXTE DU BOUTON
            } else {// SI LE BODY NE CONTIENT PAS LA CLASSE "dark"
                localStorage.setItem('monTheme', 'clair');// ENREGISTREMENT DU CHOIX DE L'UTILISATEUR DANS LE LOCAL STORAGE
                boutonMode.textContent = "Mode Sombre";// CHANGEMENT DU TEXTE DU BOUTON
            }
        });// FIN DE L'ÉCOUTEUR D'ÉVÉNEMENT
    }// FIN DE LA GESTION DU MODE SOMBRE

    //GESTION DU SCROLL 
    window.addEventListener('scroll', function () {// AJOUT D'UN ÉCOUTEUR D'ÉVÉNEMENT SUR LE SCROLL
        var positionDefilement = window.scrollY;// RÉCUPÉRATION DE LA POSITION DE DÉFILEMENT

        if (positionDefilement > 50) {// SI LA POSITION DE DÉFILEMENT EST SUPÉRIEURE À 50
            if (maNavbar) maNavbar.classList.add('navbar-custom-scroll');// AJOUT DE LA CLASSE "navbar-custom-scroll" À LA NAVBAR
            if (boutonRetour) boutonRetour.style.display = 'block';// AFFICHAGE DU BOUTON DE RETOUR EN HAUT DE PAGE
        } else {// SI LA POSITION DE DÉFILEMENT EST INFÉRIEURE OU ÉGALE À 50
            if (maNavbar) maNavbar.classList.remove('navbar-custom-scroll');// SUPPRESSION DE LA CLASSE "navbar-custom-scroll" À LA NAVBAR
            if (boutonRetour) boutonRetour.style.display = 'none';// MASQUAGE DU BOUTON DE RETOUR EN HAUT DE PAGE
        }// FIN DE LA CONDITION
    });// FIN DE L'ÉCOUTEUR D'ÉVÉNEMENT SUR LE SCROLL

    if (boutonRetour) {// SI LE BOUTON DE RETOUR EN HAUT DE PAGE EXISTE
        boutonRetour.addEventListener('click', function () {// AJOUT D'UN ÉCOUTEUR D'ÉVÉNEMENT SUR LE BOUTON DE RETOUR EN HAUT DE PAGE
            window.scrollTo({// DÉFILEMENT VERS LE HAUT DE LA PAGE
                top: 0,// DÉFILEMENT VERS LE HAUT DE LA PAGE
                behavior: 'smooth'// DÉFILEMENT DOUX
            });// FIN DE LA FONCTION DE DÉFILEMENT VERS LE HAUT DE LA PAGE
        });// FIN DE L'ÉCOUTEUR D'ÉVÉNEMENT SUR LE BOUTON DE RETOUR EN HAUT DE PAGE
    }// FIN DE LA GESTION DU SCROLL

    // FADE IN 
    var observateurSections = new IntersectionObserver(function (elements) {// CRÉATION D'UN OBSERVATEUR D'INTERSECTION POUR LES SECTIONS
        elements.forEach(function (element) {// BOUCLE SUR LES ÉLÉMENTS OBSERVÉS

            if (element.isIntersecting) {// SI L'ÉLÉMENT EST DANS LE CHAMP DE VISION
                element.target.classList.add('section-visible');// AJOUT DE LA CLASSE "section-visible" À L'ÉLÉMENT
                observateurSections.unobserve(element.target);// ARRÊT DE L'OBSERVATION DE L'ÉLÉMENT
            }// FIN DE LA CONDITION
        });// FIN DE LA BOUCLE SUR LES ÉLÉMENTS OBSERVÉS
    }, { threshold: 0.05 });// DÉFINITION DU SEUIL D'INTERSECTION À 5%
    toutesLesSections.forEach(function (section) {// BOUCLE SUR LES SECTIONS À OBSERVER
        observateurSections.observe(section);// OBSERVATION DE LA SECTION
    });// FIN DE LA BOUCLE SUR LES SECTIONS À OBSERVER

    //  COMPTEURS DE STATISTIQUES 
    var observateurCompteurs = new IntersectionObserver(function (elements) {// CRÉATION D'UN OBSERVATEUR D'INTERSECTION POUR LES COMPTEURS
        elements.forEach(function (element) {// BOUCLE SUR LES ÉLÉMENTS OBSERVÉS
            if (element.isIntersecting) {// SI L'ÉLÉMENT EST DANS LE CHAMP DE VISION
                var compteur = element.target;// RÉCUPÉRATION DE L'ÉLÉMENT COMPTEUR
                var valeurCible = parseInt(compteur.getAttribute('data-valeur'));// RÉCUPÉRATION DE LA VALEUR CIBLE DU COMPTEUR
                var suffixe = compteur.getAttribute('data-suffixe') || "";//    RÉCUPÉRATION DU SUFFIXE DU COMPTEUR (SI IL EXISTE)
                var valeurActuelle = 0;//   INITIALISATION DE LA VALEUR ACTUELLE DU COMPTEUR

                var chrono = setInterval(function () {//    CRÉATION D'UN INTERVALLE POUR INCRÉMENTER LA VALEUR DU COMPTEUR
                    valeurActuelle += Math.ceil(valeurCible / 30);//    INCRÉMENTATION DE LA VALEUR ACTUELLE DU COMPTEUR

                    if (valeurActuelle >= valeurCible) {//    SI LA VALEUR ACTUELLE DU COMPTEUR EST SUPÉRIEURE OU ÉGALE À LA VALEUR CIBLE
                        compteur.textContent = valeurCible + suffixe;//    AFFECTATION DE LA VALEUR CIBLE AU COMPTEUR
                        clearInterval(chrono);//    ARRÊT DE L'INTERVALLE
                    } else {//    SINON
                        compteur.textContent = valeurActuelle + suffixe;//    AFFECTATION DE LA VALEUR ACTUELLE AU COMPTEUR
                    }//    FIN DE LA CONDITION
                }, 25);//    INTERVALLE DE 25 MILLISECONDES POUR INCRÉMENTER LA VALEUR DU COMPTEUR

                observateurCompteurs.unobserve(compteur);// ARRÊT DE L'OBSERVATION DU COMPTEUR
            }// FIN DE LA CONDITION
        });//   FIN DE LA BOUCLE SUR LES ÉLÉMENTS OBSERVÉS
    }, { threshold: 0.1 });// DÉFINITION DU SEUIL D'INTERSECTION À 10%
    // FILTRAGE DYNAMIQUE DES FREELANCES

    if (boutonsFiltres.length > 0) {// SI LES BOUTONS DE FILTRAGE EXISTENT
        boutonsFiltres.forEach(function (bouton) {//    BOUCLE SUR LES BOUTONS DE FILTRAGE
            bouton.addEventListener('click', function () {//    AJOUT D'UN ÉCOUTEUR D'ÉVÉNEMENT SUR LE BOUTON DE FILTRAGE

                boutonsFiltres.forEach(btn => btn.classList.remove('active'));//    SUPPRESSION DE LA CLASSE "active" SUR TOUS LES BOUTONS DE FILTRAGE
                bouton.classList.add('active');//    AJOUT DE LA CLASSE "active" SUR LE BOUTON DE FILTRAGE CLIQUÉ

                var cible = bouton.getAttribute('data-categorie');//    RÉCUPÉRATION DE LA CATÉGORIE CIBLE DU BOUTON DE FILTRAGE

                cartesFreelances.forEach(function (carte) {//    BOUCLE SUR LES CARTES DES FREELANCES

                    if (cible === 'all' || carte.classList.contains(cible)) {//    SI LA CATÉGORIE CIBLE EST "all" OU SI LA CARTE CONTIENT LA CATÉGORIE CIBLE
                        carte.style.display = 'block';//    AFFICHAGE DE LA CARTE
                    } else {//    SINON
                        carte.style.display = 'none';//    MASQUAGE DE LA CARTE
                    }//    FIN DE LA CONDITION
                });
            });
        });
    }

    // VALIDATION DU FORMULAIRE DE CONTACT

    var formulaireContact = document.getElementById('contactForm');// RÉCUPÉRATION DU FORMULAIRE DE CONTACT

    if (formulaireContact) {// SI LE FORMULAIRE DE CONTACT EXISTE
        formulaireContact.addEventListener('submit', function (evenement) {// AJOUT D'UN ÉCOUTEUR D'ÉVÉNEMENT SUR LE FORMULAIRE DE CONTACT

            evenement.preventDefault();// EMPÊCHEMENT DE L'ENVOI DU FORMULAIRE

            var champNom = document.getElementById('nom');// RÉCUPÉRATION DU CHAMP NOM
            var champPrenom = document.getElementById('prenom');// RÉCUPÉRATION DU CHAMP PRÉNOM
            var champEmail = document.getElementById('email');// RÉCUPÉRATION DU CHAMP EMAIL
            var champSujet = document.getElementById('sujet');// RÉCUPÉRATION DU CHAMP SUJET
            var champMessage = document.getElementById('message');// RÉCUPÉRATION DU CHAMP MESSAGE


            var errNom = document.getElementById('e_nom');// RÉCUPÉRATION DU CHAMP D'ERREUR NOM
            var errPrenom = document.getElementById('e_prenom');// RÉCUPÉRATION DU CHAMP D'ERREUR PRÉNOM
            var errEmail = document.getElementById('e_email');// RÉCUPÉRATION DU CHAMP D'ERREUR EMAIL
            var errSujet = document.getElementById('e_sujet');//    RÉCUPÉRATION DU CHAMP D'ERREUR SUJET
            var errMessage = document.getElementById('e_message');//    RÉCUPÉRATION DU CHAMP D'ERREUR MESSAGE


            var formulaireValide = true;// INITIALISATION DE LA VARIABLE FORMULAIRE VALIDE À TRUE

            var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;// EXPRESSION RÉGULIÈRE POUR VALIDER L'EMAIL


            if (champNom.value.trim() === "") {// SI LE CHAMP NOM EST VIDE
                errNom.textContent = "Le nom est obligatoire.";// AFFECTATION DU TEXTE D'ERREUR AU CHAMP D'ERREUR NOM
                formulaireValide = false;// MISE À JOUR DE LA VARIABLE FORMULAIRE VALIDE À FALSE
            } else {// SINON
                errNom.textContent = "";// SUPPRESSION DU TEXTE D'ERREUR AU CHAMP D'ERREUR NOM
            }// FIN DE LA CONDITION


            if (champPrenom.value.trim() === "") {// SI LE CHAMP PRÉNOM EST VIDE
                errPrenom.textContent = "Le prénom est obligatoire.";// AFFECTATION DU TEXTE D'ERREUR AU CHAMP D'ERREUR PRÉNOM
                formulaireValide = false;// MISE À JOUR DE LA VARIABLE FORMULAIRE VALIDE À FALSE
            } else {// SINON
                errPrenom.textContent = "";// SUPPRESSION DU TEXTE D'ERREUR AU CHAMP D'ERREUR PRÉNOM
            }// FIN DE LA CONDITION


            if (champEmail.value.trim() === "") {// SI LE CHAMP EMAIL EST VIDE
                errEmail.textContent = "L'adresse email est obligatoire.";//    
                formulaireValide = false; // MISE À JOUR DE LA VARIABLE FORMULAIRE VALIDE À FALSE
            } else if (!regexEmail.test(champEmail.value.trim())) {// SI LE CHAMP EMAIL N'EST PAS VALIDE
                errEmail.textContent = "Veuillez entrer un format d'email valide (ex: nom@domaine.com).";// AFFECTATION DU TEXTE D'ERREUR AU CHAMP D'ERREUR EMAIL
                formulaireValide = false;// 
            } else {// SINON
                errEmail.textContent = "";// SUPPRESSION DU TEXTE D'ERREUR AU CHAMP D'ERREUR EMAIL
            }// FIN DE LA CONDITION


            if (champSujet.value === "") {// SI LE CHAMP SUJET EST VIDE
                errSujet.textContent = "Veuillez choisir un sujet dans la liste.";// AFFECTATION DU TEXTE D'ERREUR AU CHAMP D'ERREUR SUJET
                formulaireValide = false;// MISE À JOUR DE LA VARIABLE FORMULAIRE VALIDE À FALSE
            } else {// SINON
                errSujet.textContent = "";// SUPPRESSION DU TEXTE D'ERREUR AU CHAMP D'ERREUR SUJET
            }// FIN DE LA CONDITION


            var texteMessage = champMessage.value.trim();// RÉCUPÉRATION DU TEXTE DU CHAMP MESSAGE
            if (texteMessage === "") {// SI LE CHAMP MESSAGE EST VIDE
                errMessage.textContent = "Le message ne peut pas être vide.";// AFFECTATION DU TEXTE D'ERREUR AU CHAMP D'ERREUR MESSAGE
                formulaireValide = false;// MISE À JOUR DE LA VARIABLE FORMULAIRE VALIDE À FALSE
            } else if (texteMessage.length < 20) {// SI LE CHAMP MESSAGE CONTIENT MOINS DE 20 CARACTÈRES
                errMessage.textContent = "Votre message doit contenir au moins 20 caractères (actuellement : " + texteMessage.length + ").";// AFFECTATION DU TEXTE D'ERREUR AU CHAMP D'ERREUR MESSAGE
                formulaireValide = false;// MISE À JOUR DE LA VARIABLE FORMULAIRE VALIDE À FALSE
            } else {// SINON
                errMessage.textContent = "";// SUPPRESSION DU TEXTE D'ERREUR AU CHAMP D'ERREUR MESSAGE
            }// FIN DE LA CONDITION


            if (formulaireValide) {// SI LE FORMULAIRE EST VALIDE

                var messageSucces = document.getElementById('alerteSucces');// RÉCUPÉRATION DE L'ÉLÉMENT D'ALERTE DE SUCCÈS

                if (!messageSucces) {// SI L'ÉLÉMENT D'ALERTE DE SUCCÈS N'EXISTE PAS
                    messageSucces = document.createElement('div');// CRÉATION D'UN NOUVEL ÉLÉMENT DIV POUR L'ALERTE DE SUCCÈS
                    messageSucces.id = 'alerteSucces';// AFFECTATION DE L'ID À L'ÉLÉMENT DIV
                    messageSucces.className = "alert alert-success mt-4 text-center";// AFFECTATION DE LA CLASSE À L'ÉLÉMENT DIV

                    formulaireContact.appendChild(messageSucces);// 
                }// AJOUT DE L'ÉLÉMENT D'ALERTE DE SUCCÈS AU FORMULAIRE DE CONTACT

                messageSucces.textContent = "✨ Votre message a bien été envoyé ! L'équipe AfriTalent vous répondra dans les plus brefs délais.";// AFFECTATION DU TEXTE À L'ÉLÉMENT D'ALERTE DE SUCCÈS


                formulaireContact.reset();// RÉINITIALISATION DU FORMULAIRE DE CONTACT
            }// FIN DE LA CONDITION SI LE FORMULAIRE EST VALIDE
        });// FIN DE L'ÉCOUTEUR D'ÉVÉNEMENT SUR LE FORMULAIRE DE CONTACT
    }
    tousLesCompteurs.forEach(function (compteur) {//
        observateurCompteurs.observe(compteur)// OBSERVATION DE CHAQUE COMPTEUR
    });// FIN DE LA BOUCLE SUR LES COMPTEURS


    // LE CODE 3D POUR LA PAGE TARIFS

    var conteneur3D = document.getElementById('fond-3d-three');

    if (conteneur3D) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        conteneur3D.appendChild(renderer.domElement);


        const nbParticules = 150;
        const geometrie = new THREE.BufferGeometry();
        const positions = new Float32Array(nbParticules * 3);
        const vitesses = [];

        for (let i = 0; i < nbParticules * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 500;
            positions[i + 1] = (Math.random() - 0.5) * 500;
            positions[i + 2] = (Math.random() - 0.5) * 500;
            vitesses.push((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.8);
        }

        geometrie.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const matierePoints = new THREE.PointsMaterial({
            color: 0xb6593a,
            size: 4,
            transparent: true,
            opacity: 0.8
        });

        const systemePoints = new THREE.Points(geometrie, matierePoints);
        scene.add(systemePoints);


        function animationThree() {
            requestAnimationFrame(animationThree);
            const coords = geometrie.attributes.position.array;

            for (let i = 0; i < nbParticules * 3; i += 3) {
                coords[i] += vitesses[i];
                coords[i + 1] += vitesses[i + 1];

                if (Math.abs(coords[i]) > 250) vitesses[i] *= -1;
                if (Math.abs(coords[i + 1]) > 250) vitesses[i + 1] *= -1;
            }
            geometrie.attributes.position.needsUpdate = true;


            systemePoints.rotation.y += 0.001;
            systemePoints.rotation.x += 0.0005;
            renderer.render(scene, camera);
        }
        animationThree();


        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    // CODE 3D POUR LA PAGE ABOUT 

    var conteneurAbout = document.getElementById('fond-3d-about');

    if (conteneurAbout) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 1000;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        conteneurAbout.appendChild(renderer.domElement);

        const geometrieAbout = new THREE.BufferGeometry();
        const positionsAbout = new Float32Array(400 * 3);

        for (let i = 0; i < 400 * 3; i++) {
            positionsAbout[i] = THREE.MathUtils.randFloatSpread(2000);
        }

        geometrieAbout.setAttribute('position', new THREE.BufferAttribute(positionsAbout, 3));

        const matierePointsAbout = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 6,
            transparent: true,
            opacity: 0.7
        });

        const nuageDeTalents = new THREE.Points(geometrieAbout, matierePointsAbout);
        scene.add(nuageDeTalents);

        function animationAbout() {
            requestAnimationFrame(animationAbout);
            nuageDeTalents.rotation.x += 0.0005;
            nuageDeTalents.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animationAbout();

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // CODE 3D POUR LA PAGE CONTACT

    var conteneurContact = document.getElementById('fond-3d-contact');

    if (conteneurContact) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 300;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        conteneurContact.appendChild(renderer.domElement);


        const largeur = 60;
        const hauteur = 60;
        const nbPoints = largeur * hauteur;
        const geometrieContact = new THREE.BufferGeometry();
        const positionsContact = new Float32Array(nbPoints * 3);

        let index = 0;
        for (let x = 0; x < largeur; x++) {
            for (let y = 0; y < hauteur; y++) {

                positionsContact[index] = (x - largeur / 2) * 12;
                positionsContact[index + 1] = (y - hauteur / 2) * 12;
                positionsContact[index + 2] = 0;
                index += 3;
            }
        }

        geometrieContact.setAttribute('position', new THREE.BufferAttribute(positionsContact, 3));


        const matiereContact = new THREE.PointsMaterial({
            color: 0xb6593a,
            size: 3,
            transparent: true,
            opacity: 0.4
        });

        const surfaceFluide = new THREE.Points(geometrieContact, matiereContact);
        scene.add(surfaceFluide);


        let horloge = 0;

        function animationContact() {
            requestAnimationFrame(animationContact);

            horloge += 0.01;
            const coords = geometrieContact.attributes.position.array;
            let idx = 0;

            for (let x = 0; x < largeur; x++) {
                for (let y = 0; y < hauteur; y++) {

                    coords[idx + 2] = Math.sin(x * 0.1 + horloge) * 30 + Math.cos(y * 0.1 + horloge) * 30;
                    idx += 3;
                }
            }

            geometrieContact.attributes.position.needsUpdate = true;


            surfaceFluide.rotation.x = 0.8;
            surfaceFluide.rotation.y = 0.2;

            renderer.render(scene, camera);
        }
        animationContact();

        window.addEventListener('resize', function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
});