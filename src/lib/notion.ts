import { NOTION_CATEGORY, NOTION_STATUS, NOTION_STATUS_COMPLETED } from "@/constant";
import { NotionPagesResponse } from "@/types/notion";
import { BlockObjectResponse, Client, PageObjectResponse } from "@notionhq/client";
import { z } from "zod";

const Env = z.object({
  NOTION_API_KEY: z.string(),
  NOTION_PAGE_ID: z.string()
});

const notion = new Client({ auth: Env.parse(process.env).NOTION_API_KEY });
const databaseId = Env.parse(process.env).NOTION_PAGE_ID;

// 완료된 페이지 조회
export const getAllNotionPages = async (): Promise<NotionPagesResponse> => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: NOTION_STATUS,
        status: {
          equals: NOTION_STATUS_COMPLETED,
        },
      },
    });
    const ids = response.results.map((item) => item.id);
    const properties = response.results.map((item) => (item as PageObjectResponse).properties);
    return { ids, properties };
  } catch (error) {
    console.error(error);
    return { ids: [], properties: [] };
  }
};

// 페이지 내용 조회
export const getNotionPageContent = async (pageId: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });
    return response.results as BlockObjectResponse[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 카테고리별 페이지 조회
export const getNotionPageContentByCategory = async (category: string) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: NOTION_STATUS,
            status: {
              equals: NOTION_STATUS_COMPLETED,
            },
          },
          {
            property: NOTION_CATEGORY,
            multi_select: {
              contains: category,
            },
          },
        ],
      },
    });
    return response.results.map((item) => (item as PageObjectResponse).properties);
  } catch (error) {
    console.error(error);
    return [];
  }
}



