function flattenInventory(obj) {
  const inventory = {};
  for (let item in obj) {
    inventory[item] = {
      id: obj[item].item.id,
      equipped: obj[item].equipped,
      imageUrl: obj[item].item.imageUrl,
      name: obj[item].item.name,
      slot: obj[item].item.slot,
      algorithmsBoost: obj[item].item.algorithmsBoost,
      backendBoost: obj[item].item.backendBoost,
      frontendBoost: obj[item].item.frontendBoost,
      cssBoost: obj[item].item.cssBoost,
      debuggingBoost: obj[item].item.debuggingBoost,
      energyBoost: obj[item].item.energyBoost,
    };
  }
  return inventory;
}

module.exports = { flattenInventory };
