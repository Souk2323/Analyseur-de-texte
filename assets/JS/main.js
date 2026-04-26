const inputFichier = document.getElementById('monFichier');
const zoneEntree = document.getElementById('entree');
const zoneSortie = document.getElementById('sortie');

// Charger le texte d'un fichier
inputFichier.onchange = function(e) {
    const reader = new FileReader();
    reader.onload = () => { zoneEntree.value = reader.result; };
    reader.readAsText(e.target.files[0]);
};

// Bouton Bonjour
document.getElementById('btn_bonjour').onclick = () => alert("Bonjour ! Projet de Soukaina.");

// Fonction pour séparer les mots
function filtrerMots() {
    const regex = new RegExp(document.getElementById('delim').value, "g");
    return zoneEntree.value.split(regex).filter(m => m.length > 0);
}

// Actions des boutons
document.getElementById('btn_segmenter').onclick = () => { zoneSortie.value = filtrerMots().join("\n"); };
document.getElementById('btn_dict').onclick = () => {
    let mots = filtrerMots();
    let dico = {};
    mots.forEach(m => dico[m] = (dico[m] || 0) + 1);
    zoneSortie.value = Object.entries(dico).map(e => `${e[0]} : ${e[1]}`).join("\n");
};
document.getElementById('btn_grep').onclick = () => {
    const p = document.getElementById('pole').value.toLowerCase();
    zoneSortie.value = filtrerMots().filter(m => m.toLowerCase().includes(p)).join("\n");
};
document.getElementById('btn_phrases').onclick = () => {
    const nb = (zoneEntree.value.match(/[.?!]+/g) || []).length;
    zoneSortie.value = "Nombre de phrases : " + nb;
};
document.getElementById('btn_longs').onclick = () => {
    let tri = [...new Set(filtrerMots())].sort((a,b) => b.length - a.length);
    zoneSortie.value = tri.slice(0, 10).join("\n");
};
