# MessyLang Docs

```
VAR "x" "messy"
VAR "y" "lang"
ADD x y "y"
ADD y "-is-cool" "y"
PRINT y
```

# List of MessyLang keywords

## What is a keyword?

A keyword is the first word of a line and the name of an instruction to the machine and takes any number of arguments (more on that on the [arguments page](/program_structure/arguments.html)).
Keywords must always be at the start of a line and be UPPERCASE.

## All the MessyLang keywords

### GOTO

#### Arguments:
Number: "line"

#### Description:
Takes a single argument `line` and set the program counter to that line

### GOTOIF

#### Arguments:
Number: "line"     
Bool: "condition"

#### Description:
If `condition` is true, then set the program counter to `line`

### GOTOIFNOT

#### Arguments:

Number: "line"     
Bool: "condition"

#### Description:
If `condition` is false, then set the program counter to `line`

### GOTOIFELSE

#### Arguments:
Number: "lineTrue"     
Number: "lineFalse"     
Bool: "condition"

#### Description:
If `condition` is true, then set the program counter to `lineTrue`, else set program counter to `lineFalse`

### PRINT

#### Arguments:
string: "string"

#### Description:
prints `string` to the screen

### VAR

#### Arguments:
string: "name"
any: "value"

#### Description:
creates a new variable called `name` with the value of `value`

### SETVAR

#### Arguments:
string: "name"
any: "value"

#### Description:
sets the value of an existing variable called `name` to `value`

### ADD

#### Arguments:
any: "val1"
type of `val1`: "val2"
string: "varname"

#### Description:
adds `val1` and `val2` togever and put the result in the existing variable called `varname`

### SUB

#### Arguments:
number: "val1"
number: "val2"
string: "varname"

#### Description:
subtracts `val2` from `val1` and put the result in the existing variable called `varname`

### MOD

#### Arguments:
number: "val1"
number: "val2"
string: "varname

#### Description:
takes the remainder of `val1` divided by `val2` and put the result in the existing variable called `varname`

### NUMBER

#### Arguments:
string: "val"
string: "varname"

#### Description:
Convert (if possible) `val` to a number and puts it in the variable called `varname`

### STRING

#### Arguments:
number: "val"
string: "varname"

#### Description:
convert `val` to a string and puts it in the variable called `varname`
