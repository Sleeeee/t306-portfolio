import type { Component } from 'svelte';
import type { ActionFailure } from '@sveltejs/kit';

// Standard project types

export type Color = "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
export interface Label {
  id: number;
  name: string;
  color: Color;
}

export interface Activity {
  id: number;
  name: string;
  date: Date;
  description: string;
  image: string;
  labels: Label[];
  time_valued: number;
  time_real: number;
  proof: string;
}

export interface Technology {
  id: number;
  name: string;
  labels: Label[];
  mastery: number;
  description: string;
  image: string;
}

export type Item = Activity | Label | Technology;
export type Table = "activities" | "labels" | "technologies";

// Backend types

export interface BufferConfig {
  buffer: Buffer;
  extension: string;
}

export interface FileType {
  ext: string;
  mime: string;
}

export type ForeignKeyAction = "connect" | "set";
export interface ForeignKeyConfig {
  [K in ForeignKeyAction]?: number[];
}

export interface Validation {
  success: boolean;
  message?: string;
  parsedField?: any;
  buffer?: {
    buffer: BufferConfig;
    extension: string;
  };
  existingItem?: Item;
}
export type Validator = (data: any) => Validation | (data:any) => Promise<Validation>;

export interface RawField {
  data: any;
  validator?: Validator;
}
export type RawData = Record<string, RawField>;

export type ActionResponse = ActionFailure<{ success: false, Validation }> | { success: true, message: string };

// Frontend types

export interface FormActions {
  edit: string;
  delete: string;
  create: string;
}

export interface FormField {
  title: string;
  component: Component;
  defaultValue: any;
  items?: any;
  label?: string;
  placeholder?: string;
  style?: string;
  required?: boolean;
}

export interface ImageProps {
  src: string;
  alt: string;
}

export interface ModalButtonConfig {
  key: string;
  type: "image" | "text";
}

export interface ModalConfig {
  key: string;
  title: string;
  component: Component;
}

export interface TableColumn {
  title: string;
  field?: string;
  component?: Component;
  button?: ModalButtonConfig;
}
