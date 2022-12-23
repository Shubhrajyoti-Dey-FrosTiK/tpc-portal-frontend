import { FormBuilder, FormElement, Section } from "../types/Form";
import { FormType } from "../types/FormType";
import ValidationService from "./validation.service";

export interface FormElementDTO extends FormElement {
  id: String;
}

export interface SectionDTO extends Section {
  id: String;
  formElements: Array<FormElementDTO | SectionDTO>;
}

export interface FormBuilderDTO extends FormBuilder {
  sections: Array<SectionDTO>;
}

export interface KeyStore {
  [key: string]: String;
}

export class FormService {
  vs = new ValidationService();

  recursiveFormatter(
    jsonArray: Array<Section | FormElement>,
    basePath: string
  ): void {
    jsonArray.forEach((jsonElement) => {
      if (jsonElement.type === FormType.SECTION) {
        this.recursiveFormatter(
          jsonElement.formElements,
          basePath + `[${jsonElement.key}]-`
        );
      } else {
        jsonElement.id = basePath + `[${jsonElement.key}]`;
      }
    });
  }

  initializeFormBuilder(form: FormBuilder): FormBuilderDTO {
    let newForm = { ...form };
    this.recursiveFormatter(newForm.sections, "");
    return newForm as FormBuilderDTO;
  }
}
