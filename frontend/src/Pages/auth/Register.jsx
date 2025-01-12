import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { getUserHandler, RegisterHandler } from "../../apicalls/auth.api";
import { useEffect, useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    try {
      setError("");
      dispatch(setLoader(true));
      e.preventDefault();

      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network.");
      }

      const res = await RegisterHandler(username, email, password);

      if (res.success && res.accessToken) {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        navigate("/home");
      } else {
        throw new Error(res.message || 'Registration failed');
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleGetUser = async () => {
    try {
      const res = await getUserHandler();
      if (res.success) {
        navigate("/");
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {error && (
              <div className="p-3 text-red-500 bg-red-50 rounded-md text-sm text-center">
                {error}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder="johndoe123"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                id="password"
                type="password"
                required
              />
            </div>
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="w-full"
            >
              Sign up
            </Button>
            <Button variant="outline" className="w-full">
              <Link to={`${import.meta.env.VITE_API_URL}/auth/google`}>
                Login with Google
              </Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/auth/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
