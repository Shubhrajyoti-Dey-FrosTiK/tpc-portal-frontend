"use client";
import dynamic from "next/dynamic";
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
  Alert,
} from "../../../components/components";

//Tabler Icons
import { IconEyeCheck, IconEyeOff, IconBrandGoogle } from "@tabler/icons";

// Firebase
import {
  handleLoginWithGoogle,
  handleLoginWithEmailPassword,
} from "../../../firebase/auth";

// Hooks
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);

  const googleLogin = async () => {
    const response = await handleLoginWithGoogle();
  };

  const handlePasswordLogin = async () => {
    const response = await handleLoginWithEmailPassword(email, password);
    if (response.error) {
      setError(true);
    } else {
    }
  };

  return (
    <Box
      sx={{ maxWidth: 300 }}
      mx="auto"
      className="flex flex-col justify-center"
    >
      <Typography order={2}>Recruiter Login</Typography>
      <Typography order={6}>Welcome to Training and Placement Cell</Typography>
      <form className="mt-2">
        <TextInput
          withAsterisk
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          error={
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
              ? null
              : "invalid email"
          }
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Enter your password"
          visibilityToggleIcon={({ reveal, size }) =>
            reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
          }
        />

        <Group position="right" mt="md">
          <div style={{ width: "100%" }}>
            <Button
              className="w-full bg-[#9c36b5]"
              onClick={handlePasswordLogin}
            >
              Login
            </Button>
          </div>
        </Group>
        <Alert
          title="Hello"
          variant="filled"
          withCloseButton={true}
          color="red"
        >
          Incorrect Credentials
        </Alert>
        {/* <div className="flex flex-row justify-center p-4">
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
        </div> */}
      </form>
    </Box>
  );
}
