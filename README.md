React-Socketio ![dependencies](https://david-dm.org/rogr/react-socketio.svg) ![dev-dependencies](https://david-dm.org/rogr/react-socketio/dev-status.svg)
=====
Experiment of using [Socket.io](https://github.com/socketio/socket.io) with [Koa](https://github.com/koajs/koa) and [React](https://github.com/facebook/react).

To install the dependencies of the project:

```
npm install
```

To compile the code and run the server:

```
npm start
```


## Router
- `127.0.0.1:3000/`

   Add an Audience member to answer questions.

- `127.0.0.1:3000/speaker`

  Add a Presentation name and a Speaker member.

- `127.0.0.1:3000/board`

  Display a bar graph of the answers by the audience.

- `127.0.0.1:3000/anyother`

  Default 404 page.

## License

React-Socketio is released under the Beerware License:

> "THE BEER-WARE LICENSE" (Revision 42):
>
> [Rogelio Alberto](https://github.com/rogr) wrote this file.  As long as you retain this notice you
> can do whatever you want with this stuff. If we meet some day, and you think
> this stuff is worth it, you can buy me a beer in return.
>
> Rogelio Alberto - @rogr.
