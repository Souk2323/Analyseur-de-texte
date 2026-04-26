let texteBrut = "";

// 1. Charger le fichier .txt
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        texteBrut = event.target.result;
        document.getElementById('affichageGauche').innerText = texteBrut;
    };
    reader.readAsText(file);
});

// 2. Segmentation (avec l'objet RegExp comme demandé au cours)
document.getElementById('btnSegmentation').addEventListener('click', function() {
    const d = document.getElementById('delims').value;
    // On échappe les caractères spéciaux pour la Regex
    const escapeRegex = d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp("[" + escapeRegex + "]", "g");
    
    // Découpage
    const tokens = texteBrut.replace(re, " ").split(/\s+/).filter(m => m.length > 0);
    
    document.getElementById('affichageDroit').innerText = tokens.join(" | ");
    document.getElementById('stats').innerText = "Nombre de formes : " + tokens.length;
});

// 3. Bouton Bonjour
document.getElementById('btnBonjour').addEventListener('click', function() {
    alert("Bonjour ! Bienvenue sur l'analyseur de Soukaina.");
});

// 4. Bouton Aide
document.getElementById('btnAide').addEventListener('click', function() {
    const aideDiv = document.getElementById('aide');
    if (aideDiv.style.display === "none") {
        aideDiv.style.display = "block";
    } else {
        aideDiv.style.display = "none";
    }
});
