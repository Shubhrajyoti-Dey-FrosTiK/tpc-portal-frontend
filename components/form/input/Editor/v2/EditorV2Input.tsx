"use client";

import React, { ReactElement } from "react";

import "./styles.css";

// Components
import { Input, useMantineColorScheme } from "../../../../components";
// Hooks
import useForm from "../../../hooks/useForm";

import Drawer from "react-bottom-drawer";

import {
  EditorV2Input as EditorInputType,
  EditorV2Output,
  FormInputType,
} from "../../../types/FormType";
import { FormBuilder } from "../../../types/Form";
import {
  BlockNoteView,
  FormattingToolbarProps,
  useBlockNote,
} from "@blocknote/react";
import { BlockNoteEditor } from "@blocknote/core";
import {
  getEditorV2State,
  transformContentToBlock,
} from "../../../lib/editorV2";

import {
  FormattingToolbarPositioner,
  HyperlinkToolbarPositioner,
  SideMenuPositioner,
  SlashMenuPositioner,
} from "@blocknote/react";
import { useDisclosure } from "@mantine/hooks";
import { CustomFormattingToolbar } from "./Toolbar";

function EditorV2Input({
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
  // EditorV2
  const editorV2: BlockNoteEditor = useBlockNote({
    // Set initial state of the editor (internal state)
    async onEditorReady(editor) {
      if (formElement.type !== FormInputType.EDITOR_V2_INPUT) return;
      const editorBlocks = formElement.initialValue
        ? await transformContentToBlock(editor, formElement.initialValue)
        : [];

      editor.replaceBlocks(editor.topLevelBlocks, editorBlocks as any);
    },
  });

  const { error, visible, captureEditorV2InputChange } = useForm({
    formElement,
    basePath,
    formKey,
    formBuilderSchema,
    editorV2,
  });
  const { colorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure(false);

  // Also check the state changes
  async function handleEditorContentChange() {
    const newEditorState: EditorV2Output | undefined = await getEditorV2State(
      editorV2,
      formElement
    );
    if (newEditorState) captureEditorV2InputChange(newEditorState);
  }

  editorV2.onEditorSelectionChange(() => {
    if (editorV2.getSelectedText() && !opened) open();
  });

  editorV2.onEditorContentChange(() => {
    editorV2.unnestBlock();
    handleEditorContentChange();
  });

  const FormatingToolbar = (props: FormattingToolbarProps) => (
    <CustomFormattingToolbar id={basePath} props={props} close={close} />
  );

  return (
    <React.Fragment>
      {visible && (
        <div className="mb-3 mt-3 max-w-[90vw] md:max-w-[60vw]">
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
            <BlockNoteView editor={editorV2} theme={colorScheme}>
              <div className="hidden md:block">
                <FormattingToolbarPositioner
                  editor={editorV2}
                  formattingToolbar={FormatingToolbar}
                />
                <HyperlinkToolbarPositioner editor={editorV2} />
              </div>
              <div className="block md:hidden">
                <Drawer isVisible={opened} onClose={close}>
                  <FormatingToolbar editor={editorV2} />
                  <HyperlinkToolbarPositioner editor={editorV2} />
                </Drawer>
              </div>

              <SlashMenuPositioner editor={editorV2} />
              <SideMenuPositioner editor={editorV2} />
            </BlockNoteView>
          </div>
          <Input.Error>{error}</Input.Error>
        </div>
      )}
    </React.Fragment>
  );
}

export default EditorV2Input;
