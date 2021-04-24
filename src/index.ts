import { http } from './App';
import './websocket/client';

const port = process.env.PORT || 3333;

http.listen(port, () => console.log('Server started!'));
