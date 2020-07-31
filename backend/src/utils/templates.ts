import path from 'path';
import fs from 'fs';
import moment from 'moment';

const rootDirPath: string = path.dirname(require.main!.filename);
const templateDirPath: string = path.join(rootDirPath, './static/templates');

export function getWelcomeEmailBody(memberName: string): string {
  return getInterpolatedTemplate('welcome.html', { memberName });
}

export function getLaunchingTldEmailBody(memberName: string, tld: string): string {
  return getInterpolatedTemplate('launchingTld.html', { memberName, tld });
}

export function getUpcomingTldEmailBody(memberName: string, tld: string, launchDate: Date): string {
  const formattedLaunchDate: string = moment(launchDate).format('MMMM Do YYYY');
  return getInterpolatedTemplate('upcomingTld.html', { memberName, tld, formattedLaunchDate });
}

function getInterpolatedTemplate(templateFilename: string, substitutions: { [key: string]: string }): string {
  let template: string = getTemplate(templateFilename);

  Object.entries(substitutions).forEach(([key, value]) => {
    template = template.replace(`/%%${key}%%/g`, value);
  });

  return template;
}

function getTemplate(templateFilename: string): string {
  const templatePath: string = path.join(templateDirPath, templateFilename);
  return fs.readFileSync(templatePath, 'utf-8');
}
