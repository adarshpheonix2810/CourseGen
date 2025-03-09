const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following Detail With Field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level: Basic, Duration: 1 hours, NoOf Chapters:5, in JSON Format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"Python Fundamentals\",\n  \"description\": \"A beginner-friendly introduction to the Python programming language. This course covers the basics of Python syntax, data types, control flow, and functions, laying a solid foundation for further learning.\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Introduction to Python\",\n      \"about\": \"This chapter introduces the Python programming language, its features, and why it's popular.  We'll cover installation, setting up your environment, and running your first Python program.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Variables and Data Types\",\n      \"about\": \"We'll explore fundamental data types in Python, including integers, floats, strings, and booleans.  We'll learn how to declare variables, assign values, and perform basic operations.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Control Flow: Conditional Statements\",\n      \"about\": \"This chapter covers conditional statements like `if`, `elif`, and `else` to control the flow of execution in your programs.  We'll learn how to create programs that make decisions based on conditions.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Loops and Iteration\",\n      \"about\": \"Learn about loops, including `for` and `while` loops, to iterate over sequences and perform repetitive tasks efficiently.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Functions\",\n      \"about\": \"This chapter introduces functions – reusable blocks of code that perform specific tasks. We'll learn how to define, call, and pass arguments to functions.\",\n      \"duration\": \"15 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"totalDuration\": \"1 hour\" ,\n  \"noOfChapters\": 5\n}\n```\n"},
          ],
        },
      ],
    });

    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
          {
              role: "user",
              parts: [
                  { text: "Explain the concept in Detail on Topic:Java ,Chapter:Basics and Data Types, in JSON Format with list of array with field as title , description in detail , Code Example (Code field in <precode> format) if applicable \n" },
              ],
          },
          {
              role: "model",
              parts: [
                  { text: "```json\n[\n  {\n    \"title\": \"Introduction to Java\",\n    \"description\": \"Java is a powerful, versatile, and widely used programming language. It is known for its platform independence, object-oriented nature, and strong security features. Java applications are commonly found in a vast range of domains, including web development, mobile apps, enterprise software, and scientific computing.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Basic Java Syntax\",\n    \"description\": \"Java code is written in a structured manner using keywords, operators, and variables. The basic structure includes classes, methods, and statements. The execution flow is controlled using control structures like if-else, loops (for, while), and switch statements.\",\n    \"code\": \"<precode>\\npublic class HelloWorld {\\n  public static void main(String[] args) {\\n    System.out.println(\\\"Hello, World!\\\");\\n  }\\n}\\n</precode>\"\n  },\n  {\n    \"title\": \"Data Types\",\n    \"description\": \"Data types define the kind of data a variable can hold. Java provides several built-in data types, categorized as primitive and reference types.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Primitive Data Types\",\n    \"description\": \"Primitive data types represent basic values, directly stored in memory. They include:\\n\\n* **byte:** Stores a single byte of data (8 bits). \\n* **short:** Stores a 16-bit integer. \\n* **int:** Stores a 32-bit integer. \\n* **long:** Stores a 64-bit integer. \\n* **float:** Stores a single-precision floating-point number. \\n* **double:** Stores a double-precision floating-point number. \\n* **boolean:** Represents a true or false value.\",\n    \"code\": \"<precode>\\nbyte age = 25;\\nshort quantity = 1000;\\nint population = 1000000;\\nlong distance = 5000000000L;\\nfloat price = 19.99F;\\ndouble pi = 3.14159;\\nboolean isOnline = true;\\n</precode>\"\n  },\n  {\n    \"title\": \"Reference Data Types\",\n    \"description\": \"Reference data types store memory addresses that point to objects. They include:\\n\\n* **String:** Represents a sequence of characters. \\n* **Arrays:** Store collections of elements of the same data type. \\n* **Classes:** Blueprints for creating objects. \\n* **Interfaces:** Define contracts for classes to implement. \\n* **Enums:** Represent a set of named constants.\",\n    \"code\": \"<precode>\\nString name = \\\"John Doe\\\";\\nint[] numbers = {1, 2, 3, 4, 5};\\n</precode>\"\n  },\n  {\n    \"title\": \"Variables\",\n    \"description\": \"Variables are containers for storing data values. They are declared using a data type and a name, followed by an optional initialization value.\",\n    \"code\": \"<precode>\\nint age = 25;\\nString name = \\\"John Doe\\\";\\n</precode>\"\n  },\n  {\n    \"title\": \"Operators\",\n    \"description\": \"Operators are symbols that perform specific operations on operands (variables or values). Some common operators include:\\n\\n* **Arithmetic operators:** +, -, *, /, %, ++, --\\n* **Comparison operators:** ==, !=, >, <, >=, <= \\n* **Logical operators:** &&, ||, ! \\n* **Bitwise operators:** &, |, ^, ~, <<, >>\\n* **Assignment operators:** =, +=, -=, *=, /=, %= \\n* **Conditional operator:** ? :\",\n    \"code\": \"<precode>\\nint sum = 10 + 5; // Arithmetic operator\\nboolean isEquals = (a == b); // Comparison operator\\nboolean isTrue = (a > 10) && (b < 20); // Logical operator\\n</precode>\"\n  },\n  {\n    \"title\": \"Control Flow Statements\",\n    \"description\": \"Control flow statements control the order in which code is executed. They include:\\n\\n* **if-else:** Executes different blocks of code based on a condition. \\n* **switch:** Selects a block of code to execute based on the value of a variable. \\n* **for loop:** Executes a block of code a specified number of times. \\n* **while loop:** Executes a block of code repeatedly as long as a condition is true. \\n* **do-while loop:** Executes a block of code at least once, and then repeatedly as long as a condition is true.\",\n    \"code\": \"<precode>\\n// if-else statement\\nif (age >= 18) {\\n  System.out.println(\\\"You are an adult.\\\");\\n} else {\\n  System.out.println(\\\"You are a minor.\\\");\\n}\\n\\n// for loop\\nfor (int i = 0; i < 10; i++) {\\n  System.out.println(i);\\n}\\n\\n// while loop\\nwhile (count < 5) {\\n  System.out.println(\\\"Count: \\\" + count);\\n  count++;\\n}\\n</precode>\"\n  },\n  {\n    \"title\": \"Input and Output\",\n    \"description\": \"Java provides mechanisms for interacting with the user and external resources. \\n\\n* **Input:** The `Scanner` class is used to read input from the console or files. \\n* **Output:** The `System.out.println()` method is used to print output to the console.\",\n    \"code\": \"<precode>\\nimport java.util.Scanner;\\n\\npublic class InputOutputExample {\\n  public static void main(String[] args) {\\n    Scanner scanner = new Scanner(System.in);\\n    System.out.print(\\\"Enter your name: \\\");\\n    String name = scanner.nextLine();\\n    System.out.println(\\\"Hello, \\\" + name + \\\"!\\\");\\n  }\\n}\\n</precode>\"\n  }\n]\n```" },
              ],
          },
      ],
  });
  
    //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());
