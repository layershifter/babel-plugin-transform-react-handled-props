import assert from 'assert'
import { transformFileSync } from 'babel-core'
import fs from 'fs'
import { describe, it } from 'mocha'
import path from 'path'

function trim(str) {
  return str.replace(/^\s+|\s+$/, '')
}

const testCase = (fixtureDir, caseName) => {
  it(`should pass ${caseName.split('-').join(' ')}`, () => {
    const actualPath = path.join(fixtureDir, 'actual.js')

    const actual = transformFileSync(actualPath).code
    const expected = fs.readFileSync(
      path.join(fixtureDir, 'expected.js')
    ).toString()

    assert.equal(trim(actual), trim(expected))
  })
}


describe('fixtures', () => {
  const fixturesDir = path.join(__dirname, 'fixtures')

  fs.readdirSync(fixturesDir).forEach((caseName) => {
    const fixtureDir = path.join(fixturesDir, caseName)

    if (fs.lstatSync(fixtureDir).isDirectory()) testCase(fixtureDir, caseName)
  })
})
