document.addEventListener('click', function (event) {
    console.log(event); // Debug

    try {
        if (/^stand_\d+$/.test(event.target.id) || event.target.id === 'stand_EXT') { // vérifie si l’ID du target correspond à un stand ou à stand_EXT
            console.time('Processus'); // test de performance, non important
            console.log("Condition vérifiée, c’est un stand"); // debug

            let idStandClique = event.target.id; // récupère l’id sous la forme stand_<numéro> ou stand_EXT
            console.log(`id : ${idStandClique}`); // debug

            let stands = document.querySelectorAll('[data-stand]');
            let matchingStands = Array.from(stands).filter(stand => {
                let standData = stand.getAttribute('data-stand');
                try {
                    let standIds = JSON.parse(standData);
                    if (Array.isArray(standIds)) {
                        return standIds.includes(idStandClique);
                    } else {
                        return standIds === idStandClique;
                    }
                } catch (e) {
                    return standData === idStandClique;
                }
            });

            if (matchingStands.length === 0) {
                throw new Error("Stand introuvable: " + idStandClique);
            }

            let nomsStands = matchingStands.map(stand => stand.innerText).join('\n'+`\n`); // récupère les noms des stands et les sépare par des retours à la ligne

            document.getElementById("popup").innerText = nomsStands; // change le texte du popup

            // position de la souris
            let posX = event.pageX;
            let posY = event.pageY;

            // sélectionne le popup
            let popup = document.getElementById("popup");

            // affiche le popup à l’emplacement du clic
            popup.style.left = posX + 'px';
            popup.style.top = posY + 'px';
            popup.style.display = 'block'; // affiche le popup

            document.getElementById("popup").style.opacity = "1"; // rend le popup visible

            // si un timeout est déjà en cours, l'annule
            if (window.currentTimeout) {
                clearTimeout(window.currentTimeout);
            }

            // le popup disparaît après 3 secondes
            window.currentTimeout = setTimeout(function () {
                document.getElementById("popup").style.opacity = "0"; // rend le popup invisible après 3s
                window.currentTimeout = null; // réinitialisation de la référence du timeout
            }, 3000); // partie à modifier pour changer le délai

            console.log("Noms des stands cliqués :", nomsStands);
            console.timeEnd('Processus'); // fin du test de performance
        } else {
            console.log("Ceci n’est pas un stand"); // en cas de clic sur quelque chose qui n’est pas un stand
        }
    } catch (error) {
        console.log("Erreur :", error); // renvoi l’erreur en cas de problème
    }
}, false);