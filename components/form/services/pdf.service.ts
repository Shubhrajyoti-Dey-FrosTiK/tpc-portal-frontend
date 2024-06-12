import { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { FormState, KeyStore, RepeatableSection, Section } from "../types/Form";
import { FormElement, FormInputType, FormType } from "../types/FormType";
import FormService from "./form.service";
import htmlToPdfmake from "html-to-pdfmake";

export interface PDFSchema extends TDocumentDefinitions {
  content: Content[];
}

export default class PDFService {
  fs = new FormService();

  recursiveExporterPDF(
    keyStore: KeyStore,
    formState:
      | Array<Section | RepeatableSection | FormElement>
      | Section
      | RepeatableSection
      | FormElement,
    exportableFormData: PDFSchema,
    basePath: string,
    formStateSnapshot: FormState
  ) {
    // Checking if is a FormElement  -> If this is true then it is a formElement
    if (!Array.isArray(formState)) {
      switch (formState.type) {
        case FormType.SECTION:
          if (
            formState.visible &&
            !formState.visible.validator(
              this.fs.populate(
                formState.visible.props as string[],
                formStateSnapshot,
                basePath
              )
            )
          )
            return;

          exportableFormData.content.push({
            text: formState.title,
            bold: true,
            marginTop: 10,
            fontSize: 15,
          } as Content);
          formState.formElements.forEach(
            (element: FormElement | Section | RepeatableSection) => {
              this.recursiveExporterPDF(
                keyStore,
                element,
                exportableFormData,
                `${basePath}[${formState.key}]-`,
                formStateSnapshot
              );
            }
          );
          break;

        case FormType.REPEATABLE_SECTION: {
          if (
            formState.visible &&
            !formState.visible.validator(
              this.fs.populate(
                formState.visible.props as string[],
                formStateSnapshot,
                basePath
              )
            )
          )
            return;

          formState.formElements.map(
            (
              section: Array<FormElement | Section | RepeatableSection>,
              sectionIndex: number
            ) => {
              exportableFormData.content.push({
                text: `${formState.title} ${sectionIndex + 1}`,
                bold: true,
                marginTop: 10,
                fontSize: 15,
              } as Content);

              section.forEach(
                (element: FormElement | Section | RepeatableSection) => {
                  this.recursiveExporterPDF(
                    keyStore,
                    element,
                    exportableFormData,
                    `${basePath}[${formState.key}]-(${sectionIndex})-`,
                    formStateSnapshot
                  );
                }
              );
            }
          );
          break;
        }

        default: {
          const newBasePath = `${basePath}[${formState.key}]`;

          exportableFormData.content.push({
            text: `${formState.label}`,
            bold: true,
            nodeName: "h5",
            marginTop: 10,
          } as Content);

          if (formState.type === FormInputType.EDITOR_V2_INPUT) {
            exportableFormData.content.push(
              // @ts-ignore
              htmlToPdfmake(keyStore[newBasePath].html)
            );
          }
          // if (formState.type === FormInputType.FILE) {
          // } else {
          else if (
            Array.isArray(keyStore[newBasePath]) &&
            // @ts-ignore
            keyStore[newBasePath].length &&
            // @ts-ignore
            keyStore[newBasePath][0] instanceof File
          ) {
            (keyStore[newBasePath] as File[]).map((file: File) => {
              console.log(file);
              exportableFormData.content.push({
                text: file.name,
              });
            });
          } else {
            exportableFormData.content.push({
              text:
                keyStore[newBasePath].toString() == ""
                  ? " ---- "
                  : keyStore[newBasePath].toString(),
            } as Content);
          }
        }
      }
    }
  }
}
