# @character_routes.route("/")
# # @login_required
# def characters():
#     """
#     Query for all users and returns them in a list of user dictionaries
#     """
#     characters = Character.query.all()
#     return [character.to_dict() for character in characters]


# @user_data_routes.route("/")
# @login_required
# def saves_data():
#     """
#     Query to load all the saves for a user.
#     """
#     characters_data = Character.query.filter(Character.user_id == current_user.id)
#     characters_array = [character.to_dict() for character in characters_data]
#     characters = normalizer(characters_array)

#     inventory_array = []
#     if len(characters_array) > 0:
#         for character in characters_array:
#             characters_inventory_data = Inventory.query.filter(
#                 Inventory.character_id == character["id"]
#             )
#             character_inventory = [
#                 inventory.to_dict() for inventory in characters_inventory_data
#             ]
#             inventory_array.append(character_inventory)

#     inventory = normalizer(inventory_array)

#     saves_data = Save.query.filter(Save.user_id == current_user.id)
#     saves_array = [save.to_dict() for save in saves_data]
#     saves = normalizer(saves_array)

#     return {
#         "characters": characters,
#         "charactersArr": characters_array,
#         "saves": saves,
#         "savesArr": saves_array,
#         # "inventory": inventory,
#     }


# @inventory_routes.route("/")
# # @login_required
# def inventory():
#     """
#     Query for all inventories. Reminder to update this for a specific character.
#     """
#     backpack = Inventory.query.all()
#     packed_inventory = [item.to_dict() for item in backpack]
#     unpacked_inventory = []
#     for item in packed_inventory:
#         new_item = {}
#         new_item["equipped"] = item["equipped"]
#         new_item["algorithms_boost"] = item["item"]["algorithms_boost"]
#         new_item["backend_boost"] = item["item"]["backend_boost"]
#         new_item["css_boost"] = item["item"]["css_boost"]
#         new_item["energy_boost"] = item["item"]["energy_boost"]
#         new_item["frontend_boost"] = item["item"]["frontend_boost"]
#         new_item["id"] = item["item"]["id"]
#         new_item["image_url"] = item["item"]["image_url"]
#         new_item["name"] = item["item"]["name"]
#         new_item["slot"] = item["item"]["slot"]
#         unpacked_inventory.append(new_item)

#     return unpacked_inventory
