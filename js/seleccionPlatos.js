document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el Map con los platos guardados en localStorage
    const selectedPlates = new Map(JSON.parse(localStorage.getItem('selectedDishes') || '[]'));
    const plateCounter = document.getElementById('plate-counter');

    function updatePlateCounter() {
        let totalPlates = 0;
        selectedPlates.forEach(quantity => {
            totalPlates += quantity;
        });
        plateCounter.textContent = `Platos: ${totalPlates}`;
    }

    function updatePlatesDisplay() {
        const dishes = getDishes();
        const panPlates = document.getElementById('pan-plates');
        const hamburguesaPlates = document.getElementById('hamburguesa-plates');
        const extraPlates = document.getElementById('extra-plates');

        // Limpiar las listas
        panPlates.innerHTML = '';
        hamburguesaPlates.innerHTML = '';
        extraPlates.innerHTML = '';

        // Clasificar y mostrar los platos
        dishes.forEach(dish => {
            const plateButton = document.createElement('button');
            plateButton.className = 'plate-button';
            plateButton.textContent = dish.name;
            
            plateButton.addEventListener('click', () => addPlate(dish));

            // Determinar el tipo de plato basado en sus ingredientes
            const hasHamburguesa = dish.ingredients.some(ing => ing.type === 'Hamburguesa');
            const hasPan = dish.ingredients.some(ing => ing.type === 'Pan');
            const hasExtra = dish.ingredients.some(ing => ing.type === 'Extra');

            if (hasHamburguesa) {
                hamburguesaPlates.appendChild(plateButton);
            } else if (hasPan) {
                panPlates.appendChild(plateButton);
            } else if (hasExtra) {
                extraPlates.appendChild(plateButton);
            }
        });

        updateSelectedPlatesList();
        updatePlateCounter();
    }

    function addPlate(dish) {
        const currentQuantity = selectedPlates.get(dish.name) || 0;
        selectedPlates.set(dish.name, currentQuantity + 1);
        localStorage.setItem('selectedDishes', JSON.stringify(Array.from(selectedPlates.entries())));
        updateSelectedPlatesList();
        updatePlateCounter();
    }

    function updateSelectedPlatesList() {
        const selectedPlatesList = document.getElementById('selected-plates-list');
        selectedPlatesList.innerHTML = '';

        selectedPlates.forEach((quantity, plateName) => {
            const plateItem = document.createElement('div');
            plateItem.className = 'selected-plate-item';
            
            plateItem.innerHTML = `
                <span>${plateName} (${quantity})</span>
                <button onclick="removePlate('${plateName}')" class="delete-dish">X</button>
            `;
            selectedPlatesList.appendChild(plateItem);
        });
    }

    window.removePlate = (plateName) => {
        selectedPlates.delete(plateName);
        localStorage.setItem('selectedDishes', JSON.stringify(Array.from(selectedPlates.entries())));
        updatePlatesDisplay();
    };

    document.getElementById('calculate-ingredients').addEventListener('click', () => {
        window.location.href = 'ListarObjetos.html';
    });

    // Cargar platos inicialmente
    updatePlatesDisplay();
});


