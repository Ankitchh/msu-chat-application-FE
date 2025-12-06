import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const loginApi = async (email: string, password: string) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    localStorage.setItem("token", res.data.token);
    return res.data.user;
  } catch (error) {
    console.error("Error logging in!");
    return;
  }
};

export const registerApi = async (data: any) => {
  try {
    await axios.post(
      `${BACKEND_URL}/auth/register`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        registrationNo: data.registrationNo,
        phoneNumber: data.phoneNumber,
        semester: data.semester != "" ? data.semester : "",
        department: data.department != "" ? data.department : "",
        gender: data.gender,
        userRole: data.userRole,
        degsination: data.degsination != "" ? data.degsination : "",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return;
  } catch (error) {
    console.error("Error registering in!");
    return;
  }
};

export const verifyOtpApi = async (otp: string) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/auth/verify-otp`,
      {
        email: localStorage.getItem("email"),
        otp: otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", res.data.token);
    localStorage.removeItem("email");
    return res.data.user;
  } catch (error) {
    console.error("Error verifying in!");
    return;
  }
};
