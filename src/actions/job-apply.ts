"use server";

type JobApplyFieldErrors = {
  userFile?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  message?: string;
};

function validateRequire(field: string) {
  return field.trim().length !== 0;
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
  // Extract fields
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const message = formData.get("message") as string;
  const userFile = formData.get("userFile") as File | null;

  const errors: JobApplyFieldErrors = {};

  if (!validateRequire(firstName)) {
    errors.firstName = "Name is Required";
  }
  if (!validateRequire(lastName)) {
    errors.lastName = "Name is Required";
  }
  if (!validateRequire(phoneNumber)) {
    errors.phoneNumber = "Phone is Required";
  }
  if (!validateRequire(message)) {
    errors.message = "Cover Letter is Required";
  }
  if (!userFile) {
    errors.userFile = "Resume or image file is required";
  } else if (!validateUserFile(userFile)) {
    errors.userFile = "Please upload a PDF or image file (max 50MB)";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      message: "Validation failed"
    };
  }

  try {
    const sendBody = new FormData();
    sendBody.append("name", firstName + " " + lastName);
    sendBody.append("phoneNumber", phoneNumber);
    sendBody.append("coverLetter", message);
    if (userFile) sendBody.append("userFile", userFile);


    // const result = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/applied-jobs`,
    //   {
    //     method: "POST",
    //     body: sendBody
    //   }
    // );

    // if (!result.ok) {
    //   throw new Error("Failed to send application");
    // }

    return {
      success: true,
      message:
        "Thank you for applying! We have received your application and will get back to you shortly."
    };
  } catch (err: unknown) {

    return {
      success: false,
      message: "Something went wrong. Please try again."
    };
  }
}
