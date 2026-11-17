const express = require("express");
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

const tripController =
  require("../controllers/tripController");

/*const validate =
  require("../middleware/validate");

const tripSchema =
  require("../validations/tripValidation");
*/
router.post(
  "/",
 // validate(tripSchema),protect,
  tripController.createTrip
);

router.get(
  "/",protect,
  tripController.getTrips
);

router.get(
  "/:id",protect,
  tripController.getTripById
);

router.put(
  "/:id",protect,
 // validate(tripSchema),
  tripController.updateTrip
);

router.delete(
  "/:id",protect,
  tripController.deleteTrip
);

module.exports = router;