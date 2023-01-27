import { pool } from "../index";
import { logger, BuildQuery } from "../../utils";
import { CreateDiaryDTO, DiaryIdDTO, GetDiaryDTO, UpdateDiaryDTO } from "../../types";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

const diaryBuildQuery = new BuildQuery("diary");
// const userBookBuildQuery = new BuildQuery("user_book");

class DiaryModel {
  async create(diaryDTO: CreateDiaryDTO) {
    const { query, values } = diaryBuildQuery.makeInsertQuery({ ...diaryDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }

  async getWithUser(getDiaryDTO: GetDiaryDTO, columnArr: string[] = ["*"]) {
    const joinQuery = `join user on user.userId = diary.userId`;
    columnArr = [
      "diary.userId",
      "nickname",
      "profile",
      "diaryId",
      "bookId",
      "picture",
      "title",
      "content",
      "diary.createdAt",
      "diary.updatedAt",
    ];
    const { query, values } = diaryBuildQuery.makeSelectQuery(
      { ...getDiaryDTO },
      columnArr,
      joinQuery
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }
  async get(getDiaryDTO: GetDiaryDTO, columnArr: string[] = ["*"]) {
    const { query, values } = diaryBuildQuery.makeSelectQuery({ ...getDiaryDTO }, columnArr);
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<RowDataPacket[]>(query, values);
    logger.debug(result);
    return result;
  }

  async pacth(whereDTO: GetDiaryDTO, diaryDTO: UpdateDiaryDTO) {
    const { query, values } = diaryBuildQuery.makeUpdateQuery(
      { ...whereDTO },
      { ...diaryDTO }
    );
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<ResultSetHeader>(query, values);
    logger.debug(result);
    return result;
  }

  async deleteById(diaryIdDTO: DiaryIdDTO) {
    const { query, values } = diaryBuildQuery.makeDeleteQuery({ ...diaryIdDTO });
    logger.info(query);
    logger.debug(values);
    const [result] = await pool.query<OkPacket>(query, values);
    logger.debug(result);
    return result;
  }
}

export const diaryModel = new DiaryModel();