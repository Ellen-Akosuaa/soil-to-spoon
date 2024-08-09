import { businessModel } from "../models/business_model.js";
import { businessSchema } from "../schema/business_schema.js";
import { userModel } from "../models/user_model.js"


// Create Business profile
export const createBusinessProfile = async (req, res) => {
    
    try {
      const { error, value } = businessSchema.validate({
        ...req.body,
        profilePhoto: req.file.profilePhoto[0].filename
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
  
      const profile = await businessModel.create({ ...value, user: userId });
  
      user.businessProfile = profile._id;
  
      await user.save();
  
      res.status(201).json({message: "Business Profile Created"});
    } catch (error) {
      console.log(error);
    }
  };
  
  
//   Update Profile 
  export const updateBusinessProfile = async (req, res) => {
      try {
        const { error, value } = businessSchema.validate({
          ...req.body,
          profilePhoto: req.file.profilePhoto[0].filename
        });
    
        if (error) {
          return res.status(400).send(error.details[0].message);
        }
    
        const userId = req.session?.user?.id || req?.user?.id;
        const user = await userModel.findById(userId);
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        const profile = await businessModel.findByIdAndUpdate(req.params.id, value, { new: true });
          if (!profile) {
              return res.status(404).send("Business Profile not found");
          }
    
        res.status(201).json({message: "Business Profile Updated"});
      } catch (error) {
        console.log(error);
      }
    };
    
  
  
//   Get Business profile
    export const getBusinessProfile = async (req, res) => {
      try {
      //  Get user id from session or request
        const userId = req.session?.user?.id || req?.user?.id;
  
        const profile = await businessModel.findOne({ user: userId }).populate({
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
  

    // Delete Business profile
    export const deleteBusinessProfile = async (req, res) => {
        try {
          const userId = req.session?.user?.id || req?.user?.id;
      
          if (!userId) {
            return res.status(401).send("User not authenticated");
          }
      
          const user = await userModel.findById(userId);
          if (!user) {
            return res.status(404).send("User not found");
          }
      
          if (!user.businessProfile) {
            return res.status(404).send("Business profile not found");
          }
      
          // Delete the business profile
          await businessModel.findByIdAndDelete(user.businessProfile);
      
          // Update the user's business profile reference
          user.businessProfile = null;
          await user.save();
      
          res.status(200).json({ message: "business profile deleted successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).send("Server error");
        }
      };
      