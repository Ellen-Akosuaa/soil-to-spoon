import { consumerModel } from "../models/consumer_model.js";
import { consumerSchema } from "../schema/consumer_schema.js";
import { userModel } from "../models/user_model.js"


// Create Consumer profile
export const createConsumerProfile = async (req, res) => {
    
    try {
      const { error, value } = consumerSchema.validate({
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
  
      const profile = await consumerModel.create({ ...value, user: userId });
  
      user.consumerProfile = profile._id;
  
      await user.save();
  
      res.status(201).json({message: "Profile Created"});
    } catch (error) {
      console.log(error);
    }
  };
  
  
//   Update Profile 
  export const updateConsumerProfile = async (req, res) => {
      try {
        const { error, value } = consumerSchema.validate({
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
    
        const profile = await consumerModel.findByIdAndUpdate(req.params.id, value, { new: true });
          if (!profile) {
              return res.status(404).send("Profile not found");
          }
    
        res.status(201).json({message: "Profile Updated"});
      } catch (error) {
        console.log(error);
      }
    };
    
  
  
//   Get consumer profile
    export const getConsumerProfile = async (req, res) => {
      try {
      //  Get user id from session or request
        const userId = req.session?.user?.id || req?.user?.id;
  
        const profile = await consumerModel.findOne({ user: userId }).populate({
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
  

    // Delete consumer profile
    export const deleteConsumerProfile = async (req, res) => {
        try {
          const userId = req.session?.user?.id || req?.user?.id;
      
          if (!userId) {
            return res.status(401).send("User not authenticated");
          }
      
          const user = await userModel.findById(userId);
          if (!user) {
            return res.status(404).send("User not found");
          }
      
          if (!user.consumerProfile) {
            return res.status(404).send("consumer profile not found");
          }
      
          // Delete the consumer profile
          await consumerModel.findByIdAndDelete(user.consumerProfile);
      
          // Update the user's consumer profile reference
          user.consumerProfile = null;
          await user.save();
      
          res.status(200).json({ message: "consumer profile deleted successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).send("Server error");
        }
      };
      