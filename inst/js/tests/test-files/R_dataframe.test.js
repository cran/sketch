const R = require("JEST_CONFIG_NAME_MAPPER/node-R_dataframe.js");

/*===================================================== 
  Test functions for R dataframe
=====================================================*/
test("Testing dataframe: constructor", () => {
    let input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
    let expected = [1,4];
    expect(input.toArray()[0]).toStrictEqual(expected);
})


test("Testing dataframe: extract", () => {
  let input, result, expected;
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  result = R.extract(input, 'x');
  expected = R.data_frame({ x: [1,2,3] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, 0);
  expected = R.data_frame({ x: [1,2,3] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, 'y');
  expected = R.data_frame({ y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, 1);
  expected = R.data_frame({ y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, [1]);
  expected = R.data_frame({ y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, ['y']);
  expected = R.data_frame({ y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  expect(() => {R.extract(input, [true])}).toThrow();
  
  result = R.extract(input, [0,1]);
  expected = input;
  expect(result).toStrictEqual(expected);

  result = R.extract(input, 0, 'x');
  expected = R.data_frame({ x: [1] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, [0,1], 'x');
  expected = R.data_frame({ x: [1,2] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, [0,2], 'x');
  expected = R.data_frame({ x: [1,3] });
  expect(result).toStrictEqual(expected);

  result = R.extract(input, [0,2], 0);
  expected = R.data_frame({ x: [1,3] });
  expect(result).toStrictEqual(expected);

  expect(() => {R.extract(input, ['1'], 'x')}).toThrow();
})


test("Testing dataframe: extract2", () => {
  let input, result, expected;
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  result = R.extract2(input, 'x');
  expected = [1,2,3];
  expect(result).toStrictEqual(expected);

  result = R.extract2(input, 0);
  expected = [1,2,3];
  expect(result).toStrictEqual(expected);

  result = R.extract2(input, 'y');
  expected = [4,5,6];
  expect(result).toStrictEqual(expected);

  result = R.extract2(input, 1);
  expected = [4,5,6];
  expect(result).toStrictEqual(expected);

  result = R.extract2(input, 0, 'x');
  expected = [1];
  expect(result).toStrictEqual(expected);
})


test("Testing dataframe: extractAssign", () => {
  // one-argument index
  // string, scalar
  let input, result, expected;
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  result = R.extractAssign(input, 1, 'x');
  expected = R.data_frame({ x: [1,1,1], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  // string, Array
  result = R.extractAssign(input, [7,8,9], 'x');
  expected = R.data_frame({ x: [7,8,9], y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extractAssign(input, [7,8,9], 'y');
  expected = R.data_frame({ x: [1,2,3], y: [7,8,9] });
  expect(result).toStrictEqual(expected);

  result = () => {R.extractAssign(input, [7,8], 'y')};
  expect(result).toThrow();

  // number, scalar
  result = R.extractAssign(input, 1, 0);
  expected = R.data_frame({ x: [1,1,1], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  // number, Array
  result = R.extractAssign(input, [7,8,9], 0);
  expected = R.data_frame({ x: [7,8,9], y: [4,5,6] });
  expect(result).toStrictEqual(expected);

  result = R.extractAssign(input, [7,8,9], 1);
  expected = R.data_frame({ x: [1,2,3], y: [7,8,9] });
  expect(result).toStrictEqual(expected);

  // Array, number
  result = R.extractAssign(input, 99, ['x','y']);
  expected = R.data_frame({ x: [99,99,99], y: [99,99,99] });
  expect(result).toStrictEqual(expected);

  // Array, Array
  result = R.extractAssign(input, [[-1,-2],[-3,-4],[-5,-6]], ['x','y']);
  expected = R.data_frame({ x: [-1,-3,-5], y: [-2,-4,-6] });
  expect(result).toStrictEqual(expected);
  
  result = () => {R.extractAssign(input, [[-1],[-4],[-6]], ['x','y'])};
  expect(result).toThrow();

  result = () => {R.extractAssign(input, [[-1,-2]], ['x','y'])};
  expect(result).toThrow();

  // two-argument index
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  // number-string-scalar
  result = R.extractAssign(input, 7, 1, 'x');
  expected = R.data_frame({ x: [1,7,3], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  // number-string-Array
  result = R.extractAssign(input, [99], 1, 'y');
  expected = R.data_frame({ x: [1,2,3], y: [4,99,6] });
  expect(result).toStrictEqual(expected);

  result = () => {R.extractAssign(input, [1,2], 1, 'y')};
  expect(result).toThrow();
  
  // Array-string-scalar
  result = R.extractAssign(input, 99, [0,1], 'x');
  expected = R.data_frame({ x: [99,99,3], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  // Array-string-Array
  result = R.extractAssign(input, [7,77], [0,1], 'x');
  expected = R.data_frame({ x: [7,77,3], y: [4,5,6] });
  expect(result).toStrictEqual(expected);
  
  result = () => {R.extractAssign(input, [7], [0,1], 'x')}; // "length-one-vector matter"
  expect(result).toThrow();

  result = () => {R.extractAssign(input, [7,8,9], [0,1], 'x')}; 
  expect(result).toThrow();

  // number-Array-scalar
  result = R.extractAssign(input, 22, 0, ['x','y']);
  expected = R.data_frame({ x: [22,2,3], y: [22,5,6] });
  expect(result).toStrictEqual(expected);
  // number-Array-Array
  result = R.extractAssign(input, [22,88], 0, ['x','y']);
  expected = R.data_frame({ x: [22,2,3], y: [88,5,6] });
  expect(result).toStrictEqual(expected);
  
  result = () => {R.extractAssign(input, [1,2,3], 0, ['x','y'])};
  expect(result).toThrow();

  // Array-Array-Array
  result = R.extractAssign(input, 10, [0,1], ['x','y']);
  expected = R.data_frame({ x: [10,10,3], y: [10,10,6] });
  expect(result).toStrictEqual(expected);

  result = R.extractAssign(input, [[-1,-2],[-3,-4]], [0,1], ['x','y']);
  expected = R.data_frame({ x: [-1,-3,3], y: [-2,-4,6] });
  expect(result).toStrictEqual(expected);

  result = () => {R.extractAssign(input, [[-1],[-4]], [0,1], ['x','y'])};
  expect(result).toThrow();

  result = () => {R.extractAssign(input, [[-1,-2]], [0,1], ['x','y'])};
  expect(result).toThrow();
})

test("Testing dataframe: dim", () => {
  let input, result, expected;
  input = R.data_frame({ x: [1,2,3], y: [4,5,6] });
  result = R.dim(input);
  expected = [3,2];
  expect(result).toStrictEqual(expected);
})

test("Testing dataframe: print", () => {
  let input, result, expected;
  input = R.data_frame({ x: [1], y: [4] });
  result = R.print(input);
  expected = "| x         | y         |\n------------------------\n| 1         | 4         |";
  expect(result).toStrictEqual(expected);
})

test("Testing dataframe: mutate", () => {
  let df0, result, expected;
  df0 = R.data_frame({ c1: [1, 4, 2], c2: [6, 2, 10], c3: [4, 4, 4] });

  result = R.mutate(df0, 'new_col', row => row.get('c1') * 2);
  expected = R.data_frame({
    c1: [1, 4, 2], c2: [6, 2, 10], c3: [4, 4, 4], 
    new_col: [2, 8, 4]
  });
  expect(result).toStrictEqual(expected);

  result = R.mutate(
    df0, ['new_col', 'new_col2'], 
    [row => row.get('c1') * 2, row => row.get('c2') * 2]
  );
  expected = R.data_frame({
    c1: [1, 4, 2], c2: [6, 2, 10], c3: [4, 4, 4], 
    new_col: [2, 8, 4], new_col2: [12, 4, 20]
  });
  expect(result).toStrictEqual(expected);
})

test("Testing dataframe: select", () => {
    let df0, result, expected;
    df0 = R.data_frame({
      c1: [1, 4, 2],
      c2: [6, 2, 10],
      c3: [4, 4, 4]
    });

    result = R.select(df0, 'c1');
    expected = df0.select('c1');
    expect(result).toStrictEqual(expected);

    result = R.select(df0, 'c1', 'c3');
    expected = df0.select('c1', 'c3');
    expect(result).toStrictEqual(expected);
})

test("Testing dataframe: filter", () => {
    let df0, result, expected;
    df0 = R.data_frame({
      c1: [1, 4, 2],
      c2: [6, 2, 10],
      c3: [4, 4, 4]
    });
    
    result = R.filter(df0, row => row.get('c1') >= 2);
    expected = df0.filter(row => row.get('c1') >= 2);
    expect(result).toStrictEqual(expected);
})


test("Testing dataframe: count", () => {
    let df0, result, expected;
    df0 = R.data_frame({
      column1: [3, 6, 8, 10],
      column2: [3, 4, 5, 6],
      column3: ['a', 'a', 'b', 'b'],
      column4: ['c', 'c', 'd', 'b']
    }, ['column1', 'column2', 'column3', 'column4']);

    result = R.count(df0, 'column3');
    expected = R.data_frame({ column3: ['a', 'b'], n: [2, 2] });
    expect(result).toStrictEqual(expected);

    result = R.count(df0, 'column3', 'column4');
    expected = R.data_frame({ 
      column3: ['a', 'b', 'b'], 
      column4: ['c', 'd', 'b'],
      n: [2, 1, 1] 
    });
    expect(result).toStrictEqual(expected);
})


test("Testing dataframe: summarise", () => {
    let df0, result, expected;
    df0 = R.data_frame({
      column1: [3, 6, 8, 10],
      column2: [3, 4, 5, 6],
      column3: ['a', 'a', 'b', 'b'],
      column4: ['c', 'c', 'd', 'b']
    }, ['column1', 'column2', 'column3', 'column4']);

    result = R.summarise(
      R.group_by(df0, 'column3'),
      'n', group => group.count(),
    );
    expected = R.data_frame({ column3: ['a', 'b'], n: [2, 2] });
    expect(result).toStrictEqual(expected);

    result = R.summarise(
      R.group_by(df0, 'column3', 'column4'),
      'n', group => group.stat.mean('column1'),
    );
    expected = R.data_frame({ 
      column3: ['a', 'b', 'b'], 
      column4: ['c', 'd', 'b'],
      n: [4.5, 8, 10] 
    });
    expect(result).toStrictEqual(expected);
})


test("Testing dataframe: arrange", () => {
    let df0, result, expected;
    df0 = R.data_frame({
      c1: [1, 4, 2],
      c2: [6, 2, 10],
      c3: [4, 4, 4]
    });
    
    result = R.arrange(df0, 'c1');
    expected = df0.sortBy('c1');
    expect(result).toStrictEqual(expected);

    result = R.arrange(df0, 'c1', true);
    expected = df0.sortBy('c1', true);
    expect(result).toStrictEqual(expected);

    result = R.arrange(df0, ['c1', 'c2']);
    expected = df0.sortBy(['c1', 'c2']);
    expect(result).toStrictEqual(expected);

    result = R.arrange(df0, ['c1', 'c2'], true);
    expected = df0.sortBy(['c1', 'c2'], true);
    expect(result).toStrictEqual(expected);
})
