function fooBar(n: number) {
  for (let i = 1; i <= n; i++) {
    if (i % 5 == 0 && i % 3 == 0) {
      console.log('FooBar');
    } else if (i % 3 == 0) {
      console.log('Foo');
    } else if (i % 5 == 0) {
      console.log('Bar');
    } else {
      console.log(i);
    }
  }
  // -----------
}
fooBar(16);
// fooBar(100);
