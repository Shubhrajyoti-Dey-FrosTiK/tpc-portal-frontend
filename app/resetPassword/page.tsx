"use client";
import dynamic from "next/dynamic";
// Components
import {
    TextInput,
    Group,
    Box,
    Button,
    Typography,
    showNotification
} from "../../components/components";

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


import { handleSendPasswordResetEmail } from "../../firebase/auth";

// export const runtime = "edge";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<boolean>(true);
    const router = useRouter();
    const dispatch = useDispatch();


    const handlePasswordReset = async () => {
        const response = await handleSendPasswordResetEmail(email)
        console.log(response);
        if (!response.error) {
            showNotification({
                title: "Password Reset Email Sent.",
                message: "Check your inbox.",
            });
            router.push("/login/recruiter");
        } else {
            showNotification({
                title: "Error",
                message: response.error,
            })
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
                    onChange={(event) => {
                        setEmail(event.currentTarget.value);
                        setError(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.currentTarget.value));
                    }}
                    error={
                        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                            ? null
                            : "invalid email"
                    }
                />
                <Group position="right" mt="md">
                    <div style={{ width: "100%" }}>
                        <Button
                            className="w-full bg-[#9c36b5]"
                            onClick={handlePasswordReset}
                            disabled={error}
                        >
                            Login
                        </Button>
                    </div>
                </Group>
            </form>
        </Box>
    );
}
