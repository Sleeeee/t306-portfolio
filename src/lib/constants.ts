import type { Color, ForeignKeyAction, Table } from '$lib/types';

export const validColors: Color[] = ["red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];

export const validForeignKeyActions: ForeignKeyAction[] = ["connect", "set"];

export const validImageFields: string[] = ["image", "proof"];

export const validMimeTypes: string[] = ["image/jpeg", "image/png"];

export const validTables: Table[] = ["activities", "labels", "technologies"];
