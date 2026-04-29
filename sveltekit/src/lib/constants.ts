import type { Color, ForeignKeyAction, Table, TextConstants } from '$lib/types';

export const validSessionMilliseconds: number = 3600000;

export const validColors: Color[] = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];

export const validForeignKeyActions: ForeignKeyAction[] = ["connect", "set"];

export const validImageFields: string[] = ["image", "proof"];

export const validMimeTypes: string[] = ["image/jpeg", "image/png"];

export const validTables: Table[] = ["activities", "degrees", "jobs", "labels", "technologies"];

export const homeDescription: string = "Hey there, I'm Justin, a final year student in IT, with a strong interest in security, especially pentesting. This is my personal portfolio, where I showcase some of my professional works and achievements. Hope you have a good time !";
export const aboutDescription: string = "This section provides an overview of my technical background and professional journey.";
export const technologiesDescription: string = "Valuable hard skills I have learned along the way";
export const experienceDescription: string = "Relevant tech positions";
export const educationDescription: string = "Academic enrollment";
export const trainingDescription: string = "This section highlights work I've been involved in, including projects, activities and events related to tech.";
export const contactDescription: string = "Want to get in touch ? Have any questions ? Don't hesitate to reach out !";
export const adminDescription: string = "Manage the contents of the database to customize this portfolio.";
