import assert from 'assert'
import { transformFileSync } from 'babel-core'
import fs from 'fs'
import { trim, startCase } from 'lodash'
import path from 'path'

const fixturesDir = path.join(__dirname, 'fixtures')

const fixtureAssert = (fixtureDir, assertName) => it(`should pass ${assertName}`, () => {
  const actualPath = path.join(fixtureDir, 'actual.js')
  const expectedPath = path.join(fixtureDir, 'expected.js')

  const actual = transformFileSync(actualPath).code
  const expected = fs.readFileSync(expectedPath).toString()

  assert.equal(trim(actual), trim(expected))
})

describe('fixtures', () => {
  fs.readdirSync(fixturesDir).forEach(caseName => {
    const fixtureDir = path.join(fixturesDir, caseName)
    const assertName = startCase(caseName)

    if (fs.lstatSync(fixtureDir).isDirectory()) fixtureAssert(fixtureDir, assertName)
  })
})
