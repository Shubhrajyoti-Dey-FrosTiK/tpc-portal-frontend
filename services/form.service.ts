import {
  ExportableFormState,
  FormBuilder,
  KeyStore,
  RepeatableSection,
  Section,
  ValidationStore,
} from "../types/Form";
import { FormElement, FormType } from "../types/FormType";

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

  recursiveEditor(
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
    pathIndex: number
  ): void {
    //  Base Condition -> Reached Target Element to update
    if (
      pathIndex === pathArray.length &&
      !Array.isArray(state) &&
      !Array.isArray(initialSchema) &&
      state.type === FormType.REPEATABLE_SECTION &&
      initialSchema.type === FormType.REPEATABLE_SECTION
    ) {
      state.formElements.push(initialSchema.formElements[0]);
      return;
    }

    // Checking if it is a Section or Array of Sections, FormELements, RepeatingSections
    if (Array.isArray(state) && Array.isArray(initialSchema)) {
      // Now checking if it is a repeating section
      // If it a repeating section we want the first element to be pushed from the initialSchema
      // Otherwise the updated schema will get pushed which is not optimal
      if (Array.isArray(state[0]))
        this.recursiveEditor(
          state[pathArray[pathIndex]],
          initialSchema[0],
          pathArray,
          pathIndex + 1
        );
      else
        this.recursiveEditor(
          state[pathArray[pathIndex]],
          initialSchema[pathArray[pathIndex]],
          pathArray,
          pathIndex + 1
        );
    } else if (
      !Array.isArray(state) &&
      !Array.isArray(initialSchema) &&
      (state.type === FormType.SECTION ||
        state.type === FormType.REPEATABLE_SECTION) &&
      (initialSchema.type === FormType.SECTION ||
        initialSchema.type === FormType.REPEATABLE_SECTION)
    )
      this.recursiveEditor(
        state.formElements[pathArray[pathIndex]],
        initialSchema.formElements[pathArray[pathIndex]],
        pathArray,
        pathIndex + 1
      );
  }

  recursiveRemover(
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
  ): void {
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

  removeRepeatingSection(
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

  recursiveExporter(
    keyStore: KeyStore,
    formState:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    exportableFormData:
      | string
      | number
      | Array<number>
      | Array<string>
      | ExportableFormState
      | Array<ExportableFormState>,
    basePath: string,
    exportableFormData2: any
  ) {
    // Checking if is a FormElement  -> If this is true then it is a formElement
    if (
      !Array.isArray(formState) &&
      typeof exportableFormData === "object" &&
      !Array.isArray(exportableFormData)
    ) {
      switch (formState.type) {
        case FormType.SECTION:
          exportableFormData[formState.key as string] = {};
          formState.formElements.forEach(
            (element: FormElement | Section | RepeatableSection) => {
              this.recursiveExporter(
                keyStore,
                element,
                exportableFormData[formState.key as string],
                `${basePath}[${formState.key}]-`,
                exportableFormData2
              );
            }
          );
          break;

        case FormType.REPEATABLE_SECTION: {
          exportableFormData[formState.key as string] = [];
          formState.formElements.map(
            (
              section: Array<FormElement | Section | RepeatableSection>,
              sectionIndex: number
            ) => {
              if (Array.isArray(exportableFormData[formState.key as string])) {
                // @ts-ignore
                exportableFormData[formState.key as string].push({});
                section.forEach(
                  (element: FormElement | Section | RepeatableSection) => {
                    if (
                      Array.isArray(exportableFormData[formState.key as string])
                    )
                      this.recursiveExporter(
                        keyStore,
                        element,
                        // @ts-ignore
                        exportableFormData[formState.key as string][
                          sectionIndex
                        ],
                        `${basePath}[${formState.key}]-(${sectionIndex})-`,
                        exportableFormData2
                      );
                  }
                );
              }
            }
          );
          break;
        }

        default: {
          const newBasePath = `${basePath}[${formState.key}]`;
          console.log(formState, newBasePath);
          exportableFormData[formState.key as string] = keyStore[newBasePath];
        }
      }
    }
  }
}
