import assert from 'assert'
import { transformFileSync } from 'babel-core'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'

import handledProps from '../src'

const fixturesDir = path.join(__dirname, 'fixtures')

const fixtureAssert = (fixtureDir, options = []) =>
  it(`should pass ${_.startCase(fixtureDir)}`, () => {
    const actualPath = path.join(fixturesDir, fixtureDir, 'actual.js')
    const expectedPath = path.join(fixturesDir, fixtureDir, 'expected.js')

    const actual = transformFileSync(actualPath, {
      babelrc: false,
      plugins: [[handledProps, options]],
    }).code
    const expected = fs.readFileSync(expectedPath).toString()

    assert.equal(_.trim(actual), _.trim(expected))
  })

describe('fixtures', () => {
  fixtureAssert('hoc')
  fixtureAssert('hoc-unnamed')

  fixtureAssert('ignored', { ignoredProps: ['as'] })

  fixtureAssert('multiple')
  fixtureAssert('multiple-arrow')

  fixtureAssert('skipped')
  fixtureAssert('skipped-arrow')
  fixtureAssert('skipped-assignment')

  fixtureAssert('spread')

  fixtureAssert('statefull')
  fixtureAssert('statefull-predefined')
  fixtureAssert('statefull-static')

  fixtureAssert('stateless')
  fixtureAssert('stateless-arrow')
  fixtureAssert('stateless-assignment')
  fixtureAssert('stateless-predefined')

  fixtureAssert('flow')
  fixtureAssert('flow-non-concerning')
})
