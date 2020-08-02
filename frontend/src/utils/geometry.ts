// https://mathworld.wolfram.com/Ellipse.html
// https://mathworld.wolfram.com/Ellipse-LineIntersection.html

export type Point = {
  posX: number;
  posY: number;
};

export type Ellipse = {
  center: Point;
  semiAxisX: number;
  semiAxisY: number;
};

export type LineSegment = {
  pointA: Point;
  pointB: Point;
};

export function isPointInsideEllipse(point: Point, ellipse: Ellipse): boolean {
  const numeratorX: number = Math.pow(point.posX - ellipse.center.posX, 2);
  const denominatorX: number = Math.pow(ellipse.semiAxisX, 2);
  const numeratorY: number = Math.pow(point.posY - ellipse.center.posY, 2);
  const denominatorY: number = Math.pow(ellipse.semiAxisY, 2);
  return numeratorX / denominatorX + numeratorY / denominatorY <= 1;
}

export function findClosestLineEllipseIntersection(line: LineSegment, ellipse: Ellipse): Point {
  const intersections: Point[] = findLineEllipseIntersections(line, ellipse);
  return findClosestPoint(line.pointB, intersections);
}

function findLineEllipseIntersections(line: LineSegment, ellipse: Ellipse): Point[] {
  if (JSON.stringify(ellipse.center) !== JSON.stringify(line.pointA)) {
    throw Error('Line segment and ellipse must be aligned');
  }

  const numerator: number = ellipse.semiAxisX * ellipse.semiAxisY;
  const denominator: number = Math.sqrt(
    Math.pow(ellipse.semiAxisX, 2) * Math.pow(line.pointB.posY, 2) +
      Math.pow(ellipse.semiAxisY, 2) * Math.pow(line.pointB.posX, 2)
  );
  const intersectionX1: number = (numerator / denominator) * line.pointB.posX;
  const intersectionX2: number = -intersectionX1;
  const intersectionY1: number = (numerator / denominator) * line.pointB.posY;
  const intersectionY2: number = -intersectionY1;

  return [
    { posX: intersectionX1, posY: intersectionY1 },
    { posX: intersectionX2, posY: intersectionY2 },
  ];
}

function findClosestPoint(referencePoint: Point, comparedPoints: Point[]): Point {
  if (!comparedPoints.length) {
    throw Error('Must supply at least one point for comparison');
  }
  const pointsSortedByDistanceDescending: Point[] = comparedPoints.sort(
    (a: Point, b: Point) => distanceBetweenPoints(a, referencePoint) - distanceBetweenPoints(b, referencePoint)
  );
  return pointsSortedByDistanceDescending[0];
}

function distanceBetweenPoints(pointA: Point, pointB: Point): number {
  return Math.sqrt(Math.pow(pointB.posX - pointA.posX, 2) + Math.pow(pointB.posY - pointA.posY, 2));
}
