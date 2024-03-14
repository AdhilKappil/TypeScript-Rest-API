import { Request, Response } from "express";
import { User, UserDetails } from "../model/user";
import { genarateToken } from "../utils/genarateToken";




class UserController {

  // @desc    Login user & get token
  // @route   POST /api/login
  // @access  Public
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: UserDetails = req.body;
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password))) {
        genarateToken(res, user._id);
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        });
      } else {
        res.status(401);
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }


   // @desc    Register user & get token
   // @route   POST /api/register
   // @access  Public
   async registerUser(req: Request, res: Response): Promise<void> {
    try {
      
      const { name, email, mobile, password }: UserDetails = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password,
        mobile,
      });

      if (user) {
        genarateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }


  // @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
async logoutUser(req:Request,res:Response):Promise<void>{
    res.cookie('jwt',"",{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'Logged out successfully'});
}

}

export { UserController };
