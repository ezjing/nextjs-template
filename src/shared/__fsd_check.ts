import { ENV } from '@/shared/config/env';
import store from '@/app/store';
export const x = ENV.API_BASE_URL + String(store);
