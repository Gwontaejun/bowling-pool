'use client';

import React, { ChangeEvent } from 'react';
import * as XLSX from 'xlsx';

const ReadExcelJsonConvert = () => {
  const convertExcel = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const reader = new FileReader();
      reader.onload = (readEvent: ProgressEvent<FileReader>) => {
        if (readEvent.target) {
          const data = readEvent.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          console.log(json, workbook);
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={convertExcel} />
    </div>
  );
};

export default ReadExcelJsonConvert;
