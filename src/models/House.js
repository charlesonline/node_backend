import { Schema, model } from 'mongoose';

const HouseSchema = new Schema({
    thumbnails: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    toJSON: {
        virtuals: true,
    },
});

HouseSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnails}`;
});

export default model('House', HouseSchema);