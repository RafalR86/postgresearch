import * as parser from "xml2js";
import * as util from "util"
import { existsSync } from "fs";
import { NoFileToImportError } from "./no-file-to-import.error";
import * as fs from "fs";
import { Comment } from "./comment.interface";

export const getComments = async (): Promise<{ $: Comment }[]> => {
  const filePath = "../../imports/Comments.xml";
  if (!existsSync(filePath)) {
    throw new NoFileToImportError();
  }
  const data = fs.readFileSync(filePath, 'utf8');
  const parseString = util.promisify(parser.parseString);
  return (await parseString(data)).comments.row;
};
