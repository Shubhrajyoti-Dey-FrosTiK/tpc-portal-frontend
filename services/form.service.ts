import { RepeatableSection, Section } from "../types/Form";
import { FormElement, FormType } from "../types/FormType";

export default class FormService {
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
}
