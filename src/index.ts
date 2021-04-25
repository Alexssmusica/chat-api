import { http } from './App';
import './websocket/client';
import './websocket/admin';

const port = process.env.PORT || 3333;

http.listen(port, () => console.log('Server started!'));
