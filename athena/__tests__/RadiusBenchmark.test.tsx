// @ts-ignore
import Benchmark from 'benchmarkify';
import { test } from 'vitest';
import startMap from '../../hermes/map-fixtures/they-are-close-to-home.tsx';
import { fastMoveable, moveable } from '../Radius.tsx';
import vec from './../map/vec.tsx';

test('benchmark moveable radius', () => {
  const testMap = startMap.copy({
    units: startMap.units.delete(vec(11, 8)),
  });
  const vecA = vec(11, 7);
  const unitA = testMap.units.get(vecA);

  if (!unitA) {
    throw new Error(`Radius.test: 'unitA' not found at position ${vecA}.`);
  }

  const benchmark = new Benchmark('benchmark moveable').printHeader();
  benchmark
    .createSuite('starting benchmark', { time: 10_000 })
    .add('moveable', () => moveable(testMap, unitA, vecA, 1))
    .add('fast moveable', () => fastMoveable(testMap, unitA, vecA, 1));
  benchmark.run();
});
