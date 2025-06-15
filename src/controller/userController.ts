import prisma from "config/db.config";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
// import { encrypt, decrypt } from "../utils/encryption";
import { generateToken } from "utils/jwt";
import { generateOTP, sendOTPEmail } from "utils/mailSender";
import { addMinutes } from 'date-fns';
import { UserDAO } from "dao/userDao"
import { RESPONSE_MESSAGES } from "constants/response";
import { profile } from "console";


// import { access } from "fs";

const expiryMinutesEnv = process.env.DEFAULT_OTP_EXPRY_MINUTES;

if (!expiryMinutesEnv) {
    throw new Error("DEFAULT_OTP_EXPRY_MINUTES is not set in environment variables.");
}

const DEFAULT_OTP_EXPIRY_MINUTES = parseInt(expiryMinutesEnv, 10);

if (isNaN(DEFAULT_OTP_EXPIRY_MINUTES)) {
    throw new Error("DEFAULT_OTP_EXPRY_MINUTES must be a valid number.");
}


const UserController = {

   

}



export default UserController;


