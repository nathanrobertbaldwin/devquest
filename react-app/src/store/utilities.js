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
      maxEnergyBoost: obj[item].item.maxEnergyBoost,
    };
  }
  return inventory;
}

function flattenItem(obj) {
  const newItem = {};

  newItem.id = obj["item"].id;
  newItem.equipped = obj["item"].equipped;
  newItem.imageUrl = obj["item"].imageUrl;
  newItem.name = obj["item"].name;
  newItem.slot = obj["item"].slot;
  newItem.algorithmsBoost = obj["item"].algorithmsBoost;
  newItem.backendBoost = obj["item"].backendBoost;
  newItem.frontendBoost = obj["item"].frontendBoost;
  newItem.cssBoost = obj["item"].cssBoost;
  newItem.debuggingBoost = obj["item"].debuggingBoost;
  newItem.maxEnergyBoost = obj["item"].maxEnergyBoost;

  return newItem;
}

module.exports = { flattenInventory, flattenItem };
