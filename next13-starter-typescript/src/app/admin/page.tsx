"use client";
import { useRouter } from "next/navigation";
function Facebook() {
  const handleBack = () => {
    alert("me");
  };
  return (
    <div>
      <div>
        Facebook
        <div>
          <button onClick={() => handleBack()}>Back Home</button>
        </div>
      </div>
    </div>
  );
}

export default Facebook;
