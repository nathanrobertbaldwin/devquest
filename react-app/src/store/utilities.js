function flattenInventory(arr) {
  const inventory = [];
  arr.forEach((item) => {
    inventory.push({
      id: item.item.id,
      equipped: item.equipped,
      image_url: item.item.image_url,
      name: item.item.name,
      slot: item.item.slot,
      algorithms_boost: item.item.algorithms_boost,
      backend_boost: item.item.backend_boost,
      frontend_boost: item.item.frontend_boost,
      css_boost: item.item.css_boost,
      debugging_boost: item.item.debugging_boost,
      energy_boost: item.item.energy_boost,
    });
  });
  return inventory;
}

module.exports = { flattenInventory };
