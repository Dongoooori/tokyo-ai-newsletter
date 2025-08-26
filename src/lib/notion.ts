import { BlockObjectResponse, Client } from "@notionhq/client";
import { z } from "zod";

const Env = z.object({
  NOTION_API_KEY: z.string(),
  NOTION_PAGE_ID: z.string()
});

const notion = new Client({ auth: Env.parse(process.env).NOTION_API_KEY });
const databaseId = Env.parse(process.env).NOTION_PAGE_ID;

// 완료된 페이지 조회
export const getAllNotionPages = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '상태',
        status: {
          equals: '완료',
        },
      },
    });
    return response.results;
  } catch (error) {
    console.error(error);
    return [];
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
        property: '카테고리',
        multi_select: {
          contains: category,
        },
      },
    });
    return response.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}



