import * as assert from 'assert';
import { Agent } from 'https';
import fetch from 'node-fetch';
import { killAllProcesses } from '../../utils/process';
import { ngServe } from '../../utils/project';

export default async function () {
  // TODO(architect): Delete this test. It is now in devkit/build-angular.

  try {
    await ngServe('--ssl', 'true');

    const response = await fetch('https://localhost:4200/', {
      agent: new Agent({ rejectUnauthorized: false }),
    });

    assert.strictEqual(response.status, 200);
    assert.match(await response.text(), /<app-root><\/app-root>/);
  } finally {
    killAllProcesses();
  }
}