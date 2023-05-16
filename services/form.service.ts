import { batchUploadFiles } from "../firebase/storage";
import {
  ExportableFormState,
  FormBuilder,
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

const populate = (propsArray: Array<string>, keyStore: KeyStore) => {
  const populatedArray: string[] = [];

  propsArray.forEach((prop) => populatedArray.push(keyStore[prop] as string));

  return populatedArray;
};

export default class FormService {
  vs = new ValidationService();

  async recursiveEditor(
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
  ): Promise<void> {
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

  async recursiveExporter(
    keyStore: KeyStore,
    formState:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    exportableFormData:
      | string
      | number
      | Array<File>
      | Array<number>
      | Array<string>
      | ExportableFormState
      | Array<ExportableFormState>,
    basePath: string,
    exportable?: boolean
  ) {
    // Checking if is a FormElement  -> If this is true then it is a formElement
    if (
      !Array.isArray(formState) &&
      typeof exportableFormData === "object" &&
      !Array.isArray(exportableFormData)
    ) {
      switch (formState.type) {
        case FormType.SECTION:
          if (
            formState.visible &&
            !formState.visible.validator(
              populate(formState.visible.props as string[], keyStore)
            )
          )
            return;
          exportableFormData[formState.key as string] = {};
          formState.formElements.forEach(
            (element: FormElement | Section | RepeatableSection) => {
              this.recursiveExporter(
                keyStore,
                element,
                exportableFormData[formState.key as string],
                `${basePath}[${formState.key}]-`,
                exportable
              );
            }
          );
          break;

        case FormType.REPEATABLE_SECTION: {
          if (
            formState.visible &&
            !formState.visible.validator(
              populate(formState.visible.props as string[], keyStore)
            )
          )
            return;
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
                        exportable
                      );
                  }
                );
              }
            }
          );
          break;
        }

        default: {
          // const newBasePath = `${basePath}[${formState.key}]`;
          // exportableFormData[formState.key as string] = keyStore[newBasePath];

          const newBasePath = `${basePath}[${formState.key}]`;

          console.log(exportable, formState.type === FormInputType.FILE);

          if (exportable && formState.type === FormInputType.FILE) {
            const urls = await batchUploadFiles(
              keyStore[newBasePath] as File[],
              formState.storagePath.path(
                keyStore[formState.storagePath.prop as string]
                  ? keyStore[formState.storagePath.prop as string].toString()
                  : ""
              )
            );

            exportableFormData[formState.key as string] = urls;
            keyStore[newBasePath] = urls;
          } else {
            exportableFormData[formState.key as string] = keyStore[newBasePath];
          }
        }
      }
    }
  }

  recursiveValidationChecker(
    keyStore: KeyStore,
    formState:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    exportableFormData:
      | string
      | number
      | Array<File>
      | Array<number>
      | Array<string>
      | ExportableFormState
      | Array<ExportableFormState>,
    basePath: string,
    validated: { status: boolean },
    validationStore: ValidationStore
  ) {
    // Checking if is a FormElement  -> If this is true then it is a formElement
    if (
      !Array.isArray(formState) &&
      typeof exportableFormData === "object" &&
      !Array.isArray(exportableFormData)
    ) {
      switch (formState.type) {
        case FormType.SECTION:
          if (
            formState.visible &&
            !formState.visible.validator(
              populate(formState.visible.props as string[], keyStore)
            )
          )
            return;
          exportableFormData[formState.key as string] = {};
          formState.formElements.forEach(
            (element: FormElement | Section | RepeatableSection) => {
              this.recursiveValidationChecker(
                keyStore,
                element,
                exportableFormData[formState.key as string],
                `${basePath}[${formState.key}]-`,
                validated,
                validationStore
              );
            }
          );
          break;

        case FormType.REPEATABLE_SECTION: {
          if (
            formState.visible &&
            !formState.visible.validator(
              populate(formState.visible.props as string[], keyStore)
            )
          )
            return;
          else console.log("Hgello");
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
                      this.recursiveValidationChecker(
                        keyStore,
                        element,
                        // @ts-ignore
                        exportableFormData[formState.key as string][
                          sectionIndex
                        ],
                        `${basePath}[${formState.key}]-(${sectionIndex})-`,
                        validated,
                        validationStore
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

          validated.status = validated.status && validationStore[newBasePath];
        }
      }
    }
  }

  async recursiveViewConverter(
    keyStore: KeyStore,
    formState:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    exportableFormData:
      | string
      | number
      | Array<File>
      | Array<number>
      | Array<string>
      | ExportableFormState
      | Array<ExportableFormState>,
    basePath: string
  ) {
    // Checking if is a FormElement  -> If this is true then it is a formElement
    if (
      !Array.isArray(formState) &&
      typeof exportableFormData === "object" &&
      !Array.isArray(exportableFormData)
    ) {
      switch (formState.type) {
        case FormType.SECTION:
          exportableFormData[formState.title as string] = {};
          formState.formElements.forEach(
            (element: FormElement | Section | RepeatableSection) => {
              this.recursiveViewConverter(
                keyStore,
                element,
                exportableFormData[formState.title as string],
                `${basePath}[${formState.key}]-`
              );
            }
          );
          break;

        case FormType.REPEATABLE_SECTION: {
          exportableFormData[formState.title as string] = [];
          formState.formElements.map(
            (
              section: Array<FormElement | Section | RepeatableSection>,
              sectionIndex: number
            ) => {
              if (
                Array.isArray(exportableFormData[formState.title as string])
              ) {
                // @ts-ignore
                exportableFormData[formState.title as string].push({});
                section.forEach(
                  (element: FormElement | Section | RepeatableSection) => {
                    if (
                      Array.isArray(
                        exportableFormData[formState.title as string]
                      )
                    )
                      this.recursiveViewConverter(
                        keyStore,
                        element,
                        // @ts-ignore
                        exportableFormData[formState.title as string][
                          sectionIndex
                        ],
                        `${basePath}[${formState.key}]-(${sectionIndex})-`
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
          exportableFormData[formState.label as string] = keyStore[newBasePath];
        }
      }
    }
  }
}
