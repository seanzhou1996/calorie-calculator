import { FullFormModel, Submission, StorageKey } from './models';

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

export function setFormData(value: FullFormModel): void {
  sessionStorage.setItem(StorageKey.FormData, JSON.stringify(value));
}

export function getFormData(): FullFormModel {
  const item = sessionStorage.getItem(StorageKey.FormData);
  return !item ? null : JSON.parse(item);
}

export function clearFormData(): void {
  sessionStorage.removeItem(StorageKey.FormData);
}

export function setSubmissionBannerAckTime(time: number): void {
  localStorage.setItem(StorageKey.SubmissionBannerAckTime, time.toString());
}

export function getSubmissionBannerAckTime(): number {
  const item = localStorage.getItem(StorageKey.SubmissionBannerAckTime);
  return !item ? null : JSON.parse(item);
}
