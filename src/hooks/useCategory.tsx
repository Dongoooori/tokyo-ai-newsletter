import { FileResponse, PartialSelectResponse } from "@/types/category";
import { PageObjectResponse, RichTextItemResponse } from "@notionhq/client"

export const useCategory = (properties: PageObjectResponse['properties'][]) => {
  const processedData = properties.map((property) => {
    const title = Object.values(property).find(
      (prop): prop is { type: "title"; title: RichTextItemResponse[]; id: string } => 
        prop.type === 'title'
    );
    
    const status = Object.values(property).find(
      (prop): prop is { type: "status"; status: PartialSelectResponse; id: string } => 
        prop.type === 'status'
    );
    const titleDescription = Object.values(property).find(
      (prop): prop is { type: "rich_text"; rich_text: RichTextItemResponse[]; id: string } => 
        prop.type === 'rich_text'
    );
    const file = Object.values(property).find(
      (prop): prop is { type: "files"; files: FileResponse; id: string } => 
        prop.type === 'files'
    );

    return {
      title: title?.title?.[0]?.plain_text,
      status: status?.status?.name,
      titleDescription: titleDescription?.rich_text?.[0]?.plain_text,
      fileUrl: file?.files?.[0]?.type === 'external' 
        ? file.files[0].external.url
        : file?.files?.[0]?.type === 'file'
        ? file.files[0].file.url
        : null,
      fileName: file?.files?.[0]?.name || null,
    };
  });
  
  return processedData;
};