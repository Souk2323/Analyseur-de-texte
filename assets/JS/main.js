var inputFichier = document.getElementById('monFichier');
var zoneEntree = document.getElementById('entree');
var zoneSortie = document.getElementById('sortie');

// Lecture du fichier
inputFichier.addEventListener('change', function(e) {
    var reader = new FileReader();
    reader.onload = function() { zoneEntree.value = reader.result; };
    reader.readAsText(e.target.files[0]);
});

// Bonjour
document.getElementById('btn_bonjour').onclick = function() {
    alert("Bonjour ! Projet de Soukaina Elkasmi.");
};

// Fonction pour récupérer les mots
function recupererMots() {
    var regex = new RegExp(document.getElementById('delim').value, "g");
    return zoneEntree.value.split(regex).filter(m => m !== "");
}

// SEGMENTATION
document.getElementById('btn_segmenter').onclick = function() {
    zoneSortie.value = recupererMots().join("\n");
};

// DICTIONNAIRE
document.getElementById('btn_dict').onclick = function() {
    var mots = recupererMots();
    var dico = {};
    mots.forEach(m => dico[m] = (dico[m] || 0) + 1);
    var res = "MOT : FREQUENCE\n----------------\n";
    for (var m in dico) { res += m + " : " + dico[m] + "\n"; }
    zoneSortie.value = res;
};

// GREP
document.getElementById('btn_grep').onclick = function() {
    var pole = document.getElementById('pole').value.toLowerCase();
    if (!pole) return alert("Entrez un mot dans la case PÔLE");
    var resultats = recupererMots().filter(m => m.toLowerCase().includes(pole));
    zoneSortie.value = "Occurrences de '" + pole + "' :\n" + resultats.join("\n");
};

// NOMBRE DE PHRASES
document.getElementById('btn_phrases').onclick = function() {
    var texte = zoneEntree.value;
    var nb = (texte.match(/[\.?!]+/g) || []).length;
    zoneSortie.value = "Nombre de phrases détectées : " + nb;
};

// MOTS LES PLUS LONGS
document.getElementById('btn_longs').onclick = function() {
    var motsUniques = [...new Set(recupererMots())];
    motsUniques.sort((a, b) => b.length - a.length);
    zoneSortie.value = "Les 10 mots les plus longs :\n" + motsUniques.slice(0, 10).join("\n");
};
