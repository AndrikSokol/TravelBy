const placeService = require("../services/place-service");

class PlaceController {
  async findUserPlaces(req, res, next) {
    try {
      const { token } = req.cookies;
      const places = await placeService.findUserPlaces(token);
      return res.json(places);
    } catch (error) {
      console.log(error);
    }
  }
  async getPlace(req, res, next) {
    try {
      const { id } = req.params;
      const place = await placeService.getPlace(id);
      return res.json(place);
    } catch (error) {
      console.log(error);
    }
  }

  async addPlace(req, res, next) {
    try {
      const { token } = req.cookies;
      const place = req.body;
      const placeDoc = await placeService.addPlace(token, place);
      res.json(placeDoc);
    } catch (error) {
      console.log(error);
    }
  }

  async removePlace(req, res, next) {
    try {
      const { token } = req.cookies;
      const { _id } = req.body;
      const id = await placeService.removePlace(token, _id);
      res.json(id);
    } catch (error) {
      console.log(error);
    }
  }

  async editPlace(req, res, next) {
    try {
      const { token } = req.cookies;
      const place = req.body;
      const status = await placeService.editPlace(token, place);
      res.json(status);
    } catch (error) {
      console.log(error);
    }
  }

  async getPlaces(req, res, next) {
    try {
      const places = await placeService.getPlaces();
      res.json(places);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PlaceController();
