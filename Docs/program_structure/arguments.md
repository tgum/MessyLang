# MessyLang Docs

```
VAR "x" "messy"
VAR "y" "lang"
ADD x y "y"
ADD y "-is-cool" "y"
PRINT y
```

# Arguments

Arguments are space separated values that are given to the keyword to process an effect.
Values must be of one of the standard messylang data-types (BOOL, STRING, NUMBER, more at the [data types page](/program_structure/data-types.html)).
Example:
`GOTOIFELSE x 20 "hi"=y`
In this case there are 3 arguments (`x`, `20` and `"hi"=y`).
