# jsdbg
Client-side uniform debug tool

This utility has as a main goal providing complex debug mechanism for client-side code and among others focuses on three vectors:

0) We often use various methods to debug our code and to force our program to behave properly. Generally, we use Console API and some methods of it to watch what happens in our logic actually. This practice is well-known, but oftentimes we forget our debug helpers in production code, so potentially we have a problem. A problem in environments that don't support Console API or some parts of it which we use or performance damage when the JavaScript engine handle unnecessary instructions;

1) There are many various methods in Console API. In addition, different browsers may have their own specific methods or syntax. Also our time is limited and oftentimes we want to get necessary information as near as possible, especially if we're dealing with the console. The approach of this utility tries to consider this and to provide detailed usage information about Console API functionality;
   
2) Oftentimes we want to see full picture of functioning of our application. It means that we want to see also what happens on the client-side and save important issues to the log. In many cases we use only server-side logging. This utility makes an attempt to break habitual stereotype and to log error cases on the client-side with the ability to send them to the server.