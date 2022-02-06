# MessyLang Docs

```
VAR "x" "messy"
VAR "y" "lang"
ADD x y "y"
ADD y "-is-cool" "y"
PRINT y
```

# Quickstart.

## Hello, World!

A Hello World program in messylang should look like this:
```
PRINT "Hello-World"
```


Let's go through it step by step.

### 1. Line

A messylang line is a single line of a messylang program, each line being an instruction.
Each line is divided into keywords and arguments, separated by spaces.

### 2. Keyword

A keyword is the first word of a line and the name of an instruction to the machine and takes any number of arguments (more on that later).
Keywords must always be at the start of a line and *must* be UPPERCASE.

The `PRINT` keyword is the simplest keyword in messylang. It takes a string (more on that in the next section) as its first and only argument, and prints it out on the screen.

### 3. Arguments

Now the rest of the line are the arguments, arguments being space separated values that are given to the keyword to process an effect, more on the [arguments page](/program_structure/arguments.html)

In this example, the argument given to `PRINT` is `"Hello-World"`.
Values must be of one of the standard messylang [data-types](/program_structure/data-types.html).
In this case, the argument is enclosed by double quotes `"`, which means it is a string (a piece of text which may only contain alphanumeric characters, dashes `-`, and underscores `_`).
