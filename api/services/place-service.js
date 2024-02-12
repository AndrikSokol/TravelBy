const Place = require("../models/Place");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

class PlaceService {
  async findUserPlaces(id) {
    const places = await Place.find({
      owner: new mongoose.Types.ObjectId(id),
    });
    return places;
  }

  async getPlace(id) {
    return await Place.findById(id);
  }

  async getFilterPlaces( keywordsFilter ) {
    return await Place.find({ title: { $regex: keywordsFilter, $options: 'i' } });
  }

  async addPlace(id, place) {
    const { title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = place;
    const placeDoc = await Place.create({
      owner: id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    return placeDoc;
  }

  async removePlace(_id, userData) {
    await Place.deleteOne({
      _id,
      owner: new mongoose.Types.ObjectId(userData.id),
    });
    return _id;
  }

  async editPlace(userData, place) {
    const { id, title, address, photos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = place;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      await placeDoc.save();
      return "Ok";
    }
  }

  async getPlaces() {
    const places = await Place.find();
    return places;
  }
}

module.exports = new PlaceService();
