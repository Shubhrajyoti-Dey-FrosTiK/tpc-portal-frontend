import { OutputBlockData } from "@editorjs/editorjs";
import { batchUploadFiles } from "../firebase/storage";
import {
  ExportableFormState,
  FormState,
  KeyStore,
  RepeatableSection,
  Section,
  ValidationStore,
} from "../types/Form";
import { FormElement, FormInputType, FormType } from "../types/FormType";

// Service
import ValidationService from "./validation.service";

const endingBracketIndex = (s: string, start: number): number => {
  let index: number = -1;
  for (let i = start; i < s.length; i++) {
    if (s[i] === ")") {
      index = i;
      break;
    }
  }
  return index;
};

export default class FormService {
  vs = new ValidationService();

  getBasePathData = (basePath: string, layer: number, form: FormState) => {
    let exportData: ExportableFormState = {};
    if (!form) return exportData;
    const keyStoreSnapshot: KeyStore = { ...form.keyStore };
    const formStateSnapshot: Array<Section | RepeatableSection | FormElement> =
      [...form.formBuilderSchema.sections];

    formStateSnapshot.forEach(async (element) => {
      // @ts-ignore
      exportData[element.key] = this.recursiveExporterWithoutUpload(
        keyStoreSnapshot,
        element,
        ""
      );
    });

    // setExportableFormState(exportData);
    const updatedBaseArray = basePath
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("[", "")
      .replaceAll("]", "")
      .split("-");

    const data = this.getValue(
      exportData,
      updatedBaseArray.slice(0, updatedBaseArray.length - layer),
      0
    );

    return data;
  };

  populate = (propsList: Array<string>, form: FormState, basePath: string) => {
    let populateValues: Array<any> = [];
    propsList.forEach((prop) => {
      if (prop === "SELF") populateValues.push(form?.keyStore[prop]);
      else if (prop.includes("OUTER_NUTSHELL")) {
        let layer = 1;
        const propArray = prop.split("_");
        if (propArray.length > 2) {
          layer = Number(propArray[2]);
        }

        populateValues.push(this.getBasePathData(basePath, layer, form));
      } else populateValues.push(form?.keyStore[prop]);
    });

    return populateValues;
  };

  async recursiveEditor(
    state: Array<Section | RepeatableSection | FormElement>,
    initialSchema: Array<Section | RepeatableSection | FormElement>,
    pathArray: Array<number>,
    pathIndex: number
  ): Promise<void> {
    // Base Condition
    if (pathIndex === pathArray.length && Array.isArray(state)) {
      state.push(initialSchema[0]);
    } else if (Array.isArray(state) && Array.isArray(initialSchema)) {
      // Checking if it is a repeatable section
      if (Array.isArray(state[0]) && Array.isArray(initialSchema[0])) {
        this.recursiveEditor(
          // @ts-ignore
          state[pathArray[pathIndex]],
          initialSchema[0],
          pathArray,
          pathIndex + 1
        );
      } else {
        // Then it is a section
        this.recursiveEditor(
          // @ts-ignore
          state[pathArray[pathIndex]].formElements,
          // @ts-ignore
          initialSchema[pathArray[pathIndex]].formElements,
          pathArray,
          pathIndex + 1
        );
      }
    }
  }

  async recursiveRemover(
    state:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    initialSchema:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    pathArray: Array<number>,
    pathIndex: number,
    removeIndex: number
  ): Promise<void> {
    //  Base Condition -> Reached Target Element to remove
    if (
      pathIndex === pathArray.length &&
      !Array.isArray(state) &&
      !Array.isArray(initialSchema) &&
      state.type === FormType.REPEATABLE_SECTION &&
      initialSchema.type === FormType.REPEATABLE_SECTION
    ) {
      const newFormElements = [];
      for (let i = 0; i < state.formElements.length; i++) {
        if (i != removeIndex) newFormElements.push(state.formElements[i]);
      }
      state.formElements = newFormElements;
      return;
    }

    // Checking if it is a Section or Array of Sections, FormELements, RepeatingSections
    if (Array.isArray(state) && Array.isArray(initialSchema)) {
      // Now checking if it is a repeating section
      // If it a repeating section we want the first element to be pushed from the initialSchema
      // Otherwise the updated schema will get pushed which is not optimal
      if (Array.isArray(state[0]))
        this.recursiveRemover(
          state[pathArray[pathIndex]],
          initialSchema[0],
          pathArray,
          pathIndex + 1,
          removeIndex
        );
      else
        this.recursiveRemover(
          state[pathArray[pathIndex]],
          initialSchema[pathArray[pathIndex]],
          pathArray,
          pathIndex + 1,
          removeIndex
        );
    } else if (
      !Array.isArray(state) &&
      !Array.isArray(initialSchema) &&
      (state.type === FormType.SECTION ||
        state.type === FormType.REPEATABLE_SECTION) &&
      (initialSchema.type === FormType.SECTION ||
        initialSchema.type === FormType.REPEATABLE_SECTION)
    )
      this.recursiveRemover(
        state.formElements[pathArray[pathIndex]],
        initialSchema.formElements[pathArray[pathIndex]],
        pathArray,
        pathIndex + 1,
        removeIndex
      );
  }

  async removeRepeatingSection(
    state: KeyStore,
    validation: ValidationStore,
    basePath: string,
    indexToRemove: number,
    repeatingSectionLen: number,
    formState:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    initialSchema:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    pathArray: Array<number>,
    pathIndex: number
  ) {
    // In this we need to pull the value till the position we want to delete and then delete the last element
    // This needs to be done in both KeyStore and validation

    for (let i = indexToRemove + 1; i < repeatingSectionLen; i++) {
      const match = basePath + i.toString() + ")";
      const matchPrev = basePath + (i - 1).toString() + ")";
      const stateKeys: Array<string> = [];
      const validationKeys: Array<string> = [];

      // Storing all the keys
      for (let key in state) {
        if (key.startsWith(match)) stateKeys.push(key);
      }
      for (let key in validation) {
        if (key.startsWith(match)) validationKeys.push(key);
      }

      // Deleting the previous index
      for (let key in state) {
        if (key.startsWith(matchPrev)) delete state[key];
      }
      for (let key in validation) {
        if (key.startsWith(matchPrev)) delete validation[key];
      }

      // Insert
      for (let j = 0; j < stateKeys.length; j++) {
        const indexEnd = endingBracketIndex(stateKeys[j], basePath.length);
        const right = stateKeys[j].substring(indexEnd, stateKeys[j].length);
        const prevKey = basePath + (i - 1).toString() + right;
        state[prevKey] = state[stateKeys[j]];
      }
      for (let j = 0; j < validationKeys.length; j++) {
        const indexEnd = endingBracketIndex(validationKeys[j], basePath.length);
        const right = validationKeys[j].substring(
          indexEnd,
          validationKeys[j].length
        );
        const prevKey = basePath + (i - 1).toString() + right;
        validation[prevKey] = validation[validationKeys[j]];
      }
    }

    // Remove the last Index
    for (let key in state) {
      if (key.startsWith(basePath + (repeatingSectionLen - 1).toString() + ")"))
        delete state[key];
    }
    for (let key in validation) {
      if (key.startsWith(basePath + (repeatingSectionLen - 1).toString() + ")"))
        delete validation[key];
    }

    this.recursiveRemover(
      formState,
      initialSchema,
      pathArray,
      pathIndex,
      indexToRemove
    );
  }

  async recursiveExporterV2(
    keyStore: KeyStore,
    formBuilderSchema: FormState,
    formState: Section | RepeatableSection | FormElement,
    basePath: string,
    exportable?: boolean
  ) {
    // Check if the element is visible
    if (
      formState.visible &&
      !formState.visible.validator(
        this.populate(
          formState.visible.props as string[],
          formBuilderSchema,
          basePath
        )
      )
    )
      return;

    // If the element is visible then do the exporting
    switch (formState.type) {
      case FormType.SECTION: {
        let elements = {};
        for await (const element of formState.formElements) {
          // @ts-ignore
          elements[element.key] = await this.recursiveExporterV2(
            keyStore,
            formBuilderSchema,
            element,
            basePath + `[${formState.key}]-`
          );
        }

        return elements;
      }
      case FormType.REPEATABLE_SECTION: {
        const elements: any[] = [];
        let elementsArrayIndex = 0;
        for await (const elementsArray of formState.formElements) {
          let tempState = {};
          for await (const element of elementsArray) {
            // @ts-ignore
            tempState[element.key as string] = await this.recursiveExporterV2(
              keyStore,
              formBuilderSchema,
              element,
              basePath + `[${formState.key}]-(${elementsArrayIndex})-`
            );
          }
          elementsArrayIndex++;
          elements.push(tempState);
        }
        return elements;
      }
      default: {
        const newBasePath = basePath + `[${formState.key}]`;

        if (formState.type === FormInputType.NUMBER) {
          return typeof keyStore[newBasePath] === "string"
            ? null
            : keyStore[newBasePath];
        } else if (formState.type == FormInputType.EDITOR_V2_INPUT) {
          // @ts-ignore
          return keyStore[newBasePath].content;
        } else if (exportable && formState.type === FormInputType.FILE) {
          const files: File[] = keyStore[newBasePath] as File[];
          const storagePath: string = formState.storagePath.path(
            keyStore[formState.storagePath.prop as string]
              ? keyStore[formState.storagePath.prop as string].toString()
              : ""
          );
          const urls = await batchUploadFiles(files, storagePath);
          keyStore[newBasePath] = urls;
          return urls;
        } else {
          return keyStore[newBasePath];
        }
      }
    }
  }

  recursiveValidationCheckerV2(
    validationStore: ValidationStore,
    formBuilderSchema: FormState,
    formState: Section | RepeatableSection | FormElement,
    basePath: string,
    validated: { status: boolean }
  ) {
    // Check if the element is visible
    if (
      formState.visible &&
      !formState.visible.validator(
        this.populate(
          formState.visible.props as string[],
          formBuilderSchema,
          basePath
        )
      )
    )
      return;

    // If the element is visible then do the exporting
    switch (formState.type) {
      case FormType.SECTION: {
        let elements = {};
        formState.formElements.forEach((element) => {
          // @ts-ignore
          elements[element.key] = this.recursiveValidationCheckerV2(
            validationStore,
            formBuilderSchema,
            element,
            basePath + `[${formState.key}]-`,
            validated
          );
        });
        return;
      }
      case FormType.REPEATABLE_SECTION: {
        const elements: any[] = [];
        formState.formElements.forEach(
          // @ts-ignore
          (
            elementsArray: Array<Section | FormElement | RepeatableSection>,
            elementsArrayIndex: number
          ) => {
            let tempState = {};
            elementsArray.forEach((element) => {
              // @ts-ignore
              tempState[element.key as string] =
                this.recursiveValidationCheckerV2(
                  validationStore,
                  formBuilderSchema,
                  element,
                  basePath + `[${formState.key}]-(${elementsArrayIndex})-`,
                  validated
                );
            });

            elements.push(tempState);
          }
        );
        return;
      }

      default: {
        const newBasePath = basePath + `[${formState.key}]`;
        if (validationStore.hasOwnProperty(newBasePath))
          validated.status = validated.status && validationStore[newBasePath];
      }
    }
  }

  recursiveExporterWithoutUpload(
    keyStore: KeyStore,
    formState: Section | RepeatableSection | FormElement,
    basePath: string
  ) {
    switch (formState.type) {
      case FormType.SECTION: {
        let elements = {};
        formState.formElements.forEach((element) => {
          // @ts-ignore
          elements[element.key] = this.recursiveExporterWithoutUpload(
            keyStore,
            element,
            basePath + `[${formState.key}]-`
          );
        });

        return elements;
      }
      case FormType.REPEATABLE_SECTION: {
        const elements: any[] = [];
        formState.formElements.forEach(
          // @ts-ignore
          (
            elementsArray: Array<Section | FormElement | RepeatableSection>,
            elementsArrayIndex: number
          ) => {
            let tempState = {};
            elementsArray.forEach((element) => {
              // @ts-ignore
              tempState[element.key as string] =
                this.recursiveExporterWithoutUpload(
                  keyStore,
                  element,
                  basePath + `[${formState.key}]-(${elementsArrayIndex})-`
                );
            });

            elements.push(tempState);
          }
        );
        return elements;
      }
      default: {
        const newBasePath = basePath + `[${formState.key}]`;

        if (formState.type === FormInputType.EDITOR_V2_INPUT)
          // @ts-ignore
          return keyStore[newBasePath]?.content;

        return keyStore[newBasePath];
      }
    }
  }

  // Gets the value with the given basePath -> More powerful than KeyStore
  getValue(
    exportedSchema:
      | string
      | number
      | Array<File>
      | Array<number>
      | Array<string>
      | File
      | ExportableFormState
      | Array<ExportableFormState>
      | OutputBlockData[]
      | OutputBlockData,
    keysToProcess: Array<string>,
    processedIndex: number
  ): any {
    if (processedIndex === keysToProcess.length) return exportedSchema;

    let innerExoprt = {};
    if (Array.isArray(exportedSchema)) {
      if (exportedSchema)
        innerExoprt = exportedSchema[Number(keysToProcess[processedIndex])];
      else return exportedSchema;
    } else {
      if (exportedSchema)
        // @ts-ignore
        innerExoprt = exportedSchema[keysToProcess[processedIndex]];
      else return exportedSchema;
    }
    return this.getValue(innerExoprt, keysToProcess, processedIndex + 1);
  }
}
