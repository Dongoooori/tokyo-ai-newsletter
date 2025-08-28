import { PageObjectResponse } from "@notionhq/client";

export type NotionPagesResponse = {
  ids: string[];
  properties: PageObjectResponse['properties'][];
}