import {  Document } from './document';

export interface Client {
  id: string;
  name: string;
  documents: Document[];
}
