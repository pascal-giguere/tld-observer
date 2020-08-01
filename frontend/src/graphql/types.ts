export type GqlTldsQueryData = {
  allLatestTlds: { nodes: GqlTld[] };
  allUpcomingTlds: { nodes: GqlTld[] };
};

export type GqlTld = {
  tld: string;
  launchDate: Date;
  launchDateConfirmed: boolean;
};
