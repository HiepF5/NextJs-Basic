"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
function Facebook() {
  const router = useRouter();
  const handleBack = () => {
    router.push("/");
  };
  return (
    <div>
      <div>
        Facebook
        <div>
          <Button variant="success">CLick</Button>
          <button onClick={() => handleBack()}>Back Home</button>
        </div>
      </div>
    </div>
  );
}

export default Facebook;
