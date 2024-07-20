const router = require('express').Router();
const Room = require('../models/Room');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// Get rooms by property ID
router.get('/property/:propertyId', auth, async (req, res) => {
  try {
    const rooms = await Room.find({ property: req.params.propertyId });
    res.json(rooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Create a room for a property
router.post('/property/:propertyId', auth, async (req, res) => {
  const { name, floorSize, numberOfBeds, amenities, photos } = req.body;

  try {
    // Check if property exists
    const property = await Property.findById(req.params.propertyId);
    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Create new room
    const newRoom = new Room({
      property: req.params.propertyId,
      name,
      floorSize,
      numberOfBeds,
      amenities,
      photos
    });

    const room = await newRoom.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a room by ID
router.put('/:id', auth, async (req, res) => {
  const { name, floorSize, numberOfBeds, amenities, photos } = req.body;

  try {
    let room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    // Update fields
    room.name = name;
    room.floorSize = floorSize;
    room.numberOfBeds = numberOfBeds;
    room.amenities = amenities;
    room.photos = photos;

    await room.save();
    res.json(room);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a room by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    await room.remove();
    res.json({ msg: 'Room removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
