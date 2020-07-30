import { extractTldFromSummary } from '@utils/ical';

describe('iCalendar file parsing', () => {
  it('extracts TLDs from summary text', () => {
    expect(extractTldFromSummary('GA .car (Cars Registry Limited | Uniregistry Inc.)')).toEqual('.car');
    expect(extractTldFromSummary('GA .car ')).toEqual('.car');
    expect(extractTldFromSummary('SR .lol (Uniregistry\\, Corp. | Uniregistry Inc.)')).toEqual('.lol');
    expect(extractTldFromSummary('SR .photography ')).toEqual('.photography');
    expect(extractTldFromSummary('SR .lol .car ')).toEqual('.lol');
    expect(extractTldFromSummary('GA .汽车 ')).toEqual('.汽车');
    expect(() => extractTldFromSummary('GA .car')).toThrow();
    expect(() => extractTldFromSummary('GR .car')).toThrow();
    expect(() => extractTldFromSummary('.car ')).toThrow();
    expect(() => extractTldFromSummary('.car')).toThrow();
    expect(() => extractTldFromSummary('GAA .car ')).toThrow();
    expect(() => extractTldFromSummary('GA GA .car ')).toThrow();
  });

  it('extracts TLDs from ICS files', () => {});
});

describe('iCalendar helpers', () => {
  it('merges events', () => {});
});
