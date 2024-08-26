import { Request, Response } from 'express';
import { BASE_PATH } from "../constant";

const everywhereConfig = {
  BASE_PATH: BASE_PATH
}

export class UserSessionController {
  // private userService: UserService;

  public async new(req: Request, res: Response): Promise<void> {
    res.render('user/session/new', { ...everywhereConfig, title: 'Hello, world!' });
  }

  // Method to get a list of users
  public async signInWithUserIdAndPin(req: Request, res: Response): Promise<void> {
    // Example: Fetch users from a database (mocked here)
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ];
    
    res.status(200).json(users);
  }
}