import { isPassword1, isPassword2 } from './4';

describe('First task tests', () => {
  test('111111 is a password', () => {
    expect(isPassword1('111111'.split(''))).toBeTruthy();
  })

  test('122345 is a password', () => {
    expect(isPassword1('122345'.split(''))).toBeTruthy();
  })

  test('223450 is not a password', () => {
    expect(isPassword1('223450'.split(''))).toBeFalsy();
  })

  test('123789 is not a password', () => {
    expect(isPassword1('123789'.split(''))).toBeFalsy();
  })
})

describe('Second task tests', () => {
  test('112233 is a password', () => {
    expect(isPassword2('112233'.split(''))).toBeTruthy();
  })

  test('122345 is a password', () => {
    expect(isPassword2('122345'.split(''))).toBeTruthy();
  })

  test('111122 is a password', () => {
    expect(isPassword2('111122'.split(''))).toBeTruthy();
  })

  test('123444 is not a password', () => {
    expect(isPassword2('123444'.split(''))).toBeFalsy();
  })
})