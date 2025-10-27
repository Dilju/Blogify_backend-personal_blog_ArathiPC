import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/authMIddleware.js";
export declare const getAllPosts: (req: Request, res: Response) => Promise<void>;
export declare const getUserPosts: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=postController.d.ts.map