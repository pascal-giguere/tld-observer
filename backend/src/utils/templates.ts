import path from 'path';
import fs from 'fs';
import moment from 'moment';

const srcDirPath: string = path.dirname(require.main!.filename);
const templateDirPath: string = path.join(srcDirPath, '../static/templates');

export function getWelcomeEmailBody(memberName: string, unsubscribeUrl: string): string {
  return getInterpolatedTemplate('welcome.html', { memberName, unsubscribeUrl });
}

export function getLaunchingTldEmailBody(memberName: string, tld: string, unsubscribeUrl: string): string {
  return getInterpolatedTemplate('launchingTld.html', { memberName, tld, unsubscribeUrl });
}

export function getUpcomingTldEmailBody(
  memberName: string,
  tld: string,
  launchDate: Date,
  unsubscribeUrl: string
): string {
  const formattedLaunchDate: string = moment(launchDate).format('MMMM Do YYYY');
  return getInterpolatedTemplate('upcomingTld.html', { memberName, tld, formattedLaunchDate, unsubscribeUrl });
}

function getInterpolatedTemplate(templateFilename: string, substitutions: { [key: string]: string }): string {
  let template: string = getTemplate(templateFilename);

  Object.entries(substitutions).forEach(([key, value]) => {
    const substitutionRegex = new RegExp(`%%${key}%%`, 'g');
    template = template.replace(substitutionRegex, value);
  });

  return template;
}

function getTemplate(templateFilename: string): string {
  const templatePath: string = path.join(templateDirPath, templateFilename);
  return fs.readFileSync(templatePath, 'utf-8');
}
