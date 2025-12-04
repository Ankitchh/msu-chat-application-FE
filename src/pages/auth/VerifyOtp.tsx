import { useState, useEffect } from "react";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [resendTimer, setResendTimer] = useState(120);
  const [disabled, setDisabled] = useState(false);

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    alert("OTP Submitted!");
    console.log("OTP:", otp.join(""));
  };

  // Countdown timer - runs only when disabled becomes true
  useEffect(() => {
    if (!disabled) return;

    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t === 1) {
          setDisabled(false);
          return 120;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disabled]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    // Move to next input automatically
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-100 py-12 dark:bg-zinc-900">
      <div className="relative bg-white dark:bg-gray-950 px-8 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-10">
          {/* Header */}
          <div className="text-center flex flex-col space-y-2">
            <h1 className="text-2xl font-semibold">Email Verification</h1>
            <p className="text-sm text-gray-500">
              We have sent a code to your email <b>ba**@dipainhouse.com</b>
            </p>
          </div>

          <form onSubmit={handleOtpVerify}>
            {/* OTP Input */}
            <div className="flex justify-center gap-3 ">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  maxLength={1}
                  value={digit}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="w-14 h-14 text-center text-lg border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="space-y-6 mt-5">
              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 rounded-lg"
              >
                Verify Account
              </button>

              <div className="text-center text-sm text-gray-500">
                {!disabled ? (
                  <button
                    type="button"
                    className="text-blue-600 underline"
                    onClick={() => {
                      setDisabled(true);
                      setResendTimer(120);
                      alert("OTP resent!");
                    }}
                  >
                    Resend
                  </button>
                ) : (
                  <span>Resend in {resendTimer}s</span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
