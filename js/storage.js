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
            name: ingredient.name.trim(), // Eliminamos el .toLowerCase()
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
        
        // Limpiar ingredientes sin convertir a minúsculas
        const cleanIngredients = ingredients.map(ingredient => ({
            name: ingredient.name.trim(), // Eliminamos el .toLowerCase()
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

function exportDishes() {
    try {
        const dishes = getDishes();
        const dataStr = JSON.stringify(dishes, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `platos_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        alert('Error al exportar los platos: ' + error.message);
    }
}

function importDishes(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importedDishes = JSON.parse(e.target.result);
                
                // Validar la estructura de los datos importados
                if (!Array.isArray(importedDishes)) {
                    throw new Error('Formato de archivo inválido');
                }
                
                importedDishes.forEach(dish => {
                    if (!dish.name || !Array.isArray(dish.ingredients)) {
                        throw new Error('Estructura de plato inválida');
                    }
                });

                // Obtener platos existentes
                const currentDishes = getDishes();
                
                // Fusionar platos, evitando duplicados
                const mergedDishes = [...currentDishes];
                
                importedDishes.forEach(newDish => {
                    const exists = mergedDishes.some(
                        dish => dish.name.toLowerCase() === newDish.name.toLowerCase()
                    );
                    if (!exists) {
                        mergedDishes.push(newDish);
                    }
                });

                // Guardar los platos fusionados
                localStorage.setItem('dishes', JSON.stringify(mergedDishes));
                resolve({
                    total: importedDishes.length,
                    added: mergedDishes.length - currentDishes.length
                });
            } catch (error) {
                reject(new Error('Error al procesar el archivo: ' + error.message));
            }
        };

        reader.onerror = () => reject(new Error('Error al leer el archivo'));
        reader.readAsText(file);
    });
}


