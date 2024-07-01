import { BlockNoteEditor } from "@blocknote/core";
import {
  EditorV2BlockType,
  EditorV2Output,
  EditorV2OutputType,
  FormElement,
  FormInputType,
} from "../types/FormType";

export async function transformContentToBlock(
  editor: BlockNoteEditor,
  element: EditorV2Output
): Promise<EditorV2BlockType> {
  switch (element.type) {
    case EditorV2OutputType.BLOCK: {
      return element.content;
    }

    case EditorV2OutputType.HTML: {
      return (await editor.tryParseHTMLToBlocks(element.content)) as any;
    }

    case EditorV2OutputType.MARKDOWN: {
      return (await editor.tryParseMarkdownToBlocks(element.content)) as any;
    }
  }
}

export async function transformToStringContent(
  editor: BlockNoteEditor,
  element: EditorV2Output
): Promise<string> {
  switch (element.type) {
    case EditorV2OutputType.BLOCK: {
      return await editor.blocksToHTMLLossy(element.content as any);
    }

    case EditorV2OutputType.HTML: {
      return element.content;
    }

    case EditorV2OutputType.MARKDOWN: {
      return element.content;
    }
  }
}

export async function getEditorV2InitialState(
  editor: BlockNoteEditor,
  formElement: FormElement
): Promise<EditorV2Output | undefined> {
  if (formElement.type != FormInputType.EDITOR_V2_INPUT) return;

  const internalState =
    (formElement.initialValue &&
      (await transformContentToBlock(editor, formElement.initialValue))) ||
    [];

  const html = formElement.initialValue
    ? await editor.blocksToHTMLLossy(internalState as any)
    : "";

  const content =
    (formElement.initialValue &&
      (await transformToStringContent(editor, formElement.initialValue))) ||
    "";

  switch (formElement.output) {
    case EditorV2OutputType.BLOCK: {
      return {
        type: EditorV2OutputType.BLOCK,
        content: internalState,
        html,
        internalState,
      };
    }

    case EditorV2OutputType.HTML: {
      return {
        type: EditorV2OutputType.HTML,
        content,
        html,
        internalState,
      };
    }

    case EditorV2OutputType.MARKDOWN: {
      return {
        type: EditorV2OutputType.MARKDOWN,
        content,
        html,
        internalState,
      };
    }
  }
}

export async function getEditorV2State(
  editor: BlockNoteEditor,
  formElement: FormElement
): Promise<EditorV2Output | undefined> {
  if (formElement.type != FormInputType.EDITOR_V2_INPUT) return;

  const html = await editor.blocksToHTMLLossy(editor.topLevelBlocks);

  switch (formElement.output) {
    case EditorV2OutputType.BLOCK: {
      return {
        type: EditorV2OutputType.BLOCK,
        content: editor.topLevelBlocks as any,
        html,
        internalState: editor.topLevelBlocks as any,
      };
    }

    case EditorV2OutputType.HTML: {
      return {
        type: EditorV2OutputType.HTML,
        content: html,
        html,
        internalState: editor.topLevelBlocks as any,
      };
    }

    case EditorV2OutputType.MARKDOWN: {
      return {
        type: EditorV2OutputType.MARKDOWN,
        content: await editor.blocksToMarkdownLossy(),
        html,
        internalState: editor.topLevelBlocks as any,
      };
    }
  }
}
