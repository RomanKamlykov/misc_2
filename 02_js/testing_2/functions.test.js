const functions = require('./functions');

test('add 2 + 2 to equal 4', () => {
  const value = functions.add(2, 2);
  expect(value).toBe(4);
});