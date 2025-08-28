export type PartialSelectResponse = {
  id: string;
  name: string;
  color: SelectColor;
};
type SelectColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red"

type PartialExternalResponse = {
  name: string;
  type: 'external';
  external: {
    url: string;
  };
};
type PartialFileResponse = {
  name: string;
  type: 'file';
  file: {
    url: string;
    expiry_time: string;
  };
};
export type FileResponse = PartialExternalResponse[] | PartialFileResponse[];