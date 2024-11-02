import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/hooks/useAuthContext";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { dispatch } = useAuthContext(); // Get dispatch from AuthContext

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const validateForm = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  async function onSubmit(values) {
    const errors = validateForm(values);
    console.log("Submitting values:", values);

    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach((key) => {
        form.setError(key, {
          type: "manual",
          message: errors[key],
        });
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save token to localStorage
      localStorage.setItem("token", response.data.token);

      // Update AuthContext with user data
      dispatch({ type: "LOGIN", payload: response.data });

      // Show success toast
      toast({
        variant: "success",
        title: "LogIn Success",
        description: "You have successfully logged in.",
      });

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Axios error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to login. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              variant="login"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
