import { services } from "../services"
import { Services } from "../services/context";

export interface ThunkExtraArgs {
  services: Services
}

export const thunkExtraArg: ThunkExtraArgs = {
  services
};
