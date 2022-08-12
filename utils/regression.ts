export type Point = [number, number];

export const leastSquares = (values: Point[], predictAt: number): number => {
  let x_sum = 0;
  let y_sum = 0;
  let xy_sum = 0;
  let xx_sum = 0;
  let count = 0;

  /*
   * The above is just for quick access, makes the program faster
   */
  let x = 0;
  let y = 0;

  /*
   * Calculate the sum for each of the parts necessary.
   */
  for (let i = 0; i < values.length; i++) {
    x = values[i][0];
    y = values[i][1];
    x_sum += x;
    y_sum += y;
    xx_sum += x * x;
    xy_sum += x * y;
    count++;
  }

  /*
   * Calculate m and b for the line equation:
   * y = x * m + b
   */
  const m = (count * xy_sum - x_sum * y_sum) / (count * xx_sum - x_sum * x_sum);
  const b = y_sum / count - (m * x_sum) / count;

  return m * predictAt + b;
};
