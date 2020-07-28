import { Express } from 'express';
import { rootService } from '@services/root.service';
import { memberService } from '@services/member.service';

export type Service = (app: Express) => void;

const services: Service[] = [rootService, memberService];

export function initServices(app: Express): void {
  services.forEach((service: Service) => service(app));
}
