// Estructura de datos mejorada
function saveDish(dishName, ingredients) {
    try {
        // Aplicar trim al nombre del plato
        const cleanDishName = dishName.trim();
        
        // Obtener platos existentes
        const dishes = JSON.parse(localStorage.getItem('dishes')) || [];
        
        // Verificar si ya existe un plato con el mismo nombre
        if (dishes.some(dish => dish.name.toLowerCase() === cleanDishName.toLowerCase())) {
            alert('Ya existe un plato con ese nombre. Por favor, elige otro nombre.');
            return false;
        }
        
        // Solo aplicar trim a los ingredientes, mantener las mayúsculas/minúsculas originales
        const cleanIngredients = ingredients.map(ingredient => ({
            name: ingredient.name.trim().toLowerCase(),
            type: ingredient.type
        }));

        dishes.push({
            name: cleanDishName,
            ingredients: cleanIngredients,
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





