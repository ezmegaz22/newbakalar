import { getSession } from "next-auth/react";
import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = async (req, res, next) => {
  const session = await getSession({ req });

  console.log(session)

  if (!session) {
    return next(new ErrorHandler("Login first to access this route", 401));
  }

  req.user = session.user; // visszallitja req.user fileban

  next();
};

export { isAuthenticatedUser };
