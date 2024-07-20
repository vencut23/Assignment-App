const router = require('express').Router();
const Property = require('../models/Property');
const auth = require('../middleware/auth');

// Get all properties for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id }).populate('rooms');
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// // Get all properties
// router.get('/', async (req, res) => {
//   try {
//     const properties = await Property.find().populate('rooms');
//     res.json(properties);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('rooms');

    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    res.json(property);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Property not found' });
    }

    res.status(500).send('Server Error');
  }
});

// Create a property
router.post('/', auth, async (req, res) => {
  const { name, address } = req.body;

  try {
    const newProperty = new Property({
      owner: req.user._id,
      name,
      address
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a property by ID
router.put('/:id', auth, async (req, res) => {
  const { name, address } = req.body;

  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check if user is the owner of the property
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update fields
    property.name = name;
    property.address = address;

    await property.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a property by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: 'Property not found' });
    }

    // Check if user is the owner of the property
    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await property.remove();
    res.json({ msg: 'Property removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
