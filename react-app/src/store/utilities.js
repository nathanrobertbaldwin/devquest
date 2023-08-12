function flattenInventory(arr) {
  const inventory = [];
  arr.forEach((item) => {
    inventory.push({
      id: item.item.id,
      equipped: item.equipped,
      imageUrl: item.item.imageUrl,
      name: item.item.name,
      slot: item.item.slot,
      algorithmsBoost: item.item.algorithmsBoost,
      backendBoost: item.item.backendBoost,
      frontendBoost: item.item.frontendBoost,
      cssBoost: item.item.cssBoost,
      debuggingBoost: item.item.debuggingBoost,
      energyBoost: item.item.energyBoost,
    });
  });
  return inventory;
}

module.exports = { flattenInventory };
