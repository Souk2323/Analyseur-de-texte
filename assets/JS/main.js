/**
 * PROJET L2 TAL - ANALYSEUR DE TEXTE
 * Étudiante : Soukaina Elkasmi
 */

// 1. Liaison avec les éléments HTML
var inputFichier = document.getElementById('monFichier');
var zoneEntree = document.getElementById('entree');
var zoneSortie = document.getElementById('sortie');

// 2. Gestionnaire d'événement pour lire le fichier local sélectionné
inputFichier.addEventListener('change', function(e) {
    var reader = new FileReader();
    reader.onload = function() { 
        zoneEntree.value = reader.result; // Affiche le texte chargé dans la zone d'entrée
    };
    reader.readAsText(e.target.files[0]);
});

// 3. Fonction Bonjour : simple alerte pour vérifier le lien JS
document.getElementById('btn_bonjour').onclick = function() {
    alert("Bonjour ! Projet de Soukaina Elkasmi.");
};

/**
 * Fonction utilitaire : récupère le texte, applique la REGEX des délimiteurs
 * et retourne un tableau de mots propres.
 */
function recupererMots() {
    var regex = new RegExp(document.getElementById('delim').value, "g");
    return zoneEntree.value.split(regex).filter(m => m !== "");
}

// 4. SEGMENTATION : Affiche la liste des mots (un par ligne)
document.getElementById('btn_segmenter').onclick = function() {
    var mots = recupererMots();
    zoneSortie.value = mots.join("\n");
};

// 5. DICTIONNAIRE : Calcule la fréquence d'apparition de chaque mot
document.getElementById('btn_dict').onclick = function() {
    var mots = recupererMots();
    var dico = {};
    // On boucle sur les mots pour remplir l'objet dictionnaire
    mots.forEach(m => {
        dico[m] = (dico[m] || 0) + 1;
    });
    // Formatage du résultat pour l'affichage
    var res = "MOT : FRÉQUENCE\n----------------\n";
    for (var m in dico) {
        res += m + " : " + dico[m] + "\n";
    }
    zoneSortie.value = res;
};

// 6. GREP : Cherche toutes les occurrences d'un "pôle" (mot-clé) spécifique
document.getElementById('btn_grep').onclick = function() {
    var pole = document.getElementById('pole').value.toLowerCase();
    if (!pole) return alert("Veuillez entrer un mot dans la case PÔLE.");
    
    // On filtre le tableau de mots pour ne garder que ceux qui contiennent le pôle
    var resultats = recupererMots().filter(m => m.toLowerCase().includes(pole));
    zoneSortie.value = "Occurrences de '" + pole + "' trouvées :\n" + resultats.join("\n");
};

// 7. NOMBRE DE PHRASES : Compte la ponctuation de fin de phrase
document.getElementById('btn_phrases').onclick = function() {
    var texte = zoneEntree.value;
    // On cherche les points, points d'interrogation et d'exclamation
    var nb = (texte.match(/[\.?!]+/g) || []).length;
    zoneSortie.value = "Nombre de phrases détectées : " + nb;
};

// 8. MOTS LES PLUS LONGS : Trie les mots par taille
document.getElementById('btn_longs').onclick = function() {
    // On récupère les mots uniques (Set) pour éviter les doublons
    var motsUniques = [...new Set(recupererMots())];
    // Tri décroissant selon la longueur (length)
    motsUniques.sort((a, b) => b.length - a.length);
    // On affiche les 10 premiers
    zoneSortie.value = "Les 10 mots les plus longs :\n" + motsUniques.slice(0, 10).join("\n");
};
