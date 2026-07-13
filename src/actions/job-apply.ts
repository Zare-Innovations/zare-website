"use server";

type JobApplyFieldErrors = {
  userFile?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  message?: string;
  jobId?: string;
};

function validateRequire(field: string | undefined | null) {
  return typeof field === "string" && field.trim().length !== 0;
}

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUserFile(file: File | null) {
  if (!file) return false;
  const mimeOk =
    file.type === "application/pdf" || file.type.startsWith("image/");
  return mimeOk && file.size <= 50 * 1024 * 1024; // 50MB
}

export async function submitJobApply(formData: FormData): Promise<{
  success: boolean;
  errors?: JobApplyFieldErrors;
  message?: string;
}> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const message = formData.get("message") as string;
  const jobId = formData.get("jobId") as string;
  const userFile = formData.get("userFile") as File | null;

  const errors: JobApplyFieldErrors = {};

  if (!validateRequire(jobId)) errors.jobId = "Job identifier is missing";
  if (!validateRequire(firstName)) errors.firstName = "Name is Required";
  if (!validateRequire(lastName)) errors.lastName = "Name is Required";
  if (!validateRequire(phoneNumber)) errors.phoneNumber = "Phone is Required";
  if (!validateRequire(message)) errors.message = "Cover Letter is Required";
  if (!validateRequire(email)) errors.email = "Email is Required";
  else if (!validateEmail(email)) errors.email = "Invalid email address";
  if (!userFile) {
    errors.userFile = "Resume or image file is required";
  } else if (!validateUserFile(userFile)) {
    errors.userFile = "Please upload a PDF or image file (max 50MB)";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Validation failed" };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not configured");
    return {
      success: false,
      message: "Server is misconfigured. Please try again later.",
    };
  }

  const body = new FormData();
  body.append("jobId", jobId);
  body.append("fullName", `${firstName.trim()} ${lastName.trim()}`);
  body.append("email", email.trim());
  body.append("phone", phoneNumber.trim());
  body.append("coverLetter", message);
  body.append("status", "Pending");
  if (userFile) body.append("resume", userFile);

  try {
    const res = await fetch(`${apiUrl}/api/applied-jobs`, {
      method: "POST",
      body,
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("submitJobApply failed", res.status, text);
      return {
        success: false,
        message: "We couldn't submit your application. Please try again.",
      };
    }

    return {
      success: true,
      message:
        "Thank you for applying! We have received your application and will get back to you shortly.",
    };
  } catch (err) {
    console.error("submitJobApply error", err);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
