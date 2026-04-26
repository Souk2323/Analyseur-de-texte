/* PROJET L4INA01 - Programmation Web 2025-2026
   Étudiante : Soukaina El Kasmi (Licence 2)
   Description : Outil d'analyse textuelle (Segmentation, Dictionnaire, etc.)
*/

// Variables globales pour stocker les données du fichier
let contenuTexte = ""; // Stocke le texte brut
let listeMots = [];    // Stocke les mots après segmentation

/**
 * 1. FONCTION DE LECTURE DU FICHIER
 * Cette fonction est appelée quand l'utilisateur choisit un fichier .txt
 */
document.getElementById('fileInput').addEventListener('change', function(event) {
    const fichier = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        // On récupère le résultat de la lecture
        contenuTexte = e.target.result;
        
        // Affichage du texte brut dans la zone de gauche comme demandé
        document.getElementById('affichageGauche').innerText = contenuTexte;
        
        // Mise à jour du message de statut
        document.getElementById('stats').innerText = "Fichier chargé avec succès.";
    };

    if (fichier) {
        reader.readAsText(fichier);
    }
});

/**
 * 2. BOUTON BONJOUR (Message personnalisé)
 * Modifié selon les consignes de la séance 7
 */
document.getElementById('btnBonjour').addEventListener('click', function() {
    alert("Bonjour ! Bienvenue sur l'outil d'analyse de Soukaina El Kasmi.");
});

/**
 * 3. SEGMENTATION DU TEXTE (Séance 8)
 * Utilise les expressions régulières pour découper le texte en mots
 */
document.getElementById('btnSegmentation').addEventListener('click', function() {
    if (!contenuTexte) {
        alert("Erreur : chargez d'abord un fichier .txt");
        return;
    }

    // Récupération des délimiteurs depuis l'input HTML
    let delims = document.getElementById('delims').value;

    /* Utilisation d'une Expression Régulière (RegExp) comme vu en cours :
       - On crée un set de caractères [ ] avec les délimiteurs
       - "g" signifie global (tout le texte)
    */
    let regexDelims = new RegExp("[" + delims.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "]", "g");

    // Étape 1 : On remplace tous les délimiteurs par des espaces
    let texteNettoye = contenuTexte.replace(regexDelims, " ");

    // Étape 2 : On découpe par les espaces (split) et on retire les éléments vides (filter)
    listeMots = texteNettoye.split(/\s+/).filter(mot => mot.length > 0);

    // Affichage des mots séparés par des " | " dans la zone de droite
    document.getElementById('affichageDroit').innerText = listeMots.join(" | ");

    // Mise à jour des statistiques (Tokens et Lignes)
    let nbLignes = contenuTexte.split('\n').length;
    document.getElementById('stats').innerHTML = 
        `Fichier chargé avec succès<br>Nombre de tokens : ${listeMots.length}<br>Nombre de lignes : ${nbLignes}`;
});

/**
 * 4. NOMBRE DE PHRASES
 * Compte les occurrences de la ponctuation de fin de phrase
 */
document.getElementById('btnPhrases').addEventListener('click', function() {
    // On cherche . ! ou ? suivi d'un espace ou fin de ligne
    let matches = contenuTexte.match(/[.!?](\s|$)/g);
    let nbPhrases = matches ? matches.length : 0;
    
    document.getElementById('affichageDroit').innerText = `Il y a ${nbPhrases} phrases dans ce texte.`;
});

/**
 * 5. MOTS LES PLUS LONGS
 * Trie les mots par longueur décroissante
 */
document.getElementById('btnMotsLongs').addEventListener('click', function() {
    if (listeMots.length === 0) return alert("Segmentez le texte d'abord !");

    // On crée une copie pour ne pas modifier l'original, puis on trie
    let trieParLongueur = [...new Set(listeMots)].sort((a, b) => b.length - a.length);
    
    // On prend les 10 premiers
    let top10 = trieParLongueur.slice(0, 10);
    
    // Construction d'un tableau HTML pour le résultat
    let html = "<h3>Mots les plus longs</h3><table border='1'><tr><th>Mot</th><th>Longueur</th></tr>";
    top10.forEach(m => {
        html += `<tr><td>${m}</td><td>${m.length}</td></tr>`;
    });
    html += "</table>";
    
    document.getElementById('affichageDroit').innerHTML = html;
});
