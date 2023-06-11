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
  auth,
  provider,
} from "../../../firebase/auth";

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { updateCompanyRecruiterId } from "../../../store/states/idStore";
import axios from "axios";

import { signInWithPopup } from "firebase/auth";

export const runtime = "edge";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [googleLoginError, setGoogleLoginError] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const googleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(function (result) {
        // @ts-ignore
        var isNewUser = result["_tokenResponse"].isNewUser;
        if (isNewUser) {
          //delete the created user
          result.user.delete();
          setGoogleLoginError(true);
        } else {
          // getIDToken();
          router.push("/", {
            forceOptimisticNavigation: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        // Handle Errors here.
      });
  };

  const handlePasswordLogin = async () => {
    const response = await handleLoginWithEmailPassword(email, password);
    if (response.error) {
      setError(true);
    } else {
      // getIDToken();
      router.push("/", {
        forceOptimisticNavigation: true,
      });
    }
  };

  return (
    <Box
      sx={{ maxWidth: 300 }}
      mx="auto"
      className="flex flex-col justify-center mt-10"
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
        {error && (
          <Typography
            className="m-10 font-light text-center m-auto"
            order={6}
            color="red"
          >
            Invalid Credentials
          </Typography>
        )}
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
          {googleLoginError && (
            <Typography
              className="m-10 font-light text-center m-auto"
              order={6}
              color="red"
            >
              No account with this google account exists
            </Typography>
          )}
        </div>
      </form>
    </Box>
  );
}
