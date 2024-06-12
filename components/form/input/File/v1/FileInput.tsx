import { useEffect, useRef } from "react";
import {
  Group,
  Text,
  useMantineTheme,
  Dropzone,
  DropzoneProps,
  MIME_TYPES,
  Button,
  Paper,
  FileWithPath,
  Input,
  Typography,
} from "../../../../components";
import {
  IconUpload,
  IconX,
  IconCloudUpload,
  IconFileText,
} from "@tabler/icons";

import { FileInput as FileInputType } from "../../../types/FormType";
import { FormBuilder } from "../../../types/Form";
import useForm from "../../../hooks/useForm";

export default function FileInput({
  renderElement,
  formKey,
  formBuilderSchema,
  basePath,
}: {
  renderElement: FileInputType;
  formKey: string;
  formBuilderSchema: FormBuilder;
  basePath: string;
}) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  const {
    error,
    visible,
    inputState,
    captureFileInputChange,
    setBlur,
    setKeyDown,
  } = useForm({
    formElement: renderElement,
    basePath,
    formKey,
    formBuilderSchema,
  });

  const deleteFile = (index: number) => {
    const newFiles: Array<File> = [];
    inputState.forEach((file: File, fileI: number) => {
      if (fileI !== index) newFiles.push(file);
    });
    captureFileInputChange(newFiles);
  };

  return (
    <div className="relative">
      <Input.Label
        className="font-bold"
        required={(renderElement.required as boolean) || false}
      >
        {renderElement.label}
      </Input.Label>
      <Input.Description className="mb-1">
        {renderElement.description}
      </Input.Description>
      <Dropzone
        openRef={openRef}
        onDrop={(files: Array<File>) =>
          captureFileInputChange([...inputState, ...files])
        }
        // onReject={(files: Array<File>) => console.log("rejected files", files)}
        // maxSize={3 * 1024 ** 2}
        className="w-full"
        accept={[
          MIME_TYPES.doc,
          MIME_TYPES.zip,
          MIME_TYPES.docx,
          MIME_TYPES.pdf,
          MIME_TYPES.ppt,
          MIME_TYPES.pptx,
          MIME_TYPES.png,
          MIME_TYPES.jpeg,
        ]}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <div className="text-center">
              <div>
                <IconCloudUpload
                  size={100}
                  className="m-auto"
                  color={
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black
                  }
                  stroke={1.5}
                />
                <Typography order={4} size="xl" inline>
                  {renderElement.label}
                </Typography>
                <Text size="sm" color="dimmed" inline mt={7}>
                  {renderElement.description}
                </Text>
              </div>
              <Input.Error className="mt-1">{error}</Input.Error>
            </div>
          </Dropzone.Idle>
        </Group>
      </Dropzone>
      <div className="z-2 relative bottom-[20px] text-center">
        <Button
          color="purple"
          onClick={() => openRef.current?.()}
          variant="gradient"
        >
          {inputState && inputState.length ? "REPLACE" : "UPLOAD"}
        </Button>
      </div>{" "}
      {inputState && inputState.length ? (
        <div>
          <Input.Label className="font-bold">
            Files Chosen for {renderElement.label}
          </Input.Label>
          {inputState.map((file: File, index: number) => {
            return (
              <Paper
                key={`${renderElement.label}_${index}`}
                shadow="sm"
                p="sm"
                className="flex justify-between"
                withBorder
              >
                <div className="flex items-center gap-2">
                  <IconFileText size={30} />
                  <Text>{file.name}</Text>
                </div>
                <IconX
                  className="cursor-pointer"
                  size={30}
                  onClick={() => deleteFile(index)}
                  stroke={1.5}
                  color={theme.colorScheme === "dark" ? "white" : "black"}
                />
              </Paper>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
