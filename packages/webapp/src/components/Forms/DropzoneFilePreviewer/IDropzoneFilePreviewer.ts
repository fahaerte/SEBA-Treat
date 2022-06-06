export interface IDropzoneFilePreviewer {
  /**
   * Path to file if type "url" can be require("path") for local files
   */
  url: string;
  /**
   * Get on submit function
   */
  onSubmit: (data: string) => void;
}
