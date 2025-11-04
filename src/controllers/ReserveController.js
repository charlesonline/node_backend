import Reserve from '../models/Reserve.js';
import User from '../models/User.js';
import House from '../models/House.js';

class ReserveController {

    async index(req, res) {
        const { user_id } = req.headers;
        const reserves = await Reserve.find({ user: user_id }).populate('house user');
        return res.json(reserves);
    }

    async store(req, res) {

        const { house_id } = req.params;
        const { user_id } = req.headers;
        const { date } = req.body;

        const house = await House.findById(house_id);
        if (!house) {
            return res.status(400).json({ error: 'House does not exist' });
        }

        if(!house.status){
            return res.status(400).json({ error: 'House is not available for reservation' });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        if (String(house.user) === String(user._id)) {
            return res.status(401).json({ error: 'You can not reserve your own house' });
        }

        const houseReserved = await Reserve.findOne({ house: house_id });
        if (houseReserved) {
            return res.status(400).json({ error: 'House is already reserved for this date' });
        }

        const reserve = await Reserve.create({
            date,
            user: user_id,
            house: house_id,
        });

        await reserve.populate('house user');

        return res.json(reserve);
    }

    async destroy(req, res) {
        const { reserve_id } = req.body;

        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }

        if (String(user_id) !== String(user._id)) {
            return res.status(401).json({ error: 'You can only delete your own reservations' });
        }
        
        const reserve = await Reserve.findByIdAndDelete(reserve_id);
        if (!reserve) {
            return res.status(400).json({ error: 'Reservation does not exist' });
        }

        return res.json({ message: 'Reservation deleted successfully' });
    }
}

export default new ReserveController();