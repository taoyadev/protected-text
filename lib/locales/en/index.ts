/**
 * English (US) translations - Master export file
 *
 * This file aggregates all English translation strings for the Protected Text application.
 * These translations serve as the source of truth for all other language translations.
 */

import { common } from './common';
import { landing } from './landing';
import { editor } from './editor';
import { dialogs } from './dialogs';
import { errors } from './errors';
import { toasts } from './toasts';
import { pro } from './pro';
import { metadata } from './metadata';

export const en = {
  common,
  landing,
  editor,
  dialogs,
  errors,
  toasts,
  pro,
  metadata,
};

export type Translations = typeof en;

export default en;
