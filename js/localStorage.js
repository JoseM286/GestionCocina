// Guardar un nuevo alimento
function saveFoodItem(name, type) {
  const items = JSON.parse(localStorage.getItem('foodItems')) || [];
  items.push({ name, type });
  localStorage.setItem('foodItems', JSON.stringify(items));
}

// Obtener todos los alimentos
function getFoodItems() {
  return JSON.parse(localStorage.getItem('foodItems')) || [];
}