const Place = require("../models/Place");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

class PlaceService {
  async findUserPlaces(token) {
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      {},
      async (error, userData) => {
        if (error) {
          throw Error("invalid token");
        }
        const places = await Place.find({
          owner: new mongoose.Types.ObjectId(userData.id),
        });
        return places;
      }
    );
  }

  async getPlace(id) {
    return await Place.findById(id);
  }

  async addPlace(token, place) {
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = place;
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      {},
      async (error, userData) => {
        if (error) throw error;
        const placeDoc = await Place.create({
          owner: userData.id,
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        return placeDoc;
      }
    );
  }

  async removePlace(token, _id) {
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      {},
      async (error, userData) => {
        if (error) {
          throw Error("invalid token");
        }

        await Place.deleteOne({
          _id,
          owner: new mongoose.Types.ObjectId(userData.id),
        });
        return _id;
      }
    );
  }

  async editPlace(token, place) {
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = place;
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      {},
      async (error, userData) => {
        if (error) {
          throw Error("invalid token");
        }
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
          placeDoc.set({
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          });
          await placeDoc.save();
          return "Ok";
        }
      }
    );
  }

  async getPlaces() {
    const places = await Place.find();
    return places;
  }
}

module.exports = new PlaceService();
