"use client";

import React from "react";

export function orderedListParser(block: OutputBlockData): string {
  return ['<ol class="list-decimal list-inside pl-2">']
    .concat(
      ...block.data.items.map(
        (item: string, itemIndex: number) =>
          `<li key="Item_${itemIndex}">${item}</li>`
      ),
      "</ol>"
    )
    .reduce((prevValue, currentValue) => `${prevValue}${currentValue}`);
}
export function unorderedListParser(block: OutputBlockData): string {
  return ['<ul class="list-disc list-inside pl-3">']
    .concat(
      ...block.data.items.map(
        (item: string, itemIndex: number) =>
          `<li key="Item_${itemIndex}">${item}</li>`
      ),
      "</ul>"
    )
    .reduce((prevValue, currentValue) => `${prevValue}${currentValue}`);
}

import edjsHTML from "editorjs-html";
import { OutputBlockData, OutputData } from "@editorjs/editorjs";

const EditorJsToHtml = edjsHTML({
  orderedList: orderedListParser,
  unorderedList: unorderedListParser,
});

function PreviewRenderer({ outputData }: { outputData: OutputData[] }) {
  return (
    <div className="max-w-full">
      {outputData.map((data: OutputData, dataIndex: number) => {
        // @ts-ignore
        const html = EditorJsToHtml.parseBlock(data);

        return (
          <div key={`Data_${dataIndex}`}>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        );
      })}
    </div>
  );
}

export default function Editor({ state }: { state: OutputData[] }) {
  //state to hold output data. we'll use this for rendering later
  return (
    <div className="rounded-md border">
      {state && <PreviewRenderer outputData={state} />}
    </div>
  );
}
