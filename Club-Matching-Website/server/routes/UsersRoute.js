import express from 'express';
import { UserModel } from '../models/Users.js';

const router = express.Router();

//Route to Saving A New User to Database
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.password ||
            !request.body.interests || 
            !request.body.joinedClubs
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Username, Password',
            });
        }
        const newUser = {
            username: request.body.username,
            password: request.body.password,
            interests: request.body.interests, 
            joinedClubs: request.body.joinedClubs
        };

    //   Check if User already exists
    const existingUsername = await UserModel.findOne({username: newUser.username});
    const existingPassword = await UserModel.findOne({password: newUser.password});
    if(existingUsername || existingPassword){
      response.status(401).send("Username or password already exists, please choose a different name");
    }
    else{
      const user = await UserModel.create(newUser);
      return response.status(201).send(user);
    }
  } catch (error) {
      console.log(error.message);
      response.status(500).send({message: error.message});
  }
});

//Route to Get All Users from Database
router.get('/', async (request, response) => {
    try {
      const users = await UserModel.find({});
      return response.status(200).send({
        count: users.length,
        data: users
      });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to Get One User from Database by ID
router.get('/:id', async (request, response) => {
    try {
      const {id} = request.params;
      const user = await UserModel.findById(id);
      return response.status(200).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Updating User
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.password ||
            !request.body.interests || 
            !request.body.joinedClubs
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Username, Password',
            });
        }
      const {id} = request.params;

      const result = await UserModel.findByIdAndUpdate(id, request.body);
      if (!result){
        return response.status(404).json({message: 'User not found'});
      }
      return response.status(200).send({message: 'User updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Deleting a User
router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const result = await UserModel.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({message: 'User not found'});
        }
        return response.status(200).send({message: 'User deleted successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;