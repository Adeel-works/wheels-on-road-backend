import * as mongoose from 'mongoose';

const resetTokenSchema = new mongoose.Schema({
    token: String,
    expiresAt: Date,
    userId: String
},
    {
        timestamps: true
    });

export interface IUser extends mongoose.Document {
    token: string;
    expiresAt: Date;
    userId: string
};

export const ResetToken = mongoose.model<IUser>('ResetToken', resetTokenSchema);

