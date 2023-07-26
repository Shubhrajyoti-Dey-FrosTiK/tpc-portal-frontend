"use client";

// Components
import {
  TextInput,
  Checkbox,
  Group,
  Box,
  PasswordInput,
  Paper,
  Button,
  Typography,
  Input,
} from "../../components/components";

//Tabler Icons
import { IconEyeCheck, IconEyeOff, IconBrandGoogle } from "@tabler/icons";

// Firebase
import { handleLoginWithGoogle } from "../../firebase/auth";

// Hooks
import { useState } from "react";

// export const runtime = "edge";

export default function Login() {
  const [Text, setText] = useState("");

  const googleLogin = async () => {
    const response = await handleLoginWithGoogle();
  };

  return (
    <Box
      sx={{ maxWidth: 300 }}
      mx="auto"
      className="flex flex-col justify-center"
    >
      <Typography order={2}>Login</Typography>
      <Typography order={6}>Welcome to Training and Placement Cell</Typography>
      <form className="mt-2">
        <TextInput
          withAsterisk
          label="Email"
          value={Text}
          onChange={(event) => setText(event.currentTarget.value)}
          error={
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Text)
              ? null
              : "invalid email"
          }
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
        />
        <Checkbox
          mt="md"
          label="I agree to the terms and conditions"
          className="p-2 w-full"
        />
        <Group position="right" mt="md">
          <div style={{ width: "100%" }}>
            <Button className="w-full bg-[#9c36b5]">Submit</Button>
          </div>
        </Group>
        <div className="flex flex-row justify-center p-4">
          <Typography order={3}>OR</Typography>
        </div>
        <div className="flex flex-col">
          <Group position="center">
            <Paper
              className="flex flex-row w-full justify-center gap-2 cursor-pointer"
              p="xs"
              withBorder
              onClick={googleLogin}
              shadow={"sm"}
            >
              <IconBrandGoogle />
              <Typography order={5}>Login with Google</Typography>
            </Paper>
          </Group>
        </div>
      </form>
    </Box>
  );
}
