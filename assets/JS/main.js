// 1. Récupération des éléments
var inputFichier = document.getElementById('monFichier');
var zoneEntree = document.getElementById('entree');
var zoneSortie = document.getElementById('sortie');
var boutonBonjour = document.getElementById('btn_bonjour');
var boutonSegmenter = document.getElementById('btn_segmenter');

// 2. Lecture du fichier
inputFichier.addEventListener('change', function(event) {
    var fichier = event.target.files[0];
    var lecteur = new FileReader();
    lecteur.onload = function() {
        zoneEntree.value = lecteur.result;
    };
    lecteur.readAsText(fichier);
});

// 3. Bouton Bonjour
boutonBonjour.onclick = function() {
    alert("Bonjour ! Projet de Soukaina Elkasmi.");
};

// 4. Segmentation (Code conforme aux diapos)
boutonSegmenter.onclick = function() {
    var texte = zoneEntree.value;
    var regex = /[ ,\.?!\n\r\t\(\)\[\]"';:]+/g;
    var tableauMots = texte.split(regex);
    zoneSortie.value = tableauMots.filter(word => word !== "").join("\n");
};
