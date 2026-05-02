import type { Component } from 'svelte';
import type { ActionFailure } from '@sveltejs/kit';

// Authentication types

export interface User {
  id: number;
  created_at: Date;
  username: string;
}

export interface Passkey {
  cred_id: string;
  cred_public_key: Uint8Array;
  user_id: number;
  user: User;
  counter: number;
  backup_eligible: boolean;
  backup_status: boolean;
  transports: string[];
  created_at: Date;
  last_used: Date;
}

export interface Session {
  id: string;
  secret_hash: Uint8Array;
  created_at?: Date;
}

export interface SessionWithToken extends Session {
  token: string;
}

// Item types

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

export interface Degree {
  id: number;
  date_start: Date;
  date_end?: Date;
  degree: string;
  institution: string;
  location: string;
  description: string;
}

export interface Job {
  id: number;
  date_start: Date;
  date_end?: Date;
  position: string;
  company: string;
  location: string;
  description: string;
}

export interface Objective {
  id: number;
  name: string;
  description: string;
}

export interface Technology {
  id: number;
  name: string;
  labels: Label[];
  mastery: number;
  description: string;
  image: string;
}

export type Item = Activity | Degree | Job | Label | Technology;
export type Table = "activities" | "degrees" | "jobs" | "labels" | "technologies";

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

export type ActionResponse = ActionFailure<{ success: false, Validation }> | { success: boolean, message?: string };

// Frontend types

export interface ButtonConfig {
  href?: string;
  icon: Component;
  onclick?: () => void;
  target?: string;
  text: string;
};

export interface FormAction {
  action: string;
  component: Component;
}

export interface FormActions {
  edit?: FormAction;
  delete?: FormAction;
  create?: FormAction;
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

export interface NavigationPage {
  title: string;
  href: string;
  hidden?: boolean;
}

export interface Section {
  name: string;
  element: HTMLElement | null;
  current: boolean;
}

export interface TableColumn {
  title: string;
  field?: string;
  component?: Component;
  button?: ModalButtonConfig;
}

export interface TimelineItemConfig {
  title: string;
  date: string;
  icon: Component;
  location: string;
  description: string;
}
