const placeService = require("../services/place-service");

class PlaceController {
  async findUserPlaces(req, res, next) {
    try {
      const user = req.user;
      console.log(user);
      const places = await placeService.findUserPlaces(user.id);
      return res.json(places);
    } catch (error) {
      next(error);
    }
  }
  async getPlace(req, res, next) {
    try {
      const { id } = req.params;
      const place = await placeService.getPlace(id);
      return res.json(place);
    } catch (error) {
      next(error);
    }
  }

  async addPlace(req, res, next) {
    try {
      const { id } = req.user;
      const place = req.body;
      const placeDoc = await placeService.addPlace(id, place);
      res.json(placeDoc);
    } catch (error) {
      next(error);
    }
  }

  async removePlace(req, res, next) {
    try {
      const userData = req.user;
      const { _id } = req.body;
      const id = await placeService.removePlace(_id, userData);
      res.json(id);
    } catch (error) {
      next(error);
    }
  }

  async editPlace(req, res, next) {
    try {
      const userData = req.user;
      const place = req.body;
      const status = await placeService.editPlace(userData, place);
      res.json(status);
    } catch (error) {
      next(error);
    }
  }

  async getPlaces(req, res, next) {
    try {
      console.log("places");
      const places = await placeService.getPlaces();
      res.json(places);
    } catch (error) {
      next(error);
    }
  }

  async getFilterPlaces(req, res, next) {
    try {
      const keywordsFilter = req.params.keywordsFilter;
      const places = await placeService.getFilterPlaces(keywordsFilter);
      res.json(places);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PlaceController();
