import data from './public/data.json' with {type : "json"};

/**
 * fonction qui va créer un objet contenant les stands par secteur
 *
 * @export
 */
export function create_dd() {
    let nombreStand = 0;
    let secteurs = {}
    let tableauSecteurs = [];
    
    // let domaineConstruction = 'CONSTRUCTION / BATIMENT TRAVAUX PUBLICS'    
    // let domaineAutomobile = 'AUTOMOBILE / TRANSPORT / LOGISTIQUE'
    // let domaineIndustrie = 'INDUSTRIE & TECHNOLOGIE'
    // let domaineSante = 'SANTE_SOCIAL_SERVICE a la PERSONNE'
    // let domaineDroit = 'DROIT / GESTION / FINANCE / ASSURANCE'
    // let domaineHotellerie = 'HOTELLERIE / RESTAURATION / TOURISME / SPORT'
    // let domaineCommerce = 'COMMERCE_IMMOBILIER'
    // let domaineAgriculture = 'AGRICULTURE/AGROALIMENTAIRE/NATURE/ENVIRONNEMENT'
    // let domaineDefense = 'DEFENSE / SECURITE'
    // let domaineCommunication = 'COMMUNICATION_ART_SERVICE NUMERIQUE'
    // let domaineFormation = 'FORMATION_EDUCATION'
    // let domaineMfr = 'MFR'


    data.forEach(() => {
        nombreStand++;
    });

    // console.log(`Nombre total de stands: ${nombreStand}`);

    // Objet qui va contenir les secteurs

    data.forEach((obj) => {
        // On récupère l'array du secteur souhaité (si on le trouve pas, on crée un array vide)
        let secteur = secteurs[obj.Secteur] || [];

        // On ajoute l'objet à la liste du secteur
        secteur.push(obj);

        // On mets l'array secteur modifié dans l'objet
        secteurs[obj.Secteur] = secteur;
    });
    for (const [secteur, stands] of Object.entries(secteurs)) {
        tableauSecteurs.push(secteur, stands);
        
    }
    // console.log(tableauSecteurs);
    console.log(secteurs);
    return secteurs;
}

