//message au moi du futur qui devra debugger ce gros bordel : bon courage

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownContent = document.getElementById("dropdownContent");

    
    //création des constantes pour les fonctions ci dessous ici pour factoriser

    const category = document.getElementById("ConstructionBTP");
    const categoryAutomobile = document.getElementById("Automobile");
    const categoryBTS = document.getElementById("Industrie");
    const categorySante = document.getElementById("Sante");
    const categoryDroit = document.getElementById("Droit");
    const categoryHotellerie = document.getElementById("Hotellerie");
    const categoryCommerce = document.getElementById("Commerce");
    const categoryAgriculture = document.getElementById("Agriculture");
    const categoryDefense = document.getElementById("Defense");
    const categoryCommunication = document.getElementById("Communication");
    const categoryFormation = document.getElementById("Formation");
    const categoryMFR = document.getElementById("MFR");


    dropdownButton.addEventListener("click", (e) => {
        e.preventDefault();
        const isDropdownOpen = dropdownContent.style.display === "block";
        category.style.display = "none";
        categoryAutomobile.style.display = "none";
        categoryBTS.style.display = "none";
        categorySante.style.display = "none";
        categoryDroit.style.display = "none";
        categoryHotellerie.style.display = "none";
        categoryCommerce.style.display = "none";
        categoryAgriculture.style.display = "none";
        categoryDefense.style.display = "none";
        categoryCommunication.style.display = "none";
        categoryFormation.style.display = "none";
        categoryMFR.style.display = "none";
        dropdownContent.style.display = isDropdownOpen ? "none" : "block";



        if (!isDropdownOpen) {
            dropdownContent.scrollTop = 0;
        }
    });


    document.addEventListener("click", function (event) {
        
        const isClickInside = dropdownButton.contains(event.target) || dropdownContent.contains(event.target);
        if (!isClickInside) {
            dropdownContent.style.display = "none";
            category.style.display = "none";
            categoryAutomobile.style.display = "none";
            categoryBTS.style.display = "none";
            categorySante.style.display = "none";
            categoryDroit.style.display = "none";
            categoryHotellerie.style.display = "none";
            categoryCommerce.style.display = "none";
            categoryAgriculture.style.display = "none";
            categoryDefense.style.display = "none";
            categoryCommunication.style.display = "none";
            categoryFormation.style.display = "none";
            categoryMFR.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });


    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.toLowerCase();


        const searchItems = [
            ...document.querySelectorAll("#dropdownContent a"),
            ...document.querySelectorAll("#dropdownContent div a")
        ];
        searchItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(filter) ? "block" : "none";
            category.style.display = "none";
            categoryAutomobile.style.display = "block";
            categoryBTS.style.display = "block";
            categorySante.style.display = "block";
            categoryDroit.style.display = "block";
            categoryHotellerie.style.display = "block";
            categoryCommerce.style.display = "block";
            categoryAgriculture.style.display = "block";
            categoryDefense.style.display = "block";
            categoryCommunication.style.display = "block";
            categoryFormation.style.display = "block";
            categoryMFR.style.display = "block";
        });
    });
});

//charge le fichier JSON contenant les infos sur les stands
let standData = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        standData = data;
    })
    .catch(error => console.error('Erreur lors du chargement du fichier JSON:', error));

//accepte le nom du stand
function getSectorFromJson(standName) {
    for (const stand of standData) {
        if (stand.Nom === standName) {
            return stand.Secteur;
        }
    }
    return null;
}

//gère les emplacements qui peuvent être soit une chaîne de caractères soit un tableau
function getStandIdFromName(standName) {
    for (const stand of standData) {
        if (stand.Nom === standName) {
            if (Array.isArray(stand.Emplacements)) {
                return stand.Emplacements;
            } else {
                return stand.Emplacements.split(','); //suppose que les emplacements sont séparés par des virgules
            }
        }
    }
    return [];
}



function handleDropdownClick(e) {
    e.preventDefault();
    const selectedStandName = this.textContent.trim();

    if (!this.classList.contains("Button")) {

        // Ferme la dropdown
        dropdownContent.style.display = "none";
        document.body.style.overflow = "auto";

        // Met à jour le texte du bouton
        dropdownButton.textContent = selectedStandName;

        // Efface le champ de recherche
        searchInput.value = "";

        // Affiche le stand sélectionné
        findStand(selectedStandName);
    }
}

function findStand(selectedStandName) {
    const stands = document.getElementsByClassName("stand");
    const stand2 = document.getElementsByClassName("stand2");
    const stand3 = document.getElementsByClassName("stand3");

    Array.from(stands).forEach((stand) => {
        stand.style.fill = "white";
        stand.innerHTML = "";
    });

    Array.from(stand2).forEach((stand) => {
        stand.style.fill = "white";
        stand.innerHTML = "";
    });

    Array.from(stand3).forEach((stand) => {
        stand.style.fill = "white";
        stand.innerHTML = "";
    });

    // Supprime les cercles et animations existants
    const existingCircles = document.querySelectorAll("circle.highlight");
    existingCircles.forEach(circle => circle.remove());

    const existingAnimations = document.querySelectorAll("animate");
    existingAnimations.forEach(animation => animation.remove());

    if (selectedStandName) {
        const selectedStandIds = getStandIdFromName(selectedStandName);

        selectedStandIds.forEach(selectedStandId => {
            const selectedStand = document.getElementById(selectedStandId.trim());
            const sector = getSectorFromJson(selectedStandName);

            if (selectedStand) {
                const animateStand = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                animateStand.setAttribute("attributeType", "XML");
                animateStand.setAttribute("attributeName", "fill");
                animateStand.setAttribute("values", "blue;white;blue");
                animateStand.setAttribute("dur", "0.8s");
                animateStand.setAttribute("repeatCount", "indefinite");
                selectedStand.appendChild(animateStand);

                const bbox = selectedStand.getBBox();
                const svg = document.querySelector("svg");

                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("class", "highlight");
                circle.setAttribute("cx", bbox.x + bbox.width / 2);
                circle.setAttribute("cy", bbox.y + bbox.height / 2);
                circle.setAttribute("r", Math.max(bbox.width, bbox.height) * 0.7);

                // Définir les couleurs en fonction du secteur
                if (sector === "CONSTRUCTION / BATIMENT TRAVAUX PUBLICS") {
                    circle.setAttribute("stroke", "#33CC33");
                    animateStand.setAttribute("values", "#33CC33;white;#33CC33");
                } else if (sector === "AUTOMOBILE / TRANSPORT / LOGISTIQUE") {
                    circle.setAttribute("stroke", "#FFC000");
                    animateStand.setAttribute("values", "#FFC000;white;#FFC000");
                } else if (sector === "INDUSTRIE & TECHNOLOGIE") {
                    circle.setAttribute("stroke", "#FF0066");
                    animateStand.setAttribute("values", "#FF0066;white;#FF0066");
                } else if (sector === "SANTE_SOCIAL_SERVICE a la PERSONNE") {
                    circle.setAttribute("stroke", "#7030A0");
                    animateStand.setAttribute("values", "#7030A0;white;#7030A0");
                } else if (sector === "DROIT / GESTION / FINANCE / ASSURANCE") {
                    circle.setAttribute("stroke", "#01B0F1");
                    animateStand.setAttribute("values", "#01B0F1;white;#01B0F1");
                } else if (sector === "HOTELLERIE / RESTAURATION / TOURISME / SPORT") {
                    circle.setAttribute("stroke", "#7E6000");
                    animateStand.setAttribute("values", "#7E6000;white;#7E6000");
                } else if (sector === "COMMERCE_IMMOBILIER") {
                    circle.setAttribute("stroke", "#0000FE");
                    animateStand.setAttribute("values", "#0000FE;white;#0000FE");
                } else if (sector === "AGRICULTURE/AGROALIMENTAIRE/NATURE/ENVIRONNEMENT") {
                    circle.setAttribute("stroke", "#385624");
                    animateStand.setAttribute("values", "#385624;white;#385624");
                } else if (sector === "DEFENSE / SECURITE") {
                    circle.setAttribute("stroke", "#7F7F7F");
                    animateStand.setAttribute("values", "#7F7F7F;white;#7F7F7F");
                } else if (sector === "COMMUNICATION_ART_SERVICE NUMERIQUE") {
                    circle.setAttribute("stroke", "#FE0000");
                    animateStand.setAttribute("values", "#FE0000;white;#FE0000");
                } else if (sector === "FORMATION_EDUCATION") {
                    circle.setAttribute("stroke", "#FFFF00");
                    animateStand.setAttribute("values", "#FFFF00;white;#FFFF00");
                } else if (sector === "MFR") {
                    circle.setAttribute("stroke", "#ED7D31");
                    animateStand.setAttribute("values", "#ED7D31;white;#ED7D31");
                } else {
                    circle.setAttribute("stroke", "blue");
                    animateStand.setAttribute("values", "blue;white;blue");
                }

                circle.setAttribute("stroke-width", "2");
                circle.setAttribute("fill", "none");

                const animateCircle = document.createElementNS("http://www.w3.org/2000/svg", "animate");
                animateCircle.setAttribute("attributeType", "XML");
                animateCircle.setAttribute("attributeName", "stroke-opacity");
                animateCircle.setAttribute("values", "1;0;1");
                animateCircle.setAttribute("dur", "0.8s");
                animateCircle.setAttribute("repeatCount", "indefinite");
                circle.appendChild(animateCircle);

                svg.appendChild(circle);

                selectedStand.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    }
}

function genericdropDownSeconde(categoryName) {
    const category = document.getElementById(categoryName);

    if (!category) {
        console.error("Catégorie introuvable:", categoryName)
        return
    }

    if (category.style.display === "block") {
        category.style.display = "none";
    } else {
        category.style.display = "block";
    }
}
