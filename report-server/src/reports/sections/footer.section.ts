import { Content, ContextPageSize } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content => {
  return {
    text: `Page ${currentPage} of ${pageCount}`,
    fontSize: 12,
    alignment: 'right',
    bold: true,
    margin: [0, 10, 20, 0],
  };
};
