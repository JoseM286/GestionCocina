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

function updateDish(originalName, newName, ingredients) {
    try {
        const cleanNewName = newName.trim();
        let dishes = getDishes();
        
        // Si el nombre cambió, verificar que el nuevo nombre no exista
        if (originalName.toLowerCase() !== cleanNewName.toLowerCase()) {
            if (dishes.some(dish => dish.name.toLowerCase() === cleanNewName.toLowerCase())) {
                alert('Ya existe un plato con ese nombre. Por favor, elige otro nombre.');
                return false;
            }
        }
        
        // Limpiar ingredientes
        const cleanIngredients = ingredients.map(ingredient => ({
            name: ingredient.name.trim(),
            type: ingredient.type
        }));

        // Actualizar el plato
        dishes = dishes.map(dish => {
            if (dish.name === originalName) {
                return {
                    name: cleanNewName,
                    ingredients: cleanIngredients,
                    createdAt: dish.createdAt,
                    updatedAt: new Date().toISOString()
                };
            }
            return dish;
        });

        localStorage.setItem('dishes', JSON.stringify(dishes));
        return true;
    } catch (error) {
        alert('Error al actualizar el plato: ' + error.message);
        return false;
    }
}

function getDishByName(name) {
    const dishes = getDishes();
    return dishes.find(dish => dish.name === name) || null;
}


