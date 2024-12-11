import { useMemo, useState } from "react";
import type { RefinementCtx, z } from "zod";

export type TValidationError = { id: string; message: string };

type MatchKeyAndValue<T extends object> = { [Key in keyof T]: Key };
type TZObj = ReturnType<typeof z.object>;

export const useFormValidation = <TSchema extends TZObj>(
  schema: TSchema,
  superRefine?: (data: TSchema["_output"], ctx: RefinementCtx) => void
) => {
  type TValues = z.infer<TSchema>;
  type TErrorDictionary = Record<
    keyof TValues | (string & {}),
    TValidationError
  >;

  const emptyErrorDict = {} as TErrorDictionary;
  const [errorDict, setErrorDict] = useState<TErrorDictionary>(emptyErrorDict);

  const formId = useMemo(() => {
    return `form-${Date.now().toString(36)}`;
  }, []);

  const fieldNames = useMemo(() => {
    type TNames = keyof ReturnType<TSchema["_def"]["shape"]>;
    type TNameRecord = Record<TNames, string>;

    const nameList = Object.keys(schema._def.shape()) as TNames[];

    const nameCollection = nameList.reduce((acc, key: TNames) => {
      acc[key] = key as string;
      return acc;
    }, {} as TNameRecord);

    return nameCollection as MatchKeyAndValue<typeof nameCollection>;
  }, [schema]);

  /*******************************************************/
  /**************** VALIDATION FUNCTIONS *****************/
  /*******************************************************/
  const validateForm = () => {
    const values = extractFormValues();
    const fullSchema = superRefine ? schema.superRefine(superRefine) : schema;
    const { success, data, error } = fullSchema.safeParse(values);

    const formErrors = error?.issues
      ? extractErrorMessages(error.issues)
      : emptyErrorDict;
    setErrorDict(formErrors);

    if (Object.values(formErrors).length > 0) {
      scrollToFirstError(formErrors);
    }

    return {
      data: data as TValues,
      errors: formErrors,
      isValid: success,
    };
  };

  const fieldValidation = (
    key: keyof TErrorDictionary
  ): TValidationError | void => {
    const values = extractFormValues();
    const fieldValue = { [key]: values[key] };

    const fullSchema = superRefine ? schema.superRefine(superRefine) : schema;
    const { success, error } = fullSchema.safeParse(fieldValue);

    if (success && !error) {
      removeError(key);
      return;
    }

    const errorList = extractErrorMessages(error.issues);
    setErrorDict((prev) => ({ ...prev, [key]: errorList[key] }));

    return errorList[key];
  };

  /*******************************************************/
  /***************** HANDLE FORM ERRORS ******************/
  /*******************************************************/
  const getError = (key: keyof TErrorDictionary) => {
    return errorDict[key] || { id: -1, message: "" };
  };

  const setError = (key: keyof TErrorDictionary, message: string) => {
    const newError = createErrorMessage(message);
    const newErrorDict = { ...errorDict, [key]: newError };

    setTimeout(() => setErrorDict(newErrorDict), 0);
  };

  const removeError = (
    keyList: keyof TErrorDictionary | keyof TErrorDictionary[]
  ) => {
    const errorKeys = Array.isArray(keyList) ? keyList : [keyList];
    const dictKeys = Object.keys(errorDict);

    const emptyDict = {} as TErrorDictionary;

    const newErrorDict = dictKeys.reduce((newDict, key) => {
      if (errorKeys.includes(key)) {
        return newDict;
      }

      const typedKey = key as keyof TValues;
      newDict[typedKey] = errorDict[typedKey];

      return newDict;
    }, emptyDict);

    setTimeout(() => setErrorDict(newErrorDict), 0);
  };

  /*******************************************************/
  /****************** HELPER FUNCTIONS *******************/
  /*******************************************************/
  const createErrorMessage = (message: string) => {
    return {
      id: Math.random().toString(36),
      message: message,
    };
  };

  const extractErrorMessages = (issueList: z.ZodIssue[]): TErrorDictionary => {
    const initErrors = {} as TErrorDictionary;

    return issueList.reduce<TErrorDictionary>((errorDict, issue) => {
      const fieldName = issue.path[0] as keyof TValues;
      errorDict[fieldName] = createErrorMessage(issue.message);

      return errorDict;
    }, initErrors);
  };

  const extractFormValues = (): TValues => {
    const formElement = document.querySelector<HTMLFormElement>(
      `form#${formId}`
    );

    if (!formElement) {
      console.error(
        "Form element is undefined, check if the form has the correct id. It should be the same as the formId passed to useForm"
      );
      return {};
    }

    const formData = new FormData(formElement);
    const formDataObj = Object.fromEntries(formData.entries());

    for (const key in formDataObj) {
      const value = formDataObj[key];
      if (typeof value === "string" && value.trim().length === 0) {
        delete formDataObj[key];
      }
    }

    return formDataObj;
  };

  const scrollToFirstError = (errorMap: TErrorDictionary) => {
    const errorKeys = Object.keys(errorMap);
    if (errorKeys.length === 0) {
      console.log("No errors");
      return;
    }

    const errorFields = errorKeys.reduce<HTMLElement[]>((acc, key) => {
      const element = document.getElementById(key);
      if (element) {
        acc.push(element);
      }

      return acc;
    }, []);
    const firstElement = errorFields[0];

    if (errorFields.length === 0 || !firstElement) {
      return;
    }

    const initData = {
      top: firstElement.getBoundingClientRect().top,
      field: firstElement,
    };

    const topMostErrorField = errorFields.reduce((topMost, field) => {
      if (!field) {
        return topMost;
      }

      const { top } = field.getBoundingClientRect();
      return topMost.top > top ? { top, field } : topMost;
    }, initData);

    topMostErrorField.field.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return {
    formId,
    fieldNames,

    removeError,
    setError,
    getError,

    fieldValidation,
    validateForm,
  };
};
