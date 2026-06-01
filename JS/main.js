// COMMIT 6

document.addEventListener('DOMContentLoaded', function () {

    // LES ÉLÉMENTS HTML
    var boutonMode = document.getElementById('btnMode');
    var boutonRetour = document.getElementById('btnRetour');
    var maNavbar = document.querySelector('.navbar');

    // NOUVEAUX ÉLÉMENTS
    var toutesLesSections = document.querySelectorAll('.section-cachee');
    var tousLesCompteurs = document.querySelectorAll('.compteur');
    // LES NOUVEAUX ELEMENTS
    var boutonsFiltres = document.querySelectorAll('.btn-filtre');
    var cartesFreelances = document.querySelectorAll('.card-freelance');


    //  GESTION DU MODE SOMBRE

    var choixUtilisateur = localStorage.getItem('monTheme');

    if (choixUtilisateur === 'sombre') {
        document.body.classList.add('dark');
        if (boutonMode) boutonMode.textContent = "Mode Clair";
    }

    if (boutonMode) {
        boutonMode.addEventListener('click', function () {
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
    window.addEventListener('scroll', function () {
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
        boutonRetour.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // FADE IN 
    var observateurSections = new IntersectionObserver(function (elements) {
        elements.forEach(function (element) {

            if (element.isIntersecting) {
                element.target.classList.add('section-visible');
                observateurSections.unobserve(element.target);
            }
        });
    }, { threshold: 0.05 });
    toutesLesSections.forEach(function (section) {
        observateurSections.observe(section);
    });

    //  COMPTEURS DE STATISTIQUES 
    var observateurCompteurs = new IntersectionObserver(function (elements) {
        elements.forEach(function (element) {
            if (element.isIntersecting) {
                var compteur = element.target;
                var valeurCible = parseInt(compteur.getAttribute('data-valeur'));
                var suffixe = compteur.getAttribute('data-suffixe') || "";
                var valeurActuelle = 0;

                var chrono = setInterval(function () {
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
    // FILTRAGE DYNAMIQUE DES FREELANCES

    if (boutonsFiltres.length > 0) {
        boutonsFiltres.forEach(function (bouton) {
            bouton.addEventListener('click', function () {

                boutonsFiltres.forEach(btn => btn.classList.remove('active'));
                bouton.classList.add('active');

                var cible = bouton.getAttribute('data-categorie');

                cartesFreelances.forEach(function (carte) {

                    if (cible === 'all' || carte.classList.contains(cible)) {
                        carte.style.display = 'block';
                    } else {
                        carte.style.display = 'none';
                    }
                });
            });
        });
    }

    // VALIDATION DU FORMULAIRE DE CONTACT

    var formulaireContact = document.getElementById('contactForm');

    if (formulaireContact) {
        formulaireContact.addEventListener('submit', function (evenement) {

            evenement.preventDefault();

            var champNom = document.getElementById('nom');
            var champPrenom = document.getElementById('prenom');
            var champEmail = document.getElementById('email');
            var champSujet = document.getElementById('sujet');
            var champMessage = document.getElementById('message');


            var errNom = document.getElementById('e_nom');
            var errPrenom = document.getElementById('e_prenom');
            var errEmail = document.getElementById('e_email');
            var errSujet = document.getElementById('e_sujet');
            var errMessage = document.getElementById('e_message');


            var formulaireValide = true;

            var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (champNom.value.trim() === "") {
                errNom.textContent = "Le nom est obligatoire.";
                formulaireValide = false;
            } else {
                errNom.textContent = "";
            }


            if (champPrenom.value.trim() === "") {
                errPrenom.textContent = "Le prénom est obligatoire.";
                formulaireValide = false;
            } else {
                errPrenom.textContent = "";
            }


            if (champEmail.value.trim() === "") {
                errEmail.textContent = "L'adresse email est obligatoire.";
                formulaireValide = false;
            } else if (!regexEmail.test(champEmail.value.trim())) {
                errEmail.textContent = "Veuillez entrer un format d'email valide (ex: nom@domaine.com).";
                formulaireValide = false;
            } else {
                errEmail.textContent = "";
            }


            if (champSujet.value === "") {
                errSujet.textContent = "Veuillez choisir un sujet dans la liste.";
                formulaireValide = false;
            } else {
                errSujet.textContent = "";
            }


            var texteMessage = champMessage.value.trim();
            if (texteMessage === "") {
                errMessage.textContent = "Le message ne peut pas être vide.";
                formulaireValide = false;
            } else if (texteMessage.length < 20) {
                errMessage.textContent = "Votre message doit contenir au moins 20 caractères (actuellement : " + texteMessage.length + ").";
                formulaireValide = false;
            } else {
                errMessage.textContent = "";
            }


            if (formulaireValide) {

                var messageSucces = document.getElementById('alerteSucces');

                if (!messageSucces) {
                    messageSucces = document.createElement('div');
                    messageSucces.id = 'alerteSucces';
                    messageSucces.className = "alert alert-success mt-4 text-center";

                    formulaireContact.appendChild(messageSucces);
                }

                messageSucces.textContent = "✨ Votre message a bien été envoyé ! L'équipe AfriTalent vous répondra dans les plus brefs délais.";


                formulaireContact.reset();
            }
        });
    }
    tousLesCompteurs.forEach(function (compteur) {
        observateurCompteurs.observe(compteur);
    });


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