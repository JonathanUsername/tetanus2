# tetanus2

testing neon

For fun, testing out very naive implementations for summing numbers up to a ceiling.


Run like this:
```sh
for i in js_triangle_array js_triangle_generator rust_triangle_single rust_triangle_parallel; do echo $i && $(which time) -v node lib/index.js $i; done
```

I find the context switching interesting:
```sh
for i in js_triangle_array js_triangle_generator rust_triangle_single rust_triangle_parallel; do echo $i && $(which time) -v node lib/index.js $i 2>&1 | grep context; done
```