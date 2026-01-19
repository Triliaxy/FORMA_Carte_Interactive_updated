document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/dropdown')
        .then(response => response.text())
        .then(html => {
            document.getElementById('custum_dropdown').innerHTML = html;
            // Déclenchement de l'événement personnalisé après l'insertion du contenu
            const event = new Event('dropdownContentLoaded');
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error('Error fetching dropdown content:', error);
        });
});