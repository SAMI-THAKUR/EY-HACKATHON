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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { getUserHandler, LoginHandler } from "../../apicalls/auth.api";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = async (e) => {
    try {
      dispatch(setLoader(true));
      e.preventDefault();
      const res = await LoginHandler(email, password);

      if (!res.success) {
        dispatch(setLoader(false));
        alert(res.message);
      } else {
        navigate("/");
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.error("Error logging in:", error);
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
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
              Login
            </Button>
            <Button variant="outline" className="w-full">
              <Link to={"http://localhost:3000/auth/google"}>
                {" "}
                Login with Google
              </Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to={"/auth/register"} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
