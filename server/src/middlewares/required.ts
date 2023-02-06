import passport from "passport";
import { ForbiddenError } from "../core/api-error";
import { userBookModel } from "../db/models";
import asyncHandler from "../utils/async-handler";
import { logger } from "./../utils/pino";
import { LoggedRequest } from "./../types";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  passport.authenticate("accessJwt", { session: false }, (err, user, info) => {
    if (err) {
      logger.error(err);
      return next(err);
    }
    if (user) {
      req.user = user;
      next();
    } else {
      logger.info(info);
      next(new ForbiddenError(info.message));
    }
  })(req, res, next);
});

export const isBookMember = asyncHandler(async (req: LoggedRequest, res, next) => {
  const bookId = parseInt(req.body.bookId || req.params.bookId);
  const userBookDTO = { userId: req.user.userId, bookId };
  const isMember = await userBookModel.checkUserBook(userBookDTO);
  if (!isMember) next(new ForbiddenError("구성원이 아니라 조회할 수 없습니다."));
  next();
});
