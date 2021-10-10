import { FullFormModel, Submission, StorageKey, FormState } from './models';

export function setStoreSubmissionFlag(saveSubmission: boolean): void {
  localStorage.setItem(StorageKey.StoreSubmissionFlag, JSON.stringify(saveSubmission));
}

export function getStoreSubmissionFlag(): boolean | null {
  const item = localStorage.getItem(StorageKey.StoreSubmissionFlag);
  return !item ? null : JSON.parse(item);
}

export function setSubmission(data: FullFormModel, submissionTime: number): void {
  const submission: Submission = { data, submissionTime };
  localStorage.setItem(StorageKey.Submission, JSON.stringify(submission));
}

export function getSubmission(): Submission {
  const item = localStorage.getItem(StorageKey.Submission);
  return !item ? null : JSON.parse(item);
}

export function clearSubmission(): void {
  localStorage.removeItem(StorageKey.Submission);
}

export function setInMemorySubmission(data: FullFormModel, submissionTime: number): void {
  const submission: Submission = { data, submissionTime };
  sessionStorage.setItem(StorageKey.Submission, JSON.stringify(submission));
}

export function getInMemorySubmission(): Submission {
  const item = sessionStorage.getItem(StorageKey.Submission);
  return !item ? null : JSON.parse(item);
}

export function clearInMemorySubmission(): void {
  sessionStorage.removeItem(StorageKey.Submission);
}

export function setInMemoryFormState(value: FullFormModel, updatedAt: number): void {
  const formData: FormState = { formData: value, updatedAt };
  sessionStorage.setItem(StorageKey.FormState, JSON.stringify(formData));
}

export function getInMemoryFormState(): FormState {
  const item = sessionStorage.getItem(StorageKey.FormState);
  return !item ? null : JSON.parse(item);
}

export function clearInMemoryFormState(): void {
  sessionStorage.removeItem(StorageKey.FormState);
}
