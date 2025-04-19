// Estructura de datos mejorada
function saveDish(dishName, ingredients) {
    try {
        const dishes = JSON.parse(localStorage.getItem('dishes')) || [];
        dishes.push({
            name: dishName,
            ingredients: ingredients, // Array de {name, type}
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('dishes', JSON.stringify(dishes));
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            alert('No hay espacio suficiente para guardar más platos. Por favor, elimina algunos platos antiguos.');
        } else {
            alert('Error al guardar el plato: ' + error.message);
        }
        return false;
    }
}

function getDishes() {
    return JSON.parse(localStorage.getItem('dishes')) || [];
}

function deleteDish(dishName) {
    try {
        let dishes = getDishes();
        dishes = dishes.filter(dish => dish.name !== dishName);
        localStorage.setItem('dishes', JSON.stringify(dishes));
        
        // También eliminar el plato de selectedDishes si existe
        const selectedDishes = new Map(JSON.parse(localStorage.getItem('selectedDishes') || '[]'));
        if (selectedDishes.has(dishName)) {
            selectedDishes.delete(dishName);
            localStorage.setItem('selectedDishes', JSON.stringify(Array.from(selectedDishes.entries())));
        }
        
        return true;
    } catch (error) {
        alert('Error al eliminar el plato: ' + error.message);
        return false;
    }
}

