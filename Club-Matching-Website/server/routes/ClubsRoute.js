import express from 'express';
import { ClubModel } from '../models/Clubs.js';

const router = express.Router();

//Route to Saving A New Club to Database
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.clubName ||
            !request.body.password ||
            !request.body.description
        ) {
            return response.status(400).send({
                message: 'Send all required fields: ClubName, Password, Description',
            });
        }
        const newClub = {
            clubName: request.body.clubName,
            password: request.body.password,
            description: request.body.description,
        };

    //   Check if Club already exists
      const existingClubName = await ClubModel.findOne({clubName: newClub.clubName});
      const existingClubPassword = await ClubModel.findOne({password: newClub.password});
      if(existingClubName || existingClubPassword){
        response.status(401).send("Club name or password already exists, please choose a differnt name");
      }
      else{
        const club = await ClubModel.create(newClub);
        return response.status(201).send(club);
      }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to Get All Clubs from Database
router.get('/', async (request, response) => {
    try {
      const clubs = await ClubModel.find({});
      return response.status(200).send({
        count: clubs.length,
        data: clubs
      });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to Get One Club from Database by ID
router.get('/:id', async (request, response) => {
    try {
      const {id} = request.params;

      const club = await ClubModel.findById(id);
      return response.status(200).send(club);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Updating Club
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.clubName ||
            !request.body.password ||
            !request.body.description
        ) {
            return response.status(400).send({
                message: 'Send all required fields: ClubName, Password, Description',
            });
        }
      const {id} = request.params;

      const result = await ClubModel.findByIdAndUpdate(id, request.body);
      if (!result){
        return response.status(404).json({message: 'Club not found'});
      }
      return response.status(200).send({message: 'Club updated successfully'});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for Deleting a Club
router.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const result = await ClubModel.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({message: 'Club not found'});
        }
        return response.status(200).send({message: 'Club deleted successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Check for existing Club


export default router;