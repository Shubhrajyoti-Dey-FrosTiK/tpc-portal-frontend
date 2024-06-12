"use client";

import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockTypeDropdown,
  CreateLinkButton,
  FormattingToolbarProps,
  ToggledStyleButton,
  Toolbar,
} from "@blocknote/react";
import { Typography } from "../../../../components";

export type INLINE_TOOLBAR_TYPES =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "code";

export const INLINE_TOOLBAR: INLINE_TOOLBAR_TYPES[] = [
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
];

const ToolbarComponentWrapper = ({
  editor,
  children,
  key,
  tool,
  close,
  forceClick,
  id,
}: {
  editor: BlockNoteEditor;
  children: React.ReactNode;
  id: string;
  close?: () => void;
  key?: string;
  tool?: string;
  forceClick?: boolean;
}) => {
  return (
    <div
      key={key}
      className="b-1 my-1 flex w-full gap-4 rounded-lg md:my-0 md:block md:w-auto"
      onClick={() => {
        if (tool && tool != "link")
          editor.toggleStyles({
            [tool]: true,
          });
        if (forceClick) {
          const container = document.getElementById(`fb-link-container-${id}`)
            ?.childNodes;
          (container as any)?.forEach((button: any) => button.click());
        }
        close && close();
      }}
    >
      {children}
      <div className="block md:hidden">
        <Typography className="font-light" order={5}>
          {tool}
        </Typography>
      </div>
    </div>
  );
};

export const CustomFormattingToolbar = ({
  props,
  close,
  id,
}: {
  props: FormattingToolbarProps;
  id: string;
  close: () => void;
}) => {
  return (
    <Toolbar>
      <div className="flex w-full flex-col flex-wrap justify-start px-3 py-3 md:w-auto md:max-w-[200px] md:flex-row md:justify-evenly md:gap-0 md:px-3 md:py-0 ">
        <BlockTypeDropdown {...props} />
        <ToolbarComponentWrapper
          id={id}
          editor={props.editor}
          tool={"link"}
          forceClick={true}
          // close={close}
        >
          <div id={`fb-link-container-${id}`}>
            <CreateLinkButton editor={props.editor} />
          </div>
        </ToolbarComponentWrapper>
        {INLINE_TOOLBAR.map((tool, toolIndex) => {
          return (
            <ToolbarComponentWrapper
              editor={props.editor}
              tool={tool}
              id={id}
              key={`Tool_${toolIndex}`}
              close={close}
            >
              <div
                onClick={() => {
                  props.editor.toggleStyles({
                    [tool]: true,
                  });
                  close();
                }}
              >
                <ToggledStyleButton editor={props.editor} toggledStyle={tool} />
              </div>
            </ToolbarComponentWrapper>
          );
        })}
      </div>
    </Toolbar>
  );
};
