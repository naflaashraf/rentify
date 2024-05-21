const Property = require('../../models/property')
const User = require("../../models/user")
const CreateProperty = async(req,res)=>{
    const { title, description, place } = req.body;

    try {
    const newProperty = new Property({
      user: req.session.userId,
      title,
      description,
      place,
    });

    const property = await newProperty.save();
    res.json(property);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

const AllProperty = async (req, res) => {
    try {
      const properties = await Property.find();
      res.json(properties);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};

const SingleProperty = async (req, res) => {
    try {
      const property = await Property.findById(req.params.id);
      if (!property) {
        return res.status(404).json({ msg: 'Property not found' });
      }
      res.json(property);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
};
const getSellerDetails = async (req, res) => {
    const { propertyId } = req.params;
    try {
      const property = await Property.findById(propertyId).populate('user', 'firstName lastName email phone');
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      const seller = property.user;
      res.json(seller);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };
  const UpdateProperty = async (req, res) => {
    const { title, description, place } = req.body;

    const propertyFields = {
        title,
        description,
        place
    };

    try {
        let property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' });
        }

        // Ensure user owns the property
        if (property.user.toString() !== req.session.userId) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Update the property document in the database
        property = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: propertyFields },
            { new: true }
        );

        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const DeleteProperty = async (req, res) => {
    try {
      const property = await Property.findByIdAndDelete(req.params.id);
      if (!property) {
        return res.status(404).json({ msg: 'Property not found' });
      }
  
      // Ensure user owns the property
      if (property.user.toString() !== req.session.userId) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      
      res.json({ msg: 'Property removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  const UserProperties = async (req, res) => {
    try {
        const properties = await Property.find({ user: req.params.userId });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports={
    CreateProperty,
    AllProperty,
    SingleProperty,
    UpdateProperty,
    DeleteProperty,
    getSellerDetails,
    UserProperties

}