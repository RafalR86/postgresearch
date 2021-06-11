import { getComments } from "./xml.parser";
import * as fs from "fs";

describe("XmlParser", () => {
  describe("getComments",  () => {
    it("should throw an exception when xml file does not exits", async () => {
      jest.spyOn(fs, "existsSync").mockReturnValue(false);
      try {
        await getComments();
        expect(true).toBe(false);
      } catch (err) {
        expect(err.message).toBe("No file to import");
      }
    });

    it("should return array of comments read from xml file", async () => {
      jest.spyOn(fs, "existsSync").mockReturnValue(true);
      const xmlData = `<?xml version="1.0" encoding="utf-8"?>
        <comments>
          <row Id="10" PostId="14" Score="0" Text="The problem I see" />
          <row Id="11" PostId="14" Score="0" Text="The problem I see" />
         </comments>`;
      jest.spyOn(fs, "readFileSync").mockReturnValue(xmlData);
      const expectCommentsArray = [
        {
          "$": {
            "Id": "10",
            "PostId": "14",
            "Score": "0",
            "Text": "The problem I see"
          }
        },
        {
          "$": {
            "Id": "11",
            "PostId": "14",
            "Score": "0",
            "Text": "The problem I see"
          }
        }
      ]
      const comments = await getComments();
      expect(comments).toStrictEqual(expectCommentsArray);
    })
  });
});
