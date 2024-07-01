"use client";

import React, { ReactElement, useEffect, useRef } from "react";

// Components
import { Input } from "../../../../components";

import {
  API,
  BlockMutationEvent,
  OutputBlockData,
  OutputData,
} from "@editorjs/editorjs";
import EditorJS from "@editorjs/editorjs";

import { createReactEditorJS } from "react-editor-js";
// @ts-ignore
import Table from "@editorjs/table";
// @ts-ignore
import Paragraph from "@editorjs/paragraph";
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import LinkTool from "@editorjs/link";
// @ts-ignore
import Header from "@editorjs/header";
// @ts-ignore
import NestedList from "@editorjs/nested-list";
// @ts-ignore
import Underline from "@editorjs/underline";

// Hooks
import useForm from "../../../hooks/useForm";

// Types
import { EditorInput as EditorInputType } from "../../../types/FormType";
import { FormBuilder } from "../../../types/Form";

const ReactEditorJS = createReactEditorJS();

export const EditorTools = {
  table: {
    class: Table,
    inlineToolbar: true,
  },
  // unorderedlist: {
  //   class: List,
  //   inlineToolbar: true,
  //   config: {
  //     defaultStyle: "unordered",
  //   },
  //   toolbox: {
  //     title: "Unordered List",
  //   },
  // },
  unorderedList: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
    toolbox: {
      title: "Unordered List",
    },
  },
  // orderedList: {
  //   class: List,
  //   inlineToolbar: true,
  //   config: {
  //     defaultStyle: "ordered",
  //   },
  //   toolbox: {
  //     title: "Ordered List",
  //   },
  // },
  orderedList: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "ordered",
    },
    toolbox: {
      title: "Ordered List",
    },
  },

  linkTool: LinkTool,
  underline: Underline,
  // header: Header,
};

export function EditorViewer({
  state,
  configs,
}: {
  state: OutputBlockData[];
  configs?: any;
}) {
  if (configs === undefined) {
    configs = {};
  }
  if (configs.readOnly === undefined) configs.readOnly = true;
  if (configs.tools === undefined) {
    configs.tools = {
      table: Table,
      unorderedlist: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "unordered",
        },
        toolbox: {
          title: "Unordered List",
        },
      },
      orderedList: {
        class: List,
        inlineToolbar: true,
        config: {
          defaultStyle: "ordered",
        },
        toolbox: {
          title: "Ordered List",
        },
      },

      linkTool: LinkTool,
      header: Header,
    };
  }
  return (
    <div className="rounded-md border">
      <ReactEditorJS
        defaultValue={{
          blocks: state,
        }}
        readOnly={configs.readOnly}
        tools={configs.tools}
      />
    </div>
  );
}

function EditorInput({
  formElement,
  basePath,
  formKey,
  formBuilderSchema,
}: {
  formElement: EditorInputType;
  basePath: string;
  formKey: string;
  formBuilderSchema: FormBuilder;
}): ReactElement {
  const {
    inputState,
    captureEditorInputChange,
    error,
    visible,
    setBlur,
    setKeyDown,
  } = useForm({
    formElement,
    basePath,
    formKey,
    formBuilderSchema,
  });

  return (
    <React.Fragment>
      {visible && (
        <div className="mb-3 mt-3">
          <Input.Label
            className="font-bold"
            required={(formElement.required as boolean) || false}
          >
            {formElement.label}
          </Input.Label>

          <Input.Description className="font-light">
            {formElement.description}
          </Input.Description>

          <div className="rounded-md border">
            <ReactEditorJS
              // holder="editorjs"
              defaultValue={{
                blocks: formElement.initialValue
                  ? formElement.initialValue
                  : [],
              }}
              tools={EditorTools}
              onChange={async (data: API, e: BlockMutationEvent) => {
                const structuredData: OutputData = await data.saver.save();
                captureEditorInputChange(structuredData.blocks);
              }}
            ></ReactEditorJS>
          </div>
          <div id="editorjs" className="prose max-w-full" />
          <Input.Error>{error}</Input.Error>
        </div>
      )}
    </React.Fragment>
  );
}

export default EditorInput;
