import { EntityStoreConfig } from './api';

export const ENTITY_LIST: EntityStoreConfig[] = [
  {
    entity: 'employees',
    baseUrl: process.env.NEXT_PUBLIC_ZARE_API ?? '/employees/api/',
  }

]