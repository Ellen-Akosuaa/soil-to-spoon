import {farmerModel} from "../models/farmers_model.js"
import { farmerSchema } from "../schema/farmers_schema.js"
import { userModel } from "../models/user_model.js"


// Create Farmer profile
export const createFarmerProfile = async (req, res) => {
    
    try {
      const { error, value } = farmerSchema.validate({
        ...req.body,
        profilePhoto: req.files?.profilePhoto[0].filename,
        farmImages: req.files?.farmImages[0].filename
      });
  
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      console.log(value)
  
      const profile = await farmerModel.create({ ...value, user: userId });
  
      user.farmerProfile = profile._id;
  
      await user.save();
  
      res.status(201).json({message: "Profile Created"});
    } catch (error) {
      console.log(error);
    }
  };
  
  
//   Update Profile 
  export const updateFarmerProfile = async (req, res) => {
      try {
        const { error, value } = farmerSchema.validate({
          ...req.body,
          profilePhoto: req.files?.profilePhoto[0].filename,
          farmImage: req.files?.farmImages[0].filename,
        });
    
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
    
        const userId = req.session?.user?.id || req?.user?.id;
        const user = await userModel.findById(userId);
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        const profile = await farmerModel.findByIdAndUpdate(req.params.id, value, { new: true });
          if (!profile) {
              return res.status(404).send("Profile not found");
          }
    
        res.status(201).json({message: "Profile Updated"});
      } catch (error) {
        console.log(error);
      }
    };
    
  
  
//   Get farmer profile
    export const getFarmerProfile = async (req, res) => {
      try {
      //  Get user id from session or request
        const userId = req.session?.user?.id || req?.user?.id;
  
        const profile = await farmerModel.findOne({ user: userId }).populate({
          path: 'user',
          select: '-password'
        });
        if (!profile) {
          return res.status(404).json({profile});
        }
        res.status(200).json({profile});
      } catch (error) {
        return res.status(500).json({error})
      }
    };
  

    // Delete Farmer profile
    export const deleteFarmerProfile = async (req, res) => {
        try {
          const userId = req.session?.user?.id || req?.user?.id;
      
          if (!userId) {
            return res.status(401).send("User not authenticated");
          }
      
          const user = await userModel.findById(userId);
          if (!user) {
            return res.status(404).send("User not found");
          }
      
          if (!user.farmerProfile) {
            return res.status(404).send("Farmer profile not found");
          }
      
          // Delete the farmer profile
          await farmerModel.findByIdAndDelete(user.farmerProfile);
      
          // Update the user's farmer profile reference
          user.farmerProfile = null;
          await user.save();
      
          res.status(200).json({ message: "Farmer profile deleted successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).send("Server error");
        }
      };
      