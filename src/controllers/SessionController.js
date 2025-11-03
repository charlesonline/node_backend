import User from '../models/User.js';

class SessionController {
    /**
     index - get all
    store - create
    show - get one
    update - modify
    destroy - delete
    */

    index(req, res) {
        res.json({ ok: true });
    }
    
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        } 

        res.json(user);
    }

    show(req, res) {
        res.json({ ok: true });
    }

    update(req, res) {
        res.json({ ok: true });
    }

    destroy(req, res) {
        res.json({ ok: true });
    }

}

export default new SessionController;
