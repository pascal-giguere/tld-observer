import { Express } from 'express';
import { Service } from '@services/Service';
import { RootService } from '@services/root.service';
import { MemberService } from '@services/member.service';
import { TldService } from '@services/tld.service';

const services: Service[] = [new RootService('/'), new MemberService('/member'), new TldService('/tld')];

export function initServices(app: Express): void {
  services.forEach((service: Service) => service.init(app));
}
