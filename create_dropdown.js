let nombreStand = 0;
let tableauSecteurs = [];
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération du fichier JSON");
        }
        return response.json(); //conversion en tableau
    })
    .then(data => {

        data.forEach(() => {
            nombreStand++;
        });

        console.log(`Nombre total de stands: ${nombreStand}`);

        // Objet qui va contenir les secteurs
        window.secteurs = {}

        data.forEach((obj) => {
            // On récupère l'array du secteur souhaité (si on le trouve pas, on crée un array vide)
            window.secteur = window.secteurs[obj.Secteur] || [];

            // On ajoute l'objet à la liste du secteur
            secteur.push(obj);

            // On mets l'array secteur modifié dans l'objet
            window.secteurs[obj.Secteur] = window.secteur;
        });

        // Exploitation des data et projection 
        console.log(window.secteur); //debug ----
        console.log(window.secteurs); //debug ----

        for (const [secteur, stands] of Object.entries(window.secteurs)) {
            tableauSecteurs.push(secteur, stands);
            stands.forEach((stand) => {
                let containerId = null;

                switch (secteur) {
                    case "FORMATION_EDUCATION": //  enregistrement ok, id ok
                        containerId = "Formation";
                        break;
                    case "INDUSTRIE & TECHNOLOGIE": // enregistrement ok, id ok
                        containerId = "Industrie";
                        break;
                    case "AGRICULTURE/AGROALIMENTAIRE/NATURE/ENVIRONNEMENT": // enregistrement ok, id ok
                        containerId = "Agriculture";
                        break;
                    case "AUTOMOBILE / TRANSPORT / LOGISTIQUE": // enregistrement ok, id ok
                        containerId = "Automobile";
                        break;
                    case "HOTELLERIE / RESTAURATION / TOURISME / SPORT": // enregistrement ok, id ok
                        containerId = "Hotellerie";
                        break;   
                    case "DROIT / GESTION / FINANCE / ASSURANCE": // enregistrement ok, id ok
                        containerId = "Droit";
                        break;
                    case "DEFENSE / SECURITE": // enregistrement ok, id ok
                        containerId = "Defense";
                        break;
                    case "CONSTRUCTION / BATIMENT TRAVAUX PUBLICS": // enregistrement ok, id ok
                        containerId = "ConstructionBTP";
                        break;
                    case "SANTE_SOCIAL_SERVICE a la PERSONNE": //ERREUR À L’ENREGISTREMENT, id ok
                        containerId = "Sante";
                        break;
                    case "COMMERCE_IMMOBILIER": // enregistrement ok, deux stands incorrects
                        containerId = "Commerce";
                        break;
                    case "COMMUNICATION_ART_SERVICE NUMERIQUE": //ERREUR À L’ENREGISTREMENT, id ok
                        containerId = "Communication";
                        break;
                    case "MFR":
                        containerId = "MFR"; //ERREUR À L’ENREGISTREMENT, id ok
                        break;
                    default:
                        console.error("Secteur inconnu:", secteur);
                        return;
                }

                
                let newElement = document.createElement('a'); // construction de l’element html
                newElement.href = `#`;
                if (Array.isArray(stand.Emplacements)) {
                    newElement.setAttribute('data-stand', JSON.stringify(stand.Emplacements));
                } else {
                    newElement.setAttribute('data-stand', stand.Emplacements);
                }
                newElement.innerText = stand.Nom;
                newElement.onclick = handleDropdownClick;
                // debugger
                document.getElementById(containerId).appendChild(newElement);
            })
        }

    })
    .catch(error => {
        console.error("Erreur :", error);
    });
console.log(tableauSecteurs); //debug ----