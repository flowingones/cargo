export interface MimeType {
  type: string;
  fileExtensions: string[];
}

/*
 * Based on the common mime type from MDN: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
export const mimeTypes: MimeType[] = [
  {
    type: "audio/aac",
    fileExtensions: ["aac"],
  },
  {
    type: "video/x-msvideo",
    fileExtensions: ["avi"],
  },
  {
    type: "application/octet-stream",
    fileExtensions: ["bin"],
  },
  {
    type: "image/bmp",
    fileExtensions: ["bmp"],
  },
  {
    type: "application/x-bzip",
    fileExtensions: ["bz"],
  },
  {
    type: "application/x-bzip2",
    fileExtensions: ["bz2"],
  },
  {
    type: "text/css",
    fileExtensions: ["css"],
  },
  {
    type: "text/csv",
    fileExtensions: ["csv"],
  },
  {
    type: "application/msword",
    fileExtensions: ["doc"],
  },
  {
    type:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileExtensions: ["docx"],
  },
  {
    type: "application/vnd.ms-fontobject",
    fileExtensions: ["eot"],
  },
  {
    type: "application/epub+zip",
    fileExtensions: ["epub"],
  },
  {
    type: "application/gzip",
    fileExtensions: ["gzip"],
  },
  {
    type: "image/gif",
    fileExtensions: ["gif"],
  },
  {
    type: "text/html",
    fileExtensions: ["html", "html"],
  },
  {
    type: "image/vnd.microsoft.icon",
    fileExtensions: ["ico"],
  },
  {
    type: "text/calendar",
    fileExtensions: ["ics"],
  },
  {
    type: "image/jpeg",
    fileExtensions: ["jpg", "jpeg"],
  },
  {
    type: "text/javascript",
    fileExtensions: ["js", "mjs"],
  },
  {
    type: "application/json",
    fileExtensions: ["json"],
  },
  {
    type: "audio/mpeg",
    fileExtensions: ["mp3"],
  },
  {
    type: "video/mp4",
    fileExtensions: ["mp4"],
  },
  {
    type: "video/mpeg",
    fileExtensions: ["mpeg"],
  },
  {
    type: "application/vnd.apple.installer+xml",
    fileExtensions: ["mpkg"],
  },
  {
    type: "application/vnd.oasis.opendocument.presentation",
    fileExtensions: ["odp"],
  },
  {
    type: "application/vnd.oasis.opendocument.spreadsheet",
    fileExtensions: ["ods"],
  },
  {
    type: "application/vnd.oasis.opendocument.text",
    fileExtensions: ["ogt"],
  },
  {
    type: "audio/ogg",
    fileExtensions: ["oga"],
  },
  {
    type: "video/ogg",
    fileExtensions: ["ogv"],
  },
  {
    type: "application/ogg",
    fileExtensions: ["ogx"],
  },
  {
    type: "audio/opus",
    fileExtensions: ["opus"],
  },
  {
    type: "font/otf",
    fileExtensions: ["otf"],
  },
  {
    type: "image/png",
    fileExtensions: ["png"],
  },
  {
    type: "application/pdf",
    fileExtensions: ["pdf"],
  },
  {
    type: "application/x-httpd-php",
    fileExtensions: ["php"],
  },
  {
    type: "application/vnd.ms-powerpoint",
    fileExtensions: ["ppt"],
  },
  {
    type:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    fileExtensions: ["pptx"],
  },
  {
    type: "application/vnd.rar",
    fileExtensions: ["rar"],
  },
  {
    type: "application/rtf",
    fileExtensions: ["rtf"],
  },
  {
    type: "application/x-sh",
    fileExtensions: ["sh"],
  },
  {
    type: "image/svg+xml",
    fileExtensions: ["svg"],
  },
  {
    type: "application/x-tar",
    fileExtensions: ["tar"],
  },
  {
    type: "image/tiff",
    fileExtensions: ["tif", "tiff"],
  },
  {
    type: "video/mp2t",
    fileExtensions: ["video/mp2t"],
  },
  {
    type: "font/ttf",
    fileExtensions: ["ttf"],
  },
  {
    type: "text/plain",
    fileExtensions: ["txt"],
  },
  {
    type: "application/vnd.visio",
    fileExtensions: ["vsd"],
  },
  {
    type: "audio/wav",
    fileExtensions: ["wav"],
  },
  {
    type: "audio/webm",
    fileExtensions: ["weba"],
  },
  {
    type: "video/webm",
    fileExtensions: ["webm"],
  },
  {
    type: "image/webp",
    fileExtensions: ["webp"],
  },
  {
    type: "font/woff",
    fileExtensions: ["woff"],
  },
  {
    type: "font/woff2",
    fileExtensions: ["woff2"],
  },
  {
    type: "application/xhtml+xml",
    fileExtensions: ["xhtml"],
  },
  {
    type: "application/vnd.ms-excel",
    fileExtensions: ["xls"],
  },
  {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fileExtensions: ["xlsx"],
  },
  {
    type: "application/xml",
    fileExtensions: ["xml"],
  },
  {
    type: "application/vnd.mozilla.xul+xml",
    fileExtensions: ["xul"],
  },
  {
    type: "application/zip",
    fileExtensions: ["zip"],
  },
  {
    type: "application/x-7z-compressed",
    fileExtensions: ["7z"],
  },
];

export function mimeTypeByExtension(extension: string): MimeType | undefined {
  return mimeTypes.find((mimeType) => {
    return mimeType.fileExtensions.includes(extension);
  });
}
