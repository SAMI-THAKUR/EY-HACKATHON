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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    try {
      dispatch(setLoader(true));
      e.preventDefault();
      const res = await RegisterHandler(email, password);

      if (!res.success) {
        dispatch(setLoader(false));

        alert(res.message);
      } else {
        navigate("/home");
        dispatch(setLoader(false));
      }
    } catch (error) {
      dispatch(setLoader(false));

      console.error("Error registering in:", error);
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
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
              <Link to={"http://localhost:3000/auth/google"}>
                {" "}
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
