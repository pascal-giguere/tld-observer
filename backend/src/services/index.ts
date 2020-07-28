import { Express } from 'express';
import { Service } from '@services/Service';
import { RootService } from '@services/root.service';
import { MemberService } from '@services/member.service';

const services: Service[] = [new RootService('/'), new MemberService('/member')];

export function initServices(app: Express): void {
  services.forEach((service: Service) => service.init(app));
}
